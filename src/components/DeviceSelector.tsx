import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { deviceModels, type DeviceModel } from '../data/deviceModels';

type DeviceOptionMeta = {
  shortLabel: string;
  title: string;
  description: string;
  enabled: boolean;
  badge?: string;
};

const DEVICE_OPTION_META: Record<DeviceModel, DeviceOptionMeta> = {
  'Home Model': {
    shortLabel: 'Home',
    title: 'Home Model',
    description: 'Uses HoweRT / Micro-Sport Home Programs for supportive home guidance.',
    enabled: true,
  },
  'Professional Model': {
    shortLabel: 'PRO',
    title: 'Professional / PRO Model',
    description: 'Uses HoweRT / Micro-Sport PRO Programs for expanded treatment-room flexibility.',
    enabled: true,
  },
  'Clinical Suite': {
    shortLabel: 'Suite',
    title: 'Clinical Suite',
    description: 'Uses HoweRT / Micro-Sport Rehab Clinic Programs. Mapping coming next.',
    enabled: false,
    badge: 'Coming next',
  },
};

export function DeviceSelector({
  activeModel,
  onChange,
}: {
  activeModel: DeviceModel;
  onChange: (model: DeviceModel) => void;
}) {
  return (
    <View style={styles.card}>
      <View style={styles.brandRow}>
        <View style={styles.logoMark}>
          <Text style={styles.logoText}>A</Text>
        </View>

        <View style={styles.brandCopy}>
          <Text style={styles.brandKicker}>AZUL VANTEDGE</Text>
          <Text style={styles.label}>Device Profile</Text>
        </View>
      </View>

      <Text style={styles.helperText}>
        Your active device determines which protocol library Azul uses for guidance.
      </Text>

      <View style={styles.optionStack}>
        {deviceModels.map((model) => {
          const option = DEVICE_OPTION_META[model];
          const isActive = activeModel === model;
          const isDisabled = !option.enabled;

          return (
            <Pressable
              key={model}
              disabled={isDisabled}
              onPress={() => onChange(model)}
              style={[
                styles.optionButton,
                isActive && styles.optionButtonActive,
                isDisabled && styles.optionButtonDisabled,
              ]}
            >
              <View style={styles.optionHeader}>
                <Text
                  style={[
                    styles.optionTitle,
                    isActive && styles.optionTitleActive,
                    isDisabled && styles.optionTextDisabled,
                  ]}
                >
                  {option.title}
                </Text>

                <View
                  style={[
                    styles.shortBadge,
                    isActive && styles.shortBadgeActive,
                    isDisabled && styles.shortBadgeDisabled,
                  ]}
                >
                  <Text
                    style={[
                      styles.shortBadgeText,
                      isActive && styles.shortBadgeTextActive,
                      isDisabled && styles.shortBadgeTextDisabled,
                    ]}
                  >
                    {option.shortLabel}
                  </Text>
                </View>
              </View>

              <Text
                style={[
                  styles.optionDescription,
                  isActive && styles.optionDescriptionActive,
                  isDisabled && styles.optionTextDisabled,
                ]}
              >
                {option.description}
              </Text>

              {option.badge ? (
                <Text style={styles.comingNextText}>{option.badge}</Text>
              ) : null}
            </Pressable>
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 16,
    borderWidth: 1,
    borderColor: 'rgba(0, 35, 102, 0.08)',
  },
  brandRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginBottom: 10,
  },
  logoMark: {
    width: 38,
    height: 38,
    borderRadius: 14,
    backgroundColor: '#002366',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#D9B932',
  },
  logoText: {
    color: '#D9B932',
    fontSize: 19,
    fontWeight: '900',
    letterSpacing: 1,
  },
  brandCopy: {
    flex: 1,
  },
  brandKicker: {
    color: '#D9B932',
    fontSize: 10,
    fontWeight: '900',
    letterSpacing: 2,
    marginBottom: 2,
  },
  label: {
    color: '#002366',
    fontSize: 16,
    fontWeight: '900',
  },
  helperText: {
    color: '#475569',
    fontSize: 12,
    fontWeight: '600',
    lineHeight: 18,
    marginBottom: 12,
  },
  optionStack: {
    gap: 10,
  },
  optionButton: {
    minHeight: 78,
    borderRadius: 18,
    backgroundColor: '#F0F4F9',
    borderWidth: 1,
    borderColor: 'rgba(0, 35, 102, 0.08)',
    padding: 14,
  },
  optionButtonActive: {
    backgroundColor: '#002366',
    borderColor: '#D9B932',
  },
  optionButtonDisabled: {
    opacity: 0.58,
  },
  optionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 12,
    marginBottom: 6,
  },
  optionTitle: {
    flex: 1,
    color: '#002366',
    fontSize: 14,
    fontWeight: '900',
  },
  optionTitleActive: {
    color: '#FFFFFF',
  },
  optionDescription: {
    color: '#475569',
    fontSize: 12,
    fontWeight: '600',
    lineHeight: 17,
  },
  optionDescriptionActive: {
    color: '#EAF0FA',
  },
  optionTextDisabled: {
    color: '#64748B',
  },
  shortBadge: {
    borderRadius: 999,
    paddingHorizontal: 10,
    paddingVertical: 5,
    backgroundColor: '#E8EEF7',
  },
  shortBadgeActive: {
    backgroundColor: '#D9B932',
  },
  shortBadgeDisabled: {
    backgroundColor: '#E5E7EB',
  },
  shortBadgeText: {
    color: '#002366',
    fontSize: 11,
    fontWeight: '900',
  },
  shortBadgeTextActive: {
    color: '#002366',
  },
  shortBadgeTextDisabled: {
    color: '#64748B',
  },
  comingNextText: {
    marginTop: 8,
    color: '#8A6A00',
    fontSize: 11,
    fontWeight: '900',
    letterSpacing: 0.5,
  },
});
