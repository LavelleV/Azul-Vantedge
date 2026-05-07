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

            <View style={styles.imageWrap}>
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
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: 12,
    marginTop: 12,
  },
  panel: {
    backgroundColor: "#f8fafc",
    borderColor: "#dbe4ef",
    borderWidth: 1,
    borderRadius: 16,
    padding: 10,
  },
  panelTitle: {
    color: "#072b72",
    fontSize: 12,
    fontWeight: "900",
    marginBottom: 8,
    textTransform: "uppercase",
  },
  imageWrap: {
    position: "relative",
    minHeight: 220,
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
  },
  image: {
    width: "100%",
    height: 220,
  },
  fallback: {
    minHeight: 180,
    alignItems: "center",
    justifyContent: "center",
    padding: 16,
  },
  fallbackText: {
    color: "#334155",
    textAlign: "center",
    fontSize: 13,
  },
});
