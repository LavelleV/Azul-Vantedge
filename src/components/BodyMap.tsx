import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

const hotspots = [
  'Head / Brain',
  'Neck',
  'Shoulder',
  'Low Back / SI',
  'Hip',
  'Knee',
  'Ankle / Foot',
  'Abdomen / Gut',
  'Full Body / Systemic',
] as const;

export function BodyMap({
  selectedBodyArea,
  onSelect,
}: {
  selectedBodyArea?: string;
  onSelect: (bodyArea: string) => void;
}) {
  return (
    <View style={styles.card}>
      <Text style={styles.eyebrow}>Body Map</Text>
      <Text style={styles.title}>Tap a body area to tag the question.</Text>
      <View style={styles.silhouette}>
        <Text style={styles.silhouetteLabel}>Anatomical Placeholder</Text>
      </View>
      <View style={styles.grid}>
        {hotspots.map((spot) => (
          <Pressable
            key={spot}
            onPress={() => onSelect(spot)}
            style={[styles.hotspot, selectedBodyArea === spot && styles.hotspotActive]}
          >
            <Text style={[styles.hotspotLabel, selectedBodyArea === spot && styles.hotspotLabelActive]}>
              {spot}
            </Text>
          </Pressable>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 24,
    padding: 18,
    borderWidth: 1,
    borderColor: 'rgba(0, 35, 102, 0.08)',
    gap: 14,
  },
  eyebrow: {
    color: '#D4AF37',
    textTransform: 'uppercase',
    letterSpacing: 2.2,
    fontSize: 12,
    fontWeight: '700',
  },
  title: {
    color: '#002366',
    fontSize: 20,
    fontWeight: '700',
  },
  silhouette: {
    height: 160,
    borderRadius: 20,
    backgroundColor: 'rgba(0, 35, 102, 0.05)',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: 'rgba(0, 35, 102, 0.08)',
  },
  silhouetteLabel: {
    color: '#474747',
    fontSize: 15,
    fontWeight: '600',
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  hotspot: {
    width: '31%',
    minHeight: 54,
    borderRadius: 14,
    backgroundColor: '#F4F7FB',
    borderWidth: 1,
    borderColor: 'rgba(0, 35, 102, 0.08)',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 8,
    paddingVertical: 10,
  },
  hotspotActive: {
    backgroundColor: '#002366',
    borderColor: '#D4AF37',
  },
  hotspotLabel: {
    color: '#474747',
    fontSize: 12,
    fontWeight: '700',
    textAlign: 'center',
  },
  hotspotLabelActive: {
    color: '#FFFFFF',
  },
});
