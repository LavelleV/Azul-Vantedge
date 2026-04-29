import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { deviceModels, type DeviceModel } from '../data/deviceModels';

export function DeviceSelector({
  activeModel,
  onChange,
}: {
  activeModel: DeviceModel;
  onChange: (model: DeviceModel) => void;
}) {
  return (
    <View style={styles.card}>
      <Text style={styles.label}>Device Profile</Text>
      <View style={styles.row}>
        {deviceModels.map((model) => (
          <Pressable
            key={model}
            onPress={() => onChange(model)}
            style={[styles.button, activeModel === model && styles.buttonActive]}
          >
            <Text style={[styles.buttonLabel, activeModel === model && styles.buttonLabelActive]}>
              {model === 'Home Model' ? 'Home' : model === 'Professional Model' ? 'Pro' : 'Suite'}
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
    borderRadius: 20,
    padding: 14,
    borderWidth: 1,
    borderColor: 'rgba(0, 35, 102, 0.08)',
  },
  label: {
    color: '#474747',
    fontSize: 13,
    fontWeight: '700',
    marginBottom: 10,
  },
  row: {
    flexDirection: 'row',
    gap: 8,
  },
  button: {
    flex: 1,
    minHeight: 38,
    borderRadius: 999,
    backgroundColor: '#F0F4F9',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonActive: {
    backgroundColor: '#002366',
  },
  buttonLabel: {
    color: '#474747',
    fontSize: 12,
    fontWeight: '700',
  },
  buttonLabelActive: {
    color: '#FFFFFF',
  },
});
