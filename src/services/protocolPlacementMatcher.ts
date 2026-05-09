import type { StableBodyRegionId } from "../data/bodyMapRegions";
import {
  PROTOCOL_PLACEMENT_STRATEGIES,
  type ProtocolPlacementStrategy,
} from "../data/protocolPlacementStrategies";

export type ProtocolPlacementMatchInput = {
  issueText?: string | null;
  padPlacementText?: string | null;
  technicalAreaText?: string | null;
  selectedRegionId?: StableBodyRegionId | string | null;
  fullGuidanceText?: string | null;
};

export type ProtocolPlacementMatchResult = {
  strategy: ProtocolPlacementStrategy | null;
  strategyId: string | null;
  confidence: number;
  reasons: string[];
};

type ScoredStrategy = {
  strategy: ProtocolPlacementStrategy;
  score: number;
  reasons: string[];
};

function normalizeText(value?: string | null): string {
  return String(value ?? "")
    .toLowerCase()
    .replace(/[^\w\s/-]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function normalizeRegionId(value?: StableBodyRegionId | string | null): string {
  return String(value ?? "")
    .trim()
    .toLowerCase()
    .replace(/\s+/g, "_")
    .replace(/-/g, "_");
}

function includesPhrase(haystack: string, phrase: string): boolean {
  const normalizedPhrase = normalizeText(phrase);

  if (!haystack || !normalizedPhrase) {
    return false;
  }

  return haystack.includes(normalizedPhrase);
}

function countMatches(
  haystack: string,
  keywords: string[],
  points: number,
  reasonPrefix: string
): {
  score: number;
  reasons: string[];
  matchCount: number;
} {
  let score = 0;
  let matchCount = 0;
  const reasons: string[] = [];

  keywords.forEach((keyword) => {
    if (includesPhrase(haystack, keyword)) {
      score += points;
      matchCount += 1;
      reasons.push(`${reasonPrefix}: ${keyword}`);
    }
  });

  return {
    score,
    reasons,
    matchCount,
  };
}

/**
 * Strong issue-intent boosts.
 *
 * These are not medical diagnoses. They are routing helpers so the matcher
 * respects the user's actual words instead of being overpowered by broader
 * generated protocol text.
 */
function getIssueIntentBoosts(issueText: string, strategyId: string): {
  score: number;
  reasons: string[];
} {
  let score = 0;
  const reasons: string[] = [];

  const hasAny = (terms: string[]) =>
    terms.some((term) => includesPhrase(issueText, term));

  const hasAll = (terms: string[]) =>
    terms.every((term) => includesPhrase(issueText, term));

  if (
    strategyId === "si_joint_local_or_hip_referral" &&
    (hasAny(["si joint", "sacroiliac"]) ||
      (hasAny(["low back", "lower back", "back dimple", "pelvis"]) &&
        hasAny(["hip", "outer hip", "front hip"])))
  ) {
    score += 28;
    reasons.push("strong issue intent: SI / low-back-to-hip pattern");
  }

  if (
    strategyId === "upper_trap_tightness_pain" &&
    (hasAny(["upper trap", "trap", "trapezius"]) ||
      hasAll(["neck", "shoulder"]) ||
      hasAny(["neck and shoulder", "shoulder tension"]))
  ) {
    score += 24;
    reasons.push("strong issue intent: upper trap / neck-shoulder pattern");
  }

  if (
    strategyId === "rotator_cuff_irritation" &&
    (hasAny(["rotator cuff"]) ||
      (hasAny(["shoulder"]) &&
        hasAny(["lifting", "raise", "reaching", "arm raise", "overuse"])))
  ) {
    score += 24;
    reasons.push("strong issue intent: rotator cuff / shoulder overuse pattern");
  }

  if (
    strategyId === "brain_fog_head_neck" &&
    hasAny([
      "brain fog",
      "foggy",
      "mental fog",
      "cloudy",
      "focus",
      "clarity",
      "concentration",
      "can't think",
      "cant think",
    ])
  ) {
    score += 28;
    reasons.push("strong issue intent: brain fog / focus pattern");
  }

  if (
    strategyId === "jaw_tmj_face" &&
    hasAny([
      "jaw",
      "tmj",
      "clench",
      "clenching",
      "grinding",
      "jaw tight",
      "jaw pain",
    ])
  ) {
    score += 28;
    reasons.push("strong issue intent: jaw / TMJ pattern");
  }

  if (
    strategyId === "sinus_head_face" &&
    hasAny(["sinus", "congestion", "stuffy", "face pressure", "cheek pressure"])
  ) {
    score += 24;
    reasons.push("strong issue intent: sinus / face pressure pattern");
  }

  if (
    strategyId === "headache_head_neck" &&
    hasAny(["headache", "head pain", "head tension", "migraine"])
  ) {
    score += 24;
    reasons.push("strong issue intent: headache / head-neck pattern");
  }

  if (
    strategyId === "hip_glute_deep_tension" &&
    hasAny(["glute", "butt", "butt cheek", "piriformis", "deep hip", "deep glute"])
  ) {
    score += 22;
    reasons.push("strong issue intent: hip / deep glute pattern");
  }

  if (
    strategyId === "knee_front_patella_tendon" &&
    hasAny(["knee", "kneecap", "patella", "patellar", "front knee"])
  ) {
    score += 20;
    reasons.push("strong issue intent: front knee / patella pattern");
  }

  if (
    strategyId === "foot_arch_heel_forefoot" &&
    hasAny(["foot", "heel", "arch", "plantar", "ball of foot", "toe", "ankle"])
  ) {
    score += 20;
    reasons.push("strong issue intent: foot / ankle pathway pattern");
  }

  if (
    strategyId === "arm_elbow_wrist_overuse" &&
    hasAny(["arm", "elbow", "forearm", "wrist", "hand", "grip", "typing"])
  ) {
    score += 20;
    reasons.push("strong issue intent: arm / elbow / wrist pattern");
  }

  return {
    score,
    reasons,
  };
}

/**
 * Penalizes broad strategies when the user's own wording is clearly specific.
 * This prevents "SI joint pain going into my hip" from being swallowed by a
 * more generic low-back protocol response.
 */
function getBroadStrategyPenalty(issueText: string, strategyId: string): {
  score: number;
  reasons: string[];
} {
  let score = 0;
  const reasons: string[] = [];

  const hasSpecificSI =
    includesPhrase(issueText, "si joint") ||
    includesPhrase(issueText, "sacroiliac");

  const hasSpecificRotator = includesPhrase(issueText, "rotator cuff");
  const hasSpecificJaw = includesPhrase(issueText, "jaw") || includesPhrase(issueText, "tmj");
  const hasSpecificBrainFog =
    includesPhrase(issueText, "brain fog") ||
    includesPhrase(issueText, "foggy") ||
    includesPhrase(issueText, "mental fog");

  if (strategyId === "low_back_general_ache" && hasSpecificSI) {
    score -= 20;
    reasons.push("penalty: user specified SI joint, not generic low back");
  }

  if (strategyId === "shoulder_blade_tension" && hasSpecificRotator) {
    score -= 12;
    reasons.push("penalty: user specified rotator cuff");
  }

  if (strategyId === "stress_nervous_system_head_neck" && hasSpecificBrainFog) {
    score -= 12;
    reasons.push("penalty: user specified brain fog/focus");
  }

  if (
    (strategyId === "headache_head_neck" || strategyId === "sinus_head_face") &&
    hasSpecificJaw
  ) {
    score -= 12;
    reasons.push("penalty: user specified jaw/TMJ");
  }

  return {
    score,
    reasons,
  };
}

function scoreStrategy(
  strategy: ProtocolPlacementStrategy,
  input: ProtocolPlacementMatchInput
): ScoredStrategy {
  const issueText = normalizeText(input.issueText);
  const padPlacementText = normalizeText(input.padPlacementText);
  const technicalAreaText = normalizeText(input.technicalAreaText);
  const fullGuidanceText = normalizeText(input.fullGuidanceText);
  const selectedRegionId = normalizeRegionId(input.selectedRegionId);

  const combinedText = normalizeText(
    [
      input.issueText,
      input.padPlacementText,
      input.technicalAreaText,
      input.fullGuidanceText,
    ]
      .filter(Boolean)
      .join(" ")
  );

  let score = 0;
  const reasons: string[] = [];

  const issueIntentBoost = getIssueIntentBoosts(issueText, strategy.id);
  score += issueIntentBoost.score;
  reasons.push(...issueIntentBoost.reasons);

  const issueScore = countMatches(
    issueText,
    strategy.issueKeywords,
    8,
    "matched original issue"
  );
  score += issueScore.score;
  reasons.push(...issueScore.reasons);

  const padScore = countMatches(
    padPlacementText,
    strategy.padPlacementKeywords,
    5,
    "matched pad placement"
  );
  score += padScore.score;
  reasons.push(...padScore.reasons);

  const technicalScore = countMatches(
    technicalAreaText,
    strategy.technicalKeywords,
    6,
    "matched technical area"
  );
  score += technicalScore.score;
  reasons.push(...technicalScore.reasons);

  const fullGuidanceScore = countMatches(
    fullGuidanceText,
    [...strategy.issueKeywords, ...strategy.padPlacementKeywords],
    1,
    "matched full guidance"
  );
  score += fullGuidanceScore.score;
  reasons.push(...fullGuidanceScore.reasons);

  const combinedFallbackScore = countMatches(
    combinedText,
    strategy.technicalKeywords,
    1,
    "matched combined guidance"
  );
  score += combinedFallbackScore.score;
  reasons.push(...combinedFallbackScore.reasons);

  if (
    selectedRegionId &&
    strategy.regionIds?.some(
      (regionId: StableBodyRegionId) =>
        normalizeRegionId(regionId) === selectedRegionId
    )
  ) {
    score += 3;
    reasons.push(`matched selected region: ${selectedRegionId}`);
  }

  /**
   * Specificity bonus:
   * A strategy that matches multiple distinct clue groups should beat a broad
   * strategy that only matches one generic area word.
   */
  const distinctGroupsMatched = [
    issueScore.matchCount > 0 || issueIntentBoost.score > 0,
    padScore.matchCount > 0,
    technicalScore.matchCount > 0,
    selectedRegionId &&
      strategy.regionIds?.some(
        (regionId: StableBodyRegionId) =>
          normalizeRegionId(regionId) === selectedRegionId
      ),
  ].filter(Boolean).length;

  if (distinctGroupsMatched >= 2) {
    score += 6;
    reasons.push("specificity bonus: matched multiple clue groups");
  }

  if (distinctGroupsMatched >= 3) {
    score += 6;
    reasons.push("specificity bonus: strong multi-source match");
  }

  const broadPenalty = getBroadStrategyPenalty(issueText, strategy.id);
  score += broadPenalty.score;
  reasons.push(...broadPenalty.reasons);

  return {
    strategy,
    score,
    reasons,
  };
}

export function matchProtocolPlacementStrategy(
  input: ProtocolPlacementMatchInput
): ProtocolPlacementMatchResult {
  const scored: ScoredStrategy[] = PROTOCOL_PLACEMENT_STRATEGIES.map(
    (strategy: ProtocolPlacementStrategy) => scoreStrategy(strategy, input)
  ).sort((a: ScoredStrategy, b: ScoredStrategy) => b.score - a.score);

  const best = scored[0];

  if (!best || best.score <= 0) {
    return {
      strategy: null,
      strategyId: null,
      confidence: 0,
      reasons: [],
    };
  }

  const confidence = Math.min(100, Math.max(1, Math.round(best.score * 3)));

  return {
    strategy: best.strategy,
    strategyId: best.strategy.id,
    confidence,
    reasons: best.reasons,
  };
}

export function getProtocolPlacementStrategyDebugList(
  input: ProtocolPlacementMatchInput
): ProtocolPlacementMatchResult[] {
  return PROTOCOL_PLACEMENT_STRATEGIES.map(
    (strategy: ProtocolPlacementStrategy) => {
      const scored = scoreStrategy(strategy, input);
      const confidence = Math.min(100, Math.max(0, Math.round(scored.score * 3)));

      return {
        strategy: scored.score > 0 ? strategy : null,
        strategyId: scored.score > 0 ? strategy.id : null,
        confidence,
        reasons: scored.reasons,
      };
    }
  )
    .filter((result: ProtocolPlacementMatchResult) => result.strategyId)
    .sort(
      (a: ProtocolPlacementMatchResult, b: ProtocolPlacementMatchResult) =>
        b.confidence - a.confidence
    );
}
