import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { healthSystems } from '../data/healthSystems';

export function ReferenceGrid({
  onSelect,
}: {
  onSelect: (value: string) => void;
}) {
  return (
    <View style={styles.card}>
      <Text style={styles.title}>Reference Grid</Text>
      <Text style={styles.helper}>Quick category prompts for building better protocol questions.</Text>
      <View style={styles.grid}>
        {healthSystems.map((item) => (
          <Pressable key={item.name} style={styles.box} onPress={() => onSelect(item.name)}>
            <Text style={styles.label}>{item.name}</Text>
            <Text style={styles.description} numberOfLines={3}>
              {item.description}
            </Text>
            {item.examples.length ? (
              <View style={styles.examplesRow}>
                {item.examples.map((example) => (
                  <View key={`${item.name}-${example}`} style={styles.exampleChip}>
                    <Text style={styles.exampleChipLabel}>{example}</Text>
                  </View>
                ))}
              </View>
            ) : null}
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
    color: '#002366',
    fontSize: 16,
    fontWeight: '800',
    marginBottom: 6,
  },
  helper: {
    color: '#5F6C84',
    fontSize: 13,
    lineHeight: 19,
    marginBottom: 12,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  box: {
    width: '31%',
    minHeight: 128,
    borderRadius: 16,
    backgroundColor: '#F7FAFD',
    borderWidth: 1,
    borderColor: 'rgba(0, 35, 102, 0.08)',
    padding: 10,
    justifyContent: 'space-between',
    gap: 8,
  },
  label: {
    color: '#002366',
    fontSize: 13,
    lineHeight: 17,
    fontWeight: '800',
  },
  description: {
    color: '#5F6C84',
    fontSize: 12,
    lineHeight: 17,
    fontWeight: '500',
    flex: 1,
  },
  examplesRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
  },
  exampleChip: {
    minHeight: 24,
    borderRadius: 999,
    backgroundColor: 'rgba(212, 175, 55, 0.16)',
    borderWidth: 1,
    borderColor: 'rgba(212, 175, 55, 0.28)',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 8,
  },
  exampleChipLabel: {
    color: '#002366',
    fontSize: 11,
    fontWeight: '800',
  },
});
