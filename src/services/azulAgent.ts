import { containsRedFlag } from '../data/safetyRules';
import type { DeviceModel } from '../data/deviceModels';
import { buildNumberedProtocolPlan } from './protocolPlanRules';
import { buildPlainLanguagePadPlacement } from './padPlacementRules';
import { alignAzulResponseLanguageToMatchedStrategy } from './azulResponseLanguageRules';
import {
  getSelectedAreaForGeneration,
  type ActiveAnalysisContext,
} from './anatomicalContextRules';
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
  analysisContext?: ActiveAnalysisContext;
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
  analysisContext?: ActiveAnalysisContext;
};

type GuidanceContext = {
  normalizedQuestion: string;
  homeModel: boolean;
  professionalOrSuite: boolean;
  selectedBodyArea?: string;
  vibeSummary: string;
  practitioner: boolean;
  redFlag: boolean;
  notImproving: boolean;
};

function normalizeText(value: string) {
  return value.toLowerCase().replace(/[^a-z0-9\s]/g, ' ').replace(/\s+/g, ' ').trim();
}

function hasTerm(question: string, terms: string[]) {
  return terms.some((term) => question.includes(term));
}

function summarizeVibe(data: VibeJournalData) {
  return `Pain ${data.painBefore} to ${data.painAfter}, Focus ${data.focusBefore} to ${data.focusAfter}, Stress ${data.stressBefore} to ${data.stressAfter}`;
}

function buildContext(input: AzulAgentInput): GuidanceContext {
  const normalizedQuestion = normalizeText(input.userQuestion);
  return {
    normalizedQuestion,
    homeModel: input.activeDeviceModel === 'Home Model',
    professionalOrSuite: input.activeDeviceModel !== 'Home Model',
    selectedBodyArea: input.selectedBodyArea,
    vibeSummary: summarizeVibe(input.vibeJournalData),
    practitioner: input.userMode === 'practitioner',
    redFlag: containsRedFlag(input.userQuestion),
    notImproving: hasTerm(normalizedQuestion, ['not improving', 'worse', 'getting worse', 'no better', 'not getting better']),
  };
}

function inferProtocolArea(input: AzulAgentInput, context: GuidanceContext): string {
  if (input.selectedBodyArea) {
    return input.selectedBodyArea;
  }

  const q = context.normalizedQuestion;

  if (hasTerm(q, ['inner knee', 'inside knee', 'medial knee', 'below inner knee', 'back inner knee', 'knee', 'kneecap', 'patella', 'below knee', 'under kneecap', 'stairs', 'stiff knee'])) {
    return 'Knee';
  }

  if (hasTerm(q, ['rotator cuff', 'shoulder', 'limited range', 'rom', 'abduction', 'impingement'])) {
    return 'Shoulder';
  }

  if (hasTerm(q, ['si joint', 'sacroiliac', 'low back', 'facet', 'hip dimple'])) {
    return 'Low Back / SI';
  }

  if (hasTerm(q, ['hamstring', 'butt cheek crease', 'sit bone', 'ischial tuberosity', 'quad', 'thigh', 'adductor', 'it band'])) {
    return 'Thigh';
  }

  if (hasTerm(q, ['hip', 'glute', 'butt', 'buttock', 'cheek', 'butt cheek', 'piriformis', 'deep hip', 'side hip', 'hip stiffness', 'hip pain', 'glute pain', 'sitting pain'])) {
    return 'Hip / Glute';
  }

  if (hasTerm(q, ['calf', 'shin', 'lower leg', 'achilles'])) {
    return 'Lower Leg';
  }

  if (hasTerm(q, ['ankle', 'inner ankle', 'foot', 'heel', 'arch', 'toe', 'toes'])) {
    return 'Foot / Ankle';
  }

  if (hasTerm(q, ['wrist', 'hand', 'finger', 'fingers', 'forearm', 'elbow'])) {
    return 'Wrist / Hand';
  }

  if (hasTerm(q, ['neck', 'cervical', 'base of skull'])) {
    return 'Neck';
  }

  if (hasTerm(q, ['chest', 'rib', 'sternum', 'intercostal', 'pectoral'])) {
    return 'Chest / Ribs';
  }

  if (hasTerm(q, ['abdomen', 'gut', 'stomach', 'bloat'])) {
    return 'Abdomen / Gut';
  }

  if (hasTerm(q, ['focus', 'brain fog', 'motivation', 'memory', 'dementia', 'alzheimer', 'frontotemporal', 'brain health', 'head', 'face', 'jaw', 'tmj', 'temple'])) {
    return 'Head / Face / Jaw';
  }

  if (hasTerm(q, ['anxiety', 'anxious', 'panic', 'stress', 'overwhelmed', 'racing thoughts'])) {
    return 'Nervous System / Stress';
  }

  if (hasTerm(q, ['full body', 'systemic', 'whole body', 'fatigue', 'heaviness'])) {
    return 'Full Body / Systemic';
  }

  return '';
}

function finalizeResponse(
  input: AzulAgentInput,
  context: GuidanceContext,
  response: AzulAgentResponse
): AzulAgentResponse {
  const selectedAreaForRules =
    getSelectedAreaForGeneration(input.analysisContext) || input.selectedBodyArea || inferProtocolArea(input, context);

  const responseWithProtocolPlan: AzulAgentResponse = {
    ...response,
    bestStartingProtocol: buildNumberedProtocolPlan({
      userQuestion: input.userQuestion,
      selectedBodyArea: selectedAreaForRules,
      activeDeviceModel: input.activeDeviceModel,
    }),
    padPlacement: buildPlainLanguagePadPlacement({
      userQuestion: input.userQuestion,
      selectedBodyArea: selectedAreaForRules,
    }),
  };

  return alignAzulResponseLanguageToMatchedStrategy({
    input: {
      ...input,
      selectedBodyArea: selectedAreaForRules,
    },
    response: responseWithProtocolPlan,
  });
}


function withMassageIntegration(response: AzulAgentResponse, items: string[]) {
  return {
    ...response,
    sessionTips: [...response.sessionTips, ...items],
  };
}

function buildBaseResponse(): AzulAgentResponse {
  return {
    clinicalRead: [],
    bestStartingProtocol: [],
    padPlacement: [],
    whyThisPlacement: [],
    sessionTips: [],
    aftercare: [],
    escalation: [],
    recommendAssessment: false,
  };
}

/**
 * Existing local/mock guidance builders remain mostly intact.
 * finalizeResponse() replaces their Protocol Plan with the updated device-specific protocol numbers.
 */

function buildKneeGuidance(input: AzulAgentInput, context: GuidanceContext): AzulAgentResponse {
  const tendonSpecific = hasTerm(context.normalizedQuestion, ['tendon', 'stairs', 'below kneecap', 'under kneecap', 'patellar tendon']);
  const posteriorMention = hasTerm(context.normalizedQuestion, ['behind knee', 'posterior knee', 'back of knee']);

  const response = buildBaseResponse();
  response.clinicalRead = [
    'This sounds like irritation around the front of the knee below the kneecap, often in the patellar tendon or the cushioning tissue just under the kneecap.',
    tendonSpecific
      ? 'This often points toward a tendon-heavy irritation pattern, especially if stairs or loading make it more noticeable.'
      : 'This does not diagnose the issue, but it gives us a smart starting point for swelling, pressure, and stiffness around the kneecap.',
  ];
  response.padPlacement = [
    'Pad 1: Place one pad just above the kneecap on the lower thigh. This is the Quadriceps Tendon area.',
    posteriorMention
      ? 'Pad 2: Place the second pad gently behind the knee crease. This is the Popliteal Fossa. Use this front-to-back setup if the knee feels swollen both in front and behind.'
      : 'Pad 2: Place the second pad about two inches below the kneecap, near the small bump on the shin. This is the Patellar Tendon / Tibial Tuberosity area.',
    posteriorMention
      ? 'Optional: If the kneecap is the main sore spot, you can move the front pad slightly lower so the field still passes through the irritated front-of-knee tissue.'
      : 'Optional: If there is pain behind the knee too, keep one pad in front near the kneecap and place the second gently behind the knee crease. This is the Popliteal Fossa.',
  ];
  response.whyThisPlacement = [
    'This brackets the tissue creating the pressure and stiffness below the kneecap.',
    'Instead of only treating one sore point, it lets the current pass through the irritated area and may support cleaner signaling and better fluid movement.',
  ];
  response.sessionTips = [
    'Hydrate before and after the session.',
    'If the knee feels puffy, elevate the leg during or after treatment.',
    'Use gentle range of motion afterward rather than forceful stretching or aggressive pressure.',
    'If the area is reactive, avoid icing for a few hours unless separately advised, so the tissue can continue integrating the session.',
    `Latest Vibe pattern: ${context.vibeSummary}.`,
  ];
  response.aftercare = [
    'Reassess swelling, stair tolerance, and bending comfort later the same day and again the next morning.',
    'If symptoms worsen instead of settling, pause progression and seek higher-level guidance.',
  ];
  response.escalation = [
    'Request Clinical Assessment with Lavelle if swelling is significant, if you are not improving, or if the knee feels unstable or increasingly difficult to load.',
  ];
  response.recommendAssessment = context.notImproving || context.homeModel;

  if (context.practitioner) {
    return withMassageIntegration(response, [
      'Massage Integration: Run the device while you work the surrounding quad, retinaculum, or calf support tissue rather than pressing aggressively into the irritated front-of-knee pocket.',
      'Massage Integration: If tendon irritation is prominent, keep manual therapy broad and supportive, then reassess pain-free flexion instead of forcing range.',
    ]);
  }

  return response;
}

function buildInnerKneeGuidance(input: AzulAgentInput, context: GuidanceContext): AzulAgentResponse {
  const tendonSpecific = hasTerm(context.normalizedQuestion, ['pulling', 'tendon']);
  const response = buildBaseResponse();
  response.clinicalRead = [
    'This sounds like irritation through the inside of the knee, often in the pes anserine region or the soft tissue wrapping below the joint line.',
    tendonSpecific
      ? 'The pulling description suggests the tissue may be load-sensitive, so the session should stay calm and precise rather than forceful.'
      : 'This does not diagnose the issue, but it gives us a smart place to start when the inside of the knee feels tender or swollen.',
  ];
  response.padPlacement = [
    'Pad 1: Place one pad on the inside/front of the knee, about two inches below the kneecap. This is the Pes Anserine area.',
    'Pad 2: Place the second pad on the inside/back of the knee near the soft crease. This follows the medial hamstring/popliteal area.',
  ];
  response.whyThisPlacement = [
    'This lets the signal cross the inside knee tissue corridor instead of sitting only on the sore edge.',
    'That may support the tissue creating the pulling, fullness, or stiffness in a more balanced way.',
  ];
  response.sessionTips = [
    'Hydrate after session and avoid aggressive compression directly over the tender inside-knee pocket.',
    'Use easy walking or gentle bending to reassess comfort rather than deep stretching.',
    `Latest Vibe pattern: ${context.vibeSummary}.`,
  ];
  response.aftercare = ['Recheck tenderness, swelling, and bending comfort later in the day.'];
  response.escalation = ['Request Clinical Assessment with Lavelle if the inner knee remains swollen, increasingly unstable, or not improving.'];
  response.recommendAssessment = context.notImproving || context.homeModel;

  if (context.practitioner) {
    return withMassageIntegration(response, [
      'Massage Integration: Let the device run while you soften adductor and calf support tissue, then reassess medial glide without deep direct pressure into acute tenderness.',
    ]);
  }

  return response;
}

function buildRotatorCuffGuidance(input: AzulAgentInput, context: GuidanceContext): AzulAgentResponse {
  const mentionsPain = hasTerm(context.normalizedQuestion, ['pain', 'impingement']);
  const mentionsStiffness = hasTerm(context.normalizedQuestion, ['stiffness', 'stiff', 'limited range', 'rom', 'abduction']);
  const severeLoss = hasTerm(context.normalizedQuestion, ['deep tear', 'tear', 'can t lift', 'cannot lift', 'severe loss']);

  const response = buildBaseResponse();
  response.clinicalRead = [
    'This sounds like a rotator cuff interface issue with both irritation and restricted glide.',
    mentionsPain
      ? 'The pain tells us the shoulder is irritated, so the first goal is to calm the pain signal without forcing the area.'
      : 'The first goal is to calm the irritated tissue and give the shoulder a cleaner starting point.',
    mentionsStiffness
      ? 'The stiffness tells us the tissue may be guarding and not sliding smoothly. The goal is not to force range today. The goal is to calm the signal first, then support cleaner movement.'
      : 'This does not diagnose the issue, but it gives us a smart starting point for shoulder support.',
  ];
  response.padPlacement = [
    'Pad 1: Place one pad on the front of the shoulder, just below the collarbone where you feel the small bony point. This is the Coracoid Process.',
    'Pad 2: Place the second pad on the back of the shoulder blade, on the soft muscle below the shoulder ridge. This is the Infraspinatus area.',
    'Optional: If the discomfort is more on top of the shoulder, move the back pad slightly higher toward the upper shoulder blade, but do not stack both pads directly on the sorest spot.',
  ];
  response.whyThisPlacement = [
    'This creates a front-to-back bridge through the shoulder.',
    'Instead of only treating the surface, the setup helps the current pass through the irritated rotator cuff area and nearby joint capsule.',
  ];
  response.sessionTips = [
    'Keep the intensity comfortable and sub-sensory.',
    'Hydrate after the session.',
    'Do not force overhead movement.',
    'After the session, use small pain-free shoulder circles or pendulum movement.',
    'Avoid aggressive deep pressure directly over the sore area.',
    `Latest Vibe pattern: ${context.vibeSummary}.`,
  ];
  response.aftercare = [
    'Recheck pain, reach, and ease of movement later the same day and again the next morning.',
    'If range keeps dropping, pain increases, or weakness is present, move toward a clinical assessment.',
  ];
  response.escalation = severeLoss
    ? ['Request Clinical Assessment with Lavelle if this feels like a deeper tear, if weakness is obvious, or if function has dropped sharply. Medical evaluation may also be appropriate.']
    : ['Request Clinical Assessment with Lavelle if pain is increasing, range is dropping, weakness is present, or this feels deeper than supportive home guidance.'];
  response.recommendAssessment = severeLoss || context.notImproving || context.homeModel;

  if (context.practitioner) {
    return withMassageIntegration(response, [
      'Massage Integration: Run the shoulder-support protocol while performing gentle scapular mobilization and broad pectoral or posterior cuff soft-tissue support.',
      'Massage Integration: Transition toward fascia support while guiding pain-free passive range of motion. Avoid aggressive deep work directly over acutely inflamed tissue.',
    ]);
  }

  return response;
}

function buildSIGuidance(input: AzulAgentInput, context: GuidanceContext): AzulAgentResponse {
  const instability = hasTerm(context.normalizedQuestion, ['unstable', 'sprain', 'ligament']);
  const response = buildBaseResponse();
  response.clinicalRead = [
    'This sounds like irritation around the low-back dimple area, often where the SI joint and its support tissue live.',
    'This does not diagnose the issue, but it gives us a smart starting point for local joint and support-tissue irritation.',
  ];
  response.padPlacement = [
    'Pad 1: Place one pad directly on the sore low-back dimple area, just to the side of the spine. This is the SI Joint / Sacroiliac area.',
    'Pad 2: Place the second pad on the front of the same-side hip, near the front hip bone. This is the ASIS / anterior hip area.',
  ];
  response.whyThisPlacement = [
    'This creates a front-to-back bridge across the pelvic ring instead of staying only on the sore point.',
    'That may support the tissue creating the point pain and reduce noisy signaling around the irritated stabilizers.',
  ];
  response.sessionTips = [
    'Hydrate well, avoid aggressive twisting immediately after the session, and use gentle walking to reassess comfort.',
    instability
      ? 'Because instability language is present, avoid aggressive stretching or deep direct pressure over the SI point.'
      : 'If the area is sharply reactive, keep manual pressure broad and supportive.',
    `Latest Vibe pattern: ${context.vibeSummary}.`,
  ];
  response.aftercare = ['Reassess sit-to-stand comfort, stride, and point tenderness later the same day.'];
  response.escalation = [
    'Request Clinical Assessment with Lavelle if the pain is not improving, is rapidly worsening, or is paired with progressive weakness, numbness, or bowel/bladder changes.',
  ];
  response.recommendAssessment = context.redFlag || context.notImproving || context.homeModel;

  if (context.practitioner) {
    return withMassageIntegration(response, [
      'Massage Integration: Let the device run while you work gluteal support tissue, QL tone, and surrounding fascial load rather than drilling directly into the sharp SI point.',
    ]);
  }

  return response;
}

function buildHamstringGuidance(input: AzulAgentInput, context: GuidanceContext): AzulAgentResponse {
  const response = buildBaseResponse();
  response.clinicalRead = [
    'This sounds like hamstring irritation near the sit bone or along the upper back of the thigh.',
    'This often points toward overload in the upper hamstring tendon, fascia, or the tissue line running down the back/inside of the thigh.',
  ];
  response.padPlacement = [
    'Pad 1: Place one pad at the lower butt-cheek crease where you feel the sit bone. This is the Ischial Tuberosity.',
    'Pad 2: Place the second pad 4 to 6 inches down the back/inside of the thigh. This is the medial hamstring line.',
    'Optional: If the whole hamstring feels involved, move the second pad closer to the back of the inner knee.',
  ];
  response.whyThisPlacement = [
    'This lets the current move along the tissue line carrying the pull instead of only sitting on the sore attachment point.',
    'That is often more useful when the discomfort travels down the hamstring rather than staying in one tiny spot.',
  ];
  response.sessionTips = [
    'Hydrate, avoid aggressive stretching right away, and reassess with easy walking or light range instead of forcing length.',
    `Latest Vibe pattern: ${context.vibeSummary}.`,
  ];
  response.aftercare = ['Recheck stride length, sitting tolerance, and pulling sensation later in the day.'];
  response.escalation = ['Request Clinical Assessment with Lavelle if the hamstring is bruising, not improving, or behaving like a deeper tear pattern.'];
  response.recommendAssessment = context.notImproving || context.homeModel;

  if (context.practitioner) {
    return withMassageIntegration(response, [
      'Massage Integration: Work gluteal and posterior-chain support tissue while the device runs, then reassess pain-free hip hinge or knee extension without forcing the strain line.',
    ]);
  }

  return response;
}

function buildHipGluteGuidance(input: AzulAgentInput, context: GuidanceContext): AzulAgentResponse {
  const nerveLike = hasTerm(context.normalizedQuestion, ['burning', 'tingling', 'sharp', 'travels down the leg', 'down the leg']);
  const siLike = hasTerm(context.normalizedQuestion, ['si', 'sacroiliac', 'low back dimple', 'hip dimple']);
  const response = buildBaseResponse();
  response.clinicalRead = [
    'This sounds like a hip/glute interface issue.',
    'The stiffness tells us the tissue may be guarding or not sliding smoothly.',
    'The pain in the cheek area often points toward the glute or piriformis region, especially when sitting, walking, or rotating the hip feels restricted. This does not diagnose the issue, but it gives us a smart starting point.',
  ];
  response.padPlacement = [
    'Pad 1: Place one pad directly on the sore area of the butt cheek or deep glute where the pain feels most centered. This is the Glute / Piriformis region.',
    'Pad 2: Place the second pad on the side of the same hip, near the outer hip bone. This is the Greater Trochanter / lateral hip area.',
    'Optional placement: If the pain travels down the back of the leg, move Pad 2 lower onto the back of the upper thigh. This follows the hamstring / sciatic pathway.',
    'SI variation: If the pain feels closer to the low-back dimple, place Pad 1 on that sore dimple area. This is the SI Joint / Sacroiliac area. Place Pad 2 on the front of the same-side hip near the front hip bone. This is the ASIS / anterior hip area.',
  ];
  response.whyThisPlacement = [
    'This creates a bridge through the hip and glute area instead of treating only one surface spot.',
    'The goal is to let the current pass through the guarded tissue and support a calmer signal through the hip, glute, and deep rotator area.',
  ];
  response.sessionTips = [
    'Keep intensity comfortable and sub-sensory.',
    'Do not force deep stretching before the tissue calms.',
    'Use gentle hip circles, walking, or easy range of motion after the session.',
    'Avoid aggressive pressure directly on a highly irritated butt-cheek point.',
    'Stop and reassess if symptoms worsen.',
    `Latest Vibe pattern: ${context.vibeSummary}.`,
  ];
  response.aftercare = [
    'Recheck sitting comfort, walking comfort, and hip rotation later the same day.',
    'Recheck again the next morning.',
    'If pain travels down the leg, numbness increases, or weakness appears, escalate.',
  ];
  response.escalation = [
    'Request Clinical Assessment with Lavelle if the hip keeps locking up, pain is traveling down the leg, numbness is increasing, or supportive guidance is not enough.',
  ];
  response.recommendAssessment = context.notImproving || context.homeModel || nerveLike || siLike;

  if (context.practitioner) {
    return withMassageIntegration(response, [
      'Massage Integration: Let the device run while you work broad gluteal, lateral hip, and deep rotator support tissue rather than drilling directly into the most irritated butt-cheek point.',
      'Massage Integration: If the pattern shifts toward SI or sciatic irritation, keep the work broad and reassess after each pass instead of forcing deep release.',
    ]);
  }

  return response;
}

function buildAnkleGuidance(input: AzulAgentInput, context: GuidanceContext): AzulAgentResponse {
  const vascular = hasTerm(context.normalizedQuestion, ['purple', 'dark', 'venous', 'circulation', 'puffy', 'swollen']);
  const nerve = hasTerm(context.normalizedQuestion, ['neuropathy', 'nerve', 'burning', 'tingling']);
  const clotConcern = hasTerm(context.normalizedQuestion, ['calf pain', 'hot', 'sudden swelling', 'clot']);

  const response = buildBaseResponse();
  response.clinicalRead = [
    'This sounds like a lower-leg support issue involving swelling, fluid congestion, circulation, or nerve irritation around the inside ankle.',
    nerve
      ? 'Because neuropathy or nerve-type wording is present, the session should stay especially calm and observant rather than intense.'
      : 'This does not diagnose a vascular or neurological problem, but it gives us a smart supportive starting point.',
  ];
  response.padPlacement = [
    'Pad 1: Place one pad near the inside ankle bone or just behind it where the swelling or discoloration is. This is the Medial Malleolus area.',
    'Pad 2: Place the second pad higher on the inside calf, moving upward toward the knee. This follows the inner calf / great saphenous vein pathway.',
    'Optional: For more swelling, elevate the leg and use gentle ankle pumps during the session.',
  ];
  response.whyThisPlacement = [
    'This creates an upward support pathway from the ankle into the inner calf instead of trapping attention at the most swollen spot.',
    'That may support fluid movement and circulation through the tissue that feels congested, puffy, or irritated.',
  ];
  response.sessionTips = [
    'Elevate the leg during or after the session when appropriate.',
    'Hydrate well and avoid prolonged compression or aggressive local work if the tissue looks dark, puffy, or reactive.',
    'Stop if symptoms worsen, the skin becomes hot, or the discomfort starts escalating sharply.',
    `Latest Vibe pattern: ${context.vibeSummary}.`,
  ];
  response.aftercare = [
    'Reassess color, puffiness, and pressure tolerance later the same day.',
    'If the ankle remains dark, increasingly swollen, or more painful, seek higher-level evaluation promptly.',
  ];
  response.escalation = [
    'Request Clinical Assessment with Lavelle if this feels complex, not improving, or deeper than supportive home guidance.',
    'Seek medical care promptly if the ankle is hot, suddenly swollen, very painful in the calf, or the discoloration is worsening.',
  ];
  response.recommendAssessment = vascular || clotConcern || context.redFlag || context.notImproving;

  if (context.practitioner) {
    return withMassageIntegration(response, [
      'Massage Integration: Keep manual work light and circulation-oriented while the device runs. Avoid aggressive deep stripping into suspicious vascular tissue.',
    ]);
  }

  return response;
}

function buildAnxietyGuidance(input: AzulAgentInput, context: GuidanceContext): AzulAgentResponse {
  const response = buildBaseResponse();
  response.clinicalRead = [
    'This sounds like a nervous system that is carrying more input than it is processing comfortably right now.',
    'This does not diagnose anxiety, but it gives us a smart starting point for calmer regulation support.',
  ];
  response.padPlacement = [
    'Option 1, Pad 1: Place one pad on the forehead. Technical reference: Frontal area.',
    'Option 1, Pad 2: Place the second pad at the back of the neck near the hairline. Technical reference: Cervical-Brainstem area.',
    'Option 2: Place one pad at the back of the neck and one over the upper stomach/solar plexus area. Technical reference: Cervical area and Solar Plexus / Vagus pathway.',
  ];
  response.whyThisPlacement = [
    'This setup may support a calmer resonance field through the stress-response system rather than pushing more stimulation into an already overloaded pattern.',
  ];
  response.sessionTips = [
    'Start with a short first session in a calm environment with dim lights and steady breathing.',
    'Hydrate and stay seated or reclined for a few minutes afterward before jumping back into stimulation.',
    `Latest Vibe pattern: ${context.vibeSummary}.`,
  ];
  response.aftercare = ['Reassess whether the body feels more settled, less activated, or easier to regulate over the next hour.'];
  response.escalation = [
    'Request Clinical Assessment with Lavelle if the nervous system remains highly activated, if panic symptoms are escalating, or if the pattern feels too layered for self-guided support.',
  ];
  response.recommendAssessment = context.notImproving;

  if (context.practitioner) {
    return withMassageIntegration(response, [
      'Massage Integration: Run the calming protocol while keeping touch broad, rhythmic, and non-intrusive. Avoid stimulating techniques that push the client deeper into sympathetic tone.',
    ]);
  }

  return response;
}

function buildBrainGuidance(input: AzulAgentInput, context: GuidanceContext): AzulAgentResponse {
  const diagnosedNeuro = hasTerm(context.normalizedQuestion, ['dementia', 'alzheimer', 'frontotemporal', 'ftd', 'neurological disease']);
  const response = buildBaseResponse();
  response.clinicalRead = [
    'This sounds like a focus or brain-fog pattern where the system may be carrying too much background load to perform cleanly.',
    diagnosedNeuro
      ? 'If there is a diagnosed neurological condition, this guidance should stay educational only and be used with physician or neurologist oversight.'
      : 'This does not diagnose a neurological issue, but it gives us a smart starting point for clarity and regulation support.',
  ];
  response.padPlacement = [
    'Pad 1: Place one pad on the forehead, centered above the eyebrows. This is the Frontal area.',
    'Pad 2: Place the second pad at the back of the neck at the base of the skull. This is the Cervical-Brainstem area.',
  ];
  response.whyThisPlacement = [
    'This gives the current a simple head-to-neck pathway instead of scattering stimulation across too many areas.',
    'That may support cleaner signaling through the attention and regulation systems while reducing excess background noise.',
  ];
  response.sessionTips = [
    'Keep the first session short and low-intensity, especially if the person is sensitive or easily overstimulated.',
    'Hydrate and reassess clarity, fatigue, and stress tone later rather than expecting an immediate dramatic shift.',
    `Latest Vibe pattern: ${context.vibeSummary}.`,
  ];
  response.aftercare = ['Reassess focus quality, calmness, and fatigue later the same day.'];
  response.escalation = diagnosedNeuro
    ? ['Use under medical supervision for diagnosed neurological conditions, and request Clinical Assessment with Lavelle if you want supportive protocol sequencing layered more carefully.']
    : ['Request Clinical Assessment with Lavelle if focus remains poor, the issue feels systemic, or the person is not improving.'];
  response.recommendAssessment = diagnosedNeuro || context.notImproving;

  if (context.practitioner) {
    return withMassageIntegration(response, [
      'Massage Integration: Pair the device with calming cranial, cervical, or parasympathetic-oriented work rather than stimulating, fast, or overly activating techniques.',
    ]);
  }

  return response;
}

function buildFallbackGuidance(input: AzulAgentInput, context: GuidanceContext): AzulAgentResponse {
  if (context.selectedBodyArea === 'Shoulder') {
    return buildRotatorCuffGuidance({ ...input, userQuestion: `${input.userQuestion} shoulder` }, context);
  }

  if (context.selectedBodyArea === 'Knee') {
    return buildKneeGuidance({ ...input, userQuestion: `${input.userQuestion} knee` }, context);
  }

  if (context.selectedBodyArea === 'Foot / Ankle' || context.selectedBodyArea === 'Ankle / Foot') {
    return buildAnkleGuidance({ ...input, userQuestion: `${input.userQuestion} ankle foot` }, context);
  }

  if (context.selectedBodyArea === 'Hip' || context.selectedBodyArea === 'Hip / Glute' || context.selectedBodyArea === 'Hip / Glute / Pelvis') {
    return buildHipGluteGuidance({ ...input, userQuestion: `${input.userQuestion} hip glute` }, context);
  }

  if (context.selectedBodyArea === 'Low Back / SI') {
    return buildSIGuidance({ ...input, userQuestion: `${input.userQuestion} si joint low back` }, context);
  }

  if (context.selectedBodyArea === 'Head / Brain' || context.selectedBodyArea === 'Head / Face / Jaw') {
    return buildBrainGuidance({ ...input, userQuestion: `${input.userQuestion} brain focus` }, context);
  }

  if (context.selectedBodyArea === 'Neck') {
    return buildAnxietyGuidance({ ...input, userQuestion: `${input.userQuestion} stress neck` }, context);
  }

  if (context.selectedBodyArea === 'Abdomen / Gut') {
    const response = buildBaseResponse();
    response.clinicalRead = [
      'This sounds like a body-area question centered around the abdomen or gut region.',
      'Abdominal symptoms should be approached conservatively. This does not diagnose the issue, but it tells us to stay measured and safety-aware.',
    ];
    response.padPlacement = [
      'Pad 1: If using supportive wellness placement, place one pad on the upper abdomen away from sharp or highly tender points.',
      'Pad 2: Place the second pad lower on the abdomen with enough space to avoid crowding one sore spot.',
    ];
    response.whyThisPlacement = ['The goal is to keep the setup broad and calm rather than over-focusing on abdominal discomfort.'];
    response.sessionTips = [
      'Keep intensity very comfortable, stay conservative, and stop if symptoms worsen or feel unusual.',
      `Latest Vibe pattern: ${context.vibeSummary}.`,
    ];
    response.aftercare = ['Reassess comfort carefully and escalate if the pattern feels more serious or persistent.'];
    response.escalation = ['Request Clinical Assessment with Lavelle or medical evaluation for meaningful abdominal pain, worsening symptoms, or any concerning change.'];
    response.recommendAssessment = true;
    return response;
  }

  if (context.selectedBodyArea === 'Full Body / Systemic') {
    const response = buildBaseResponse();
    response.clinicalRead = [
      'This sounds like a more whole-body or systemic support question rather than one single local tissue issue.',
      'That often calls for a broader recovery and regulation plan instead of a spot treatment mindset.',
    ];
    response.padPlacement = [
      'Pad 1: Place one pad on the upper body where broad regulation feels comfortable, often upper torso or back of neck support.',
      'Pad 2: Place the second pad on the lower body to create a larger top-to-bottom support field.',
    ];
    response.whyThisPlacement = ['This supports a broader systemic field rather than focusing only on one local area.'];
    response.sessionTips = [
      'Keep intensity conservative, hydrate well, and assess whether the body feels calmer, clearer, or less heavy over time.',
      `Latest Vibe pattern: ${context.vibeSummary}.`,
    ];
    response.aftercare = ['Reassess whole-body energy, heaviness, and recovery later the same day and the next morning.'];
    response.escalation = ['Request Clinical Assessment with Lavelle if the whole-body picture is complex, not improving, or feels too layered for self-guided support.'];
    response.recommendAssessment = context.notImproving || context.homeModel;
    return response;
  }

  const response = buildBaseResponse();
  response.clinicalRead = [
    'The wording suggests a real clinical-wellness question rather than a simple preset category, which is exactly how Azul is intended to be used.',
    input.selectedBodyArea
      ? `The tagged body area is ${input.selectedBodyArea}, which helps localize the first supportive protocol direction.`
      : 'If you add the exact body area, Azul can make the first-pass placement more specific.',
    context.redFlag
      ? 'Some of the wording may suggest a red-flag pattern, so wellness guidance should pause and medical care should be considered promptly.'
      : 'This is educational guidance intended to support device use, not diagnose, cure, or replace medical care.',
  ];
  response.padPlacement = [
    input.selectedBodyArea
      ? `Pad 1: Place one pad just above or before the main ${input.selectedBodyArea} complaint area.`
      : 'Pad 1: Place one pad just above or before the main complaint area.',
    input.selectedBodyArea
      ? `Pad 2: Place the second pad just below or beyond the ${input.selectedBodyArea} complaint area so the signal crosses the tissue instead of sitting on one hotspot.`
      : 'Pad 2: Place the second pad just below or beyond the main complaint area so the signal crosses the tissue instead of sitting on one hotspot.',
  ];
  response.whyThisPlacement = [
    'This may support a cleaner tissue field by reducing noisy local signaling and giving the area a broader resonance pathway.',
  ];
  response.sessionTips = [
    'Hydrate, keep the first session conservative, and stop if symptoms worsen or the tissue becomes more reactive.',
    `Latest Vibe pattern: ${context.vibeSummary}.`,
  ];
  response.aftercare = ['Reassess the area later in the day and again the next morning before escalating intensity or duration.'];
  response.escalation = context.redFlag
    ? ['Seek medical care if the question reflects red-flag symptoms, and request Clinical Assessment with Lavelle only after safety concerns are appropriately handled.']
    : ['Request Clinical Assessment with Lavelle if the issue is complex, not improving, or likely needs Professional or Clinical Suite sequencing.'];
  response.recommendAssessment = context.redFlag || context.notImproving;

  if (context.practitioner) {
    return withMassageIntegration(response, [
      'Massage Integration: Let the device support the tissue while your hands address surrounding load, circulation, and guarding instead of forcing direct aggressive pressure into the most reactive spot.',
    ]);
  }

  return response;
}

export async function generateAzulResponse(
  input: AzulAgentInput
): Promise<AzulAgentResponse> {
  // This is the current local/mock intelligence engine used by the working app today.
  // Future production AI should call a secure backend service and keep provider/API keys off-device.
  // This local engine should remain available as a fallback when backend AI is unavailable.
  // Real AI/backend integration point:
  // return await backendClient.generateAzulResponse(input)
  // Keep API keys off-device and call a secure backend or edge function here.

  const context = buildContext(input);
  const q = context.normalizedQuestion;

  let response: AzulAgentResponse;

  if (hasTerm(q, ['inner knee', 'inside knee', 'medial knee', 'below inner knee', 'back inner knee'])) {
    response = buildInnerKneeGuidance(input, context);
  } else if (hasTerm(q, ['knee', 'kneecap', 'patella', 'below knee', 'under kneecap', 'stairs', 'swelling', 'stiff knee'])) {
    response = buildKneeGuidance(input, context);
  } else if (hasTerm(q, ['rotator cuff', 'shoulder', 'limited range', 'rom', 'abduction', 'stiffness', 'impingement'])) {
    response = buildRotatorCuffGuidance(input, context);
  } else if (hasTerm(q, ['si joint', 'sacroiliac', 'low back', 'facet', 'hip dimple'])) {
    response = buildSIGuidance(input, context);
  } else if (hasTerm(q, ['hamstring', 'butt cheek crease', 'sit bone', 'ischial tuberosity'])) {
    response = buildHamstringGuidance(input, context);
  } else if (hasTerm(q, ['hip', 'glute', 'butt', 'buttock', 'cheek', 'butt cheek', 'piriformis', 'deep hip', 'side hip', 'hip stiffness', 'hip pain', 'glute pain', 'sitting pain'])) {
    response = buildHipGluteGuidance(input, context);
  } else if (hasTerm(q, ['ankle', 'inner ankle', 'foot', 'heel', 'arch', 'toe', 'toes', 'neuropathy', 'venous', 'purple', 'dark', 'swollen', 'puffy', 'circulation'])) {
    response = buildAnkleGuidance(input, context);
  } else if (hasTerm(q, ['anxiety', 'anxious', 'panic', 'stress', 'overwhelmed', 'racing thoughts'])) {
    response = buildAnxietyGuidance(input, context);
  } else if (hasTerm(q, ['focus', 'brain fog', 'motivation', 'memory', 'dementia', 'alzheimer', 'frontotemporal', 'brain health'])) {
    response = buildBrainGuidance(input, context);
  } else {
    response = buildFallbackGuidance(input, context);
  }

  return finalizeResponse(input, context, response);
}

// Internal test cases
// - "rotator cuff pain and stiffness"
// - "swollen left knee beneath kneecap"
// - "inner ankle purple and neuropathy"
// - "SI joint point pain"
// - "client has shoulder ROM restriction"
