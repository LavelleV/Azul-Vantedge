import React from "react";
import { StyleSheet, Text, View } from "react-native";

type PadMarkerProps = {
  x: number;
  y: number;
  label?: string;
};

export default function PadPlacementOverlay({ x, y, label }: PadMarkerProps) {
  return (
    <View
      pointerEvents="none"
      style={[
        styles.markerWrap,
        {
          left: `${x}%`,
          top: `${y}%`,
        },
      ]}
    >
      <View style={styles.marker} />
      {label ? <Text style={styles.label}>{label}</Text> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  markerWrap: {
    position: "absolute",
    transform: [{ translateX: -20 }, { translateY: -20 }],
    alignItems: "center",
  },
  marker: {
    width: 38,
    height: 38,
    borderRadius: 10,
    backgroundColor: "rgba(255,255,255,0.9)",
    borderWidth: 2,
    borderColor: "#c7a72a",
  },
  label: {
    marginTop: 4,
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 999,
    backgroundColor: "#f7e9a7",
    color: "#072b72",
    fontSize: 11,
    fontWeight: "900",
  },
});
