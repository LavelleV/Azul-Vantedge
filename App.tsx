import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Linking, Modal, Pressable, SafeAreaView, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import { OnboardingScreen } from './src/screens/OnboardingScreen';
import { DisclaimerScreen } from './src/screens/DisclaimerScreen';
import { DashboardScreen } from './src/screens/DashboardScreen';
import { SettingsLegalScreen } from './src/screens/SettingsLegalScreen';
import { ProtocolResponseCard } from './src/components/ProtocolResponseCard';
import { type SavedSession } from './src/components/SessionHistory';
import {
  MAX_SAVED_SESSIONS,
  clearSavedSessionsStorage,
  loadSavedSessions,
  saveSavedSessions,
} from './src/data/savedSessionsStorage';
import {
  clearDisclaimerAcknowledgment,
  loadDisclaimerAcknowledgment,
  saveDisclaimerAcknowledgment,
} from './src/data/disclaimerStorage';
import {
  VIBE_JOURNAL_MAX_ENTRIES,
  clearVibeJournalEntriesStorage,
  loadVibeJournalEntries,
  saveVibeJournalEntries,
  type SavedVibeJournalEntry,
} from './src/data/vibeJournalStorage';
import { deviceModels, type DeviceModel } from './src/data/deviceModels';
import {
  generateAzulResponse,
  type AzulAgentResponse,
  type UserMode,
  type VibeJournalData,
} from './src/services/azulAgent';

const Stack = createNativeStackNavigator();

const defaultVibeJournal: VibeJournalData = {
  painBefore: 50,
  painAfter: 50,
  focusBefore: 50,
  focusAfter: 50,
  stressBefore: 50,
  stressAfter: 50,
};

const defaultResponse: AzulAgentResponse = {
  clinicalRead: [
    'Azul is ready for a real clinical-wellness question. Describe the issue naturally and the agent will build a guidance card around your device profile and wellness context.',
  ],
  bestStartingProtocol: [
    'Begin with a natural-language question rather than selecting a preset protocol first.',
  ],
  padPlacement: ['Pad placement will populate once Azul has the body area and question context.'],
  whyThisPlacement: ['Azul explains the placement logic after analysis so the guidance feels coherent, not canned.'],
  sessionTips: ['Use the Analyze button after entering a question.'],
  aftercare: ['Aftercare guidance will appear with the response.'],
  escalation: ['A Lavelle assessment button appears when the issue needs escalation or advanced sequencing.'],
  recommendAssessment: false,
};

function appendSection(lines: string[], title: string, items: string[]) {
  const filtered = items.filter(Boolean);
  if (!filtered.length) {
    return;
  }

  lines.push(`${title}:`);
  filtered.forEach((item) => lines.push(item));
  lines.push('');
}

function buildGuidanceSnapshot(response: AzulAgentResponse) {
  const lines: string[] = [];

  appendSection(lines, 'Clinical Read', response.clinicalRead);
  appendSection(lines, 'Protocol Plan', response.bestStartingProtocol);
  appendSection(lines, 'Pad Placement', response.padPlacement);
  appendSection(lines, 'Why This Placement', response.whyThisPlacement);
  appendSection(lines, 'Session Tips', response.sessionTips);
  appendSection(lines, 'Aftercare', response.aftercare);
  appendSection(lines, 'Escalation', response.escalation);

  return lines.join('\n').trim();
}

type RootStackParamList = {
  Onboarding: undefined;
  Disclaimer: undefined;
  Dashboard: undefined;
  SettingsLegal: undefined;
};

function clampVibeNumber(value: string): number {
  const parsed = Number.parseInt(value, 10);

  if (!Number.isFinite(parsed)) {
    return 0;
  }

  return Math.max(0, Math.min(100, parsed));
}

function formatVibeDate(value: string): string {
  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return 'Saved entry';
  }

  return `${date.toLocaleDateString()} ${date.toLocaleTimeString([], {
    hour: 'numeric',
    minute: '2-digit',
  })}`;
}

function VibeMetricInput({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <View style={{ gap: 6, flex: 1, minWidth: 130 }}>
      <Text style={styles.modalText}>{label}</Text>
      <TextInput
        value={value}
        onChangeText={(nextValue) => onChange(nextValue.replace(/[^0-9]/g, '').slice(0, 3))}
        keyboardType="number-pad"
        placeholder="0-100"
        style={{
          minHeight: 42,
          borderRadius: 12,
          borderWidth: 1,
          borderColor: 'rgba(0,35,102,0.12)',
          paddingHorizontal: 12,
          color: '#002366',
          fontWeight: '800',
          backgroundColor: '#FFFFFF',
        }}
      />
    </View>
  );
}

function VibeLogModal({
  visible,
  onClose,
  vibeJournalData,
  entries,
  onSave,
  onDelete,
  onClearAll,
  currentQuestion,
  selectedBodyArea,
  activeDeviceModel,
  userMode,
}: {
  visible: boolean;
  onClose: () => void;
  vibeJournalData: VibeJournalData;
  entries: SavedVibeJournalEntry[];
  onSave: (entry: SavedVibeJournalEntry) => void;
  onDelete: (entryId: string) => void;
  onClearAll: () => void;
  currentQuestion: string;
  selectedBodyArea?: string;
  activeDeviceModel: DeviceModel;
  userMode: UserMode;
}) {
  const [painBefore, setPainBefore] = useState(String(vibeJournalData.painBefore));
  const [painAfter, setPainAfter] = useState(String(vibeJournalData.painAfter));
  const [focusBefore, setFocusBefore] = useState(String(vibeJournalData.focusBefore));
  const [focusAfter, setFocusAfter] = useState(String(vibeJournalData.focusAfter));
  const [stressBefore, setStressBefore] = useState(String(vibeJournalData.stressBefore));
  const [stressAfter, setStressAfter] = useState(String(vibeJournalData.stressAfter));
  const [note, setNote] = useState('');

  useEffect(() => {
    if (!visible) {
      return;
    }

    setPainBefore(String(vibeJournalData.painBefore));
    setPainAfter(String(vibeJournalData.painAfter));
    setFocusBefore(String(vibeJournalData.focusBefore));
    setFocusAfter(String(vibeJournalData.focusAfter));
    setStressBefore(String(vibeJournalData.stressBefore));
    setStressAfter(String(vibeJournalData.stressAfter));
    setNote('');
  }, [visible, vibeJournalData]);

  const handleSave = () => {
    const nextEntry: SavedVibeJournalEntry = {
      id: `${Date.now()}`,
      createdAt: new Date().toISOString(),
      painBefore: clampVibeNumber(painBefore),
      painAfter: clampVibeNumber(painAfter),
      focusBefore: clampVibeNumber(focusBefore),
      focusAfter: clampVibeNumber(focusAfter),
      stressBefore: clampVibeNumber(stressBefore),
      stressAfter: clampVibeNumber(stressAfter),
      note: note.trim() || undefined,
      question: currentQuestion.trim() || undefined,
      selectedBodyArea,
      activeDeviceModel,
      userMode,
    };

    onSave(nextEntry);
    onClose();
  };

  return (
    <Modal visible={visible} transparent animationType="slide">
      <View style={styles.modalBackdrop}>
        <View style={styles.modalCard}>
          <Text style={styles.modalEyebrow}>Vibe Journal</Text>
          <Text style={styles.modalTitle}>Log before and after session</Text>

          <ScrollView showsVerticalScrollIndicator={false}>
            <Text style={styles.modalHint}>
              Enter 0-100 values. For pain and stress, lower after-session values are better.
              For focus, higher after-session values are better.
            </Text>

            <View style={{ gap: 14, marginTop: 14 }}>
              <View
                style={{
                  borderRadius: 18,
                  backgroundColor: '#F8FAFD',
                  borderWidth: 1,
                  borderColor: 'rgba(0,35,102,0.08)',
                  padding: 14,
                  gap: 12,
                }}
              >
                <Text style={styles.modalTitle}>Before Session</Text>
                <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 10 }}>
                  <VibeMetricInput label="Pain" value={painBefore} onChange={setPainBefore} />
                  <VibeMetricInput label="Focus" value={focusBefore} onChange={setFocusBefore} />
                  <VibeMetricInput label="Stress" value={stressBefore} onChange={setStressBefore} />
                </View>
              </View>

              <View
                style={{
                  borderRadius: 18,
                  backgroundColor: '#F8FAFD',
                  borderWidth: 1,
                  borderColor: 'rgba(0,35,102,0.08)',
                  padding: 14,
                  gap: 12,
                }}
              >
                <Text style={styles.modalTitle}>After Session</Text>
                <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 10 }}>
                  <VibeMetricInput label="Pain" value={painAfter} onChange={setPainAfter} />
                  <VibeMetricInput label="Focus" value={focusAfter} onChange={setFocusAfter} />
                  <VibeMetricInput label="Stress" value={stressAfter} onChange={setStressAfter} />
                </View>
              </View>

              <View style={{ gap: 6 }}>
                <Text style={styles.modalText}>Optional note</Text>
                <TextInput
                  value={note}
                  onChangeText={setNote}
                  multiline
                  placeholder="Example: SI joint felt better after walking. Stress dropped quickly."
                  style={{
                    minHeight: 88,
                    borderRadius: 14,
                    borderWidth: 1,
                    borderColor: 'rgba(0,35,102,0.12)',
                    paddingHorizontal: 12,
                    paddingVertical: 10,
                    color: '#002366',
                    backgroundColor: '#FFFFFF',
                    textAlignVertical: 'top',
                  }}
                />
              </View>

              <Pressable style={styles.modalButton} onPress={handleSave}>
                <Text style={styles.modalButtonLabel}>Save Vibe Entry</Text>
              </Pressable>

              <View
                style={{
                  borderRadius: 18,
                  backgroundColor: '#FFFFFF',
                  borderWidth: 1,
                  borderColor: 'rgba(0,35,102,0.08)',
                  padding: 14,
                  gap: 10,
                }}
              >
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    gap: 12,
                  }}
                >
                  <Text style={styles.modalTitle}>Saved Vibe History</Text>
                  {entries.length ? (
                    <Pressable onPress={onClearAll}>
                      <Text style={{ color: '#8B1E1E', fontWeight: '900' }}>Clear All</Text>
                    </Pressable>
                  ) : null}
                </View>

                {entries.length ? (
                  entries.slice(0, VIBE_JOURNAL_MAX_ENTRIES).map((entry) => (
                    <View
                      key={entry.id}
                      style={{
                        borderTopWidth: 1,
                        borderTopColor: 'rgba(0,35,102,0.08)',
                        paddingTop: 10,
                        gap: 5,
                      }}
                    >
                      <Text style={styles.modalText}>
                        {formatVibeDate(entry.createdAt)}
                      </Text>
                      <Text style={styles.modalHint}>
                        Pain {entry.painBefore} → {entry.painAfter} | Focus {entry.focusBefore} → {entry.focusAfter} | Stress {entry.stressBefore} → {entry.stressAfter}
                      </Text>
                      {entry.question ? (
                        <Text style={styles.modalHint}>Question: {entry.question}</Text>
                      ) : null}
                      {entry.note ? (
                        <Text style={styles.modalHint}>Note: {entry.note}</Text>
                      ) : null}
                      <Pressable onPress={() => onDelete(entry.id)}>
                        <Text style={{ color: '#8B1E1E', fontWeight: '900' }}>Delete Entry</Text>
                      </Pressable>
                    </View>
                  ))
                ) : (
                  <Text style={styles.modalHint}>No saved Vibe entries yet.</Text>
                )}
              </View>
            </View>
          </ScrollView>

          <Pressable style={styles.modalButton} onPress={onClose}>
            <Text style={styles.modalButtonLabel}>Close</Text>
          </Pressable>
        </View>
      </View>
    </Modal>
  );
}


function SavedSessionModal({
  session,
  visible,
  onClose,
  onRequestAssessment,
}: {
  session: SavedSession | null;
  visible: boolean;
  onClose: () => void;
  onRequestAssessment: () => void;
}) {
  if (!session) {
    return null;
  }

  return (
    <Modal visible={visible} transparent animationType="slide">
      <View style={styles.modalBackdrop}>
        <View style={styles.viewerCard}>
          <Text style={styles.modalEyebrow}>Saved Session</Text>
          <Text style={styles.viewerTitle}>{session.question}</Text>
          <Text style={styles.viewerMeta}>
            {new Date(session.createdAt).toLocaleDateString()} {new Date(session.createdAt).toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' })} • {session.selectedBodyArea || 'No body area tagged'} • {session.activeDeviceModel}
          </Text>
          <ScrollView showsVerticalScrollIndicator={false}>
            <ProtocolResponseCard
              response={session.response}
              isLoading={false}
              onRequestAssessment={onRequestAssessment}
            />
          </ScrollView>
          <Pressable style={styles.modalButton} onPress={onClose}>
            <Text style={styles.modalButtonLabel}>Close</Text>
          </Pressable>
        </View>
      </View>
    </Modal>
  );
}

export default function App() {
  const [activeModel, setActiveModel] = useState<DeviceModel>(deviceModels[0]);
  const [userMode, setUserMode] = useState<UserMode>('client');
  const [question, setQuestion] = useState('');
  const [selectedBodyArea, setSelectedBodyArea] = useState<string | undefined>();
  const [response, setResponse] = useState<AzulAgentResponse>(defaultResponse);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [vibeVisible, setVibeVisible] = useState(false);
  const [vibeJournalData, setVibeJournalData] = useState<VibeJournalData>(defaultVibeJournal);
  const [vibeJournalEntries, setVibeJournalEntries] = useState<SavedVibeJournalEntry[]>([]);
  const [savedSessions, setSavedSessions] = useState<SavedSession[]>([]);
  const [selectedSession, setSelectedSession] = useState<SavedSession | null>(null);
  const [hasAcknowledgedDisclaimer, setHasAcknowledgedDisclaimer] = useState(false);

  useEffect(() => {
    void (async () => {
      const storedSessions = await loadSavedSessions();
      const storedVibeEntries = await loadVibeJournalEntries();
      const disclaimerAcknowledged = await loadDisclaimerAcknowledgment();

      setSavedSessions(storedSessions);
      setVibeJournalEntries(storedVibeEntries);

      if (storedVibeEntries[0]) {
        setVibeJournalData({
          painBefore: storedVibeEntries[0].painBefore,
          painAfter: storedVibeEntries[0].painAfter,
          focusBefore: storedVibeEntries[0].focusBefore,
          focusAfter: storedVibeEntries[0].focusAfter,
          stressBefore: storedVibeEntries[0].stressBefore,
          stressAfter: storedVibeEntries[0].stressAfter,
        });
      }

      setHasAcknowledgedDisclaimer(disclaimerAcknowledged);
    })();
  }, []);

  const handleAnalyze = async (overrideQuestion?: string) => {
    const userQuestion = (overrideQuestion ?? question).trim();

    if (!userQuestion || isAnalyzing) {
      return;
    }

    if (overrideQuestion !== undefined) {
      setQuestion(userQuestion);
    }

    setResponse(defaultResponse);
    setIsAnalyzing(true);

    const nextResponse = await generateAzulResponse({
      userQuestion,
      activeDeviceModel: activeModel,
      vibeJournalData,
      selectedBodyArea,
      userMode,
    });

    setResponse(nextResponse);
    const nextSession: SavedSession = {
      id: `${Date.now()}`,
      createdAt: new Date().toISOString(),
      question: userQuestion,
      selectedBodyArea,
      activeDeviceModel: activeModel,
      userMode,
      response: nextResponse,
      vibeJournalData,
    };

    setSavedSessions((current) => {
      const nextSessions = [nextSession, ...current].slice(0, MAX_SAVED_SESSIONS);
      void saveSavedSessions(nextSessions);
      return nextSessions;
    });
    setIsAnalyzing(false);
  };

  const handleClear = () => {
    setQuestion('');
    setSelectedBodyArea(undefined);
    setResponse(defaultResponse);
    setIsAnalyzing(false);
  };


  const handleSaveVibeEntry = (entry: SavedVibeJournalEntry) => {
    setVibeJournalData({
      painBefore: entry.painBefore,
      painAfter: entry.painAfter,
      focusBefore: entry.focusBefore,
      focusAfter: entry.focusAfter,
      stressBefore: entry.stressBefore,
      stressAfter: entry.stressAfter,
    });

    setVibeJournalEntries((current) => {
      const nextEntries = [entry, ...current].slice(0, VIBE_JOURNAL_MAX_ENTRIES);
      void saveVibeJournalEntries(nextEntries);
      return nextEntries;
    });
  };

  const handleDeleteVibeEntry = (entryId: string) => {
    setVibeJournalEntries((current) => {
      const nextEntries = current.filter((entry) => entry.id !== entryId);
      void saveVibeJournalEntries(nextEntries);

      const latestEntry = nextEntries[0];

      if (latestEntry) {
        setVibeJournalData({
          painBefore: latestEntry.painBefore,
          painAfter: latestEntry.painAfter,
          focusBefore: latestEntry.focusBefore,
          focusAfter: latestEntry.focusAfter,
          stressBefore: latestEntry.stressBefore,
          stressAfter: latestEntry.stressAfter,
        });
      } else {
        setVibeJournalData(defaultVibeJournal);
      }

      return nextEntries;
    });
  };

  const handleClearAllVibeEntries = () => {
    setVibeJournalEntries([]);
    setVibeJournalData(defaultVibeJournal);
    void clearVibeJournalEntriesStorage();
  };

  const handleRequestAssessment = async () => {
    const subject = encodeURIComponent('Azul Vantedge Clinical Assessment Request');
    const guidanceSnapshot = buildGuidanceSnapshot(response);
    const emailLines = [
      'I would like Lavelle to review this Azul Vantedge guidance and advise whether I need a clinical assessment.',
      '',
      'User question:',
      question || 'Not provided',
      '',
      'Selected body area:',
      selectedBodyArea || 'None',
      '',
      'Active device model:',
      activeModel,
      '',
      'User mode:',
      userMode,
      '',
      'Latest vibe:',
      `Pain ${vibeJournalData.painBefore}/${vibeJournalData.painAfter}, Focus ${vibeJournalData.focusBefore}/${vibeJournalData.focusAfter}, Stress ${vibeJournalData.stressBefore}/${vibeJournalData.stressAfter}`,
      '',
    ];

    appendSection(emailLines, 'Protocol Plan Summary', response.bestStartingProtocol);
    appendSection(emailLines, 'Pad Placement Summary', response.padPlacement);
    appendSection(emailLines, 'Escalation Reason', response.escalation);

    if (guidanceSnapshot) {
      emailLines.push('Full Azul Guidance Snapshot:');
      emailLines.push(guidanceSnapshot);
    }

    const body = encodeURIComponent(emailLines.join('\n'));

    const emailUrl = `mailto:justowntoday@gmail.com?subject=${subject}&body=${body}`;

    try {
      const supported = await Linking.canOpenURL(emailUrl);
      if (supported) {
        await Linking.openURL(emailUrl);
      }
    } catch {
      await Linking.openURL(emailUrl);
    }
  };

  return (
    <NavigationContainer>
      <VibeLogModal
        visible={vibeVisible}
        onClose={() => setVibeVisible(false)}
        vibeJournalData={vibeJournalData}
        entries={vibeJournalEntries}
        onSave={handleSaveVibeEntry}
        onDelete={handleDeleteVibeEntry}
        onClearAll={handleClearAllVibeEntries}
        currentQuestion={question}
        selectedBodyArea={selectedBodyArea}
        activeDeviceModel={activeModel}
        userMode={userMode}
      />
      <SavedSessionModal
        session={selectedSession}
        visible={!!selectedSession}
        onClose={() => setSelectedSession(null)}
        onRequestAssessment={handleRequestAssessment}
      />
      <Stack.Navigator screenOptions={{ headerShown: false, animation: 'fade' }}>
        <Stack.Screen name="Onboarding">
          {(props) => (
            <OnboardingScreen
              {...props}
              activeModel={activeModel}
              setActiveModel={setActiveModel}
              onContinue={() =>
                props.navigation.replace(
                  hasAcknowledgedDisclaimer ? 'Dashboard' : 'Disclaimer'
                )
              }
            />
          )}
        </Stack.Screen>
        <Stack.Screen name="Disclaimer">
          {(props) => (
            <DisclaimerScreen
              onContinue={() => {
                setHasAcknowledgedDisclaimer(true);
                void saveDisclaimerAcknowledgment();
                props.navigation.replace('Dashboard');
              }}
            />
          )}
        </Stack.Screen>
        <Stack.Screen name="Dashboard">
          {(props) => (
            <DashboardScreen
              activeModel={activeModel}
              setActiveModel={setActiveModel}
              userMode={userMode}
              setUserMode={setUserMode}
              question={question}
              setQuestion={setQuestion}
              selectedBodyArea={selectedBodyArea}
              setSelectedBodyArea={setSelectedBodyArea}
              onAnalyze={handleAnalyze}
              onClear={handleClear}
              response={response}
              isAnalyzing={isAnalyzing}
              vibeJournalData={vibeJournalData}
              onOpenVibeLog={() => setVibeVisible(true)}
              onRequestAssessment={handleRequestAssessment}
              sessions={savedSessions}
              onOpenSession={setSelectedSession}
              onDeleteSession={(session) => {
                setSavedSessions((current) => {
                  const nextSessions = current.filter((item) => item.id !== session.id);
                  void saveSavedSessions(nextSessions);
                  return nextSessions;
                });

                setSelectedSession((current) => (current?.id === session.id ? null : current));
              }}
              onClearHistory={() => {
                setSavedSessions([]);
                setSelectedSession(null);
                void clearSavedSessionsStorage();
              }}
              onOpenSettingsLegal={() => props.navigation.navigate('SettingsLegal')}
            />
          )}
        </Stack.Screen>
        <Stack.Screen name="SettingsLegal">
          {(props) => (
            <SettingsLegalScreen
              onBack={() => props.navigation.goBack()}
              onResetDisclaimerAcknowledgment={() => {
                setHasAcknowledgedDisclaimer(false);
                void clearDisclaimerAcknowledgment();
              }}
            />
          )}
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  modalBackdrop: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.38)',
    justifyContent: 'flex-end',
  },
  modalCard: {
    maxHeight: '72%',
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 28,
    borderTopRightRadius: 28,
    padding: 20,
    gap: 16,
  },
  modalEyebrow: {
    color: '#D4AF37',
    textTransform: 'uppercase',
    letterSpacing: 2.2,
    fontSize: 12,
    fontWeight: '700',
  },
  modalTitle: {
    color: '#002366',
    fontSize: 24,
    fontWeight: '700',
  },
  modalText: {
    color: '#474747',
    fontSize: 15,
    lineHeight: 24,
    marginBottom: 8,
  },
  modalHint: {
    color: '#474747',
    fontSize: 14,
    lineHeight: 22,
    marginTop: 8,
  },
  modalButton: {
    minHeight: 52,
    borderRadius: 18,
    backgroundColor: '#D4AF37',
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalButtonLabel: {
    color: '#002366',
    fontSize: 15,
    fontWeight: '800',
  },
  viewerCard: {
    maxHeight: '86%',
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 28,
    borderTopRightRadius: 28,
    padding: 20,
    gap: 14,
  },
  viewerTitle: {
    color: '#002366',
    fontSize: 22,
    lineHeight: 28,
    fontWeight: '700',
  },
  viewerMeta: {
    color: '#5F6C84',
    fontSize: 13,
    lineHeight: 19,
  },
});
