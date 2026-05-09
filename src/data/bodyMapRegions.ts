export type BodyMapView = "front" | "back";

export type StableBodyRegionId =
  | "head"
  | "neck"
  | "shoulder"
  | "arm"
  | "chest"
  | "abdomen"
  | "low_back"
  | "hip_glute"
  | "thigh"
  | "knee"
  | "lower_leg"
  | "foot_ankle";

export type RegionImageFile =
  | "abdomen-front.png"
  | "arm-front.png"
  | "chest-front.png"
  | "foot-ankle-front.png"
  | "foot-bottom-plantar.png"
  | "head-face-front.png"
  | "head-neck-back.png"
  | "head-side-jaw-tmj.png"
  | "hip-front.png"
  | "hip-glute-back.png"
  | "knee-front.png"
  | "low-back-back.png"
  | "lower-leg-front.png"
  | "neck-front.png"
  | "posterior-shoulder-back.png"
  | "scapula-back.png"
  | "shoulder-back.png"
  | "shoulder-front.png"
  | "sinus-face-front.png"
  | "thigh-front.png";

export type PadPlacementImageFile =
  | "arm-front-placement.png"
  | "foot-ankle-front-placement.png"
  | "hip-glute-back-placement.png"
  | "knee-front-placement.png"
  | "low-back-back-placement.png"
  | "shoulder-front-placement.png";

export type BodyMapManifestRegion = {
  id: StableBodyRegionId;
  label: string;
  shortLabel: string;
  description: string;
  frontImageFile?: RegionImageFile;
  backImageFile?: RegionImageFile;
  placementFrontImageFile?: PadPlacementImageFile;
  placementBackImageFile?: PadPlacementImageFile;
  chips: string[];
  detailSupported: boolean;
};

export type FullBodyHotspot = {
  id: string;
  view: BodyMapView;
  regionId: StableBodyRegionId;
  tapRect: {
    left: number;
    top: number;
    width: number;
    height: number;
  };
  priority: number;
};

export const BODY_MAP_MANIFEST: Record<
  StableBodyRegionId,
  BodyMapManifestRegion
> = {
  head: {
    id: "head",
    label: "Head / Face / Jaw",
    shortLabel: "Head",
    description:
      "Head, face, jaw, sinus, temple, forehead, and head-neck support areas.",
    frontImageFile: "head-face-front.png",
    backImageFile: "head-neck-back.png",
    chips: ["Forehead", "Temple", "Jaw / TMJ", "Cheek", "Sinus", "Ear Area"],
    detailSupported: true,
  },
  neck: {
    id: "neck",
    label: "Neck",
    shortLabel: "Neck",
    description: "Front and upper neck support area.",
    frontImageFile: "neck-front.png",
    backImageFile: "head-neck-back.png",
    chips: ["Front Neck", "Side Neck", "Base of Skull", "Upper Cervical"],
    detailSupported: true,
  },
  shoulder: {
    id: "shoulder",
    label: "Shoulder",
    shortLabel: "Shoulder",
    description:
      "Front shoulder, rotator cuff, shoulder blade, upper trap, and posterior shoulder support.",
    frontImageFile: "shoulder-front.png",
    backImageFile: "shoulder-back.png",
    placementFrontImageFile: "shoulder-front-placement.png",
    chips: [
      "Front Shoulder / Coracoid Area",
      "Top Shoulder / AC Joint",
      "Rotator Cuff",
      "Rear Shoulder",
      "Shoulder Blade / Scapula",
      "Upper Trap",
    ],
    detailSupported: true,
  },
  arm: {
    id: "arm",
    label: "Arm / Hand",
    shortLabel: "Arm",
    description: "Arm, forearm, elbow, wrist, and hand pathway.",
    frontImageFile: "arm-front.png",
    placementFrontImageFile: "arm-front-placement.png",
    chips: ["Upper Arm", "Elbow", "Forearm", "Wrist", "Hand / Palm"],
    detailSupported: true,
  },
  chest: {
    id: "chest",
    label: "Chest / Ribs",
    shortLabel: "Chest",
    description: "Chest, sternum, rib, and breathing-area support.",
    frontImageFile: "chest-front.png",
    chips: ["Upper Chest", "Sternum", "Ribs", "Side Ribs"],
    detailSupported: true,
  },
  abdomen: {
    id: "abdomen",
    label: "Abdomen / Gut",
    shortLabel: "Abdomen",
    description: "Abdomen, stomach, lower abdomen, and digestive-area support.",
    frontImageFile: "abdomen-front.png",
    chips: ["Upper Abdomen", "Lower Abdomen", "Stomach Area", "Side Abdomen"],
    detailSupported: true,
  },
  low_back: {
    id: "low_back",
    label: "Low Back / SI",
    shortLabel: "Low Back",
    description: "Low back, lumbar, sacrum, and SI joint support.",
    backImageFile: "low-back-back.png",
    placementBackImageFile: "low-back-back-placement.png",
    chips: ["Lumbar Center", "Left Low Back", "Right Low Back", "Sacrum", "SI Joint"],
    detailSupported: true,
  },
  hip_glute: {
    id: "hip_glute",
    label: "Hip / Glute / Pelvis",
    shortLabel: "Hip",
    description: "Hip, glute, piriformis, pelvis, and front hip support.",
    frontImageFile: "hip-front.png",
    backImageFile: "hip-glute-back.png",
    placementBackImageFile: "hip-glute-back-placement.png",
    chips: [
      "Front Hip / Hip Flexor",
      "Outer Hip",
      "Glute",
      "Piriformis / Deep Glute",
      "Groin / Inner Hip",
    ],
    detailSupported: true,
  },
  thigh: {
    id: "thigh",
    label: "Thigh",
    shortLabel: "Thigh",
    description: "Front thigh and upper leg support.",
    frontImageFile: "thigh-front.png",
    chips: ["Quad", "Inner Thigh", "Outer Thigh", "Hamstring"],
    detailSupported: true,
  },
  knee: {
    id: "knee",
    label: "Knee",
    shortLabel: "Knee",
    description: "Knee, kneecap, patellar tendon, and knee support pathway.",
    frontImageFile: "knee-front.png",
    placementFrontImageFile: "knee-front-placement.png",
    chips: ["Kneecap / Patella", "Above Knee", "Below Knee", "Inner Knee", "Outer Knee"],
    detailSupported: true,
  },
  lower_leg: {
    id: "lower_leg",
    label: "Lower Leg",
    shortLabel: "Lower Leg",
    description: "Shin, calf, lower leg, and Achilles pathway.",
    frontImageFile: "lower-leg-front.png",
    chips: ["Shin", "Calf", "Achilles", "Outer Lower Leg"],
    detailSupported: true,
  },
  foot_ankle: {
    id: "foot_ankle",
    label: "Foot / Ankle",
    shortLabel: "Foot",
    description: "Foot, ankle, heel, arch, toes, and plantar pathway.",
    frontImageFile: "foot-ankle-front.png",
    placementFrontImageFile: "foot-ankle-front-placement.png",
    chips: ["Heel", "Arch", "Ball of Foot", "Toes", "Inner Ankle", "Outer Ankle", "Achilles"],
    detailSupported: true,
  },
};

export const BODY_MAP_REGION_LIST: BodyMapManifestRegion[] = [
  BODY_MAP_MANIFEST.head,
  BODY_MAP_MANIFEST.neck,
  BODY_MAP_MANIFEST.shoulder,
  BODY_MAP_MANIFEST.arm,
  BODY_MAP_MANIFEST.chest,
  BODY_MAP_MANIFEST.abdomen,
  BODY_MAP_MANIFEST.low_back,
  BODY_MAP_MANIFEST.hip_glute,
  BODY_MAP_MANIFEST.thigh,
  BODY_MAP_MANIFEST.knee,
  BODY_MAP_MANIFEST.lower_leg,
  BODY_MAP_MANIFEST.foot_ankle,
];

export const FULL_BODY_HOTSPOTS: FullBodyHotspot[] = [
  {
    id: "front-head",
    view: "front",
    regionId: "head",
    tapRect: { left: 42, top: 4, width: 16, height: 12 },
    priority: 10,
  },
  {
    id: "front-neck",
    view: "front",
    regionId: "neck",
    tapRect: { left: 43, top: 15, width: 14, height: 8 },
    priority: 20,
  },
  {
    id: "front-left-shoulder",
    view: "front",
    regionId: "shoulder",
    tapRect: { left: 28, top: 20, width: 18, height: 11 },
    priority: 30,
  },
  {
    id: "front-right-shoulder",
    view: "front",
    regionId: "shoulder",
    tapRect: { left: 54, top: 20, width: 18, height: 11 },
    priority: 31,
  },
  {
    id: "front-left-arm",
    view: "front",
    regionId: "arm",
    tapRect: { left: 18, top: 28, width: 18, height: 30 },
    priority: 45,
  },
  {
    id: "front-right-arm",
    view: "front",
    regionId: "arm",
    tapRect: { left: 64, top: 28, width: 18, height: 30 },
    priority: 46,
  },
  {
    id: "front-chest",
    view: "front",
    regionId: "chest",
    tapRect: { left: 38, top: 25, width: 24, height: 15 },
    priority: 40,
  },
  {
    id: "front-abdomen",
    view: "front",
    regionId: "abdomen",
    tapRect: { left: 39, top: 40, width: 22, height: 18 },
    priority: 50,
  },
  {
    id: "front-hip",
    view: "front",
    regionId: "hip_glute",
    tapRect: { left: 36, top: 57, width: 28, height: 12 },
    priority: 60,
  },
  {
    id: "front-left-thigh",
    view: "front",
    regionId: "thigh",
    tapRect: { left: 35, top: 67, width: 12, height: 17 },
    priority: 70,
  },
  {
    id: "front-right-thigh",
    view: "front",
    regionId: "thigh",
    tapRect: { left: 53, top: 67, width: 12, height: 17 },
    priority: 71,
  },
  {
    id: "front-left-knee",
    view: "front",
    regionId: "knee",
    tapRect: { left: 35, top: 82, width: 12, height: 8 },
    priority: 80,
  },
  {
    id: "front-right-knee",
    view: "front",
    regionId: "knee",
    tapRect: { left: 53, top: 82, width: 12, height: 8 },
    priority: 81,
  },
  {
    id: "front-left-lower-leg",
    view: "front",
    regionId: "lower_leg",
    tapRect: { left: 34, top: 89, width: 13, height: 8 },
    priority: 90,
  },
  {
    id: "front-right-lower-leg",
    view: "front",
    regionId: "lower_leg",
    tapRect: { left: 53, top: 89, width: 13, height: 8 },
    priority: 91,
  },
  {
    id: "front-left-foot",
    view: "front",
    regionId: "foot_ankle",
    tapRect: { left: 30, top: 96, width: 18, height: 4 },
    priority: 100,
  },
  {
    id: "front-right-foot",
    view: "front",
    regionId: "foot_ankle",
    tapRect: { left: 52, top: 96, width: 18, height: 4 },
    priority: 101,
  },

  {
    id: "back-head",
    view: "back",
    regionId: "head",
    tapRect: { left: 42, top: 4, width: 16, height: 12 },
    priority: 10,
  },
  {
    id: "back-neck",
    view: "back",
    regionId: "neck",
    tapRect: { left: 43, top: 15, width: 14, height: 8 },
    priority: 20,
  },
  {
    id: "back-left-shoulder",
    view: "back",
    regionId: "shoulder",
    tapRect: { left: 27, top: 20, width: 19, height: 11 },
    priority: 30,
  },
  {
    id: "back-right-shoulder",
    view: "back",
    regionId: "shoulder",
    tapRect: { left: 54, top: 20, width: 19, height: 11 },
    priority: 31,
  },
  {
    id: "back-left-arm",
    view: "back",
    regionId: "arm",
    tapRect: { left: 17, top: 28, width: 18, height: 30 },
    priority: 45,
  },
  {
    id: "back-right-arm",
    view: "back",
    regionId: "arm",
    tapRect: { left: 65, top: 28, width: 18, height: 30 },
    priority: 46,
  },
  {
    id: "back-low-back",
    view: "back",
    regionId: "low_back",
    tapRect: { left: 38, top: 43, width: 24, height: 17 },
    priority: 50,
  },
  {
    id: "back-hip-glute",
    view: "back",
    regionId: "hip_glute",
    tapRect: { left: 35, top: 58, width: 30, height: 13 },
    priority: 60,
  },
  {
    id: "back-left-thigh",
    view: "back",
    regionId: "thigh",
    tapRect: { left: 34, top: 70, width: 13, height: 14 },
    priority: 70,
  },
  {
    id: "back-right-thigh",
    view: "back",
    regionId: "thigh",
    tapRect: { left: 53, top: 70, width: 13, height: 14 },
    priority: 71,
  },
  {
    id: "back-left-knee",
    view: "back",
    regionId: "knee",
    tapRect: { left: 34, top: 83, width: 13, height: 7 },
    priority: 80,
  },
  {
    id: "back-right-knee",
    view: "back",
    regionId: "knee",
    tapRect: { left: 53, top: 83, width: 13, height: 7 },
    priority: 81,
  },
  {
    id: "back-left-lower-leg",
    view: "back",
    regionId: "lower_leg",
    tapRect: { left: 34, top: 89, width: 13, height: 8 },
    priority: 90,
  },
  {
    id: "back-right-lower-leg",
    view: "back",
    regionId: "lower_leg",
    tapRect: { left: 53, top: 89, width: 13, height: 8 },
    priority: 91,
  },
  {
    id: "back-left-foot",
    view: "back",
    regionId: "foot_ankle",
    tapRect: { left: 30, top: 96, width: 18, height: 4 },
    priority: 100,
  },
  {
    id: "back-right-foot",
    view: "back",
    regionId: "foot_ankle",
    tapRect: { left: 52, top: 96, width: 18, height: 4 },
    priority: 101,
  },
];

export const bodyMapManifest = BODY_MAP_MANIFEST;
export const bodyMapRegions = BODY_MAP_REGION_LIST;
export const fullBodyHotspots = FULL_BODY_HOTSPOTS;
