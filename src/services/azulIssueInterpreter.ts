import { containsRedFlag } from '../data/safetyRules';
import {
  buildClarificationPromptForIssue,
  getClarificationOptionsForIssue,
} from '../data/bodyAreaClarificationOptions';
import type { StableBodyRegionId } from '../data/bodyMapRegions';
import {
  matchProtocolPlacementStrategy,
  type ProtocolPlacementMatchResult,
} from './protocolPlacementMatcher';

export type AzulUserLanguageStyle = 'client' | 'practitioner' | 'mixed';

export type AzulIssueConfidenceLevel =
  | 'high'
  | 'medium'
  | 'low'
  | 'red_flag';

export type AzulIssueInterpreterInput = {
  issueText?: string | null;
  padPlacementText?: string | null;
  technicalAreaText?: string | null;
  selectedRegionId?: StableBodyRegionId | string | null;
  allowedStrategyIds?: string[] | null;
  fullGuidanceText?: string | null;
};

export type AzulIssueInterpretation = {
  normalizedIssueText: string;
  userLanguageStyle: AzulUserLanguageStyle;
  confidenceLevel: AzulIssueConfidenceLevel;
  confidenceScore: number;
  shouldUseMatchedStrategy: boolean;
  shouldAskForClarification: boolean;
  isBroadInput: boolean;
  isConfusingInput: boolean;
  redFlag: boolean;
  clarificationPrompt: string | null;
  clarificationOptions: string[];
  match: ProtocolPlacementMatchResult;
  reasons: string[];
};

const BROAD_BODY_TERMS = [
  'head',
  'face',
  'jaw',
  'neck',
  'shoulder',
  'arm',
  'elbow',
  'wrist',
  'hand',
  'chest',
  'rib',
  'abdomen',
  'stomach',
  'back',
  'low back',
  'hip',
  'glute',
  'butt',
  'leg',
  'thigh',
  'knee',
  'calf',
  'shin',
  'ankle',
  'foot',
  'toe',
];

const GENERIC_SYMPTOM_TERMS = [
  'pain',
  'hurt',
  'hurts',
  'ache',
  'aches',
  'sore',
  'tight',
  'tightness',
  'stiff',
  'stiffness',
  'discomfort',
  'issue',
  'problem',
];

const SPECIFIC_SIGNAL_TERMS = [
  'arch',
  'heel',
  'ball of foot',
  'plantar',
  'achilles',
  'inner ankle',
  'outer ankle',
  'rotator cuff',
  'supraspinatus',
  'infraspinatus',
  'teres',
  'upper trap',
  'trapezius',
  'scapula',
  'shoulder blade',
  'ac joint',
  'coracoid',
  'si joint',
  'sacroiliac',
  'sacrum',
  'low back dimple',
  'piriformis',
  'deep glute',
  'sciatic',
  'hamstring',
  'sit bone',
  'ischial',
  'pes anserine',
  'patella',
  'kneecap',
  'patellar',
  'medial knee',
  'lateral knee',
  'tmj',
  'masseter',
  'temporalis',
  'temple',
  'sinus',
  'brain fog',
  'focus',
  'clarity',
  'suboccipital',
  'upper cervical',
  'numbness',
  'tingling',
  'burning',
  'radiating',
  'travels',
];

const PRACTITIONER_TERMS = [
  'anterior',
  'posterior',
  'medial',
  'lateral',
  'proximal',
  'distal',
  'superior',
  'inferior',
  'tendon',
  'ligament',
  'fascia',
  'joint capsule',
  'paraspinal',
  'suboccipital',
  'upper cervical',
  'coracoid',
  'ac joint',
  'supraspinatus',
  'infraspinatus',
  'teres',
  'masseter',
  'temporalis',
  'pes anserine',
  'patellar',
  'tibial tuberosity',
  'sacroiliac',
  'ischial tuberosity',
  'greater trochanter',
  'metatarsal',
  'calcaneal',
];

const CLIENT_STYLE_TERMS = [
  'hurts',
  'sore',
  'stuck',
  'tight',
  'feels',
  'when i',
  'i feel',
  'my',
  'hard to',
  'can’t',
  "can't",
  'cant',
  'pain when',
];

const CONFUSING_TERMS = [
  'not sure',
  'unsure',
  'maybe',
  'kind of',
  'sort of',
  'somewhere',
  'all over',
  'moves around',
  'random',
  'weird',
];

function normalizeText(value?: string | null): string {
  return String(value ?? '')
    .toLowerCase()
    .replace(/[^\w\s/-]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

function includesPhrase(haystack: string, phrase: string): boolean {
  const normalizedPhrase = normalizeText(phrase);
  return Boolean(haystack && normalizedPhrase && haystack.includes(normalizedPhrase));
}

function hasAny(haystack: string, terms: string[]): boolean {
  return terms.some((term) => includesPhrase(haystack, term));
}

function countMatches(haystack: string, terms: string[]): number {
  return terms.reduce((total, term) => {
    return includesPhrase(haystack, term) ? total + 1 : total;
  }, 0);
}

function getWordCount(value: string): number {
  return value ? value.split(/\s+/).filter(Boolean).length : 0;
}

function classifyLanguageStyle(normalizedIssueText: string): AzulUserLanguageStyle {
  const practitionerCount = countMatches(normalizedIssueText, PRACTITIONER_TERMS);
  const clientCount = countMatches(normalizedIssueText, CLIENT_STYLE_TERMS);

  if (practitionerCount > 0 && clientCount > 0) {
    return 'mixed';
  }

  if (practitionerCount > 0) {
    return 'practitioner';
  }

  return 'client';
}

function isBroadOnlyInput(normalizedIssueText: string): boolean {
  if (!normalizedIssueText) {
    return true;
  }

  const wordCount = getWordCount(normalizedIssueText);
  const hasBroadBodyTerm = hasAny(normalizedIssueText, BROAD_BODY_TERMS);
  const hasGenericSymptom = hasAny(normalizedIssueText, GENERIC_SYMPTOM_TERMS);
  const hasSpecificSignal = hasAny(normalizedIssueText, SPECIFIC_SIGNAL_TERMS);

  if (!hasSpecificSignal && wordCount <= 4 && hasBroadBodyTerm && hasGenericSymptom) {
    return true;
  }

  if (!hasSpecificSignal && wordCount <= 3 && hasBroadBodyTerm) {
    return true;
  }

  if (!hasSpecificSignal && wordCount <= 2 && hasGenericSymptom) {
    return true;
  }

  return false;
}

function buildClarificationPrompt(normalizedIssueText: string): string {
  return buildClarificationPromptForIssue(normalizedIssueText);
}

function calculateAdjustedConfidence({
  baseConfidence,
  normalizedIssueText,
  isBroadInput,
  isConfusingInput,
  languageStyle,
}: {
  baseConfidence: number;
  normalizedIssueText: string;
  isBroadInput: boolean;
  isConfusingInput: boolean;
  languageStyle: AzulUserLanguageStyle;
}): {
  score: number;
  reasons: string[];
} {
  let score = baseConfidence;
  const reasons: string[] = [`base matcher confidence: ${baseConfidence}`];

  const specificSignalCount = countMatches(normalizedIssueText, SPECIFIC_SIGNAL_TERMS);

  if (specificSignalCount >= 1) {
    score += 8;
    reasons.push('specific issue signal found');
  }

  if (specificSignalCount >= 2) {
    score += 8;
    reasons.push('multiple specific issue signals found');
  }

  if (languageStyle === 'practitioner') {
    score += 5;
    reasons.push('practitioner-style anatomical wording found');
  }

  if (languageStyle === 'mixed') {
    score += 3;
    reasons.push('mixed client/practitioner wording found');
  }

  if (isBroadInput) {
    score = Math.min(score, 34);
    reasons.push('broad input: do not force a narrow pattern');
  }

  if (isConfusingInput) {
    score -= 12;
    reasons.push('confusing or uncertain wording: use caution');
  }

  return {
    score: Math.max(0, Math.min(100, Math.round(score))),
    reasons,
  };
}

export function interpretIssueForAzul(
  input: AzulIssueInterpreterInput
): AzulIssueInterpretation {
  const normalizedIssueText = normalizeText(input.issueText);
  const redFlag = containsRedFlag(input.issueText ?? '');
  const userLanguageStyle = classifyLanguageStyle(normalizedIssueText);
  const isBroadInput = isBroadOnlyInput(normalizedIssueText);
  const isConfusingInput = hasAny(normalizedIssueText, CONFUSING_TERMS);

  const specificIssueSignalCount = countMatches(
    normalizedIssueText,
    SPECIFIC_SIGNAL_TERMS
  );
  const hasSpecificIssueSignal = specificIssueSignalCount > 0;

  const match = matchProtocolPlacementStrategy({
    issueText: input.issueText,
    padPlacementText: hasSpecificIssueSignal ? '' : input.padPlacementText,
    technicalAreaText: hasSpecificIssueSignal ? '' : input.technicalAreaText,
    selectedRegionId: input.selectedRegionId,
    allowedStrategyIds: input.allowedStrategyIds,
    fullGuidanceText: hasSpecificIssueSignal
      ? normalizedIssueText
      : input.fullGuidanceText,
  });

  const adjusted = calculateAdjustedConfidence({
    baseConfidence: match.confidence,
    normalizedIssueText,
    isBroadInput,
    isConfusingInput,
    languageStyle: userLanguageStyle,
  });

  let confidenceLevel: AzulIssueConfidenceLevel = 'low';

  if (redFlag) {
    confidenceLevel = 'red_flag';
  } else if (adjusted.score >= 70) {
    confidenceLevel = 'high';
  } else if (adjusted.score >= 45) {
    confidenceLevel = 'medium';
  }

  const shouldUseMatchedStrategy =
    Boolean(match.strategy) &&
    !redFlag &&
    !isBroadInput &&
    (confidenceLevel === 'high' || confidenceLevel === 'medium');

  const shouldAskForClarification =
    !redFlag && (!shouldUseMatchedStrategy || isBroadInput || isConfusingInput);

  const clarificationPrompt = shouldAskForClarification
    ? buildClarificationPrompt(normalizedIssueText)
    : null;

  const clarificationOptions = shouldAskForClarification
    ? getClarificationOptionsForIssue(normalizedIssueText)
    : [];

  return {
    normalizedIssueText,
    userLanguageStyle,
    confidenceLevel,
    confidenceScore: adjusted.score,
    shouldUseMatchedStrategy,
    shouldAskForClarification,
    isBroadInput,
    isConfusingInput,
    redFlag,
    clarificationPrompt,
    clarificationOptions,
    match,
    reasons: [
      ...adjusted.reasons,
      ...(match.reasons ?? []),
      hasSpecificIssueSignal
        ? 'specific user wording used as source of truth'
        : '',
      redFlag ? 'red flag language detected' : '',
      shouldUseMatchedStrategy
        ? 'use matched strategy'
        : 'do not force matched strategy',
    ].filter(Boolean),
  };
}
