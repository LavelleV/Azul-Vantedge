import React, { useMemo, useState } from "react";
import {
  Image,
  ImageSourcePropType,
  LayoutChangeEvent,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";

import shoulderFrontImage from "../../assets/body-map/regions/shoulder-front.png";
import lowBackBackImage from "../../assets/body-map/regions/low-back-back.png";
import hipGluteBackImage from "../../assets/body-map/regions/hip-glute-back.png";
import hipFrontImage from "../../assets/body-map/regions/hip-front.png";
import kneeFrontImage from "../../assets/body-map/regions/knee-front.png";
import footAnkleFrontImage from "../../assets/body-map/regions/foot-ankle-front.png";
import armFrontImage from "../../assets/body-map/regions/arm-front.png";

type CalibrationImageKey =
  | "shoulder-front"
  | "low-back-back"
  | "hip-glute-back"
  | "hip-front"
  | "knee-front"
  | "foot-ankle-front"
  | "arm-front";

type CalibrationPoint = {
  x: number;
  y: number;
};

type SurfaceSize = {
  width: number;
  height: number;
};

const CALIBRATION_IMAGES: Record<
  CalibrationImageKey,
  {
    label: string;
    source: ImageSourcePropType;
    regionId:
      | "shoulder"
      | "low_back"
      | "hip_glute"
      | "knee"
      | "foot_ankle"
      | "arm";
    view: "front" | "back";
  }
> = {
  "shoulder-front": {
    label: "Shoulder Front",
    source: shoulderFrontImage as ImageSourcePropType,
    regionId: "shoulder",
    view: "front",
  },
  "low-back-back": {
    label: "Low Back Back",
    source: lowBackBackImage as ImageSourcePropType,
    regionId: "low_back",
    view: "back",
  },
  "hip-glute-back": {
    label: "Hip / Glute Back",
    source: hipGluteBackImage as ImageSourcePropType,
    regionId: "hip_glute",
    view: "back",
  },
  "hip-front": {
    label: "Hip Front",
    source: hipFrontImage as ImageSourcePropType,
    regionId: "hip_glute",
    view: "front",
  },
  "knee-front": {
    label: "Knee Front",
    source: kneeFrontImage as ImageSourcePropType,
    regionId: "knee",
    view: "front",
  },
  "foot-ankle-front": {
    label: "Foot / Ankle Front",
    source: footAnkleFrontImage as ImageSourcePropType,
    regionId: "foot_ankle",
    view: "front",
  },
  "arm-front": {
    label: "Arm Front",
    source: armFrontImage as ImageSourcePropType,
    regionId: "arm",
    view: "front",
  },
};

const IMAGE_KEYS = Object.keys(CALIBRATION_IMAGES) as CalibrationImageKey[];

function clampPercent(value: number): number {
  return Math.max(0, Math.min(100, Math.round(value)));
}

function getFirstNumber(...values: unknown[]): number | null {
  for (const value of values) {
    const numberValue = Number(value);

    if (Number.isFinite(numberValue)) {
      return numberValue;
    }
  }

  return null;
}

export default function PadPlacementCalibrationTool() {
  const [selectedImageKey, setSelectedImageKey] =
    useState<CalibrationImageKey>("low-back-back");

  const [point, setPoint] = useState<CalibrationPoint | null>(null);
  const [surfaceSize, setSurfaceSize] = useState<SurfaceSize>({
    width: 420,
    height: 520,
  });

  const [anchorId, setAnchorId] = useState("new_anchor_id");
  const [anchorLabel, setAnchorLabel] = useState("New Anchor");
  const [technicalAnchor, setTechnicalAnchor] = useState(
    "Technical anatomical anchor"
  );

  const selectedImage = CALIBRATION_IMAGES[selectedImageKey];

  const copyReadyAnchor = useMemo(() => {
    if (!point) {
      return "Click the image to generate x/y coordinates.";
    }

    return `${anchorId}: {
  id: "${anchorId}",
  label: "${anchorLabel}",
  technicalAnchor: "${technicalAnchor}",
  regionId: "${selectedImage.regionId}",
  view: "${selectedImage.view}",
  imageKey: "${selectedImageKey}",
  x: ${point.x},
  y: ${point.y},
},`;
  }, [
    anchorId,
    anchorLabel,
    point,
    selectedImage.regionId,
    selectedImage.view,
    selectedImageKey,
    technicalAnchor,
  ]);

  function handleSurfaceLayout(event: LayoutChangeEvent) {
    const width = event.nativeEvent.layout.width;
    const height = event.nativeEvent.layout.height;

    if (width > 0 && height > 0) {
      setSurfaceSize({ width, height });
    }
  }

  function handleImagePress(event: any) {
    const nativeEvent = event?.nativeEvent ?? event;

    const currentTarget =
      event?.currentTarget ?? nativeEvent?.currentTarget ?? null;

    const target = nativeEvent?.target ?? event?.target ?? null;

    const rect =
      currentTarget?.getBoundingClientRect?.() ??
      target?.getBoundingClientRect?.() ??
      null;

    const clientX = getFirstNumber(
      nativeEvent?.clientX,
      event?.clientX,
      nativeEvent?.pageX,
      event?.pageX
    );

    const clientY = getFirstNumber(
      nativeEvent?.clientY,
      event?.clientY,
      nativeEvent?.pageY,
      event?.pageY
    );

    let locationX = getFirstNumber(
      nativeEvent?.locationX,
      nativeEvent?.offsetX,
      nativeEvent?.layerX,
      event?.locationX,
      event?.offsetX,
      event?.layerX
    );

    let locationY = getFirstNumber(
      nativeEvent?.locationY,
      nativeEvent?.offsetY,
      nativeEvent?.layerY,
      event?.locationY,
      event?.offsetY,
      event?.layerY
    );

    if (rect && clientX !== null && clientY !== null) {
      locationX = clientX - rect.left;
      locationY = clientY - rect.top;
    }

    if (locationX === null || locationY === null) {
      setPoint({ x: 0, y: 0 });
      return;
    }

    const width =
      getFirstNumber(
        rect?.width,
        currentTarget?.clientWidth,
        target?.clientWidth,
        surfaceSize.width
      ) ?? 420;

    const height =
      getFirstNumber(
        rect?.height,
        currentTarget?.clientHeight,
        target?.clientHeight,
        surfaceSize.height
      ) ?? 520;

    const calculatedX = clampPercent((locationX / width) * 100);
    const calculatedY = clampPercent((locationY / height) * 100);

    setPoint({
      x: calculatedX,
      y: calculatedY,
    });
  }

  return (
    <View style={styles.container}>
      <Text style={styles.kicker}>DEVELOPER CALIBRATION</Text>
      <Text style={styles.title}>Pad Placement Calibration Tool</Text>
      <Text style={styles.helper}>
        Use this only while building Vantedge. Choose an anatomy image, click
        the exact technical placement area, then copy the generated anchor into
        padPlacementAnchors.ts.
      </Text>

      <View style={styles.layout}>
        <View style={styles.leftPanel}>
          <View style={styles.imageSelector}>
            {IMAGE_KEYS.map((key) => {
              const isActive = selectedImageKey === key;

              return (
                <Pressable
                  key={key}
                  onPress={() => {
                    setSelectedImageKey(key);
                    setPoint(null);
                  }}
                  style={[
                    styles.selectorChip,
                    isActive ? styles.selectorChipActive : null,
                  ]}
                >
                  <Text
                    style={[
                      styles.selectorChipText,
                      isActive ? styles.selectorChipTextActive : null,
                    ]}
                  >
                    {CALIBRATION_IMAGES[key].label}
                  </Text>
                </Pressable>
              );
            })}
          </View>

          <Pressable
            onLayout={handleSurfaceLayout}
            onPress={handleImagePress}
            style={[
              styles.imageSurface,
              Platform.OS === "web"
                ? ({ cursor: "crosshair" } as never)
                : null,
            ]}
          >
            <Image
              source={selectedImage.source}
              resizeMode="contain"
              style={styles.image}
            />

            {point ? (
              <View
                pointerEvents="none"
                style={[
                  styles.marker,
                  {
                    left: `${point.x}%`,
                    top: `${point.y}%`,
                  },
                ]}
              >
                <View style={styles.padBox} />
                <Text style={styles.markerLabel}>
                  x:{point.x} y:{point.y}
                </Text>
              </View>
            ) : null}
          </Pressable>
        </View>

        <ScrollView style={styles.rightPanel}>
          <Text style={styles.cardTitle}>Anchor Details</Text>

          <Text style={styles.fieldLabel}>Anchor ID</Text>
          <TextInput
            value={anchorId}
            onChangeText={setAnchorId}
            autoCapitalize="none"
            autoCorrect={false}
            style={styles.input}
          />

          <Text style={styles.fieldLabel}>Label</Text>
          <TextInput
            value={anchorLabel}
            onChangeText={setAnchorLabel}
            autoCapitalize="words"
            autoCorrect={false}
            style={styles.input}
          />

          <Text style={styles.fieldLabel}>Technical Anchor</Text>
          <TextInput
            value={technicalAnchor}
            onChangeText={setTechnicalAnchor}
            autoCapitalize="sentences"
            autoCorrect={false}
            style={styles.input}
          />

          <Text style={styles.fieldLabel}>Current Image</Text>
          <Text selectable style={styles.fakeInput}>
            {selectedImageKey}
          </Text>

          <Text style={styles.fieldLabel}>Coordinates</Text>
          <Text selectable style={styles.fakeInput}>
            {point ? `x: ${point.x}, y: ${point.y}` : "Click image first"}
          </Text>

          <Text style={styles.cardTitle}>Copy-ready anchor</Text>
          <Text selectable style={styles.codeBlock}>
            {copyReadyAnchor}
          </Text>

          <Text style={styles.note}>
            After clicking a correct anatomy location, copy the x and y values
            into the matching anchor inside padPlacementAnchors.ts.
          </Text>
        </ScrollView>
      </View>
    </View>
  );
}

const navy = "#072b72";
const gold = "#d8b637";
const softText = "#334155";
const lightBorder = "#dbe4ef";

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#ffffff",
    borderRadius: 24,
    padding: 20,
    marginVertical: 12,
    borderColor: "#f59e0b",
    borderWidth: 2,
  },
  kicker: {
    color: gold,
    fontSize: 12,
    fontWeight: "900",
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
    lineHeight: 21,
  },
  layout: {
    flexDirection: "row",
    gap: 18,
  },
  leftPanel: {
    flex: 1.4,
  },
  rightPanel: {
    flex: 1,
    maxHeight: 620,
    backgroundColor: "#f8fafc",
    borderColor: lightBorder,
    borderWidth: 1,
    borderRadius: 18,
    padding: 16,
  },
  imageSelector: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
    marginBottom: 12,
  },
  selectorChip: {
    backgroundColor: "#edf2f7",
    borderColor: lightBorder,
    borderWidth: 1,
    borderRadius: 999,
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  selectorChipActive: {
    backgroundColor: navy,
    borderColor: navy,
  },
  selectorChipText: {
    color: "#334155",
    fontSize: 12,
    fontWeight: "900",
  },
  selectorChipTextActive: {
    color: "#ffffff",
  },
  imageSurface: {
    position: "relative",
    backgroundColor: "#edf3f8",
    borderColor: lightBorder,
    borderWidth: 1,
    borderRadius: 22,
    width: 420,
    height: 520,
    maxWidth: "100%",
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
  },
  image: {
    width: "100%",
    height: "100%",
  },
  marker: {
    position: "absolute",
    transform: [{ translateX: -19 }, { translateY: -19 }],
    alignItems: "center",
  },
  padBox: {
    width: 38,
    height: 38,
    borderRadius: 10,
    backgroundColor: "rgba(255,255,255,0.9)",
    borderColor: gold,
    borderWidth: 3,
  },
  markerLabel: {
    marginTop: 5,
    backgroundColor: "#f7e9a7",
    color: navy,
    borderRadius: 999,
    paddingHorizontal: 8,
    paddingVertical: 3,
    fontSize: 11,
    fontWeight: "900",
  },
  cardTitle: {
    color: navy,
    fontSize: 16,
    fontWeight: "900",
    marginBottom: 10,
    marginTop: 4,
  },
  fieldLabel: {
    color: "#64748b",
    fontSize: 11,
    fontWeight: "900",
    textTransform: "uppercase",
    marginBottom: 4,
    marginTop: 10,
  },
  input: {
    backgroundColor: "#ffffff",
    borderColor: lightBorder,
    borderWidth: 1,
    borderRadius: 12,
    color: navy,
    fontSize: 13,
    padding: 10,
  },
  fakeInput: {
    backgroundColor: "#ffffff",
    borderColor: lightBorder,
    borderWidth: 1,
    borderRadius: 12,
    color: navy,
    fontSize: 13,
    padding: 10,
  },
  codeBlock: {
    backgroundColor: "#0f172a",
    color: "#e2e8f0",
    borderRadius: 12,
    fontFamily: Platform.OS === "web" ? "monospace" : undefined,
    fontSize: 12,
    lineHeight: 18,
    padding: 12,
  },
  note: {
    color: softText,
    fontSize: 12,
    lineHeight: 18,
    marginTop: 12,
  },
});
