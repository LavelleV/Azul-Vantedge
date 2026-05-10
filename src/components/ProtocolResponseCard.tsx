import React, { useMemo } from "react";
import {
  ImageSourcePropType,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";

import armFrontImage from "../../assets/body-map/regions/arm-front.png";
import footAnkleFrontImage from "../../assets/body-map/regions/foot-ankle-front.png";
import footBottomPlantarImage from "../../assets/body-map/regions/foot-bottom-plantar.png";
import headFaceFrontImage from "../../assets/body-map/regions/head-face-front.png";
import headNeckBackImage from "../../assets/body-map/regions/head-neck-back.png";
import headSideJawTmjImage from "../../assets/body-map/regions/head-side-jaw-tmj.png";
import hipFrontImage from "../../assets/body-map/regions/hip-front.png";
import hipGluteBackImage from "../../assets/body-map/regions/hip-glute-back.png";
import kneeFrontImage from "../../assets/body-map/regions/knee-front.png";
import lowBackBackImage from "../../assets/body-map/regions/low-back-back.png";
import posteriorShoulderBackImage from "../../assets/body-map/regions/posterior-shoulder-back.png";
import scapulaBackImage from "../../assets/body-map/regions/scapula-back.png";
import shoulderBackImage from "../../assets/body-map/regions/shoulder-back.png";
import shoulderFrontImage from "../../assets/body-map/regions/shoulder-front.png";
import sinusFaceFrontImage from "../../assets/body-map/regions/sinus-face-front.png";

import type { StableBodyRegionId } from "../data/bodyMapRegions";
import { getPadPlacementVisual } from "../data/padPlacementVisuals";
import PadPlacementVisualPanel from "./PadPlacementVisualPanel";

import type { AzulAgentResponse } from "../services/azulAgent";
import { interpretIssueForAzul } from "../services/azulIssueInterpreter";

type StrategyVisualTarget = {
  regionId: StableBodyRegionId;
  chipLabel: string;
};

const PAD_OVERLAY_BASE_IMAGES: Record<string, ImageSourcePropType> = {
  "arm-front": armFrontImage as ImageSourcePropType,
  "foot-ankle-front": footAnkleFrontImage as ImageSourcePropType,
  "foot-bottom-plantar": footBottomPlantarImage as ImageSourcePropType,
  "head-face-front": headFaceFrontImage as ImageSourcePropType,
  "head-neck-back": headNeckBackImage as ImageSourcePropType,
  "head-side-jaw-tmj": headSideJawTmjImage as ImageSourcePropType,
  "hip-front": hipFrontImage as ImageSourcePropType,
  "hip-glute-back": hipGluteBackImage as ImageSourcePropType,
  "knee-front": kneeFrontImage as ImageSourcePropType,
  "low-back-back": lowBackBackImage as ImageSourcePropType,
  "posterior-shoulder-back": posteriorShoulderBackImage as ImageSourcePropType,
  "scapula-back": scapulaBackImage as ImageSourcePropType,
  "shoulder-back": shoulderBackImage as ImageSourcePropType,
  "shoulder-front": shoulderFrontImage as ImageSourcePropType,
  "sinus-face-front": sinusFaceFrontImage as ImageSourcePropType,
};

const STRATEGY_TO_EXISTING_VISUAL: Partial<
  Record<string, StrategyVisualTarget>
> = {
  brain_fog_head_neck: {
    regionId: "head",
    chipLabel: "Forehead",
  },
  stress_nervous_system_head_neck: {
    regionId: "head",
    chipLabel: "Forehead",
  },
  headache_head_neck: {
    regionId: "head",
    chipLabel: "Temple",
  },
  sinus_head_face: {
    regionId: "head",
    chipLabel: "Sinus",
  },
  jaw_tmj_face: {
    regionId: "head",
    chipLabel: "Jaw / TMJ",
  },

  upper_trap_tightness_pain: {
    regionId: "shoulder",
    chipLabel: "Upper Trap",
  },
  neck_to_shoulder_tension: {
    regionId: "shoulder",
    chipLabel: "Upper Trap",
  },
  shoulder_blade_tension: {
    regionId: "shoulder",
    chipLabel: "Shoulder Blade / Scapula",
  },
  rotator_cuff_irritation: {
    regionId: "shoulder",
    chipLabel: "Rotator Cuff",
  },

  si_joint_local_or_hip_referral: {
    regionId: "low_back",
    chipLabel: "SI Joint",
  },
  low_back_general_ache: {
    regionId: "low_back",
    chipLabel: "Lumbar Center",
  },
  hip_glute_deep_tension: {
    regionId: "hip_glute",
    chipLabel: "Piriformis / Deep Glute",
  },
  knee_front_patella_tendon: {
    regionId: "knee",
    chipLabel: "Kneecap / Patella",
  },
  foot_arch_heel_forefoot: {
    regionId: "foot_ankle",
    chipLabel: "Arch",
  },
  arm_elbow_wrist_overuse: {
    regionId: "arm",
    chipLabel: "Forearm",
  },
};

function resolveOverlayBaseImage(imageKey: string): ImageSourcePropType | null {
  return PAD_OVERLAY_BASE_IMAGES[imageKey] ?? null;
}

function safeItems(items?: string[] | null): string[] {
  return Array.isArray(items) ? items.filter(Boolean) : [];
}

function getStrategyVisual(strategyId?: string | null) {
  if (!strategyId) {
    return null;
  }

  const target = STRATEGY_TO_EXISTING_VISUAL[strategyId];

  if (!target) {
    return null;
  }

  return getPadPlacementVisual(target.regionId, target.chipLabel);
}

function Section({ title, items }: { title: string; items: string[] }) {
  if (!items.length) {
    return null;
  }

  return (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>{title}</Text>
      {items.map((item) => (
        <Text key={`${title}-${item}`} style={styles.bullet}>
          - {item}
        </Text>
      ))}
    </View>
  );
}

function MatchedPlacementVisual({
  response,
  issueText,
  onClarificationOptionSelect,
}: {
  response: AzulAgentResponse;
  issueText?: string | null;
  onClarificationOptionSelect?: (option: string) => void;
}) {
  const interpretation = useMemo(() => {
    const clinicalRead = safeItems(response.clinicalRead);
    const protocolPlan = safeItems(response.bestStartingProtocol);
    const padPlacement = safeItems(response.padPlacement);
    const whyThisPlacement = safeItems(response.whyThisPlacement);
    const sessionTips = safeItems(response.sessionTips);
    const aftercare = safeItems(response.aftercare);
    const escalation = safeItems(response.escalation);

    return interpretIssueForAzul({
      issueText,
      padPlacementText: padPlacement.join(" "),
      technicalAreaText: padPlacement.join(" "),
      fullGuidanceText: [
        issueText ?? "",
        ...clinicalRead,
        ...protocolPlan,
        ...padPlacement,
        ...whyThisPlacement,
        ...sessionTips,
        ...aftercare,
        ...escalation,
      ].join(" "),
    });
  }, [response, issueText]);

  const match = interpretation.match;

  const visual = useMemo(
    () => getStrategyVisual(match.strategyId),
    [match.strategyId]
  );

  if (interpretation.redFlag) {
    return (
      <View style={styles.matchedCard}>
        <Text style={styles.matchedEyebrow}>Placement Safety Check</Text>
        <Text style={styles.matchedTitle}>Professional review recommended</Text>
        <Text style={styles.matchedPlain}>
          Azul detected wording that should not be treated like a normal self-guided placement case.
        </Text>
        <Text style={styles.matchedTechnical}>
          Use conservative support only and prioritize medical or professional guidance when symptoms are severe, sudden, neurological, worsening, or unusual.
        </Text>
      </View>
    );
  }

  if (!match.strategy) {
    return null;
  }

  if (!interpretation.shouldUseMatchedStrategy) {
    return null;
  }

  return (
    <View style={styles.matchedCard}>
      <Text style={styles.matchedEyebrow}>AI-Matched Pad Strategy</Text>
      <Text style={styles.matchedTitle}>{match.strategy.label}</Text>

      <Text style={styles.matchedMeta}>
        Match confidence: {interpretation.confidenceScore}% • {interpretation.confidenceLevel}
      </Text>

      <Text style={styles.matchedPlain}>
        {match.strategy.plainLanguagePlacement}
      </Text>

      <Text style={styles.matchedTechnical}>
        Technical placement: {match.strategy.technicalPlacement}
      </Text>

      {visual ? (
        <PadPlacementVisualPanel
          visual={visual}
          resolveOverlayImage={resolveOverlayBaseImage}
        />
      ) : (
        <View style={styles.visualFallback}>
          <Text style={styles.visualFallbackTitle}>
            Visual strategy matched, image guide not added yet
          </Text>
          <Text style={styles.visualFallbackText}>
            Azul matched this protocol to a placement strategy, but this exact
            visual guide still needs approved anchors or image assets.
          </Text>
        </View>
      )}

      {match.strategy.safetyNotes?.length ? (
        <View style={styles.safetyNoteWrap}>
          {match.strategy.safetyNotes.map((note) => (
            <Text key={note} style={styles.safetyNote}>
              - {note}
            </Text>
          ))}
        </View>
      ) : null}
    </View>
  );
}

function getReadableClinicalPatternName(strategyLabel: string): string {
  return strategyLabel
    .replace(/\s+(pattern|support|pathway|protocol|plan|strategy)$/i, "")
    .trim();
}

function buildDisplayClinicalReadItems({
  response,
  issueText,
}: {
  response: AzulAgentResponse;
  issueText?: string | null;
}): string[] {
  const defaultClinicalRead = safeItems(response.clinicalRead);
  const trimmedIssue = String(issueText ?? "").trim();

  if (!trimmedIssue) {
    return defaultClinicalRead;
  }

  const clinicalRead = safeItems(response.clinicalRead);
  const protocolPlan = safeItems(response.bestStartingProtocol);
  const padPlacement = safeItems(response.padPlacement);
  const whyThisPlacement = safeItems(response.whyThisPlacement);
  const sessionTips = safeItems(response.sessionTips);
  const aftercare = safeItems(response.aftercare);
  const escalation = safeItems(response.escalation);

  const interpretation = interpretIssueForAzul({
    issueText,
    padPlacementText: padPlacement.join(" "),
    technicalAreaText: padPlacement.join(" "),
    fullGuidanceText: [
      issueText ?? "",
      ...clinicalRead,
      ...protocolPlan,
      ...padPlacement,
      ...whyThisPlacement,
      ...sessionTips,
      ...aftercare,
      ...escalation,
    ].join(" "),
  });

  if (interpretation.redFlag) {
    return [
      "This input includes wording that may need medical or professional review.",
      "Azul should not treat this like a normal self-guided placement case.",
      "Prioritize safety and request appropriate professional guidance before relying on protocol placement.",
    ];
  }

  if (!interpretation.shouldUseMatchedStrategy) {
    return [
      "This input is too broad for precise pad placement.",
      interpretation.clarificationPrompt ??
        "Add one clearer detail such as the exact spot, movement trigger, sensation, or pathway.",
      "Choose one option below or add one clearer detail so Azul can build a more accurate guidance card.",
    ];
  }

  const strategy = interpretation.match.strategy;

  if (!strategy) {
    return defaultClinicalRead;
  }

  const readablePattern = getReadableClinicalPatternName(
    strategy.label
  ).toLowerCase();

  const styleLine =
    interpretation.userLanguageStyle === "practitioner"
      ? "Practitioner-style wording was detected, so Azul is preserving the technical pattern while keeping the user-facing instructions clear."
      : interpretation.userLanguageStyle === "mixed"
        ? "The wording includes both client-style and technical clues, so Azul is using the useful placement signals without over-interpreting the issue."
        : "Azul is using the clearest client-described pattern without over-analyzing the wording.";

  return [
    `This sounds like a ${readablePattern} support pattern based on the issue you described.`,
    styleLine,
    "This does not diagnose the issue. It keeps Azul focused on the specific pattern first, then uses the body area and device protocol as support context.",
  ];
}

function ClinicalReadClarificationCard({
  response,
  issueText,
  onClarificationOptionSelect,
}: {
  response: AzulAgentResponse;
  issueText?: string | null;
  onClarificationOptionSelect?: (option: string) => void;
}) {
  const interpretation = useMemo(() => {
    const clinicalRead = safeItems(response.clinicalRead);
    const protocolPlan = safeItems(response.bestStartingProtocol);
    const padPlacement = safeItems(response.padPlacement);
    const whyThisPlacement = safeItems(response.whyThisPlacement);
    const sessionTips = safeItems(response.sessionTips);
    const aftercare = safeItems(response.aftercare);
    const escalation = safeItems(response.escalation);

    return interpretIssueForAzul({
      issueText,
      padPlacementText: padPlacement.join(" "),
      technicalAreaText: padPlacement.join(" "),
      fullGuidanceText: [
        issueText ?? "",
        ...clinicalRead,
        ...protocolPlan,
        ...padPlacement,
        ...whyThisPlacement,
        ...sessionTips,
        ...aftercare,
        ...escalation,
      ].join(" "),
    });
  }, [response, issueText]);

  if (
    !String(issueText ?? "").trim() ||
    interpretation.redFlag ||
    interpretation.shouldUseMatchedStrategy
  ) {
    return null;
  }

  return (
    <View style={styles.clinicalClarificationCard}>
      <Text style={styles.matchedEyebrow}>Clarification Needed</Text>
      <Text style={styles.matchedTitle}>Needs one clearer detail</Text>
      <Text style={styles.matchedMeta}>
        Confidence: {interpretation.confidenceScore}% • {interpretation.confidenceLevel}
      </Text>
      <Text style={styles.matchedPlain}>
        Azul found the broad area, but needs one closer detail before showing precise placement.
      </Text>
      <Text style={styles.matchedTechnical}>
        {interpretation.clarificationPrompt ??
          "Choose one option below or add one clearer detail so Azul can build a more accurate guidance card."}
      </Text>

      {interpretation.clarificationOptions.length ? (
        <View style={styles.clarificationOptionWrap}>
          {interpretation.clarificationOptions.map((option) => (
            <Pressable
              key={option}
              onPress={() => onClarificationOptionSelect?.(option)}
              style={styles.clarificationOptionPill}
            >
              <Text style={styles.clarificationOptionText}>{option}</Text>
            </Pressable>
          ))}
        </View>
      ) : null}
    </View>
  );
}

export function ProtocolResponseCard({
  response,
  isLoading,
  issueText,
  onRequestAssessment,
  onClarificationOptionSelect,
}: {
  response: AzulAgentResponse;
  isLoading: boolean;
  issueText?: string | null;
  onRequestAssessment: () => void;
  onClarificationOptionSelect?: (option: string) => void;
}) {
  const displayClinicalReadItems = useMemo(
    () => buildDisplayClinicalReadItems({ response, issueText }),
    [response, issueText]
  );

  return (
    <View style={styles.card}>
      <Text style={styles.eyebrow}>Protocol Guidance Card</Text>
      <Text style={styles.agentName}>Azul</Text>

      {isLoading ? (
        <Text style={styles.loading}>
          Analyzing your question, device profile, and wellness context...
        </Text>
      ) : (
        <>
          <Section
            title="Clinical Read"
            items={displayClinicalReadItems}
          />

          <ClinicalReadClarificationCard
            response={response}
            issueText={issueText}
            onClarificationOptionSelect={onClarificationOptionSelect}
          />

          <Section
            title="Protocol Plan"
            items={safeItems(response.bestStartingProtocol)}
          />

          <Section
            title="Pad Placement"
            items={safeItems(response.padPlacement)}
          />

          <MatchedPlacementVisual
            response={response}
            issueText={issueText}
            onClarificationOptionSelect={onClarificationOptionSelect}
          />

          <Section
            title="Why This Placement"
            items={safeItems(response.whyThisPlacement)}
          />

          <Section
            title="Session Tips"
            items={safeItems(response.sessionTips)}
          />

          <Section title="Aftercare" items={safeItems(response.aftercare)} />

          <Section
            title="When to Contact Lavelle / Medical Referral"
            items={safeItems(response.escalation)}
          />

          {response.recommendAssessment ? (
            <Pressable
              style={styles.assessmentButton}
              onPress={onRequestAssessment}
            >
              <Text style={styles.assessmentButtonLabel}>
                Request Clinical Assessment with Lavelle
              </Text>
            </Pressable>
          ) : null}
        </>
      )}
    </View>
  );
}

const navy = "#002366";
const gold = "#D4AF37";
const softText = "#474747";
const lightBorder = "rgba(0, 35, 102, 0.08)";

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 24,
    padding: 18,
    borderWidth: 1,
    borderColor: lightBorder,
    gap: 14,
  },
  eyebrow: {
    color: gold,
    textTransform: "uppercase",
    letterSpacing: 2.2,
    fontSize: 12,
    fontWeight: "700",
  },
  agentName: {
    color: navy,
    fontSize: 22,
    fontWeight: "800",
  },
  loading: {
    color: navy,
    fontSize: 15,
    lineHeight: 24,
    fontStyle: "italic",
    fontWeight: "600",
  },
  section: {
    gap: 6,
  },
  sectionTitle: {
    color: navy,
    fontSize: 16,
    fontWeight: "800",
  },
  bullet: {
    color: softText,
    fontSize: 15,
    lineHeight: 23,
  },
  clinicalClarificationCard: {
    backgroundColor: "#F8FAFC",
    borderColor: "#DBE4EF",
    borderWidth: 1,
    borderRadius: 18,
    padding: 14,
    gap: 8,
  },
  matchedCard: {
    backgroundColor: "#F8FAFC",
    borderColor: "#DBE4EF",
    borderWidth: 1,
    borderRadius: 18,
    padding: 14,
    gap: 8,
  },
  matchedEyebrow: {
    color: gold,
    fontSize: 11,
    fontWeight: "900",
    letterSpacing: 2,
    textTransform: "uppercase",
  },
  matchedTitle: {
    color: navy,
    fontSize: 17,
    fontWeight: "900",
  },
  matchedMeta: {
    color: "#64748B",
    fontSize: 12,
    fontWeight: "800",
    textTransform: "uppercase",
  },
  matchedPlain: {
    color: navy,
    fontSize: 14,
    lineHeight: 21,
    fontWeight: "800",
  },
  matchedTechnical: {
    color: softText,
    fontSize: 13,
    lineHeight: 20,
  },
  clarificationOptionWrap: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
    marginTop: 8,
  },
  clarificationOptionPill: {
    backgroundColor: "#FFFFFF",
    borderColor: "#DBE4EF",
    borderWidth: 1,
    borderRadius: 999,
    paddingHorizontal: 10,
    paddingVertical: 6,
  },
  clarificationOptionText: {
    color: navy,
    fontSize: 12,
    fontWeight: "800",
  },
  visualFallback: {
    backgroundColor: "#FFFFFF",
    borderColor: "#DBE4EF",
    borderWidth: 1,
    borderRadius: 16,
    padding: 14,
  },
  visualFallbackTitle: {
    color: navy,
    fontSize: 14,
    fontWeight: "900",
    marginBottom: 4,
  },
  visualFallbackText: {
    color: softText,
    fontSize: 13,
    lineHeight: 19,
  },
  safetyNoteWrap: {
    backgroundColor: "#FFF7ED",
    borderColor: "#FED7AA",
    borderWidth: 1,
    borderRadius: 14,
    padding: 10,
    gap: 4,
  },
  safetyNote: {
    color: "#7C2D12",
    fontSize: 12,
    lineHeight: 18,
    fontWeight: "700",
  },
  assessmentButton: {
    minHeight: 52,
    borderRadius: 18,
    backgroundColor: navy,
    borderWidth: 1,
    borderColor: gold,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 18,
  },
  assessmentButtonLabel: {
    color: "#FFFFFF",
    fontSize: 15,
    fontWeight: "800",
    textAlign: "center",
  },
});

export default ProtocolResponseCard;
