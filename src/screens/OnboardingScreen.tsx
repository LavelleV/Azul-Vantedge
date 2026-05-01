import React from 'react';
import {
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { deviceModels, type DeviceModel } from '../data/deviceModels';

type DeviceMeta = {
  title: string;
  subtitle: string;
  protocolSource: string;
  enabled: boolean;
  badge?: string;
};

const DEVICE_META: Record<DeviceModel, DeviceMeta> = {
  'Home Model': {
    title: 'Home Model',
    subtitle:
      'Supportive home guidance with safe escalation toward Lavelle when deeper sequencing is needed.',
    protocolSource: 'Uses HoweRT / Micro-Sport Home Programs.',
    enabled: true,
  },
  'Professional Model': {
    title: 'Professional / PRO Model',
    subtitle:
      'Expanded protocol flexibility for treatment-room support and richer resonance sequencing.',
    protocolSource: 'Uses HoweRT / Micro-Sport PRO Programs.',
    enabled: true,
  },
  'Clinical Suite': {
    title: 'Clinical Suite',
    subtitle:
      'Highest-level clinical-wellness sequencing for advanced structural support conversations.',
    protocolSource:
      'Uses HoweRT / Micro-Sport Rehab Clinic Programs. Mapping coming next.',
    enabled: false,
    badge: 'Coming next',
  },
};

export function OnboardingScreen({
  activeModel,
  setActiveModel,
  onContinue,
}: {
  activeModel: DeviceModel;
  setActiveModel: (model: DeviceModel) => void;
  onContinue: () => void;
}) {
  const activeDeviceIsEnabled = DEVICE_META[activeModel]?.enabled === true;

  return (
    <SafeAreaView style={styles.screen}>
      <StatusBar style="light" />

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.header}>
          <View style={styles.logoRow}>
            <View style={styles.logoMark}>
              <Text style={styles.logoText}>A</Text>
            </View>

            <View style={styles.brandTextWrap}>
              <Text style={styles.eyebrow}>Azul Vantedge</Text>
              <Text style={styles.brandLine}>The Biological Edge</Text>
            </View>
          </View>

          <Text style={styles.title}>Select Your Device</Text>
          <Text style={styles.subtitle}>
            Your active device determines which protocol library Azul uses for guidance.
          </Text>
        </View>

        <View style={styles.list}>
          {deviceModels.map((model) => {
            const meta = DEVICE_META[model];
            const isActive = activeModel === model;
            const isDisabled = !meta.enabled;

            return (
              <Pressable
                key={model}
                disabled={isDisabled}
                style={[
                  styles.card,
                  isActive && styles.cardActive,
                  isDisabled && styles.cardDisabled,
                ]}
                onPress={() => setActiveModel(model)}
              >
                <View style={styles.cardTopRow}>
                  <Text
                    style={[
                      styles.cardTitle,
                      isActive && styles.cardTitleActive,
                      isDisabled && styles.cardTextDisabled,
                    ]}
                  >
                    {meta.title}
                  </Text>

                  {meta.badge ? (
                    <View style={styles.badge}>
                      <Text style={styles.badgeText}>{meta.badge}</Text>
                    </View>
                  ) : null}
                </View>

                <Text
                  style={[
                    styles.cardBody,
                    isActive && styles.cardBodyActive,
                    isDisabled && styles.cardTextDisabled,
                  ]}
                >
                  {meta.subtitle}
                </Text>

                <Text
                  style={[
                    styles.protocolSource,
                    isActive && styles.protocolSourceActive,
                    isDisabled && styles.cardTextDisabled,
                  ]}
                >
                  {meta.protocolSource}
                </Text>
              </Pressable>
            );
          })}
        </View>

        <View style={styles.footer}>
          {!activeDeviceIsEnabled ? (
            <Text style={styles.disabledNote}>
              Clinical Suite will unlock after Rehab Clinic protocol mapping is complete.
            </Text>
          ) : null}

          <Pressable
            disabled={!activeDeviceIsEnabled}
            style={[styles.button, !activeDeviceIsEnabled && styles.buttonDisabled]}
            onPress={onContinue}
          >
            <Text
              style={[
                styles.buttonLabel,
                !activeDeviceIsEnabled && styles.buttonLabelDisabled,
              ]}
            >
              Enter Azul
            </Text>
          </Pressable>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#002366',
  },
  scroll: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 34,
    minHeight: '100%',
  },
  header: {
    marginBottom: 24,
  },
  logoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 22,
  },
  logoMark: {
    width: 54,
    height: 54,
    borderRadius: 18,
    backgroundColor: '#FFFFFF',
    borderWidth: 2,
    borderColor: '#D4AF37',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000000',
    shadowOpacity: 0.18,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 6 },
  },
  logoText: {
    color: '#002366',
    fontSize: 30,
    fontWeight: '900',
    letterSpacing: 1,
  },
  brandTextWrap: {
    flex: 1,
  },
  eyebrow: {
    color: '#D4AF37',
    textTransform: 'uppercase',
    letterSpacing: 3,
    fontSize: 12,
    fontWeight: '900',
  },
  brandLine: {
    color: 'rgba(255,255,255,0.84)',
    fontSize: 13,
    fontWeight: '700',
    marginTop: 4,
  },
  title: {
    color: '#FFFFFF',
    fontSize: 32,
    fontWeight: '900',
    marginBottom: 10,
  },
  subtitle: {
    color: 'rgba(255,255,255,0.82)',
    fontSize: 15,
    lineHeight: 23,
  },
  list: {
    gap: 14,
  },
  card: {
    borderRadius: 22,
    backgroundColor: 'rgba(255,255,255,0.07)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.15)',
    padding: 18,
  },
  cardActive: {
    backgroundColor: 'rgba(212, 175, 55, 0.18)',
    borderColor: '#D4AF37',
  },
  cardDisabled: {
    opacity: 0.56,
  },
  cardTopRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 12,
    marginBottom: 8,
  },
  cardTitle: {
    flex: 1,
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: '900',
  },
  cardTitleActive: {
    color: '#F7F4EC',
  },
  cardBody: {
    color: 'rgba(255,255,255,0.78)',
    fontSize: 14,
    lineHeight: 21,
    marginBottom: 8,
  },
  cardBodyActive: {
    color: 'rgba(255,255,255,0.9)',
  },
  protocolSource: {
    color: '#D4AF37',
    fontSize: 13,
    fontWeight: '800',
    lineHeight: 19,
  },
  protocolSourceActive: {
    color: '#FFE9A3',
  },
  cardTextDisabled: {
    color: 'rgba(255,255,255,0.66)',
  },
  badge: {
    borderRadius: 999,
    backgroundColor: 'rgba(212, 175, 55, 0.18)',
    borderWidth: 1,
    borderColor: 'rgba(212, 175, 55, 0.45)',
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  badgeText: {
    color: '#FFE9A3',
    fontSize: 11,
    fontWeight: '900',
    letterSpacing: 0.5,
    textTransform: 'uppercase',
  },
  footer: {
    marginTop: 28,
  },
  disabledNote: {
    color: 'rgba(255,255,255,0.78)',
    fontSize: 13,
    fontWeight: '700',
    textAlign: 'center',
    marginBottom: 10,
  },
  button: {
    minHeight: 56,
    borderRadius: 18,
    backgroundColor: '#D4AF37',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonDisabled: {
    backgroundColor: 'rgba(255,255,255,0.18)',
  },
  buttonLabel: {
    color: '#002366',
    fontSize: 16,
    fontWeight: '900',
  },
  buttonLabelDisabled: {
    color: 'rgba(255,255,255,0.58)',
  },
});
