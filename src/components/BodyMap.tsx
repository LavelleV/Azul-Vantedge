import React, { useMemo, useState } from "react";
import {
  Image,
  ImageSourcePropType,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";

import frontFullBodyImage from "../../assets/body-map/full/front-full-body.png";
import backFullBodyImage from "../../assets/body-map/full/back-full-body.png";

import abdomenFrontImage from "../../assets/body-map/regions/abdomen-front.png";
import armFrontImage from "../../assets/body-map/regions/arm-front.png";
import chestFrontImage from "../../assets/body-map/regions/chest-front.png";
import footAnkleFrontImage from "../../assets/body-map/regions/foot-ankle-front.png";
import footBottomPlantarImage from "../../assets/body-map/regions/foot-bottom-plantar.png";
import headFaceFrontImage from "../../assets/body-map/regions/head-face-front.png";
import headNeckBackImage from "../../assets/body-map/regions/head-neck-back.png";
import headSideJawTmjImage from "../../assets/body-map/regions/head-side-jaw-tmj.png";
import hipFrontImage from "../../assets/body-map/regions/hip-front.png";
import hipGluteBackImage from "../../assets/body-map/regions/hip-glute-back.png";
import kneeFrontImage from "../../assets/body-map/regions/knee-front.png";
import lowBackBackImage from "../../assets/body-map/regions/low-back-back.png";
import lowerLegFrontImage from "../../assets/body-map/regions/lower-leg-front.png";
import neckFrontImage from "../../assets/body-map/regions/neck-front.png";
import posteriorShoulderBackImage from "../../assets/body-map/regions/posterior-shoulder-back.png";
import scapulaBackImage from "../../assets/body-map/regions/scapula-back.png";
import shoulderBackImage from "../../assets/body-map/regions/shoulder-back.png";
import shoulderFrontImage from "../../assets/body-map/regions/shoulder-front.png";
import sinusFaceFrontImage from "../../assets/body-map/regions/sinus-face-front.png";
import thighFrontImage from "../../assets/body-map/regions/thigh-front.png";

import armFrontPlacementImage from "../../assets/body-map/pad-placement/arm-front-placement.png";
import footAnkleFrontPlacementImage from "../../assets/body-map/pad-placement/foot-ankle-front-placement.png";
import hipGluteBackPlacementImage from "../../assets/body-map/pad-placement/hip-glute-back-placement.png";
import kneeFrontPlacementImage from "../../assets/body-map/pad-placement/knee-front-placement.png";
import lowBackBackPlacementImage from "../../assets/body-map/pad-placement/low-back-back-placement.png";
import shoulderFrontPlacementImage from "../../assets/body-map/pad-placement/shoulder-front-placement.png";

import {
  BODY_MAP_MANIFEST,
  BodyMapView,
  FULL_BODY_HOTSPOTS,
  StableBodyRegionId,
} from "../data/bodyMapRegions";
import { getCloseUpOptionsForBodyArea } from "../data/bodyCloseUpOptions";

import { getPadPlacementVisual } from "../data/padPlacementVisuals";
import PadPlacementVisualPanel from "./PadPlacementVisualPanel";
import PadPlacementCalibrationTool from "./PadPlacementCalibrationTool";

import {
  getPadPlacementRule,
  PadPlacementRule,
} from "../services/padPlacementRules";

const SHOW_HOTSPOT_DEBUG = false;

// Temporary developer tool.
// Set this to false before final production/pilot build.
const SHOW_PLACEMENT_CALIBRATION_TOOL = false;

/**
 * LOCKED BODY-MAP IMAGE SOURCE MAP
 *
 * Only include files that physically exist in assets/body-map/regions.
 * Do not use dynamic require strings.
 * Do not substitute unrelated images.
 * Missing images must show fallback, not blank.
 */
const REGION_DETAIL_IMAGES: Partial<Record<string, ImageSourcePropType>> = {
  "abdomen-front.png": abdomenFrontImage as ImageSourcePropType,
  "arm-front.png": armFrontImage as ImageSourcePropType,
  "chest-front.png": chestFrontImage as ImageSourcePropType,
  "foot-ankle-front.png": footAnkleFrontImage as ImageSourcePropType,
  "foot-bottom-plantar.png": footBottomPlantarImage as ImageSourcePropType,
  "head-face-front.png": headFaceFrontImage as ImageSourcePropType,
  "head-neck-back.png": headNeckBackImage as ImageSourcePropType,
  "head-side-jaw-tmj.png": headSideJawTmjImage as ImageSourcePropType,
  "hip-front.png": hipFrontImage as ImageSourcePropType,
  "hip-glute-back.png": hipGluteBackImage as ImageSourcePropType,
  "knee-front.png": kneeFrontImage as ImageSourcePropType,
  "low-back-back.png": lowBackBackImage as ImageSourcePropType,
  "lower-leg-front.png": lowerLegFrontImage as ImageSourcePropType,
  "neck-front.png": neckFrontImage as ImageSourcePropType,
  "posterior-shoulder-back.png":
    posteriorShoulderBackImage as ImageSourcePropType,
  "scapula-back.png": scapulaBackImage as ImageSourcePropType,
  "shoulder-back.png": shoulderBackImage as ImageSourcePropType,
  "shoulder-front.png": shoulderFrontImage as ImageSourcePropType,
  "sinus-face-front.png": sinusFaceFrontImage as ImageSourcePropType,
  "thigh-front.png": thighFrontImage as ImageSourcePropType,
};

/**
 * LOCKED PAD-PLACEMENT IMAGE SOURCE MAP
 *
 * Static generated PNGs remain supported.
 * Dynamic overlay visuals take priority when available.
 * Do not use dynamic require strings.
 * Do not substitute unrelated placement images.
 * Missing placement images must show fallback, not blank.
 */
const PAD_PLACEMENT_IMAGES: Partial<Record<string, ImageSourcePropType>> = {
  "arm-front-placement.png": armFrontPlacementImage as ImageSourcePropType,
  "foot-ankle-front-placement.png":
    footAnkleFrontPlacementImage as ImageSourcePropType,
  "hip-glute-back-placement.png":
    hipGluteBackPlacementImage as ImageSourcePropType,
  "knee-front-placement.png": kneeFrontPlacementImage as ImageSourcePropType,
  "low-back-back-placement.png":
    lowBackBackPlacementImage as ImageSourcePropType,
  "shoulder-front-placement.png":
    shoulderFrontPlacementImage as ImageSourcePropType,
};

/**
 * Base images used by dynamic pad overlays.
 *
 * These are clean anatomy images. The pads are drawn programmatically
 * from src/data/padPlacementVisuals.ts, so the visual can match the
 * actual placement rule without rewriting the wording.
 */
const PAD_OVERLAY_BASE_IMAGES: Record<string, ImageSourcePropType> = {
  "arm-front": armFrontImage as ImageSourcePropType,
  "foot-ankle-front": footAnkleFrontImage as ImageSourcePropType,
  "foot-bottom-plantar": footBottomPlantarImage as ImageSourcePropType,
  "head-face-front": headFaceFrontImage as ImageSourcePropType,
  "head-neck-back": headNeckBackImage as ImageSourcePropType,
  "head-side-jaw-tmj": headSideJawTmjImage as ImageSourcePropType,
  "hip-front": hipFrontImage as ImageSourcePropType,
  "hip-glute-back": hipGluteBackImage as ImageSourcePropType,
  "knee-front": kneeFrontImage as ImageSourcePropType,
  "low-back-back": lowBackBackImage as ImageSourcePropType,
  "posterior-shoulder-back": posteriorShoulderBackImage as ImageSourcePropType,
  "scapula-back": scapulaBackImage as ImageSourcePropType,
  "shoulder-back": shoulderBackImage as ImageSourcePropType,
  "shoulder-front": shoulderFrontImage as ImageSourcePropType,
  "sinus-face-front": sinusFaceFrontImage as ImageSourcePropType,
};

function resolveOverlayBaseImage(imageKey: string): ImageSourcePropType | null {
  return PAD_OVERLAY_BASE_IMAGES[imageKey] ?? null;
}

const FULL_BODY_IMAGES: Record<BodyMapView, ImageSourcePropType> = {
  front: frontFullBodyImage as ImageSourcePropType,
  back: backFullBodyImage as ImageSourcePropType,
};

type FlexibleBodyMapProps = {
  selectedArea?: string | null;
  selectedBodyArea?: string | null;
  value?: string | null;
  onSelect?: (area: string | null) => void;
  onAreaSelect?: (area: string | null) => void;
  onChange?: (area: string | null) => void;
  onSelectedAreaChange?: (area: string | null) => void;
  onContextInteraction?: () => void;
  onClear?: () => void;
  [key: string]: unknown;
};

function normalizeRegionId(
  value: string | null | undefined
): StableBodyRegionId | null {
  if (!value) return null;

  const normalized = String(value)
    .trim()
    .toLowerCase()
    .replace(/\s+/g, "_")
    .replace(/-/g, "_");

  const aliases: Record<string, StableBodyRegionId> = {
    head: "head",
    face: "head",
    jaw: "head",
    head_face_jaw: "head",

    neck: "neck",

    shoulder: "shoulder",
    shoulders: "shoulder",
    scapula: "shoulder",
    shoulder_blade: "shoulder",

    arm: "arm",
    arms: "arm",
    hand: "arm",
    wrist: "arm",
    arm_hand: "arm",

    chest: "chest",
    ribs: "chest",
    chest_ribs: "chest",

    abdomen: "abdomen",
    gut: "abdomen",
    abdomen_gut: "abdomen",

    low_back: "low_back",
    lowback: "low_back",
    lumbar: "low_back",
    si: "low_back",
    low_back_si: "low_back",

    hip: "hip_glute",
    hips: "hip_glute",
    glute: "hip_glute",
    pelvis: "hip_glute",
    hip_glute: "hip_glute",
    hip_glute_pelvis: "hip_glute",

    thigh: "thigh",

    knee: "knee",

    lower_leg: "lower_leg",
    calf: "lower_leg",
    shin: "lower_leg",

    foot: "foot_ankle",
    ankle: "foot_ankle",
    foot_ankle: "foot_ankle",
  };

  return aliases[normalized] ?? null;
}

/**
 * LOCKED DETAIL IMAGE RESOLVER
 *
 * Accepts stable region IDs only.
 * Returns the approved image for the region/view.
 * Returns null if the approved image is missing.
 * Never guesses, never swaps unrelated images.
 */
export function getDetailImageForRegion(
  regionId: StableBodyRegionId | string | null,
  view: BodyMapView
): ImageSourcePropType | null {
  const stableId = normalizeRegionId(regionId);
  if (!stableId) return null;

  const manifestEntry = BODY_MAP_MANIFEST[stableId];
  const requestedFile =
    view === "back" ? manifestEntry.backImageFile : manifestEntry.frontImageFile;

  if (!requestedFile) return null;

  return REGION_DETAIL_IMAGES[requestedFile] ?? null;
}

/**
 * LOCKED PAD-PLACEMENT IMAGE RESOLVER
 *
 * Placement images are reference images only.
 * Chips are the precise selector.
 * Returns null when a placement image is missing.
 * Never guesses or substitutes another body area.
 */
export function resolvePadPlacementImage(
  regionId: StableBodyRegionId | string | null,
  view: BodyMapView
): ImageSourcePropType | null {
  const stableId = normalizeRegionId(regionId);
  if (!stableId) return null;

  const manifestEntry = BODY_MAP_MANIFEST[stableId];
  const requestedFile =
    view === "back"
      ? manifestEntry.placementBackImageFile
      : manifestEntry.placementFrontImageFile;

  if (!requestedFile) return null;

  return PAD_PLACEMENT_IMAGES[requestedFile] ?? null;
}

export function BodyMap(props: FlexibleBodyMapProps) {
  const selectedBodyArea =
    props.selectedBodyArea ?? props.selectedArea ?? props.value ?? null;

  const [view, setView] = useState<BodyMapView>("front");
  const [activeDetailRegionId, setActiveDetailRegionId] =
    useState<StableBodyRegionId | null>(null);
  const [failedImageKeys, setFailedImageKeys] = useState<
    Record<string, boolean>
  >({});

  const activeDetailRegion = activeDetailRegionId
    ? BODY_MAP_MANIFEST[activeDetailRegionId]
    : null;

  const activeDetailImage = activeDetailRegionId
    ? getDetailImageForRegion(activeDetailRegionId, view)
    : null;

  const activeDetailImageKey = activeDetailRegionId
    ? `detail-${activeDetailRegionId}-${view}`
    : "detail-none";

  const detailImageFailed = failedImageKeys[activeDetailImageKey] === true;

  const selectedChipLabel =
    activeDetailRegion &&
    selectedBodyArea &&
    activeDetailRegion.chips.includes(selectedBodyArea)
      ? selectedBodyArea
      : null;

  const closeUpOptions = activeDetailRegionId
    ? getCloseUpOptionsForBodyArea(activeDetailRegionId)
    : [];

  const activePadPlacementRule: PadPlacementRule | null =
    activeDetailRegionId && selectedChipLabel
      ? getPadPlacementRule(activeDetailRegionId, selectedChipLabel)
      : null;

  const activePadPlacementVisual =
    activeDetailRegionId && selectedChipLabel
      ? getPadPlacementVisual(activeDetailRegionId, selectedChipLabel)
      : null;

  const padPlacementView: BodyMapView =
    activePadPlacementRule?.preferredView ?? view;

  const activePadPlacementImage = activePadPlacementRule
    ? resolvePadPlacementImage(
        activePadPlacementRule.placementImageRegionId,
        padPlacementView
      )
    : null;

  const activePadPlacementImageKey = activePadPlacementRule
    ? `placement-${activePadPlacementRule.id}-${padPlacementView}`
    : "placement-none";

  const padPlacementImageFailed =
    failedImageKeys[activePadPlacementImageKey] === true;

  const visibleSelectedLabel =
    selectedBodyArea ||
    (activeDetailRegion
      ? `${activeDetailRegion.label} detail`
      : "None selected yet");

  const filteredHotspots = useMemo(() => {
    return FULL_BODY_HOTSPOTS.filter((hotspot) => hotspot.view === view).sort(
      (a, b) => a.priority - b.priority
    );
  }, [view]);

  function emitSelection(area: string | null) {
    props.onSelect?.(area);
    props.onAreaSelect?.(area);
    props.onChange?.(area);
    props.onSelectedAreaChange?.(area);
  }

  function handleFullBodyRegionPress(regionId: StableBodyRegionId) {
    const region = BODY_MAP_MANIFEST[regionId];

    props.onContextInteraction?.();
    emitSelection(region.label);
    setActiveDetailRegionId(region.id);
  }

  function handleChipPress(label: string) {
    props.onContextInteraction?.();
    emitSelection(label);
  }

  function handleBackToFullBody() {
    props.onContextInteraction?.();
    setActiveDetailRegionId(null);
  }

  function handleClearSelection() {
    props.onContextInteraction?.();
    setActiveDetailRegionId(null);
    emitSelection(null);
    props.onClear?.();
  }

  function renderFullBodyMap() {
    return (
      <View style={styles.imageStage}>
        <View style={styles.fullBodyImageWrap}>
          <Image
            source={FULL_BODY_IMAGES[view]}
            resizeMode="contain"
            style={styles.fullBodyImage}
          />

          {filteredHotspots.map((hotspot) => (
            <Pressable
              key={hotspot.id}
              accessibilityRole="button"
              accessibilityLabel={`Select ${
                BODY_MAP_MANIFEST[hotspot.regionId].label
              }`}
              onPress={() => handleFullBodyRegionPress(hotspot.regionId)}
              style={[
                styles.fullBodyHotspot,
                {
                  left: `${hotspot.tapRect.left}%`,
                  top: `${hotspot.tapRect.top}%`,
                  width: `${hotspot.tapRect.width}%`,
                  height: `${hotspot.tapRect.height}%`,
                  zIndex: hotspot.priority,
                },
                SHOW_HOTSPOT_DEBUG ? styles.debugHotspot : null,
                Platform.OS === "web" ? ({ cursor: "pointer" } as never) : null,
              ]}
            />
          ))}
        </View>
      </View>
    );
  }

  function renderDetailMap() {
    const regionLabel = activeDetailRegion?.label ?? "this area";
    const shouldShowImage = activeDetailImage && !detailImageFailed;

    return (
      <View style={styles.imageStage}>
        <Pressable onPress={handleBackToFullBody} style={styles.backButton}>
          <Text style={styles.backButtonText}>Back to Full Body</Text>
        </Pressable>

        <View style={styles.detailImageWrap}>
          {shouldShowImage ? (
            <Image
              source={activeDetailImage}
              resizeMode="contain"
              style={styles.detailImage}
              onError={() => {
                setFailedImageKeys((current) => ({
                  ...current,
                  [activeDetailImageKey]: true,
                }));
              }}
            />
          ) : (
            <View style={styles.fallbackCard}>
              <Text style={styles.fallbackText}>
                Close-up image not added yet for {regionLabel}. Use the
                selection buttons on the right for now.
              </Text>
            </View>
          )}
        </View>
      </View>
    );
  }

  function renderPadPlacementVisualArea() {
    const shouldShowPlacementImage =
      activePadPlacementImage && !padPlacementImageFailed;

    if (activePadPlacementVisual) {
      return (
        <PadPlacementVisualPanel
          visual={activePadPlacementVisual}
          resolveOverlayImage={resolveOverlayBaseImage}
        />
      );
    }

    return (
      <View style={styles.placementImageWrap}>
        {shouldShowPlacementImage ? (
          <Image
            source={activePadPlacementImage}
            resizeMode="contain"
            style={styles.placementImage}
            onError={() => {
              setFailedImageKeys((current) => ({
                ...current,
                [activePadPlacementImageKey]: true,
              }));
            }}
          />
        ) : (
          <View style={styles.placementFallbackCard}>
            <Text style={styles.fallbackTitle}>Pad placement image not added yet</Text>
            <Text style={styles.fallbackText}>
              Pad placement image not added yet for {selectedChipLabel}. Follow
              the placement guidance text for now.
            </Text>
          </View>
        )}
      </View>
    );
  }

  function renderPadPlacementCard() {
    if (!activeDetailRegion) {
      return null;
    }

    if (!selectedChipLabel || !activePadPlacementRule) {
      return (
        <View style={styles.placementCard}>
          <Text style={styles.cardTitle}>Pad Placement Guide</Text>
          <Text style={styles.bodyCopy}>
            Select one of the close-up buttons above to show plain-language pad
            placement guidance and the matching placement image when available.
          </Text>
        </View>
      );
    }

    return (
      <View style={styles.placementCard}>
        <Text style={styles.cardTitle}>Pad Placement Guide</Text>

        <View style={styles.placementBadge}>
          <Text style={styles.placementBadgeText}>{selectedChipLabel}</Text>
        </View>

        <Text style={styles.placementPlain}>
          {activePadPlacementRule.plainLanguage}
        </Text>

        <Text style={styles.placementTechnical}>
          {activePadPlacementRule.technicalArea}
        </Text>

        <Text style={styles.placementMeta}>
          Pad count: {activePadPlacementRule.padCount}
        </Text>

        {activePadPlacementRule.optionalNotes?.map((note) => (
          <Text key={note} style={styles.placementNote}>
            {note}
          </Text>
        ))}

        {renderPadPlacementVisualArea()}
      </View>
    );
  }

  function renderSidePanel() {
    const chips = closeUpOptions.length
      ? closeUpOptions.map((option) => option.title)
      : activeDetailRegion?.chips ?? [];

    return (
      <View style={styles.sidePanel}>
        <View style={styles.selectedCard}>
          <Text style={styles.kicker}>SELECTED AREA</Text>
          <Text style={styles.selectedTitle}>{visibleSelectedLabel}</Text>
          <Text style={styles.bodyCopy}>
            The body map helps Azul localize your question. It does not
            auto-run analysis.
          </Text>

          <Pressable onPress={handleClearSelection} style={styles.clearButton}>
            <Text style={styles.clearButtonText}>Clear selection</Text>
          </Pressable>
        </View>

        {activeDetailRegion ? (
          <View style={styles.chipCard}>
            <Text style={styles.cardTitle}>Close-Up Selection</Text>
            <Text style={styles.bodyCopy}>
              Choose the most precise hotspot you can identify. The selected
              label is passed back into Azul as context.
            </Text>

            <View style={styles.chipWrap}>
              {chips.map((chip) => {
                const isActive = selectedBodyArea === chip;
                const option = activeDetailRegionId
                  ? closeUpOptions.find((item) => item.title === chip)
                  : undefined;

                return (
                  <Pressable
                    key={chip}
                    onPress={() => handleChipPress(chip)}
                    style={[styles.chip, isActive ? styles.chipActive : null]}
                  >
                    <Text
                      style={[
                        styles.chipText,
                        isActive ? styles.chipTextActive : null,
                      ]}
                    >
                      {chip}
                    </Text>
                    {option ? (
                      <Text style={styles.chipDescription}>
                        {option.technicalArea}
                      </Text>
                    ) : null}
                  </Pressable>
                );
              })}
            </View>
          </View>
        ) : (
          <View style={styles.chipCard}>
            <Text style={styles.cardTitle}>Full Body Selection</Text>
            <Text style={styles.bodyCopy}>
              Start with a broad region, then move into a close-up map for more
              precise targeting.
            </Text>
          </View>
        )}

        {renderPadPlacementCard()}
      </View>
    );
  }

  const title = activeDetailRegion
    ? `${activeDetailRegion.label} Detail`
    : "Tap an area to add location context to your question.";

  const helper = activeDetailRegion
    ? `Select a more precise area inside ${activeDetailRegion.label} Detail.`
    : "Tap near the area that feels affected. Azul will use it as location context before you analyze.";

  return (
    <View style={styles.bodyMapRoot}>
      <View style={styles.section}>
        <Text style={styles.kicker}>VISUAL BODY MAP</Text>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.helper}>{helper}</Text>

        {!activeDetailRegion ? (
          <View style={styles.toggleRow}>
            <Pressable
              onPress={() => {
                props.onContextInteraction?.();
                setView("front");
              }}
              style={[
                styles.toggleButton,
                view === "front" ? styles.toggleButtonActive : null,
              ]}
            >
              <Text
                style={[
                  styles.toggleText,
                  view === "front" ? styles.toggleTextActive : null,
                ]}
              >
                Front
              </Text>
            </Pressable>

            <Pressable
              onPress={() => {
                props.onContextInteraction?.();
                setView("back");
              }}
              style={[
                styles.toggleButton,
                view === "back" ? styles.toggleButtonActive : null,
              ]}
            >
              <Text
                style={[
                  styles.toggleText,
                  view === "back" ? styles.toggleTextActive : null,
                ]}
              >
                Back
              </Text>
            </Pressable>
          </View>
        ) : null}

        <View style={styles.mapLayout}>
          <View style={styles.mapPanel}>
            {activeDetailRegion ? renderDetailMap() : renderFullBodyMap()}
          </View>

          {renderSidePanel()}
        </View>
      </View>

      {SHOW_PLACEMENT_CALIBRATION_TOOL ? <PadPlacementCalibrationTool /> : null}
    </View>
  );
}

const navy = "#072b72";
const gold = "#d8b637";
const slatePanel = "#edf3f8";
const lightBorder = "#dbe4ef";
const softText = "#334155";

const styles = StyleSheet.create({
  bodyMapRoot: {
    width: "100%",
  },
  section: {
    backgroundColor: "#ffffff",
    borderRadius: 24,
    padding: 20,
    marginVertical: 12,
  },
  kicker: {
    color: gold,
    fontSize: 12,
    fontWeight: "800",
    letterSpacing: 4,
    marginBottom: 8,
    textTransform: "uppercase",
  },
  title: {
    color: navy,
    fontSize: 24,
    fontWeight: "900",
    marginBottom: 6,
  },
  helper: {
    color: softText,
    fontSize: 14,
    marginBottom: 16,
  },
  toggleRow: {
    flexDirection: "row",
    gap: 10,
    marginBottom: 16,
  },
  toggleButton: {
    backgroundColor: "#edf2f7",
    borderRadius: 999,
    paddingHorizontal: 22,
    paddingVertical: 10,
  },
  toggleButtonActive: {
    backgroundColor: navy,
  },
  toggleText: {
    color: "#64748b",
    fontWeight: "800",
  },
  toggleTextActive: {
    color: "#ffffff",
  },
  mapLayout: {
    flexDirection: "row",
    gap: 18,
    alignItems: "stretch",
  },
  mapPanel: {
    flex: 1.8,
    backgroundColor: slatePanel,
    borderColor: lightBorder,
    borderWidth: 1,
    borderRadius: 22,
    minHeight: 540,
    overflow: "hidden",
  },
  sidePanel: {
    flex: 1,
    gap: 14,
  },
  selectedCard: {
    backgroundColor: "#f8fafc",
    borderColor: lightBorder,
    borderWidth: 1,
    borderRadius: 18,
    padding: 18,
  },
  selectedTitle: {
    color: navy,
    fontSize: 24,
    fontWeight: "900",
    marginBottom: 8,
  },
  bodyCopy: {
    color: softText,
    fontSize: 14,
    lineHeight: 21,
  },
  clearButton: {
    marginTop: 14,
    alignSelf: "flex-start",
    backgroundColor: "#edf2f7",
    borderRadius: 999,
    paddingHorizontal: 16,
    paddingVertical: 9,
  },
  clearButtonText: {
    color: navy,
    fontSize: 13,
    fontWeight: "900",
  },
  chipCard: {
    backgroundColor: "#ffffff",
    borderColor: lightBorder,
    borderWidth: 1,
    borderRadius: 18,
    padding: 18,
  },
  cardTitle: {
    color: navy,
    fontSize: 16,
    fontWeight: "900",
    marginBottom: 8,
  },
  chipWrap: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
    marginTop: 12,
  },
  chip: {
    backgroundColor: "#edf2f7",
    borderColor: lightBorder,
    borderWidth: 1,
    borderRadius: 999,
    paddingHorizontal: 13,
    paddingVertical: 8,
  },
  chipActive: {
    backgroundColor: gold,
    borderColor: "#caa72e",
  },
  chipText: {
    color: softText,
    fontSize: 12,
    fontWeight: "900",
  },
  chipTextActive: {
    color: navy,
  },
  chipDescription: {
    color: softText,
    fontSize: 10,
    lineHeight: 14,
    fontWeight: "600",
    marginTop: 3,
    maxWidth: 180,
  },
  imageStage: {
    minHeight: 540,
    alignItems: "center",
    justifyContent: "center",
    padding: 18,
  },
  fullBodyImageWrap: {
    position: "relative",
    width: "100%",
    maxWidth: 560,
    height: 520,
    alignItems: "center",
    justifyContent: "center",
  },
  fullBodyImage: {
    width: "100%",
    height: "100%",
  },
  fullBodyHotspot: {
    position: "absolute",
    borderRadius: 999,
  },
  debugHotspot: {
    backgroundColor: "rgba(216, 182, 55, 0.22)",
    borderColor: "rgba(7, 43, 114, 0.35)",
    borderWidth: 1,
  },
  backButton: {
    position: "absolute",
    left: 18,
    top: 18,
    zIndex: 3,
    backgroundColor: "#e5edf5",
    borderRadius: 999,
    paddingHorizontal: 16,
    paddingVertical: 9,
  },
  backButtonText: {
    color: navy,
    fontSize: 12,
    fontWeight: "900",
  },
  detailImageWrap: {
    width: "100%",
    height: 500,
    alignItems: "center",
    justifyContent: "center",
  },
  detailImage: {
    width: "100%",
    height: "100%",
  },
  fallbackCard: {
    maxWidth: 420,
    backgroundColor: "#ffffff",
    borderColor: lightBorder,
    borderWidth: 1,
    borderRadius: 18,
    padding: 22,
    alignItems: "center",
  },
  fallbackTitle: {
    color: navy,
    fontSize: 16,
    fontWeight: "900",
    textAlign: "center",
    marginBottom: 8,
  },
  fallbackText: {
    color: softText,
    fontSize: 14,
    lineHeight: 21,
    textAlign: "center",
  },
  placementCard: {
    backgroundColor: "#ffffff",
    borderColor: lightBorder,
    borderWidth: 1,
    borderRadius: 18,
    padding: 18,
  },
  placementBadge: {
    alignSelf: "flex-start",
    backgroundColor: "#fff4bf",
    borderColor: "#e6cf6a",
    borderWidth: 1,
    borderRadius: 999,
    paddingHorizontal: 12,
    paddingVertical: 5,
    marginBottom: 12,
  },
  placementBadgeText: {
    color: navy,
    fontSize: 12,
    fontWeight: "900",
  },
  placementPlain: {
    color: navy,
    fontSize: 14,
    lineHeight: 21,
    fontWeight: "900",
    marginBottom: 8,
  },
  placementTechnical: {
    color: softText,
    fontSize: 13,
    lineHeight: 19,
    marginBottom: 6,
  },
  placementMeta: {
    color: "#475569",
    fontSize: 12,
    fontWeight: "900",
    textTransform: "uppercase",
    marginBottom: 6,
  },
  placementNote: {
    color: softText,
    fontSize: 12,
    lineHeight: 18,
  },
  placementImageWrap: {
    marginTop: 12,
    backgroundColor: "#f8fafc",
    borderColor: lightBorder,
    borderWidth: 1,
    borderRadius: 16,
    minHeight: 220,
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
  },
  placementImage: {
    width: "100%",
    height: 220,
  },
  placementFallbackCard: {
    padding: 18,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default BodyMap;
