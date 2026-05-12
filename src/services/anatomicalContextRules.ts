import { BODY_MAP_MANIFEST, type StableBodyRegionId } from '../data/bodyMapRegions';

export type ActiveAnalysisContext = {
  userInput: string;
  bodyRegionId: StableBodyRegionId | null;
  bodyRegionLabel: string | null;
  closeUpId: string | null;
  closeUpLabel: string | null;
  patternId: string | null;
  patternLabel: string | null;
  allowedPadStrategyIds: string[];
  allowedProtocolFocusIds: string[];
  visualAssetGroupId: string | null;
  confidence: number;
  needsClarification: boolean;
  clarificationReason: string | null;
};

const REGION_ALIASES: Record<string, StableBodyRegionId> = {
  head: 'head',
  face: 'head',
  jaw: 'head',
  neck: 'neck',
  shoulder: 'shoulder',
  scapula: 'shoulder',
  arm: 'arm',
  wrist: 'arm',
  hand: 'arm',
  chest: 'chest',
  ribs: 'chest',
  abdomen: 'abdomen',
  gut: 'abdomen',
  stomach: 'abdomen',
  low_back: 'low_back',
  lowback: 'low_back',
  lumbar: 'low_back',
  si: 'low_back',
  hip: 'hip_glute',
  glute: 'hip_glute',
  pelvis: 'hip_glute',
  thigh: 'thigh',
  knee: 'knee',
  lower_leg: 'lower_leg',
  calf: 'lower_leg',
  shin: 'lower_leg',
  foot: 'foot_ankle',
  ankle: 'foot_ankle',
};

const CHIP_TO_REGION = Object.values(BODY_MAP_MANIFEST).reduce<Record<string, StableBodyRegionId>>(
  (acc, region) => {
    acc[normalize(region.label)] = region.id;
    acc[normalize(region.shortLabel)] = region.id;
    region.chips.forEach((chip) => {
      acc[normalize(chip)] = region.id;
    });
    return acc;
  },
  {}
);

function normalize(value?: string | null) {
  return String(value ?? '')
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '_')
    .replace(/^_+|_+$/g, '');
}

function text(value?: string | null) {
  return String(value ?? '').toLowerCase();
}

function includesAny(source: string, terms: string[]) {
  return terms.some((term) => source.includes(term));
}

export function resolveBodyRegionId(value?: string | null): StableBodyRegionId | null {
  const normalized = normalize(value);
  if (!normalized) return null;
  return CHIP_TO_REGION[normalized] ?? REGION_ALIASES[normalized] ?? null;
}

export function resolveCloseUpLabel(value?: string | null): string | null {
  const selected = String(value ?? '').trim();
  if (!selected) return null;

  const regionId = resolveBodyRegionId(selected);
  if (!regionId) return selected;

  const region = BODY_MAP_MANIFEST[regionId];
  return region.chips.includes(selected) ? selected : null;
}

function inferPattern(input: string, selectedArea?: string | null) {
  const combined = `${text(input)} ${text(selectedArea)}`;

  if (includesAny(combined, ['front hip', 'hip flexor', 'anterior hip', 'hip crease'])) {
    return { id: 'front_hip_flexor', label: 'Front Hip / Hip Flexor', regionId: 'hip_glute' as StableBodyRegionId };
  }
  if (includesAny(combined, ['piriformis', 'deep glute', 'butt cheek', 'glute'])) {
    return { id: 'deep_glute_piriformis', label: 'Piriformis / Deep Glute', regionId: 'hip_glute' as StableBodyRegionId };
  }
  if (includesAny(combined, ['groin', 'inner hip'])) {
    return { id: 'groin_inner_hip', label: 'Groin / Inner Hip', regionId: 'hip_glute' as StableBodyRegionId };
  }
  if (includesAny(combined, ['front shoulder', 'coracoid'])) {
    return { id: 'front_shoulder', label: 'Front Shoulder / Coracoid Area', regionId: 'shoulder' as StableBodyRegionId };
  }
  if (includesAny(combined, ['scapula', 'shoulder blade'])) {
    return { id: 'shoulder_blade_scapula', label: 'Shoulder Blade / Scapula', regionId: 'shoulder' as StableBodyRegionId };
  }
  if (includesAny(combined, ['inner knee', 'inside knee', 'medial knee'])) {
    return { id: 'inner_knee', label: 'Inner Knee', regionId: 'knee' as StableBodyRegionId };
  }
  if (includesAny(combined, ['outer knee', 'outside knee', 'lateral knee'])) {
    return { id: 'outer_knee', label: 'Outer Knee', regionId: 'knee' as StableBodyRegionId };
  }
  if (includesAny(combined, ['low back', 'lower back', 'lumbar'])) {
    return { id: 'low_back_general', label: 'Low Back / SI', regionId: 'low_back' as StableBodyRegionId };
  }
  if (includesAny(combined, ['si joint', 'sacrum', 'dimple', 'one sided pelvic locking'])) {
    return { id: 'si_joint', label: 'SI Joint', regionId: 'low_back' as StableBodyRegionId };
  }
  if (includesAny(combined, ['neck stiffness', 'stiff neck'])) {
    return { id: 'neck_stiffness', label: 'Cervical Spine', regionId: 'neck' as StableBodyRegionId };
  }
  if (includesAny(combined, ['calf'])) {
    return { id: 'calf', label: 'Calf', regionId: 'lower_leg' as StableBodyRegionId };
  }
  if (includesAny(combined, ['achilles', 'heel cord', 'back of ankle'])) {
    return { id: 'achilles', label: 'Achilles', regionId: 'foot_ankle' as StableBodyRegionId };
  }

  return null;
}

function getForbiddenConflict(input: string, selectedArea?: string | null) {
  const issue = text(input);
  const selected = text(selectedArea);

  const conflicts = [
    {
      typed: ['front hip', 'hip flexor', 'anterior hip', 'hip crease'],
      forbiddenSelected: ['piriformis', 'deep glute'],
      typedLabel: 'Front Hip / Hip Flexor',
      selectedLabel: 'Deep Glute / Piriformis',
    },
    {
      typed: ['groin', 'inner hip'],
      forbiddenSelected: ['outer hip', 'glute'],
      typedLabel: 'Groin / Inner Hip',
      selectedLabel: 'Outer Hip or Glute',
    },
    {
      typed: ['front shoulder'],
      forbiddenSelected: ['scapula', 'shoulder blade', 'rear shoulder'],
      typedLabel: 'Front Shoulder',
      selectedLabel: 'Back Scapula / Rear Shoulder',
    },
    {
      typed: ['inner knee', 'inside knee', 'medial knee'],
      forbiddenSelected: ['outer knee', 'outside knee', 'lateral knee'],
      typedLabel: 'Inner Knee',
      selectedLabel: 'Outer Knee',
    },
    {
      typed: ['calf'],
      forbiddenSelected: ['achilles'],
      typedLabel: 'Calf',
      selectedLabel: 'Achilles',
    },
  ];

  for (const conflict of conflicts) {
    if (includesAny(issue, conflict.typed) && includesAny(selected, conflict.forbiddenSelected)) {
      return `Your typed issue sounds like ${conflict.typedLabel}, but the selected map area is ${conflict.selectedLabel}. Which area should Azul use for this guidance?`;
    }
  }

  if (
    includesAny(issue, ['low back', 'lower back', 'lumbar']) &&
    selected.includes('si joint') &&
    !includesAny(issue, ['si', 'sacrum', 'dimple', 'one sided pelvic locking'])
  ) {
    return 'Your typed issue sounds like Low Back, but the selected map area is SI Joint. Which area should Azul use for this guidance?';
  }

  if (
    includesAny(issue, ['neck stiffness', 'stiff neck']) &&
    includesAny(selected, ['front neck', 'side neck', 'vagus'])
  ) {
    return 'Your typed issue sounds like Neck Stiffness, but the selected map area is front/side neck. Which area should Azul use for this guidance?';
  }

  return null;
}

export function createActiveAnalysisContext({
  userInput,
  selectedBodyArea,
}: {
  userInput: string;
  selectedBodyArea?: string | null;
}): ActiveAnalysisContext {
  const selectedRegionId = resolveBodyRegionId(selectedBodyArea);
  const inferredPattern = inferPattern(userInput, selectedBodyArea);
  const bodyRegionId = selectedRegionId ?? inferredPattern?.regionId ?? null;
  const region = bodyRegionId ? BODY_MAP_MANIFEST[bodyRegionId] : null;
  const closeUpLabel = resolveCloseUpLabel(selectedBodyArea) ?? inferredPattern?.label ?? null;
  const contradiction = getForbiddenConflict(userInput, selectedBodyArea);

  return {
    userInput,
    bodyRegionId,
    bodyRegionLabel: region?.label ?? null,
    closeUpId: closeUpLabel ? normalize(closeUpLabel) : null,
    closeUpLabel,
    patternId: inferredPattern?.id ?? null,
    patternLabel: inferredPattern?.label ?? null,
    allowedPadStrategyIds: bodyRegionId ? [bodyRegionId] : [],
    allowedProtocolFocusIds: bodyRegionId ? [bodyRegionId] : [],
    visualAssetGroupId: bodyRegionId,
    confidence: bodyRegionId ? 0.86 : 0.35,
    needsClarification: !!contradiction,
    clarificationReason: contradiction,
  };
}

export function analysisContextsMatch(
  current: ActiveAnalysisContext | null | undefined,
  saved: ActiveAnalysisContext | null | undefined
) {
  if (!current || !saved) return false;
  return current.bodyRegionId === saved.bodyRegionId && current.closeUpId === saved.closeUpId;
}

export function getStaleGuidanceMessage() {
  return 'Location changed. Tap Analyze to generate updated guidance for this area.';
}

export function getSelectedAreaForGeneration(context?: ActiveAnalysisContext | null) {
  return context?.closeUpLabel || context?.bodyRegionLabel || undefined;
}

export function getAllowedStrategyIdsForContext(context?: ActiveAnalysisContext | null) {
  if (!context?.closeUpId) return null;

  const rules: Record<string, string[]> = {
    front_hip_hip_flexor: ['hip_flexor_anterior_hip'],
    piriformis_deep_glute: ['hip_glute_deep_tension'],
    si_joint: ['si_joint_local_or_hip_referral'],
    lateral_hip_greater_trochanter: ['hip_glute_deep_tension'],
    glute: ['hip_glute_deep_tension'],
    groin_inner_hip: ['hip_flexor_anterior_hip'],
    front_shoulder_coracoid_area: ['rotator_cuff_irritation'],
    shoulder_blade_scapula: ['shoulder_blade_tension'],
    rotator_cuff: ['rotator_cuff_irritation'],
    upper_trap: ['upper_trap_tightness_pain'],
    inner_knee: ['knee_front_patella_tendon'],
    kneecap_patella: ['knee_front_patella_tendon'],
    patellar_tendon: ['knee_front_patella_tendon'],
    calf: ['calf_lower_leg_support'],
    achilles: ['achilles_ankle_support'],
  };

  return rules[context.closeUpId] ?? null;
}
