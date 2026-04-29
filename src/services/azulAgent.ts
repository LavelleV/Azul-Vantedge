import { containsRedFlag } from '../data/safetyRules';
import type { DeviceModel } from '../data/deviceModels';

export type UserMode = 'client' | 'practitioner';

export type VibeJournalData = {
  painBefore: number;
  painAfter: number;
  focusBefore: number;
  focusAfter: number;
  stressBefore: number;
  stressAfter: number;
};

export type AzulAgentInput = {
  userQuestion: string;
  activeDeviceModel: DeviceModel;
  vibeJournalData: VibeJournalData;
  selectedBodyArea?: string;
  userMode: UserMode;
};

export type AzulAgentResponse = {
  clinicalRead: string[];
  bestStartingProtocol: string[];
  padPlacement: string[];
  whyThisPlacement: string[];
  sessionTips: string[];
  aftercare: string[];
  escalation: string[];
  recommendAssessment: boolean;
};

function summarizeVibe(data: VibeJournalData) {
  return `Pain ${data.painBefore} to ${data.painAfter}, Focus ${data.focusBefore} to ${data.focusAfter}, Stress ${data.stressBefore} to ${data.stressAfter}`;
}

function hasTerm(question: string, terms: string[]) {
  const normalized = question.toLowerCase();
  return terms.some((term) => normalized.includes(term));
}

function buildRotatorCuffGuidance(input: AzulAgentInput): AzulAgentResponse {
  const mentionsPain = hasTerm(input.userQuestion, ['pain']);
  const mentionsStiffness = hasTerm(input.userQuestion, ['stiff', 'stiffness', 'limited range']);
  const homeModel = input.activeDeviceModel === 'Home Model';

  const clinicalRead = [
    'The shoulder presentation suggests a cuff-driven irritation pattern where the tissue is holding protective tone instead of broadcasting a clean signal.',
    mentionsPain
      ? 'Pain is part of the picture, so the opening objective is interrupting the nociceptive signal before the area reinforces more guarding.'
      : 'The immediate objective is reducing signal noise across the cuff so the tissue can settle into a more coherent rhythm.',
    mentionsStiffness
      ? 'Stiffness is also present, so the session should emphasize decompressing the neural glide and restoring a smoother arc through the shoulder complex.'
      : 'The tissue should be supported without overdriving the shoulder into defensive compression.',
  ];

  const bestStartingProtocol = [
    homeModel
      ? 'Protocol #19 Inflammation Support for a conservative HoweRT entry point.'
      : 'Protocol #3 Joint Decompression with shoulder sequencing support through the HoweRT frequency model.',
    homeModel
      ? 'This is supportive wellness guidance only. The Home Model can tune the inflammatory environment but is not intended to replace Clinical-Suite structural sequencing.'
      : 'This device level can support a broader clinical-wellness sequence while staying within non-diagnostic, non-curative guidance.',
  ];

  const padPlacement = [
    'Place one pad over the Coracoid Process/anterior shoulder line and the second over the Infraspinatus fossa posteriorly.',
    'If the pattern feels more superior and the device setup allows it, bias the second pathway toward the Supraspinatus footprint without stacking both pads on the most tender point.',
  ];

  const whyThisPlacement = [
    'By bridging the Coracoid and Infraspinatus, you are creating a sub-sensory resonance field that crosses the structural gap in the tissue rather than simply stimulating the sore surface.',
    'That helps tune the system, reduce excess noise, and support the clearance of metabolic debris around the irritated cuff environment.',
  ];

  const sessionTips = [
    input.userMode === 'practitioner'
      ? 'During massage, let the device run while you work surrounding scapular support tissue and pectoral guarding rather than pressing directly into the irritated cuff insertion.'
      : 'Support the arm in a neutral, unloaded position during the session so the signal can settle without extra shearing.',
    input.userMode === 'practitioner'
      ? 'Use manual therapy to open the surrounding fascial sleeve while the device is running, then reassess range gently rather than forcing end range.'
      : 'Stay sub-sensory and avoid chasing intensity. The goal is cleaner physiological signaling, not a stronger sensation.',
    `Latest Vibe trend: ${summarizeVibe(input.vibeJournalData)}. Use that before-vs-after pattern to judge whether the tissue is actually integrating.`,
  ];

  const aftercare = [
    'Hydrate after the session to support fluid movement and the clearance of metabolic debris.',
    'Avoid heavy pressing or overhead loading immediately afterward if the shoulder is still reactive.',
    'If the tissue calms, reintroduce motion smoothly instead of testing aggressive range too early.',
  ];

  const escalation = homeModel
    ? [
        'Clinical-Suite power is preferred if the concern is structural repair, major weakness, or a more advanced sequence than supportive home guidance can provide.',
        'Request a clinical assessment with Lavelle if the range keeps dropping, pain is escalating, or progress stalls.',
      ]
    : [
        'Request a clinical assessment with Lavelle if the client is not improving, the response is inconsistent, or the presentation is more complex than a supportive wellness plan should cover.',
      ];

  return {
    clinicalRead,
    bestStartingProtocol,
    padPlacement,
    whyThisPlacement,
    sessionTips,
    aftercare,
    escalation,
    recommendAssessment: homeModel,
  };
}

function buildFallbackGuidance(input: AzulAgentInput): AzulAgentResponse {
  const redFlag = containsRedFlag(input.userQuestion);

  return {
    clinicalRead: [
      'This question needs a broader clinical-wellness read rather than a preset category.',
      input.selectedBodyArea
        ? `The selected body area is ${input.selectedBodyArea}, which helps localize the first protocol direction.`
        : 'Add a body area or anatomical location to improve the first-pass guidance.',
      redFlag
        ? 'Some language in the question suggests a potential red-flag pattern, so wellness guidance should pause and medical referral should be considered promptly.'
        : 'Azul can still provide supportive protocol guidance, but more detail will improve the precision of the resonance plan.',
    ],
    bestStartingProtocol: [
      'Begin with the most conservative protocol that calms the system without implying diagnosis or structural repair.',
      input.activeDeviceModel === 'Home Model'
        ? 'With Home Model active, stay in supportive recovery and regulation lanes unless Lavelle upgrades the sequence clinically.'
        : 'With Professional or Clinical Suite active, broader sequencing can be considered once the tissue response is clearer.',
    ],
    padPlacement: [
      input.selectedBodyArea
        ? `Bracket the ${input.selectedBodyArea} region with one pad upstream and one downstream so the signal crosses the area instead of sitting directly on a single hotspot.`
        : 'Use a broad upstream/downstream bridge around the symptomatic area rather than stacking both pads directly over peak discomfort.',
    ],
    whyThisPlacement: [
      'The placement strategy is designed to broadcast a clean signal through the local tissue field and reduce noisy, inefficient signaling patterns.',
      'That gives the system a better chance to regulate swelling, tension, and recovery tone without overdriving sensation.',
    ],
    sessionTips: [
      input.userMode === 'practitioner'
        ? 'If you are combining manual therapy with the device, keep your hands in the surrounding support tissue while the device runs and reassess tissue change between passes.'
        : 'Stay conservative, observe the tissue response, and use comfort plus recovery trend as your guide.',
      `Latest Vibe trend: ${summarizeVibe(input.vibeJournalData)}.`,
    ],
    aftercare: [
      'Hydrate, reduce unnecessary mechanical load, and observe whether the area feels calmer or clearer over the next several hours.',
      'If symptoms are worsening instead of integrating, pause self-directed progression and seek higher-level guidance.',
    ],
    escalation: redFlag
      ? ['A medical evaluation is more appropriate here before continuing wellness device experimentation.']
      : ['Request a clinical assessment with Lavelle if the issue is complex, not improving, or appears to need practitioner-level sequencing.'],
    recommendAssessment: redFlag || input.activeDeviceModel === 'Home Model',
  };
}

export async function generateAzulResponse(
  input: AzulAgentInput
): Promise<AzulAgentResponse> {
  // Real AI/backend integration point:
  // return await backendClient.generateAzulResponse(input)
  // Keep API keys off-device and call a secure backend or edge function here.

  if (hasTerm(input.userQuestion, ['rotator cuff', 'shoulder'])) {
    return buildRotatorCuffGuidance(input);
  }

  return buildFallbackGuidance(input);
}
