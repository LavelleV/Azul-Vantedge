import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { healthSystems } from '../data/healthSystems';

export function ReferenceGrid() {
  return (
    <View style={styles.card}>
      <Text style={styles.title}>Reference Grid</Text>
      <View style={styles.grid}>
        {healthSystems.map((item) => (
          <Pressable key={item} style={styles.box}>
            <Text style={styles.label}>{item}</Text>
          </Pressable>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: 'rgba(255,255,255,0.72)',
    borderRadius: 24,
    padding: 16,
    borderWidth: 1,
    borderColor: 'rgba(0, 35, 102, 0.07)',
  },
  title: {
    color: '#474747',
    fontSize: 15,
    fontWeight: '700',
    marginBottom: 12,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  box: {
    width: '31%',
    minHeight: 82,
    borderRadius: 14,
    backgroundColor: 'rgba(0, 35, 102, 0.04)',
    borderWidth: 1,
    borderColor: 'rgba(0, 35, 102, 0.08)',
    padding: 10,
    justifyContent: 'center',
  },
  label: {
    color: '#474747',
    fontSize: 12,
    lineHeight: 16,
    fontWeight: '600',
  },
});
