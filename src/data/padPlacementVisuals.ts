import type { BodyMapView, StableBodyRegionId } from "./bodyMapRegions";
import {
  getPadPlacementAnchor,
  type OverlayBaseImageKey,
} from "./padPlacementAnchors";

export type PadOverlayPoint = {
  id: "pad1" | "pad2";
  x: number;
  y: number;
  label?: string;
  anchorId?: string;
  technicalAnchor?: string;
};

export type PadOverlayView = {
  id: string;
  title?: string;
  view: BodyMapView | "side";
  regionId: StableBodyRegionId;
  imageKey: OverlayBaseImageKey;
  pads: PadOverlayPoint[];
};

export type PadPlacementVisualDefinition = {
  id: string;
  regionId: StableBodyRegionId;
  chipLabel: string;
  technicalArea?: string;
  views: PadOverlayView[];
};

type PadAnchorReference = {
  padId: "pad1" | "pad2";
  anchorId: string;
  label?: string;
};

type PadPlacementVisualSource = {
  id: string;
  regionId: StableBodyRegionId;
  chipLabel: string;
  technicalArea?: string;
  padAnchors: PadAnchorReference[];
};

/**
 * CLEAN-SWEEP VISUAL SOURCES
 *
 * Rules reference reusable technical anchors from padPlacementAnchors.ts.
 * If a chip label here exactly matches the chip label in bodyMapRegions.ts,
 * it will render a dynamic pad overlay.
 *
 * If a chip still shows fallback after this change, it usually means:
 * 1) the chip label in your manifest is slightly different, or
 * 2) that chip still needs a visual entry added here.
 */
const PAD_PLACEMENT_VISUAL_SOURCES: PadPlacementVisualSource[] = [
  // =====================================
  // SHOULDER
  // =====================================
  {
    id: "shoulder-front-coracoid",
    regionId: "shoulder",
    chipLabel: "Front Shoulder / Coracoid Area",
    technicalArea:
      "Anterior shoulder / Coracoid Process region to Posterior rotator cuff / Infraspinatus-Teres region.",
    padAnchors: [
      {
        padId: "pad1",
        anchorId: "anterior_shoulder_coracoid",
        label: "Pad 1 — Coracoid",
      },
      {
        padId: "pad2",
        anchorId: "posterior_rotator_cuff",
        label: "Pad 2 — Rotator Cuff",
      },
    ],
  },
  {
    id: "shoulder-top-ac-joint",
    regionId: "shoulder",
    chipLabel: "Top Shoulder / AC Joint",
    technicalArea:
      "Acromioclavicular / AC Joint region to Upper trapezius or lateral shoulder support region.",
    padAnchors: [
      {
        padId: "pad1",
        anchorId: "ac_joint_top",
        label: "Pad 1 — AC Joint",
      },
      {
        padId: "pad2",
        anchorId: "upper_trapezius",
        label: "Pad 2 — Upper Trap",
      },
    ],
  },
  {
    id: "shoulder-rotator-cuff",
    regionId: "shoulder",
    chipLabel: "Rotator Cuff",
    technicalArea:
      "Posterior rotator cuff / Infraspinatus-Teres region to Lateral shoulder region.",
    padAnchors: [
      {
        padId: "pad1",
        anchorId: "posterior_rotator_cuff",
        label: "Pad 1 — Rotator Cuff",
      },
      {
        padId: "pad2",
        anchorId: "lateral_shoulder_support",
        label: "Pad 2 — Lateral Shoulder",
      },
    ],
  },
  {
    id: "shoulder-rear-shoulder",
    regionId: "shoulder",
    chipLabel: "Rear Shoulder",
    technicalArea:
      "Posterior shoulder region to Lateral shoulder support region.",
    padAnchors: [
      {
        padId: "pad1",
        anchorId: "rear_shoulder_posterior",
        label: "Pad 1 — Rear Shoulder",
      },
      {
        padId: "pad2",
        anchorId: "lateral_shoulder_support",
        label: "Pad 2 — Lateral Shoulder",
      },
    ],
  },
  {
    id: "shoulder-scapula",
    regionId: "shoulder",
    chipLabel: "Shoulder Blade / Scapula",
    technicalArea:
      "Shoulder Blade / Scapular region to Upper trapezius support region.",
    padAnchors: [
      {
        padId: "pad1",
        anchorId: "scapula_medial",
        label: "Pad 1 — Scapula",
      },
      {
        padId: "pad2",
        anchorId: "upper_trapezius",
        label: "Pad 2 — Upper Trap",
      },
    ],
  },
  {
    id: "shoulder-upper-trap",
    regionId: "shoulder",
    chipLabel: "Upper Trap",
    technicalArea:
      "Upper trapezius region to AC joint or shoulder support region.",
    padAnchors: [
      {
        padId: "pad1",
        anchorId: "upper_trapezius",
        label: "Pad 1 — Upper Trap",
      },
      {
        padId: "pad2",
        anchorId: "ac_joint_top",
        label: "Pad 2 — Shoulder Support",
      },
    ],
  },

  // =====================================
  // LOW BACK
  // =====================================
  {
    id: "low-back-lumbar-center",
    regionId: "low_back",
    chipLabel: "Lumbar Center",
    technicalArea:
      "Central lumbar region to lumbosacral support region.",
    padAnchors: [
      {
        padId: "pad1",
        anchorId: "lumbar_center",
        label: "Pad 1 — Lumbar",
      },
      {
        padId: "pad2",
        anchorId: "sacrum_center",
        label: "Pad 2 — Sacrum",
      },
    ],
  },
  {
    id: "low-back-left",
    regionId: "low_back",
    chipLabel: "Left Low Back",
    technicalArea:
      "Left lumbar paraspinal region to left lumbosacral support region.",
    padAnchors: [
      {
        padId: "pad1",
        anchorId: "lumbar_left",
        label: "Pad 1 — Left Lumbar",
      },
      {
        padId: "pad2",
        anchorId: "lumbosacral_support_left",
        label: "Pad 2 — Support",
      },
    ],
  },
  {
    id: "low-back-right",
    regionId: "low_back",
    chipLabel: "Right Low Back",
    technicalArea:
      "Right lumbar paraspinal region to right lumbosacral support region.",
    padAnchors: [
      {
        padId: "pad1",
        anchorId: "lumbar_right",
        label: "Pad 1 — Right Lumbar",
      },
      {
        padId: "pad2",
        anchorId: "lumbosacral_support_right",
        label: "Pad 2 — Support",
      },
    ],
  },
  {
    id: "low-back-sacrum",
    regionId: "low_back",
    chipLabel: "Sacrum",
    technicalArea:
      "Sacral region to lumbosacral / SI-adjacent support region.",
    padAnchors: [
      {
        padId: "pad1",
        anchorId: "sacrum_center",
        label: "Pad 1 — Sacrum",
      },
      {
        padId: "pad2",
        anchorId: "lumbosacral_support_right",
        label: "Pad 2 — Support",
      },
    ],
  },
  {
    id: "low-back-si-joint",
    regionId: "low_back",
    chipLabel: "SI Joint",
    technicalArea:
      "Sacroiliac / SI Joint region to Greater Trochanter or ASIS support region.",
    padAnchors: [
      {
        padId: "pad1",
        anchorId: "si_joint_right",
        label: "Pad 1 — SI Joint",
      },
      {
        padId: "pad2",
        anchorId: "asis_front_hip_bone",
        label: "Pad 2 — ASIS / Hip",
      },
    ],
  },

  // =====================================
  // HIP / GLUTE
  // =====================================
  {
    id: "hip-glute-glute",
    regionId: "hip_glute",
    chipLabel: "Glute",
    technicalArea:
      "Central gluteal region to Greater Trochanter / lateral hip region.",
    padAnchors: [
      {
        padId: "pad1",
        anchorId: "glute_center",
        label: "Pad 1 — Glute",
      },
      {
        padId: "pad2",
        anchorId: "lateral_hip_greater_trochanter",
        label: "Pad 2 — Lateral Hip",
      },
    ],
  },
  {
    id: "hip-glute-piriformis",
    regionId: "hip_glute",
    chipLabel: "Piriformis / Deep Glute",
    technicalArea:
      "Piriformis / deep glute region to posterolateral hip support region.",
    padAnchors: [
      {
        padId: "pad1",
        anchorId: "deep_glute_piriformis",
        label: "Pad 1 — Piriformis",
      },
      {
        padId: "pad2",
        anchorId: "posterior_hip_support",
        label: "Pad 2 — Support",
      },
    ],
  },
  {
    id: "hip-glute-lateral-hip",
    regionId: "hip_glute",
    chipLabel: "Outer Hip / Greater Trochanter",
    technicalArea:
      "Greater Trochanter / lateral hip region to posterior hip support region.",
    padAnchors: [
      {
        padId: "pad1",
        anchorId: "lateral_hip_greater_trochanter",
        label: "Pad 1 — Greater Trochanter",
      },
      {
        padId: "pad2",
        anchorId: "posterior_hip_support",
        label: "Pad 2 — Support",
      },
    ],
  },
  {
    id: "hip-glute-front-hip",
    regionId: "hip_glute",
    chipLabel: "Front Hip / Hip Flexor",
    technicalArea:
      "Anterior hip / Hip flexor region to ASIS / front hip bone support region.",
    padAnchors: [
      {
        padId: "pad1",
        anchorId: "hip_flexor_front",
        label: "Pad 1 — Hip Flexor",
      },
      {
        padId: "pad2",
        anchorId: "asis_front_hip_bone",
        label: "Pad 2 — ASIS",
      },
    ],
  },

  // =====================================
  // KNEE
  // =====================================
  {
    id: "knee-patella",
    regionId: "knee",
    chipLabel: "Kneecap / Patella",
    technicalArea:
      "Patellar / kneecap region to Patellar Tendon / Tibial Tuberosity region.",
    padAnchors: [
      {
        padId: "pad1",
        anchorId: "patella_center",
        label: "Pad 1 — Patella",
      },
      {
        padId: "pad2",
        anchorId: "patellar_tendon_tibial_tuberosity",
        label: "Pad 2 — Patellar Tendon",
      },
    ],
  },
  {
    id: "knee-above-knee",
    regionId: "knee",
    chipLabel: "Above Knee / Quad Tendon",
    technicalArea:
      "Quadriceps Tendon / Suprapatellar region to Patellar region.",
    padAnchors: [
      {
        padId: "pad1",
        anchorId: "quadriceps_tendon_suprapatellar",
        label: "Pad 1 — Quad Tendon",
      },
      {
        padId: "pad2",
        anchorId: "patella_center",
        label: "Pad 2 — Patella",
      },
    ],
  },
  {
    id: "knee-below-knee",
    regionId: "knee",
    chipLabel: "Below Knee / Patellar Tendon",
    technicalArea:
      "Patellar Tendon / Tibial Tuberosity region to Patellar region.",
    padAnchors: [
      {
        padId: "pad1",
        anchorId: "patellar_tendon_tibial_tuberosity",
        label: "Pad 1 — Patellar Tendon",
      },
      {
        padId: "pad2",
        anchorId: "patella_center",
        label: "Pad 2 — Patella",
      },
    ],
  },
  {
    id: "knee-inner",
    regionId: "knee",
    chipLabel: "Inner Knee",
    technicalArea:
      "Medial knee region to Patellar support region.",
    padAnchors: [
      {
        padId: "pad1",
        anchorId: "medial_knee",
        label: "Pad 1 — Medial Knee",
      },
      {
        padId: "pad2",
        anchorId: "patella_center",
        label: "Pad 2 — Patella",
      },
    ],
  },
  {
    id: "knee-outer",
    regionId: "knee",
    chipLabel: "Outer Knee",
    technicalArea:
      "Lateral knee region to Patellar support region.",
    padAnchors: [
      {
        padId: "pad1",
        anchorId: "lateral_knee",
        label: "Pad 1 — Lateral Knee",
      },
      {
        padId: "pad2",
        anchorId: "patella_center",
        label: "Pad 2 — Patella",
      },
    ],
  },

  // =====================================
  // FOOT / ANKLE
  // =====================================
  {
    id: "foot-heel",
    regionId: "foot_ankle",
    chipLabel: "Heel",
    technicalArea:
      "Heel / calcaneal region to plantar arch support region.",
    padAnchors: [
      {
        padId: "pad1",
        anchorId: "heel_center",
        label: "Pad 1 — Heel",
      },
      {
        padId: "pad2",
        anchorId: "plantar_arch",
        label: "Pad 2 — Arch",
      },
    ],
  },
  {
    id: "foot-arch",
    regionId: "foot_ankle",
    chipLabel: "Arch",
    technicalArea:
      "Plantar arch region to forefoot / metatarsal support region.",
    padAnchors: [
      {
        padId: "pad1",
        anchorId: "plantar_arch",
        label: "Pad 1 — Arch",
      },
      {
        padId: "pad2",
        anchorId: "forefoot_metatarsal_ball",
        label: "Pad 2 — Forefoot",
      },
    ],
  },
  {
    id: "foot-ball",
    regionId: "foot_ankle",
    chipLabel: "Ball of Foot",
    technicalArea:
      "Forefoot / Metatarsal region to plantar arch support region.",
    padAnchors: [
      {
        padId: "pad1",
        anchorId: "forefoot_metatarsal_ball",
        label: "Pad 1 — Ball of Foot",
      },
      {
        padId: "pad2",
        anchorId: "plantar_arch",
        label: "Pad 2 — Arch",
      },
    ],
  },
  {
    id: "foot-toes",
    regionId: "foot_ankle",
    chipLabel: "Toes",
    technicalArea:
      "Toe / distal forefoot region to metatarsal support region.",
    padAnchors: [
      {
        padId: "pad1",
        anchorId: "toes_distal",
        label: "Pad 1 — Toes",
      },
      {
        padId: "pad2",
        anchorId: "forefoot_metatarsal_ball",
        label: "Pad 2 — Forefoot",
      },
    ],
  },
  {
    id: "foot-inner-ankle",
    regionId: "foot_ankle",
    chipLabel: "Inner Ankle",
    technicalArea:
      "Medial ankle region to plantar arch support region.",
    padAnchors: [
      {
        padId: "pad1",
        anchorId: "inner_ankle_medial",
        label: "Pad 1 — Inner Ankle",
      },
      {
        padId: "pad2",
        anchorId: "plantar_arch",
        label: "Pad 2 — Arch",
      },
    ],
  },
  {
    id: "foot-outer-ankle",
    regionId: "foot_ankle",
    chipLabel: "Outer Ankle",
    technicalArea:
      "Lateral ankle region to forefoot or arch support pathway.",
    padAnchors: [
      {
        padId: "pad1",
        anchorId: "outer_ankle_lateral",
        label: "Pad 1 — Outer Ankle",
      },
      {
        padId: "pad2",
        anchorId: "plantar_arch",
        label: "Pad 2 — Arch",
      },
    ],
  },
  {
    id: "foot-achilles",
    regionId: "foot_ankle",
    chipLabel: "Achilles",
    technicalArea:
      "Achilles tendon region to heel / calcaneal support region.",
    padAnchors: [
      {
        padId: "pad1",
        anchorId: "achilles_tendon",
        label: "Pad 1 — Achilles",
      },
      {
        padId: "pad2",
        anchorId: "heel_center",
        label: "Pad 2 — Heel",
      },
    ],
  },

  // =====================================
  // ARM / HAND
  // =====================================
  {
    id: "arm-upper-arm",
    regionId: "arm",
    chipLabel: "Upper Arm",
    technicalArea:
      "Upper arm / Deltoid region to proximal forearm support pathway.",
    padAnchors: [
      {
        padId: "pad1",
        anchorId: "upper_arm_deltoid",
        label: "Pad 1 — Upper Arm",
      },
      {
        padId: "pad2",
        anchorId: "forearm_upper_pathway",
        label: "Pad 2 — Support",
      },
    ],
  },
  {
    id: "arm-elbow",
    regionId: "arm",
    chipLabel: "Elbow",
    technicalArea:
      "Elbow region to proximal forearm or upper arm support region.",
    padAnchors: [
      {
        padId: "pad1",
        anchorId: "elbow_joint",
        label: "Pad 1 — Elbow",
      },
      {
        padId: "pad2",
        anchorId: "forearm_upper_pathway",
        label: "Pad 2 — Forearm",
      },
    ],
  },
  {
    id: "arm-forearm",
    regionId: "arm",
    chipLabel: "Forearm",
    technicalArea:
      "Forearm flexor or extensor muscle-tendon pathway.",
    padAnchors: [
      {
        padId: "pad1",
        anchorId: "forearm_mid_pathway",
        label: "Pad 1 — Forearm",
      },
      {
        padId: "pad2",
        anchorId: "forearm_upper_pathway",
        label: "Pad 2 — Upper Forearm",
      },
    ],
  },
  {
    id: "arm-wrist-hand",
    regionId: "arm",
    chipLabel: "Wrist / Hand",
    technicalArea:
      "Wrist / hand region to forearm support pathway.",
    padAnchors: [
      {
        padId: "pad1",
        anchorId: "wrist_hand",
        label: "Pad 1 — Wrist / Hand",
      },
      {
        padId: "pad2",
        anchorId: "forearm_mid_pathway",
        label: "Pad 2 — Forearm",
      },
    ],
  },
];

function normalize(value?: string | null): string {
  return String(value ?? "").trim().toLowerCase();
}

function getViewTitle(imageKey: OverlayBaseImageKey): string {
  const titles: Record<OverlayBaseImageKey, string> = {
    "shoulder-front": "Shoulder View",
    "low-back-back": "Back View",
    "hip-glute-back": "Back Hip / Glute View",
    "hip-front": "Front Hip View",
    "knee-front": "Front Knee View",
    "foot-ankle-front": "Foot / Ankle View",
    "arm-front": "Arm View",
  };

  return titles[imageKey];
}

function buildVisualFromAnchors(
  source: PadPlacementVisualSource
): PadPlacementVisualDefinition {
  const groupedViews = new Map<string, PadOverlayView>();

  source.padAnchors.forEach((padReference) => {
    const anchor = getPadPlacementAnchor(padReference.anchorId);

    if (!anchor) {
      return;
    }

    const viewKey = `${anchor.imageKey}-${anchor.view}-${anchor.regionId}`;

    if (!groupedViews.has(viewKey)) {
      groupedViews.set(viewKey, {
        id: `${source.id}-${viewKey}`,
        title: getViewTitle(anchor.imageKey),
        view: anchor.view,
        regionId: anchor.regionId,
        imageKey: anchor.imageKey,
        pads: [],
      });
    }

    groupedViews.get(viewKey)?.pads.push({
      id: padReference.padId,
      x: anchor.x,
      y: anchor.y,
      label:
        padReference.label ??
        `${padReference.padId.toUpperCase()} — ${anchor.label}`,
      anchorId: anchor.id,
      technicalAnchor: anchor.technicalAnchor,
    });
  });

  return {
    id: source.id,
    regionId: source.regionId,
    chipLabel: source.chipLabel,
    technicalArea: source.technicalArea,
    views: Array.from(groupedViews.values()),
  };
}

export const PAD_PLACEMENT_VISUALS: PadPlacementVisualDefinition[] =
  PAD_PLACEMENT_VISUAL_SOURCES.map(buildVisualFromAnchors);

export function getPadPlacementVisual(
  regionId?: StableBodyRegionId | null,
  chipLabel?: string | null
): PadPlacementVisualDefinition | null {
  const normalizedChip = normalize(chipLabel);

  if (!regionId || !normalizedChip) {
    return null;
  }

  return (
    PAD_PLACEMENT_VISUALS.find(
      (item) =>
        item.regionId === regionId &&
        normalize(item.chipLabel) === normalizedChip
    ) ?? null
  );
}
