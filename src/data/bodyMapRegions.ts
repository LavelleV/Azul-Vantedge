export type BodyMapView = 'front' | 'back' | 'both';

export type CloseUpHotspot = {
  id: string;
  label: string;
  displayName: string;
  clinicalName?: string;
  x: number;
  y: number;
  width: number;
  height: number;
};

export type BodyMapPrimaryRegion = {
  id: string;
  label: string;
  supportedView: BodyMapView;
  assetKey: string;
  x: number;
  y: number;
  width: number;
  height: number;
  closeUpTitle: string;
  closeUpHotspots: CloseUpHotspot[];
};

// Future anatomical image assets:
// assets/body-map/full/front-full-body.png
// assets/body-map/full/back-full-body.png
// assets/body-map/regions/*.png
//
// Overlay coordinates are intentionally stored as percentages of a stable canvas so
// future image assets can be swapped in without rewriting interaction logic.
// x/y/width/height values below are percentages of the rendered image area.

export const fullBodyRegions: BodyMapPrimaryRegion[] = [
  {
    id: 'head',
    label: 'Head',
    supportedView: 'both',
    assetKey: 'head-face-front',
    x: 40,
    y: 3,
    width: 20,
    height: 9,
    closeUpTitle: 'Head Detail',
    closeUpHotspots: [
      { id: 'head-brain', label: 'Head / Brain', displayName: 'Head / Brain', x: 26, y: 10, width: 48, height: 18 },
      { id: 'ocular-refresh', label: 'Eye / Cranial Tension', displayName: 'Eye / Cranial Tension', x: 22, y: 36, width: 56, height: 16 },
      { id: 'base-skull', label: 'Base of Skull', displayName: 'Base of Skull', x: 28, y: 60, width: 44, height: 14 },
    ],
  },
  {
    id: 'neck',
    label: 'Neck',
    supportedView: 'both',
    assetKey: 'neck-front',
    x: 44,
    y: 12,
    width: 12,
    height: 5,
    closeUpTitle: 'Neck Detail',
    closeUpHotspots: [
      { id: 'front-neck', label: 'Front Neck', displayName: 'Front Neck', x: 26, y: 18, width: 48, height: 14 },
      { id: 'side-neck', label: 'Side Neck', displayName: 'Side Neck', x: 18, y: 38, width: 64, height: 14 },
      { id: 'base-skull-neck', label: 'Base of Skull', displayName: 'Base of Skull', x: 26, y: 58, width: 48, height: 14 },
      { id: 'upper-trap', label: 'Upper Trap', displayName: 'Upper Trap', x: 18, y: 76, width: 64, height: 14 },
      { id: 'cervical-spine', label: 'Cervical Spine', displayName: 'Cervical Spine', x: 32, y: 46, width: 36, height: 16 },
    ],
  },
  {
    id: 'shoulder',
    label: 'Shoulder',
    supportedView: 'both',
    assetKey: 'shoulder-front',
    x: 21,
    y: 15,
    width: 58,
    height: 6,
    closeUpTitle: 'Shoulder Detail',
    closeUpHotspots: [
      { id: 'front-shoulder', label: 'Front Shoulder', displayName: 'Front Shoulder', x: 18, y: 20, width: 64, height: 14 },
      { id: 'top-shoulder', label: 'Top Shoulder', displayName: 'Top Shoulder', x: 26, y: 38, width: 48, height: 12 },
      { id: 'rotator-cuff', label: 'Rotator Cuff', displayName: 'Rotator Cuff', x: 22, y: 56, width: 56, height: 14 },
      { id: 'shoulder-blade', label: 'Shoulder Blade', displayName: 'Shoulder Blade', x: 18, y: 74, width: 64, height: 14 },
      { id: 'rear-shoulder', label: 'Rear Shoulder', displayName: 'Rear Shoulder', x: 22, y: 90, width: 56, height: 10 },
    ],
  },
  {
    id: 'arm',
    label: 'Arm',
    supportedView: 'both',
    assetKey: 'arm-front',
    x: 8,
    y: 20,
    width: 84,
    height: 16,
    closeUpTitle: 'Arm Detail',
    closeUpHotspots: [
      { id: 'upper-arm', label: 'Upper Arm', displayName: 'Upper Arm', x: 20, y: 18, width: 60, height: 18 },
      { id: 'elbow', label: 'Elbow', displayName: 'Elbow', x: 26, y: 44, width: 48, height: 14 },
      { id: 'forearm', label: 'Forearm', displayName: 'Forearm', x: 22, y: 64, width: 56, height: 18 },
      { id: 'wrist-hand', label: 'Wrist / Hand', displayName: 'Wrist / Hand', x: 24, y: 88, width: 52, height: 10 },
    ],
  },
  {
    id: 'chest',
    label: 'Chest',
    supportedView: 'front',
    assetKey: 'chest-front',
    x: 31,
    y: 20,
    width: 38,
    height: 9,
    closeUpTitle: 'Chest Detail',
    closeUpHotspots: [
      { id: 'upper-chest', label: 'Upper Chest', displayName: 'Upper Chest', x: 20, y: 18, width: 60, height: 18 },
      { id: 'left-chest', label: 'Left Chest', displayName: 'Left Chest', x: 16, y: 42, width: 30, height: 20 },
      { id: 'right-chest', label: 'Right Chest', displayName: 'Right Chest', x: 54, y: 42, width: 30, height: 20 },
      { id: 'sternum', label: 'Center Chest / Sternum', displayName: 'Center Chest / Sternum', x: 42, y: 66, width: 16, height: 18 },
    ],
  },
  {
    id: 'abdomen',
    label: 'Abdomen / Gut',
    supportedView: 'front',
    assetKey: 'abdomen-front',
    x: 34,
    y: 30,
    width: 32,
    height: 10,
    closeUpTitle: 'Abdomen / Gut Detail',
    closeUpHotspots: [
      { id: 'upper-abdomen', label: 'Upper Abdomen', displayName: 'Upper Abdomen', x: 20, y: 16, width: 60, height: 16 },
      { id: 'lower-abdomen', label: 'Lower Abdomen', displayName: 'Lower Abdomen', x: 20, y: 38, width: 60, height: 16 },
      { id: 'left-abdomen', label: 'Left Abdomen', displayName: 'Left Abdomen', x: 14, y: 60, width: 28, height: 18 },
      { id: 'right-abdomen', label: 'Right Abdomen', displayName: 'Right Abdomen', x: 58, y: 60, width: 28, height: 18 },
      { id: 'center-gut', label: 'Center Abdomen / Gut', displayName: 'Center Abdomen / Gut', x: 36, y: 82, width: 28, height: 12 },
    ],
  },
  {
    id: 'low-back',
    label: 'Low Back',
    supportedView: 'back',
    assetKey: 'low-back-back',
    x: 33,
    y: 31,
    width: 34,
    height: 10,
    closeUpTitle: 'Low Back Detail',
    closeUpHotspots: [
      { id: 'lumbar-center', label: 'Lumbar Center', displayName: 'Lumbar Center', x: 32, y: 18, width: 36, height: 18 },
      { id: 'left-low-back', label: 'Left Low Back', displayName: 'Left Low Back', x: 12, y: 44, width: 28, height: 18 },
      { id: 'right-low-back', label: 'Right Low Back', displayName: 'Right Low Back', x: 60, y: 44, width: 28, height: 18 },
      { id: 'sacrum', label: 'Sacrum', displayName: 'Sacrum', x: 34, y: 68, width: 32, height: 14 },
      { id: 'si-joint', label: 'SI Joint', displayName: 'SI Joint', x: 22, y: 86, width: 56, height: 10 },
    ],
  },
  {
    id: 'hip-glute',
    label: 'Hip / Glute',
    supportedView: 'both',
    assetKey: 'hip-glute-back',
    x: 28,
    y: 40,
    width: 44,
    height: 8,
    closeUpTitle: 'Hip / Glute Detail',
    closeUpHotspots: [
      { id: 'glute', label: 'Glute', displayName: 'Glute', x: 24, y: 22, width: 42, height: 14 },
      { id: 'piriformis', label: 'Piriformis', displayName: 'Piriformis / Deep Glute', x: 36, y: 40, width: 28, height: 12 },
      { id: 'si-joint-hip', label: 'SI Joint', displayName: 'SI Joint', x: 42, y: 56, width: 18, height: 10 },
      { id: 'lateral-hip', label: 'Lateral Hip', displayName: 'Lateral Hip / Greater Trochanter', x: 18, y: 60, width: 20, height: 14 },
      { id: 'front-hip', label: 'Front Hip', displayName: 'Front Hip / Hip Flexor', x: 64, y: 60, width: 18, height: 14 },
      { id: 'hamstring-origin', label: 'Hamstring Origin', displayName: 'Upper Hamstring Origin', x: 38, y: 82, width: 24, height: 10 },
    ],
  },
  {
    id: 'thigh',
    label: 'Thigh',
    supportedView: 'both',
    assetKey: 'thigh-front',
    x: 32,
    y: 48,
    width: 34,
    height: 16,
    closeUpTitle: 'Thigh Detail',
    closeUpHotspots: [
      { id: 'front-thigh', label: 'Front Thigh', displayName: 'Front Thigh', x: 20, y: 16, width: 60, height: 18 },
      { id: 'inner-thigh', label: 'Inner Thigh', displayName: 'Inner Thigh', x: 24, y: 42, width: 52, height: 16 },
      { id: 'outer-thigh', label: 'Outer Thigh', displayName: 'Outer Thigh', x: 18, y: 64, width: 64, height: 16 },
      { id: 'rear-thigh', label: 'Rear Thigh', displayName: 'Rear Thigh', x: 22, y: 86, width: 56, height: 10 },
    ],
  },
  {
    id: 'knee',
    label: 'Knee',
    supportedView: 'both',
    assetKey: 'knee-front',
    x: 35,
    y: 65,
    width: 30,
    height: 6,
    closeUpTitle: 'Knee Detail',
    closeUpHotspots: [
      { id: 'kneecap', label: 'Kneecap', displayName: 'Kneecap', x: 30, y: 20, width: 40, height: 16 },
      { id: 'inner-knee', label: 'Inner Knee', displayName: 'Inner Knee', x: 12, y: 44, width: 30, height: 18 },
      { id: 'outer-knee', label: 'Outer Knee', displayName: 'Outer Knee', x: 58, y: 44, width: 30, height: 18 },
      { id: 'back-knee', label: 'Back of Knee', displayName: 'Back of Knee', x: 24, y: 70, width: 52, height: 14 },
    ],
  },
  {
    id: 'lower-leg',
    label: 'Lower Leg',
    supportedView: 'both',
    assetKey: 'lower-leg-front',
    x: 34,
    y: 72,
    width: 32,
    height: 14,
    closeUpTitle: 'Lower Leg Detail',
    closeUpHotspots: [
      { id: 'shin', label: 'Shin', displayName: 'Shin', x: 30, y: 16, width: 40, height: 22 },
      { id: 'calf', label: 'Calf', displayName: 'Calf', x: 26, y: 44, width: 48, height: 20 },
      { id: 'inner-lower-leg', label: 'Inner Lower Leg', displayName: 'Inner Lower Leg', x: 14, y: 70, width: 30, height: 16 },
      { id: 'outer-lower-leg', label: 'Outer Lower Leg', displayName: 'Outer Lower Leg', x: 56, y: 70, width: 30, height: 16 },
    ],
  },
  {
    id: 'foot-ankle',
    label: 'Foot / Ankle',
    supportedView: 'both',
    assetKey: 'foot-top',
    x: 31,
    y: 87,
    width: 38,
    height: 7,
    closeUpTitle: 'Foot / Ankle Detail',
    closeUpHotspots: [
      { id: 'heel', label: 'Heel', displayName: 'Heel', x: 14, y: 18, width: 26, height: 16 },
      { id: 'arch', label: 'Arch', displayName: 'Arch', x: 42, y: 20, width: 24, height: 16 },
      { id: 'ball-of-foot', label: 'Ball of Foot', displayName: 'Ball of Foot', x: 68, y: 18, width: 18, height: 16 },
      { id: 'toes', label: 'Toes', displayName: 'Toes', x: 72, y: 42, width: 16, height: 14 },
      { id: 'inner-ankle', label: 'Inner Ankle', displayName: 'Inner Ankle', x: 18, y: 64, width: 22, height: 14 },
      { id: 'outer-ankle', label: 'Outer Ankle', displayName: 'Outer Ankle', x: 60, y: 64, width: 22, height: 14 },
      { id: 'achilles', label: 'Achilles', displayName: 'Achilles', x: 40, y: 84, width: 20, height: 12 },
    ],
  },
];
