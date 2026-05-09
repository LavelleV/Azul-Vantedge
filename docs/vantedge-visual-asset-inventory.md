# Vantedge Visual Asset Inventory

## Purpose

This document tracks the visual asset system for Azul Vantedge — The Biological Edge.

The goal is to avoid adding images one at a time only when something breaks or looks incomplete. Instead, this file creates a complete visual roadmap for:

- existing assets
- missing assets
- protocol strategies that need each image
- priority level
- front/back requirements
- calibration anchor requirements
- implementation status

## Core Rule

Do not import an image file into TypeScript until the PNG physically exists in the project.

Safe order:

1. Plan the filename here.
2. Create or generate the image.
3. Move the image into `assets/body-map/regions` or the proper folder.
4. Add the image import.
5. Add the image key to the visual resolver.
6. Add or calibrate anchors.
7. Run `npx tsc --noEmit`.
8. Test visually.
9. Commit.

---

# Existing Assets

## Full Body Images

| File | Status | Notes |
|---|---|---|
| `assets/body-map/full/front-full-body.png` | Existing | Used by full body front map |
| `assets/body-map/full/back-full-body.png` | Existing | Used by full body back map |

## Region Images

| File | Status | Current Use |
|---|---|---|
| `assets/body-map/regions/abdomen-front.png` | Existing | Abdomen detail |
| `assets/body-map/regions/arm-front.png` | Existing | Arm, forearm, elbow/wrist fallback |
| `assets/body-map/regions/chest-front.png` | Existing | Chest/ribs detail |
| `assets/body-map/regions/foot-ankle-front.png` | Existing | Foot/ankle front detail |
| `assets/body-map/regions/hip-front.png` | Existing | Front hip / ASIS view |
| `assets/body-map/regions/hip-glute-back.png` | Existing | Back hip/glute view |
| `assets/body-map/regions/knee-front.png` | Existing | Knee front detail |
| `assets/body-map/regions/low-back-back.png` | Existing | Low back / SI back view |
| `assets/body-map/regions/lower-leg-front.png` | Existing | Lower leg front detail |
| `assets/body-map/regions/neck-front.png` | Existing | Neck front detail |
| `assets/body-map/regions/shoulder-front.png` | Existing | Shoulder front/oblique detail |
| `assets/body-map/regions/thigh-front.png` | Existing | Thigh front detail |

## Static Pad-Placement Images

| File | Status | Notes |
|---|---|---|
| `assets/body-map/pad-placement/arm-front-placement.png` | Existing | Static fallback |
| `assets/body-map/pad-placement/foot-ankle-front-placement.png` | Existing | Static fallback |
| `assets/body-map/pad-placement/hip-glute-back-placement.png` | Existing | Static fallback |
| `assets/body-map/pad-placement/knee-front-placement.png` | Existing | Static fallback |
| `assets/body-map/pad-placement/low-back-back-placement.png` | Existing | Static fallback |
| `assets/body-map/pad-placement/shoulder-front-placement.png` | Existing | Static fallback |

---

# Current Visual System

## Active Runtime Files

| File | Purpose |
|---|---|
| `src/components/BodyMap.tsx` | Body map, region detail, chip fallback pad placement |
| `src/components/PadPlacementOverlay.tsx` | Draws pad markers |
| `src/components/PadPlacementVisualPanel.tsx` | Renders one or multiple visual placement panels |
| `src/components/PadPlacementCalibrationTool.tsx` | Developer calibration tool for x/y coordinates |
| `src/components/ProtocolResponseCard.tsx` | Shows AI-matched protocol pad strategy |
| `src/data/padPlacementAnchors.ts` | Reusable approved anatomical anchor coordinates |
| `src/data/padPlacementVisuals.ts` | Visual definitions that use anchor IDs |
| `src/data/protocolPlacementStrategies.ts` | Issue-based strategy library |
| `src/services/protocolPlacementMatcher.ts` | Matches user issue + protocol card to strategy |

## Current Visual Logic

The correct hierarchy is:

1. User enters issue.
2. Azul generates protocol guidance.
3. Protocol card includes pad placement text.
4. `protocolPlacementMatcher.ts` matches the issue + guidance to a strategy.
5. Strategy maps to a visual.
6. Visual uses approved anchors.
7. Front/back panels appear when the strategy uses anchors from different views.

---

# Master Missing Asset Plan

## Priority Levels

| Priority | Meaning |
|---|---|
| P1 | Needed soon; currently affects important matched strategies |
| P2 | Important for better accuracy and professional presentation |
| P3 | Useful later; not blocking current workflow |

---

# 1. Head / Face / Jaw / Neck Visuals

These are high priority because non-muscle protocols are already matching, but the visual guide is missing.

## Needed Assets

| Proposed File | Priority | Needed For | Front/Back Needed | Anchor Needed | Status |
|---|---:|---|---|---|---|
| `head-face-front.png` | P1 | brain fog, focus, headache, forehead placement | Front | Yes | Missing |
| `head-neck-back.png` | P1 | brain fog, stress reset, suboccipital placement | Back | Yes | Missing |
| `head-side-jaw-tmj.png` | P1 | jaw, TMJ, clenching, temple support | Side | Yes | Missing |
| `sinus-face-front.png` | P1 | sinus, cheek pressure, face pressure | Front | Yes | Missing |
| `temple-side-head.png` | P2 | headache, temple tension, jaw support | Side | Yes | Missing |
| `suboccipital-neck-back.png` | P2 | upper cervical, base of skull, head-neck pathway | Back | Yes | Missing |

## Strategies Covered

| Strategy ID | Label | Visual Need |
|---|---|---|
| `brain_fog_head_neck` | Brain Fog / Focus / Head-Neck Support | Forehead + back of neck |
| `stress_nervous_system_head_neck` | Stress / Nervous-System Reset | Forehead + back of neck |
| `sinus_head_face` | Sinus / Face Pressure Support | Forehead / cheek / sinus |
| `jaw_tmj_face` | Jaw / TMJ Support | Jaw / TMJ + temple or cheek |
| `headache_head_neck` | Head Tension / Headache Pattern | Head tension area + suboccipital |

## Anchor Plan

| Anchor ID | Image | Technical Area |
|---|---|---|
| `frontal_region_forehead` | `head-face-front.png` | Frontal region / forehead above eyebrows |
| `suboccipital_upper_cervical` | `head-neck-back.png` | Suboccipital / upper cervical region |
| `temple_temporalis` | `temple-side-head.png` | Temporalis / temple region |
| `tmj_masseter` | `head-side-jaw-tmj.png` | TMJ / masseter region |
| `maxillary_sinus_cheek` | `sinus-face-front.png` | Maxillary sinus / cheek region |
| `frontal_sinus_area` | `sinus-face-front.png` | Frontal sinus region |

---

# 2. Shoulder / Rotator Cuff / Scapula Visuals

The current `shoulder-front.png` is useful, but not enough for posterior shoulder accuracy.

## Needed Assets

| Proposed File | Priority | Needed For | Front/Back Needed | Anchor Needed | Status |
|---|---:|---|---|---|---|
| `shoulder-back.png` | P1 | rear shoulder, rotator cuff, scapula, upper trap | Back | Yes | Missing |
| `posterior-shoulder-back.png` | P1 | rotator cuff, posterior deltoid, rear shoulder | Back | Yes | Missing |
| `scapula-back.png` | P1 | shoulder blade, rhomboid, infraspinatus | Back | Yes | Missing |
| `neck-shoulder-back.png` | P1 | upper trap, levator scapulae, neck-to-shoulder | Back | Yes | Missing |
| `upper-trap-back.png` | P2 | upper trap pathway | Back | Yes | Missing |
| `rotator-cuff-back.png` | P2 | rotator cuff detail | Back | Yes | Missing |

## Strategies Covered

| Strategy ID | Label | Visual Need |
|---|---|---|
| `upper_trap_tightness_pain` | Upper Trap Tightness / Pain | Neck/shoulder + scapular support |
| `neck_to_shoulder_tension` | Neck-to-Shoulder Tension | Upper cervical/levator + upper trap |
| `shoulder_blade_tension` | Shoulder Blade / Scapular Tension | Scapula/rhomboid pathway |
| `rotator_cuff_irritation` | Rotator Cuff / Shoulder Overuse | Posterior rotator cuff + lateral shoulder |

## Anchor Plan

| Anchor ID | Image | Technical Area |
|---|---|---|
| `upper_trapezius_back` | `neck-shoulder-back.png` | Upper trapezius region |
| `levator_scapulae_superior_scapula` | `neck-shoulder-back.png` | Levator scapulae / superior scapular region |
| `posterior_rotator_cuff_back` | `posterior-shoulder-back.png` | Infraspinatus / teres region |
| `posterior_deltoid_back` | `posterior-shoulder-back.png` | Posterior deltoid region |
| `scapular_medial_border` | `scapula-back.png` | Medial scapular border / rhomboid region |
| `lateral_shoulder_back_support` | `shoulder-back.png` | Lateral/posterior shoulder support region |

---

# 3. Low Back / SI / Pelvis Visuals

Current assets are usable, and SI front/back support is already working. Dedicated SI/pelvis views would improve accuracy.

## Existing Useful Assets

| File | Use |
|---|---|
| `low-back-back.png` | Back low-back / SI view |
| `hip-front.png` | Front hip / ASIS view |
| `hip-glute-back.png` | Back hip/glute view |

## Needed Assets

| Proposed File | Priority | Needed For | Front/Back Needed | Anchor Needed | Status |
|---|---:|---|---|---|---|
| `si-joint-back.png` | P2 | SI joint specific placement | Back | Yes | Missing |
| `pelvis-back.png` | P2 | pelvic ring / sacrum / SI | Back | Yes | Missing |
| `pelvis-front.png` | P2 | ASIS / front pelvis | Front | Yes | Missing |
| `hip-si-front-back-reference.png` | P3 | educational reference | Combo | Optional | Missing |

## Strategies Covered

| Strategy ID | Label | Visual Need |
|---|---|---|
| `si_joint_local_or_hip_referral` | SI Joint / Low-Back-to-Hip Pattern | Back SI + front hip/ASIS |
| `low_back_general_ache` | General Low-Back Ache / Lumbar Support | Lumbar + sacral support |

## Anchor Plan

| Anchor ID | Image | Technical Area |
|---|---|---|
| `si_joint_left` | `low-back-back.png` or `si-joint-back.png` | Left SI joint region |
| `si_joint_right` | `low-back-back.png` or `si-joint-back.png` | Right SI joint region |
| `asis_front_hip_bone` | `hip-front.png` or `pelvis-front.png` | ASIS / front hip bone |
| `sacrum_center` | `low-back-back.png` or `pelvis-back.png` | Sacral region |
| `lumbar_center` | `low-back-back.png` | Central lumbar region |

---

# 4. Chest / Ribs / Abdomen / Digestive Visuals

Needed for systemic, chest/rib, stomach, digestion, and abdominal support patterns.

## Existing Useful Assets

| File | Use |
|---|---|
| `chest-front.png` | Chest/rib detail |
| `abdomen-front.png` | Abdomen detail |

## Needed Assets

| Proposed File | Priority | Needed For | Front/Back Needed | Anchor Needed | Status |
|---|---:|---|---|---|---|
| `abdomen-detail-front.png` | P2 | stomach, digestion, abdominal tension | Front | Yes | Missing |
| `lower-abdomen-front.png` | P2 | lower abdomen / pelvic abdominal support | Front | Yes | Missing |
| `stomach-digestive-front.png` | P2 | stomach/digestive protocols | Front | Yes | Missing |
| `chest-ribs-front.png` | P2 | chest/rib support | Front | Yes | Missing |
| `rib-side-front.png` | P3 | side rib support | Side/front | Yes | Missing |
| `systemic-core-front.png` | P3 | broad wellness/systemic guidance | Front | Optional | Missing |

## Strategies Covered

| Strategy ID | Label | Visual Need |
|---|---|---|
| `systemic_general_wellness` | Systemic / General Wellness Support | protocol-specific; may need core/systemic visual |
| future `stomach_digestive_support` | Stomach / Digestive Support | abdomen/stomach |
| future `chest_rib_support` | Chest / Rib Support | chest/ribs |

## Anchor Plan

| Anchor ID | Image | Technical Area |
|---|---|---|
| `upper_abdomen_stomach` | `stomach-digestive-front.png` | Upper abdomen / stomach region |
| `lower_abdomen_support` | `lower-abdomen-front.png` | Lower abdominal region |
| `chest_sternum_region` | `chest-ribs-front.png` | Sternum / central chest region |
| `rib_lateral_support` | `rib-side-front.png` | Lateral rib support region |

---

# 5. Arm / Elbow / Wrist / Hand Visuals

Current `arm-front.png` is usable but too broad for elbow/wrist/hand precision.

## Existing Useful Assets

| File | Use |
|---|---|
| `arm-front.png` | Broad arm/forearm pathway |

## Needed Assets

| Proposed File | Priority | Needed For | Front/Back Needed | Anchor Needed | Status |
|---|---:|---|---|---|---|
| `elbow-front.png` | P2 | elbow soreness, tendon-like pulling | Front | Yes | Missing |
| `elbow-back.png` | P2 | posterior elbow / triceps side | Back | Yes | Missing |
| `forearm-front.png` | P2 | flexor pathway | Front | Yes | Missing |
| `forearm-back.png` | P2 | extensor pathway | Back | Yes | Missing |
| `wrist-hand-front.png` | P2 | wrist/hand tension | Front | Yes | Missing |
| `hand-palm.png` | P3 | palm/hand local support | Front/palm | Yes | Missing |

## Strategies Covered

| Strategy ID | Label | Visual Need |
|---|---|---|
| `arm_elbow_wrist_overuse` | Arm / Elbow / Wrist Overuse Pattern | elbow/forearm/wrist pathway |

## Anchor Plan

| Anchor ID | Image | Technical Area |
|---|---|---|
| `elbow_lateral_epicondyle` | `elbow-front.png` | Lateral elbow / extensor origin |
| `elbow_medial_epicondyle` | `elbow-front.png` | Medial elbow / flexor origin |
| `forearm_flexor_pathway` | `forearm-front.png` | Forearm flexor pathway |
| `forearm_extensor_pathway` | `forearm-back.png` | Forearm extensor pathway |
| `wrist_hand_support` | `wrist-hand-front.png` | Wrist/hand region |

---

# 6. Hip / Glute / Thigh Visuals

Current hip/glute images are useful. More detail may help deep glute, lateral hip, hip flexor, and thigh protocols.

## Existing Useful Assets

| File | Use |
|---|---|
| `hip-front.png` | Front hip / hip flexor / ASIS |
| `hip-glute-back.png` | Glute / piriformis / posterior hip |
| `thigh-front.png` | Thigh front |

## Needed Assets

| Proposed File | Priority | Needed For | Front/Back Needed | Anchor Needed | Status |
|---|---:|---|---|---|---|
| `hip-side-lateral.png` | P2 | outer hip / greater trochanter | Side | Yes | Missing |
| `piriformis-deep-glute-back.png` | P2 | piriformis / deep glute | Back | Yes | Missing |
| `hip-flexor-front.png` | P2 | front hip / hip flexor | Front | Yes | Missing |
| `thigh-back-hamstring.png` | P3 | hamstring support | Back | Yes | Missing |
| `thigh-side-it-band.png` | P3 | lateral thigh / IT band area | Side | Yes | Missing |

## Strategies Covered

| Strategy ID | Label | Visual Need |
|---|---|---|
| `hip_glute_deep_tension` | Deep Glute / Piriformis Pattern | deep glute + outer hip |
| future `hip_flexor_front_pattern` | Front Hip / Hip Flexor Pattern | hip flexor + ASIS |
| future `thigh_hamstring_pattern` | Hamstring / posterior thigh support | back thigh |

---

# 7. Knee / Lower Leg Visuals

Current knee front is useful. We need back and side views for more realistic knee/lower leg support.

## Existing Useful Assets

| File | Use |
|---|---|
| `knee-front.png` | Front knee / patella |
| `lower-leg-front.png` | Shin / lower leg front |

## Needed Assets

| Proposed File | Priority | Needed For | Front/Back Needed | Anchor Needed | Status |
|---|---:|---|---|---|---|
| `knee-back.png` | P2 | behind-knee support | Back | Yes | Missing |
| `knee-side.png` | P2 | inner/outer knee pathway | Side | Yes | Missing |
| `shin-front.png` | P2 | shin support | Front | Yes | Missing |
| `calf-back.png` | P2 | calf support | Back | Yes | Missing |
| `lower-leg-back.png` | P2 | calf/Achilles pathway | Back | Yes | Missing |

## Strategies Covered

| Strategy ID | Label | Visual Need |
|---|---|---|
| `knee_front_patella_tendon` | Front Knee / Patella-Tendon Pattern | front knee |
| future `calf_tightness_pattern` | Calf Tightness / Lower Leg Pattern | calf back |
| future `shin_soreness_pattern` | Shin / Lower Leg Front Pattern | shin front |

---

# 8. Foot / Ankle / Plantar Foot Visuals

Current foot/ankle front is useful but limited. Foot bottom and ankle side/back are important.

## Existing Useful Assets

| File | Use |
|---|---|
| `foot-ankle-front.png` | Front/top foot/ankle |

## Needed Assets

| Proposed File | Priority | Needed For | Front/Back Needed | Anchor Needed | Status |
|---|---:|---|---|---|---|
| `foot-bottom-plantar.png` | P1 | arch, heel, plantar pathway, ball of foot | Bottom | Yes | Missing |
| `foot-side-medial.png` | P2 | inner ankle, arch, medial foot | Side | Yes | Missing |
| `foot-side-lateral.png` | P2 | outer ankle, lateral foot | Side | Yes | Missing |
| `ankle-back-achilles.png` | P2 | Achilles / heel | Back | Yes | Missing |
| `ankle-front-detail.png` | P3 | front ankle detail | Front | Yes | Missing |

## Strategies Covered

| Strategy ID | Label | Visual Need |
|---|---|---|
| `foot_arch_heel_forefoot` | Foot / Arch / Heel / Forefoot Pattern | plantar, heel, arch, forefoot, ankle |

## Anchor Plan

| Anchor ID | Image | Technical Area |
|---|---|---|
| `plantar_arch_bottom` | `foot-bottom-plantar.png` | Plantar arch region |
| `heel_calcaneal_bottom` | `foot-bottom-plantar.png` | Heel / calcaneal region |
| `forefoot_metatarsal_bottom` | `foot-bottom-plantar.png` | Forefoot / metatarsal region |
| `achilles_back_ankle` | `ankle-back-achilles.png` | Achilles tendon region |
| `medial_ankle_side` | `foot-side-medial.png` | Medial ankle region |
| `lateral_ankle_side` | `foot-side-lateral.png` | Lateral ankle region |

---

# 9. Systemic / General Wellness Placement Views

Some HoweRT protocol guidance is not local muscle placement. The visual system should still support pads because pads are always used.

## Needed Assets

| Proposed File | Priority | Needed For | Front/Back Needed | Anchor Needed | Status |
|---|---:|---|---|---|---|
| `systemic-core-front.png` | P3 | broad wellness/systemic support | Front | Optional | Missing |
| `systemic-spine-back.png` | P3 | spine/nervous-system support | Back | Optional | Missing |
| `general-head-neck-reset.png` | P2 | stress/focus/reset support | Front/back | Yes | Missing |

## Strategy Notes

Systemic strategies should not force a local pain model.

They may use:

- head/neck pathway
- torso/core pathway
- spine/back pathway
- protocol-specific placement text from the guidance card

---

# Visual Strategy Status Matrix

| Strategy ID | Label | Current Visual Status | Needs |
|---|---|---|
| `brain_fog_head_neck` | Brain Fog / Focus / Head-Neck Support | Matched, visual missing | Head front + neck back |
| `stress_nervous_system_head_neck` | Stress / Nervous-System Reset | Matched, visual missing | Head front + neck back |
| `sinus_head_face` | Sinus / Face Pressure Support | Matched, visual missing | Sinus/face front |
| `jaw_tmj_face` | Jaw / TMJ Support | Matched, visual missing | Jaw/TMJ side |
| `headache_head_neck` | Head Tension / Headache Pattern | Matched, visual missing | Head front/side + neck back |
| `upper_trap_tightness_pain` | Upper Trap Tightness / Pain | Working but needs better posterior shoulder | Neck/shoulder back |
| `neck_to_shoulder_tension` | Neck-to-Shoulder Tension | Working as fallback to upper trap | Neck/shoulder back |
| `shoulder_blade_tension` | Shoulder Blade / Scapular Tension | Working but needs posterior shoulder/scapula image | Scapula back |
| `rotator_cuff_irritation` | Rotator Cuff / Shoulder Overuse | Working but image is not ideal | Posterior shoulder / rotator cuff back |
| `si_joint_local_or_hip_referral` | SI Joint / Low-Back-to-Hip Pattern | Working, front/back confirmed | Optional SI-specific images |
| `low_back_general_ache` | General Low-Back Ache / Lumbar Support | Working | Optional better lumbar detail |
| `hip_glute_deep_tension` | Deep Glute / Piriformis Pattern | Working | Optional deep glute image |
| `knee_front_patella_tendon` | Front Knee / Patella-Tendon Pattern | Working | Optional knee side/back |
| `foot_arch_heel_forefoot` | Foot / Arch / Heel / Forefoot Pattern | Working but limited | Plantar foot / side ankle |
| `arm_elbow_wrist_overuse` | Arm / Elbow / Wrist Overuse Pattern | Working but broad | Elbow/forearm/wrist detail |
| `swelling_bruising_injury_local` | Swelling / Bruising / Injury Support | Strategy exists, visual generic/missing | Local region fallback system |
| `systemic_general_wellness` | Systemic / General Wellness Support | Strategy exists, visual generic/missing | Systemic core/head-neck views |

---

# Recommended Build Order

## Phase 1 — High-Impact Missing Visuals

Add these first:

1. `head-face-front.png`
2. `head-neck-back.png`
3. `head-side-jaw-tmj.png`
4. `sinus-face-front.png`
5. `shoulder-back.png`
6. `scapula-back.png`
7. `posterior-shoulder-back.png`
8. `foot-bottom-plantar.png`

Why:

- unlocks brain fog, stress, headache, jaw, sinus visuals
- improves rotator cuff/scapula/upper trap
- improves foot/arch/heel guidance

## Phase 2 — Better Detail Views

1. `neck-shoulder-back.png`
2. `suboccipital-neck-back.png`
3. `ankle-back-achilles.png`
4. `foot-side-medial.png`
5. `foot-side-lateral.png`
6. `elbow-front.png`
7. `forearm-front.png`
8. `wrist-hand-front.png`

## Phase 3 — Full Professional Expansion

1. `pelvis-front.png`
2. `pelvis-back.png`
3. `si-joint-back.png`
4. `knee-back.png`
5. `knee-side.png`
6. `calf-back.png`
7. `stomach-digestive-front.png`
8. `systemic-core-front.png`

---

# Implementation Checklist

For each new image:

1. Add file to `assets/body-map/regions`.
2. Add the image filename to this document as Existing.
3. Add import to:
   - `ProtocolResponseCard.tsx` if used by protocol matched visuals.
   - `BodyMap.tsx` if used by body map detail or fallback.
   - `PadPlacementCalibrationTool.tsx` if calibration is needed.
4. Add image key to `padPlacementAnchors.ts` type if needed.
5. Add image key to visual resolver map.
6. Add anchors.
7. Add visual definitions.
8. Run:

```bash
npx tsc --noEmit
```

9. Test:
   - strategy match
   - visual appears
   - front/back panels show when needed
   - no missing import errors
10. Commit.

---

# Notes

The calibration tool should remain visible during development.

Before a production-style build, set:

```ts
const SHOW_PLACEMENT_CALIBRATION_TOOL = false;
```

Do not delete the calibration tool. It is useful for maintaining approved anchor coordinates over time.
