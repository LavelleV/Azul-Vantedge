import { matchProtocolPlacementStrategy } from './protocolPlacementMatcher';
import type {
  AzulAgentInput,
  AzulAgentResponse,
  VibeJournalData,
} from './azulAgent';

const MIN_LANGUAGE_ALIGNMENT_CONFIDENCE = 35;

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

function getReadablePatternName(strategyLabel: string): string {
  return strategyLabel.replace(/\s+pattern$/i, '').trim();
}

function buildAlignedClinicalRead(strategyLabel: string): string[] {
  const readablePattern = getReadablePatternName(strategyLabel).toLowerCase();

  return [
    `This sounds like a ${readablePattern} support pattern based on the issue you described.`,
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

  const match = matchProtocolPlacementStrategy({
    issueText: input.userQuestion,
    padPlacementText: padPlacement.join(' '),
    technicalAreaText: padPlacement.join(' '),
    selectedRegionId: input.selectedBodyArea,
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

  if (!match.strategy || match.confidence < MIN_LANGUAGE_ALIGNMENT_CONFIDENCE) {
    return response;
  }

  const strategy = match.strategy;

  return {
    ...response,
    clinicalRead: buildAlignedClinicalRead(strategy.label),
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
