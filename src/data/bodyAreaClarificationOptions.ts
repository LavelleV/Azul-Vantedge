export type BodyAreaClarificationRule = {
  id: string;
  label: string;
  matchTerms: string[];
  options: string[];
  promptLead: string;
};

export const BODY_AREA_CLARIFICATION_RULES: BodyAreaClarificationRule[] = [
  {
    id: 'head_face_jaw',
    label: 'Head / Face / Jaw',
    matchTerms: [
      'head',
      'face',
      'jaw',
      'tmj',
      'temple',
      'forehead',
      'sinus',
      'brain fog',
      'headache',
    ],
    options: [
      'Forehead',
      'Temple',
      'Sinus pressure',
      'Jaw / TMJ',
      'Cheek / face pressure',
      'Back of neck',
      'Base of skull',
      'Brain fog / focus',
      'Headache pattern',
      'Stress / nervous-system tension',
    ],
    promptLead: 'For better placement, identify the closest head, face, jaw, or neck detail.',
  },
  {
    id: 'neck',
    label: 'Neck',
    matchTerms: [
      'neck',
      'cervical',
      'base of skull',
      'upper cervical',
      'side neck',
      'front neck',
    ],
    options: [
      'Front neck',
      'Side neck',
      'Back of neck',
      'Base of skull',
      'Upper cervical',
      'Neck-to-shoulder tension',
      'Nerve-type sensation',
      'Stiffness / limited motion',
    ],
    promptLead: 'For better placement, identify the closest neck detail.',
  },
  {
    id: 'shoulder',
    label: 'Shoulder',
    matchTerms: [
      'shoulder',
      'rotator cuff',
      'upper trap',
      'trap',
      'trapezius',
      'scapula',
      'shoulder blade',
      'ac joint',
      'coracoid',
      'rear shoulder',
    ],
    options: [
      'Front shoulder',
      'Top shoulder / AC joint',
      'Rear shoulder',
      'Rotator cuff',
      'Shoulder blade / scapula',
      'Upper trap',
      'Neck-to-shoulder tension',
      'Pain when lifting arm',
      'Weakness or instability',
    ],
    promptLead: 'For better placement, identify the closest shoulder detail.',
  },
  {
    id: 'arm_hand',
    label: 'Arm / Elbow / Wrist / Hand',
    matchTerms: [
      'arm',
      'elbow',
      'forearm',
      'wrist',
      'hand',
      'finger',
      'fingers',
      'grip',
      'typing',
    ],
    options: [
      'Upper arm',
      'Elbow',
      'Forearm',
      'Wrist',
      'Hand / palm',
      'Fingers',
      'Grip strain',
      'Typing / overuse',
      'Nerve-type sensation',
    ],
    promptLead: 'For better placement, identify the closest arm, elbow, wrist, or hand detail.',
  },
  {
    id: 'chest_ribs',
    label: 'Chest / Ribs',
    matchTerms: [
      'chest',
      'rib',
      'ribs',
      'sternum',
      'pectoral',
      'intercostal',
      'breathing',
    ],
    options: [
      'Upper chest',
      'Sternum',
      'Side ribs',
      'Pectoral area',
      'Intercostal / between ribs',
      'Breathing restriction',
      'Muscle tightness',
      'Injury concern',
    ],
    promptLead: 'For better placement, identify the closest chest or rib detail.',
  },
  {
    id: 'abdomen_gut',
    label: 'Abdomen / Gut',
    matchTerms: [
      'abdomen',
      'abdominal',
      'stomach',
      'gut',
      'belly',
      'bloat',
      'digestive',
      'cramp',
    ],
    options: [
      'Upper abdomen',
      'Lower abdomen',
      'Stomach area',
      'Side abdomen',
      'Bloating / digestive discomfort',
      'Cramping',
      'General gut support',
      'Post-session sensitivity',
    ],
    promptLead: 'For better placement, identify the closest abdomen or gut detail.',
  },
  {
    id: 'low_back_si',
    label: 'Low Back / SI',
    matchTerms: [
      'back',
      'low back',
      'lower back',
      'lumbar',
      'si joint',
      'sacroiliac',
      'sacrum',
      'facet',
      'back dimple',
    ],
    options: [
      'Low-back center',
      'Left low back',
      'Right low back',
      'SI joint',
      'Sacrum',
      'Facet-style irritation',
      'Hip referral',
      'Pain traveling down leg',
      'Numbness / weakness',
      'Stiffness / guarded motion',
    ],
    promptLead: 'For better placement, identify the closest low-back, SI, or referral detail.',
  },
  {
    id: 'hip_glute',
    label: 'Hip / Glute / Pelvis',
    matchTerms: [
      'hip',
      'glute',
      'butt',
      'buttock',
      'piriformis',
      'deep glute',
      'pelvis',
      'groin',
      'outer hip',
      'front hip',
    ],
    options: [
      'Front hip / hip flexor',
      'Outer hip',
      'Glute',
      'Piriformis / deep glute',
      'Groin / inner hip',
      'Hip stiffness',
      'Pain when sitting',
      'Pain traveling down leg',
      'SI-to-hip pattern',
    ],
    promptLead: 'For better placement, identify the closest hip, glute, or pelvis detail.',
  },
  {
    id: 'thigh',
    label: 'Thigh',
    matchTerms: [
      'thigh',
      'quad',
      'hamstring',
      'adductor',
      'inner thigh',
      'outer thigh',
      'it band',
      'sit bone',
      'ischial',
    ],
    options: [
      'Quad / front thigh',
      'Hamstring / back thigh',
      'Inner thigh / adductor',
      'Outer thigh / IT band',
      'Sit bone / upper hamstring',
      'Muscle strain',
      'Tightness / guarded motion',
      'Nerve-type sensation',
    ],
    promptLead: 'For better placement, identify the closest thigh detail.',
  },
  {
    id: 'knee',
    label: 'Knee',
    matchTerms: [
      'knee',
      'kneecap',
      'patella',
      'patellar',
      'pes anserine',
      'inner knee',
      'outer knee',
      'behind knee',
    ],
    options: [
      'Kneecap / patella',
      'Above knee',
      'Below knee',
      'Inner knee',
      'Outer knee',
      'Behind knee',
      'Pes anserine / medial knee',
      'Swelling / puffiness',
      'Pain with stairs',
      'Instability',
    ],
    promptLead: 'For better placement, identify the closest knee detail.',
  },
  {
    id: 'lower_leg',
    label: 'Lower Leg',
    matchTerms: [
      'lower leg',
      'calf',
      'shin',
      'achilles',
      'lower-leg',
      'leg swelling',
    ],
    options: [
      'Shin',
      'Calf',
      'Achilles',
      'Outer lower leg',
      'Cramping',
      'Swelling',
      'Nerve-type sensation',
      'Tightness / overuse',
      'Pain with walking',
    ],
    promptLead: 'For better placement, identify the closest lower-leg detail.',
  },
  {
    id: 'foot_ankle',
    label: 'Foot / Ankle',
    matchTerms: [
      'foot',
      'feet',
      'ankle',
      'heel',
      'arch',
      'toe',
      'toes',
      'ball of foot',
      'plantar',
      'metatarsal',
      'calcaneal',
      'achilles',
    ],
    options: [
      'Heel',
      'Arch',
      'Ball of foot',
      'Toes',
      'Inner ankle',
      'Outer ankle',
      'Achilles',
      'Top of foot',
      'Swelling',
      'Nerve-type sensation',
      'Pain when bearing weight',
    ],
    promptLead: 'For better placement, identify the closest foot or ankle detail.',
  },
  {
    id: 'systemic_general',
    label: 'Systemic / General',
    matchTerms: [
      'full body',
      'whole body',
      'systemic',
      'fatigue',
      'stress',
      'anxiety',
      'sleep',
      'burnout',
      'overwhelmed',
      'recovery',
    ],
    options: [
      'Stress / nervous-system reset',
      'Sleep support',
      'Fatigue',
      'General recovery',
      'Brain fog / focus',
      'Full-body heaviness',
      'Post-workout recovery',
      'Unclear location',
    ],
    promptLead: 'For better placement, identify the closest general support goal.',
  },
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

export function findBodyAreaClarificationRule(
  issueText?: string | null
): BodyAreaClarificationRule | null {
  const normalizedIssueText = normalizeText(issueText);

  if (!normalizedIssueText) {
    return null;
  }

  return (
    BODY_AREA_CLARIFICATION_RULES.find((rule) =>
      rule.matchTerms.some((term) => includesPhrase(normalizedIssueText, term))
    ) ?? null
  );
}

export function getClarificationOptionsForIssue(
  issueText?: string | null
): string[] {
  return (
    findBodyAreaClarificationRule(issueText)?.options ?? [
      'Exact body area',
      'Main sore spot',
      'Movement that triggers it',
      'Pain',
      'Tightness',
      'Swelling',
      'Nerve-type sensation',
      'Stress / nervous-system issue',
    ]
  );
}

export function buildClarificationPromptForIssue(
  issueText?: string | null
): string {
  const rule = findBodyAreaClarificationRule(issueText);

  if (!rule) {
    return 'For better placement, add one clear detail: main body area, exact sore spot, movement that triggers it, or whether it feels like pain, tightness, swelling, nerve sensation, or stress.';
  }

  return `${rule.promptLead} Options: ${rule.options.join(', ')}.`;
}
