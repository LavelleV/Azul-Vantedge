import React from "react";
import {
  Image,
  ImageSourcePropType,
  StyleSheet,
  Text,
  View,
} from "react-native";

import PadPlacementOverlay from "./PadPlacementOverlay";
import type { PadPlacementVisualDefinition } from "../data/padPlacementVisuals";

type Props = {
  visual: PadPlacementVisualDefinition;
  resolveOverlayImage: (imageKey: string) => ImageSourcePropType | null;
};

/**
 * IMPORTANT:
 * This panel intentionally uses the same visual surface ratio as
 * PadPlacementCalibrationTool.tsx.
 *
 * Calibration surface: 420 x 520
 * Display surface: same ratio
 *
 * That way:
 * x/y from calibration = x/y in the final guide
 */
const CALIBRATION_SURFACE_ASPECT_RATIO = 420 / 520;

export default function PadPlacementVisualPanel({
  visual,
  resolveOverlayImage,
}: Props) {
  return (
    <View style={styles.container}>
      {visual.views.map((viewItem) => {
        const imageSource = resolveOverlayImage(viewItem.imageKey);

        return (
          <View key={viewItem.id} style={styles.panel}>
            {viewItem.title ? (
              <Text style={styles.panelTitle}>{viewItem.title}</Text>
            ) : null}

            <View style={styles.surfaceWrap}>
              <View style={styles.calibratedImageSurface}>
                {imageSource ? (
                  <>
                    <Image
                      source={imageSource}
                      resizeMode="contain"
                      style={styles.image}
                    />

                    {viewItem.pads.map((pad) => (
                      <PadPlacementOverlay
                        key={pad.id}
                        x={pad.x}
                        y={pad.y}
                        label={pad.label}
                      />
                    ))}
                  </>
                ) : (
                  <View style={styles.fallback}>
                    <Text style={styles.fallbackText}>
                      Placement base image not found for this view.
                    </Text>
                  </View>
                )}
              </View>
            </View>
          </View>
        );
      })}
    </View>
  );
}

const navy = "#072b72";
const softText = "#334155";
const lightBorder = "#dbe4ef";

const styles = StyleSheet.create({
  container: {
    gap: 14,
    marginTop: 12,
  },
  panel: {
    backgroundColor: "#f8fafc",
    borderColor: lightBorder,
    borderWidth: 1,
    borderRadius: 16,
    padding: 10,
  },
  panelTitle: {
    color: navy,
    fontSize: 12,
    fontWeight: "900",
    marginBottom: 8,
    textTransform: "uppercase",
  },
  surfaceWrap: {
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  calibratedImageSurface: {
    position: "relative",
    width: "100%",
    maxWidth: 420,
    aspectRatio: CALIBRATION_SURFACE_ASPECT_RATIO,
    backgroundColor: "#edf3f8",
    borderColor: lightBorder,
    borderWidth: 1,
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
  },
  image: {
    width: "100%",
    height: "100%",
  },
  fallback: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 16,
  },
  fallbackText: {
    color: softText,
    textAlign: "center",
    fontSize: 13,
    lineHeight: 19,
  },
});
