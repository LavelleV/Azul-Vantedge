# Azul Vantedge — Body Map + Pad Placement Image System

## Goal

Complete the body-region image system and add a reliable pad-placement image system.

The app must support:

1. remaining body-area close-up images
2. matching pad-placement image versions
3. `src/services/padPlacementRules.ts` as the source of truth for placement text
4. UI display of the correct pad-placement image based on selected body region/chip

## Critical Rule

Do not let the app guess or improvise body images or pad placement images.

The app must use:

- stable region IDs
- explicit asset mappings
- explicit pad placement rules
- visible fallback cards when assets are missing

No blank panels.
No wrong substitute images.
No random boxes.
No dynamic image guessing.

## Files to focus on

Primary files:

- `src/components/BodyMap.tsx`
- `src/data/bodyMapRegions.ts`
- `src/services/padPlacementRules.ts`

Create if useful:

- `src/data/bodyMapManifest.ts`
- `src/data/bodyMapAssetMap.ts`
- `src/data/padPlacementManifest.ts`

Do not change unrelated app areas.

Do not change:

- `src/services/azulAgent.ts`
- saved sessions
- Vibe Journal
- Reference Grid
- onboarding
- legal/disclaimer/settings
- assessment email
- dashboard behavior outside BodyMap
- protocol library unless only needed for display compatibility

## Stable Region IDs

Use only these stable IDs:

- `head`
- `neck`
- `shoulder`
- `arm`
- `chest`
- `abdomen`
- `low_back`
- `hip_glute`
- `thigh`
- `knee`
- `lower_leg`
- `foot_ankle`

Any older/inconsistent IDs must normalize back to these.

Examples of IDs that should not be used directly:

- `glute`
- `hip`
- `hips`
- `foot`
- `ankle`
- `lowBack`
- `lowerLeg`

## Required Manifest Shape

Each broad region should include:

```ts
{
  id: string;
  label: string;
  frontImageFile: string | null;
  backImageFile: string | null;
  placementFrontImageFile?: string | null;
  placementBackImageFile?: string | null;
  chips: string[];
  detailSupported: boolean;
}
```
