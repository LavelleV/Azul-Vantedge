import { interpretIssueForAzul } from './azulIssueInterpreter';
import { getAllowedStrategyIdsForContext } from './anatomicalContextRules';
import type {
  AzulAgentInput,
  AzulAgentResponse,
  VibeJournalData,
} from './azulAgent';

function safeItems(items?: string[] | null): string[] {
  return Array.isArray(items) ? items.filter(Boolean) : [];
}

function summarizeVibe(data: VibeJournalData): string {
  return `Pain ${data.painBefore} to ${data.painAfter}, Focus ${data.focusBefore} to ${data.focusAfter}, Stress ${data.stressBefore} to ${data.stressAfter}`;
}

function uniqueItems(items: string[]): string[] {
  const seen = new Set<string>();

  return items.filter((item) => {
    const key = item.trim().toLowerCase();

    if (!key || seen.has(key)) {
      return false;
    }

    seen.add(key);
    return true;
  });
}

const GENERIC_STRATEGY_SUFFIX_PATTERN =
  /\s+(pattern|support|pathway|protocol|plan|strategy)$/i;

function getReadablePatternName(strategyLabel: string): string {
  let readablePattern = strategyLabel.trim();
  let previousValue = '';

  while (readablePattern && readablePattern !== previousValue) {
    previousValue = readablePattern;
    readablePattern = readablePattern
      .replace(GENERIC_STRATEGY_SUFFIX_PATTERN, '')
      .trim();
  }

  return readablePattern || strategyLabel.trim();
}

function buildAlignedClinicalRead({
  strategyLabel,
  confidenceLevel,
  userLanguageStyle,
}: {
  strategyLabel: string;
  confidenceLevel: 'high' | 'medium';
  userLanguageStyle: 'client' | 'practitioner' | 'mixed';
}): string[] {
  const readablePattern = getReadablePatternName(strategyLabel).toLowerCase();

  const opening =
    confidenceLevel === 'high'
      ? `This sounds like a ${readablePattern} support pattern based on the issue you described.`
      : `This sounds closest to a ${readablePattern} support pattern based on the issue you described.`;

  const styleLine =
    userLanguageStyle === 'practitioner'
      ? 'Practitioner-style wording was detected, so Azul is preserving the technical pattern while keeping the user-facing instructions clear.'
      : userLanguageStyle === 'mixed'
        ? 'The wording includes both client-style and technical clues, so Azul is using the useful placement signals without over-interpreting the issue.'
        : 'Azul is using the clearest client-described pattern without over-analyzing the wording.';

  return [
    opening,
    styleLine,
    'This does not diagnose the issue. It keeps Azul focused on the specific pattern first, then uses the body area and device protocol as support context.',
  ];
}

function buildAlignedPadPlacement(
  plainLanguagePlacement: string,
  technicalPlacement: string,
  safetyNotes?: string[]
): string[] {
  return uniqueItems([
    `Plain-language placement: ${plainLanguagePlacement}`,
    `Technical area: ${technicalPlacement}`,
    ...(safetyNotes ?? []).map((note) => `Safety note: ${note}`),
  ]);
}

function buildAlignedWhyPlacement(strategyLabel: string): string[] {
  const readablePattern = getReadablePatternName(strategyLabel);

  return [
    `This setup is aligned to the ${readablePattern} pattern instead of relying only on a broad body-area category.`,
    'The goal is to keep the support field focused on the main area or pathway described by the user, without drifting into unrelated wording.',
  ];
}

function buildAlignedSessionTips(
  input: AzulAgentInput,
  existingTips: string[]
): string[] {
  const conservativeTips = [
    'Start conservatively and keep the session comfortable.',
    'Do not force range of motion, stretch aggressively, or chase the strongest sensation.',
    'After the session, reassess the same symptom words you started with so the before/after comparison stays consistent.',
    `Latest Vibe pattern: ${summarizeVibe(input.vibeJournalData)}.`,
  ];

  const practitionerTips =
    input.userMode === 'practitioner'
      ? [
          'Practitioner note: keep manual work broad and supportive while the device runs, then reassess comfort, motion, and user response.',
        ]
      : [];

  const safeExistingTips = existingTips.filter((tip) => {
    const normalized = tip.toLowerCase();

    return (
      normalized.includes('hydrate') ||
      normalized.includes('comfortable') ||
      normalized.includes('reassess') ||
      normalized.includes('vibe')
    );
  });

  return uniqueItems([
    ...conservativeTips,
    ...practitionerTips,
    ...safeExistingTips,
  ]);
}

function buildAlignedAftercare(strategyLabel: string): string[] {
  const readablePattern = getReadablePatternName(strategyLabel).toLowerCase();

  return [
    `Recheck the ${readablePattern} pattern later the same day and again the next morning.`,
    'Log the before/after response in the Vibe Journal so Azul can use the latest saved pattern as future context.',
    'If symptoms worsen, feel unusual, or do not improve over time, pause progression and request higher-level guidance.',
  ];
}

function buildAlignedEscalation(
  existingEscalation: string[],
  safetyNotes?: string[]
): string[] {
  return uniqueItems([
    ...existingEscalation,
    ...(safetyNotes ?? []),
    'Request Clinical Assessment with Lavelle if the issue is worsening, not improving, unusually intense, or paired with red-flag symptoms.',
  ]);
}

function buildUnclearOrBroadResponse({
  input,
  response,
  clarificationPrompt,
}: {
  input: AzulAgentInput;
  response: AzulAgentResponse;
  clarificationPrompt: string | null;
}): AzulAgentResponse {
  return {
    ...response,
    clinicalRead: [
      'This input is broad or unclear, so Azul should not force it into a narrow placement pattern.',
      clarificationPrompt ??
        'Add one clear detail about the exact area, movement, sensation, or pathway so Azul can guide placement more accurately.',
      'This does not diagnose the issue. It keeps the first pass conservative until the user gives a clearer placement signal.',
    ],
    whyThisPlacement: [
      'Because the wording is not specific enough, Azul is keeping the guidance broad instead of over-matching to a detailed strategy.',
      'The goal is to avoid guessing when the user has not given enough detail.',
    ],
    sessionTips: uniqueItems([
      'Start conservatively and keep the session comfortable.',
      'Add one detail before relying on a precise pad-placement visual.',
      `Latest Vibe pattern: ${summarizeVibe(input.vibeJournalData)}.`,
      ...safeItems(response.sessionTips),
    ]),
  };
}

function buildRedFlagResponse(response: AzulAgentResponse): AzulAgentResponse {
  return {
    ...response,
    clinicalRead: [
      'This input includes wording that may need medical or professional review, so Azul should not treat it like a normal self-guided support case.',
      'Use the guidance conservatively and prioritize safety before protocol selection or pad placement.',
      'This does not diagnose the issue or replace medical care.',
    ],
    whyThisPlacement: [
      'When red-flag wording is present, safety comes before narrowing the issue into a protocol pattern.',
    ],
    escalation: uniqueItems([
      ...safeItems(response.escalation),
      'Seek appropriate medical evaluation immediately if symptoms are severe, sudden, neurological, worsening, or unusual.',
      'Request Clinical Assessment with Lavelle if you are unsure whether this is appropriate for self-guided support.',
    ]),
    recommendAssessment: true,
  };
}

export function alignAzulResponseLanguageToMatchedStrategy({
  input,
  response,
}: {
  input: AzulAgentInput;
  response: AzulAgentResponse;
}): AzulAgentResponse {
  const clinicalRead = safeItems(response.clinicalRead);
  const protocolPlan = safeItems(response.bestStartingProtocol);
  const padPlacement = safeItems(response.padPlacement);
  const whyThisPlacement = safeItems(response.whyThisPlacement);
  const sessionTips = safeItems(response.sessionTips);
  const aftercare = safeItems(response.aftercare);
  const escalation = safeItems(response.escalation);

  const interpretation = interpretIssueForAzul({
    issueText: input.userQuestion,
    padPlacementText: padPlacement.join(' '),
    technicalAreaText: padPlacement.join(' '),
    selectedRegionId: input.selectedBodyArea,
    allowedStrategyIds: getAllowedStrategyIdsForContext(input.analysisContext),
    fullGuidanceText: [
      input.userQuestion,
      input.selectedBodyArea ?? '',
      ...clinicalRead,
      ...protocolPlan,
      ...padPlacement,
      ...whyThisPlacement,
      ...sessionTips,
      ...aftercare,
      ...escalation,
    ].join(' '),
  });

  if (interpretation.redFlag) {
    return buildRedFlagResponse(response);
  }

  if (!interpretation.shouldUseMatchedStrategy || !interpretation.match.strategy) {
    return buildUnclearOrBroadResponse({
      input,
      response,
      clarificationPrompt: interpretation.clarificationPrompt,
    });
  }

  const strategy = interpretation.match.strategy;

  return {
    ...response,
    clinicalRead: buildAlignedClinicalRead({
      strategyLabel: strategy.label,
      confidenceLevel:
        interpretation.confidenceLevel === 'medium' ? 'medium' : 'high',
      userLanguageStyle: interpretation.userLanguageStyle,
    }),
    bestStartingProtocol: uniqueItems([
      `Pattern focus: ${strategy.label}.`,
      ...protocolPlan,
    ]),
    padPlacement: buildAlignedPadPlacement(
      strategy.plainLanguagePlacement,
      strategy.technicalPlacement,
      strategy.safetyNotes
    ),
    whyThisPlacement: buildAlignedWhyPlacement(strategy.label),
    sessionTips: buildAlignedSessionTips(input, sessionTips),
    aftercare: buildAlignedAftercare(strategy.label),
    escalation: buildAlignedEscalation(escalation, strategy.safetyNotes),
  };
}
