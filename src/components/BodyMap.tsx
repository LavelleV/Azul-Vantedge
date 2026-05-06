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
import hipFrontImage from "../../assets/body-map/regions/hip-front.png";
import hipGluteBackImage from "../../assets/body-map/regions/hip-glute-back.png";
import kneeFrontImage from "../../assets/body-map/regions/knee-front.png";
import lowBackBackImage from "../../assets/body-map/regions/low-back-back.png";
import lowerLegFrontImage from "../../assets/body-map/regions/lower-leg-front.png";
import neckFrontImage from "../../assets/body-map/regions/neck-front.png";
import shoulderFrontImage from "../../assets/body-map/regions/shoulder-front.png";
import thighFrontImage from "../../assets/body-map/regions/thigh-front.png";

import {
  BODY_MAP_MANIFEST,
  BodyMapView,
  FULL_BODY_HOTSPOTS,
  PadPlacementImageFile,
  RegionImageFile,
  StableBodyRegionId,
} from "../data/bodyMapRegions";

import {
  getPadPlacementRule,
  PadPlacementRule,
} from "../services/padPlacementRules";

const SHOW_HOTSPOT_DEBUG = false;

/**
 * LOCKED BODY-MAP IMAGE SOURCE MAP
 *
 * Only include files that physically exist in assets/body-map/regions.
 * Do not use dynamic require strings.
 * Do not substitute unrelated images.
 * Missing images must show fallback, not blank.
 */
const REGION_DETAIL_IMAGES: Partial<Record<RegionImageFile, ImageSourcePropType>> = {
  "abdomen-front.png": abdomenFrontImage as ImageSourcePropType,
  "arm-front.png": armFrontImage as ImageSourcePropType,
  "chest-front.png": chestFrontImage as ImageSourcePropType,
  "foot-ankle-front.png": footAnkleFrontImage as ImageSourcePropType,
  "hip-front.png": hipFrontImage as ImageSourcePropType,
  "hip-glute-back.png": hipGluteBackImage as ImageSourcePropType,
  "knee-front.png": kneeFrontImage as ImageSourcePropType,
  "low-back-back.png": lowBackBackImage as ImageSourcePropType,
  "lower-leg-front.png": lowerLegFrontImage as ImageSourcePropType,
  "neck-front.png": neckFrontImage as ImageSourcePropType,
  "shoulder-front.png": shoulderFrontImage as ImageSourcePropType,
  "thigh-front.png": thighFrontImage as ImageSourcePropType,
};

/**
 * LOCKED PAD-PLACEMENT IMAGE SOURCE MAP
 *
 * Add explicit static imports here only after the matching files physically exist
 * in assets/body-map/pad-placement.
 *
 * Do not use dynamic require strings.
 * Do not substitute unrelated placement images.
 * Missing placement images must show fallback, not blank.
 */
const PAD_PLACEMENT_IMAGES: Partial<
  Record<PadPlacementImageFile, ImageSourcePropType>
> = {};

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
  onClear?: () => void;
  [key: string]: unknown;
};

function normalizeRegionId(value: string | null | undefined): StableBodyRegionId | null {
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
export function resolveDetailImage(
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
  const [failedImageKeys, setFailedImageKeys] = useState<Record<string, boolean>>({});

  const activeDetailRegion = activeDetailRegionId
    ? BODY_MAP_MANIFEST[activeDetailRegionId]
    : null;

  const activeDetailImage = activeDetailRegionId
    ? resolveDetailImage(activeDetailRegionId, view)
    : null;

  const activeDetailImageKey = activeDetailRegionId
    ? `detail-${activeDetailRegionId}-${view}`
    : "detail-none";

  const detailImageFailed = failedImageKeys[activeDetailImageKey] === true;

  const selectedChipLabel =
    activeDetailRegion && selectedBodyArea && activeDetailRegion.chips.includes(selectedBodyArea)
      ? selectedBodyArea
      : null;

  const activePadPlacementRule: PadPlacementRule | null =
    activeDetailRegionId && selectedChipLabel
      ? getPadPlacementRule(activeDetailRegionId, selectedChipLabel)
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
    (activeDetailRegion ? `${activeDetailRegion.label} detail` : "None selected yet");

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

    emitSelection(region.label);
    setActiveDetailRegionId(region.id);
  }

  function handleChipPress(label: string) {
    emitSelection(label);
  }

  function handleBackToFullBody() {
    setActiveDetailRegionId(null);
  }

  function handleClearSelection() {
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
              accessibilityLabel={`Select ${BODY_MAP_MANIFEST[hotspot.regionId].label}`}
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
              <Text style={styles.fallbackTitle}>Close-up image not added yet</Text>
              <Text style={styles.fallbackText}>
                Close-up image not added yet for {regionLabel}. Use the selection
                buttons on the right for now.
              </Text>
            </View>
          )}
        </View>
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

    const shouldShowPlacementImage =
      activePadPlacementImage && !padPlacementImageFailed;

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
      </View>
    );
  }

  function renderSidePanel() {
    const chips = activeDetailRegion?.chips ?? [];

    return (
      <View style={styles.sidePanel}>
        <View style={styles.selectedCard}>
          <Text style={styles.kicker}>SELECTED AREA</Text>
          <Text style={styles.selectedTitle}>{visibleSelectedLabel}</Text>
          <Text style={styles.bodyCopy}>
            The body map helps Azul localize your question. It does not auto-run
            analysis.
          </Text>

          <Pressable onPress={handleClearSelection} style={styles.clearButton}>
            <Text style={styles.clearButtonText}>Clear selection</Text>
          </Pressable>
        </View>

        {activeDetailRegion ? (
          <View style={styles.chipCard}>
            <Text style={styles.cardTitle}>Close-Up Selection</Text>
            <Text style={styles.bodyCopy}>
              Choose the most precise hotspot you can identify. The selected label is
              passed back into Azul as context.
            </Text>

            <View style={styles.chipWrap}>
              {chips.map((chip) => {
                const isActive = selectedBodyArea === chip;

                return (
                  <Pressable
                    key={chip}
                    onPress={() => handleChipPress(chip)}
                    style={[styles.chip, isActive ? styles.chipActive : null]}
                  >
                    <Text style={[styles.chipText, isActive ? styles.chipTextActive : null]}>
                      {chip}
                    </Text>
                  </Pressable>
                );
              })}
            </View>
          </View>
        ) : (
          <View style={styles.chipCard}>
            <Text style={styles.cardTitle}>Full Body Selection</Text>
            <Text style={styles.bodyCopy}>
              Start with a broad region, then move into a close-up map for more precise
              targeting.
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
    <View style={styles.section}>
      <Text style={styles.kicker}>VISUAL BODY MAP</Text>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.helper}>{helper}</Text>

      {!activeDetailRegion ? (
        <View style={styles.toggleRow}>
          <Pressable
            onPress={() => setView("front")}
            style={[styles.toggleButton, view === "front" ? styles.toggleButtonActive : null]}
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
            onPress={() => setView("back")}
            style={[styles.toggleButton, view === "back" ? styles.toggleButtonActive : null]}
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
  );
}

const navy = "#072b72";
const gold = "#d8b637";
const slatePanel = "#edf3f8";
const lightBorder = "#dbe4ef";
const softText = "#334155";

const styles = StyleSheet.create({
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
    alignSelf: "flex-start",
    backgroundColor: "#e9eff6",
    borderRadius: 999,
    marginTop: 14,
    paddingHorizontal: 16,
    paddingVertical: 10,
  },
  clearButtonText: {
    color: navy,
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
    fontSize: 17,
    fontWeight: "900",
    marginBottom: 10,
  },
  chipWrap: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
    marginTop: 14,
  },
  chip: {
    backgroundColor: "#edf2f7",
    borderColor: lightBorder,
    borderWidth: 1,
    borderRadius: 999,
    paddingHorizontal: 12,
    paddingVertical: 9,
  },
  chipActive: {
    backgroundColor: gold,
    borderColor: gold,
  },
  chipText: {
    color: "#334155",
    fontWeight: "800",
    fontSize: 13,
  },
  chipTextActive: {
    color: navy,
  },
  imageStage: {
    flex: 1,
    minHeight: 540,
    alignItems: "center",
    justifyContent: "center",
    padding: 16,
  },
  fullBodyImageWrap: {
    position: "relative",
    width: 380,
    height: 520,
    maxWidth: "96%",
    alignItems: "center",
    justifyContent: "center",
  },
  fullBodyImage: {
    width: "100%",
    height: "100%",
  },
  fullBodyHotspot: {
    position: "absolute",
    backgroundColor: "transparent",
  },
  debugHotspot: {
    backgroundColor: "rgba(216, 182, 55, 0.24)",
    borderColor: gold,
    borderWidth: 1,
    borderRadius: 12,
  },
  backButton: {
    position: "absolute",
    left: 14,
    top: 14,
    zIndex: 5,
    backgroundColor: "#dfe8f3",
    borderRadius: 999,
    paddingHorizontal: 14,
    paddingVertical: 9,
  },
  backButtonText: {
    color: navy,
    fontWeight: "900",
    fontSize: 13,
  },
  detailImageWrap: {
    width: "78%",
    height: "84%",
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
    fontWeight: "900",
    fontSize: 18,
    marginBottom: 8,
    textAlign: "center",
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
    backgroundColor: "#f7e9a7",
    borderColor: gold,
    borderWidth: 1,
    borderRadius: 999,
    paddingHorizontal: 12,
    paddingVertical: 7,
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
    fontWeight: "800",
    lineHeight: 21,
    marginBottom: 8,
  },
  placementTechnical: {
    color: softText,
    fontSize: 13,
    lineHeight: 20,
    marginBottom: 8,
  },
  placementMeta: {
    color: "#475569",
    fontSize: 12,
    fontWeight: "900",
    marginBottom: 8,
    textTransform: "uppercase",
  },
  placementNote: {
    color: "#7c2d12",
    backgroundColor: "#fff7ed",
    borderColor: "#fed7aa",
    borderWidth: 1,
    borderRadius: 12,
    fontSize: 12,
    lineHeight: 18,
    marginBottom: 8,
    paddingHorizontal: 10,
    paddingVertical: 8,
  },
  placementImageWrap: {
    backgroundColor: "#f8fafc",
    borderColor: lightBorder,
    borderWidth: 1,
    borderRadius: 16,
    minHeight: 180,
    marginTop: 12,
    overflow: "hidden",
    alignItems: "center",
    justifyContent: "center",
  },
  placementImage: {
    width: "100%",
    height: 220,
  },
  placementFallbackCard: {
    padding: 16,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default BodyMap;

