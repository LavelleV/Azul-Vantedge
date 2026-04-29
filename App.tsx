import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Linking, Modal, Pressable, SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native';
import { OnboardingScreen } from './src/screens/OnboardingScreen';
import { DashboardScreen } from './src/screens/DashboardScreen';
import { ProtocolResponseCard } from './src/components/ProtocolResponseCard';
import { type SavedSession } from './src/components/SessionHistory';
import {
  MAX_SAVED_SESSIONS,
  clearSavedSessionsStorage,
  loadSavedSessions,
  saveSavedSessions,
} from './src/data/savedSessionsStorage';
import { deviceModels, type DeviceModel } from './src/data/deviceModels';
import {
  generateAzulResponse,
  type AzulAgentResponse,
  type UserMode,
  type VibeJournalData,
} from './src/services/azulAgent';

const Stack = createNativeStackNavigator();

const defaultVibeJournal: VibeJournalData = {
  painBefore: 40,
  painAfter: 18,
  focusBefore: 52,
  focusAfter: 78,
  stressBefore: 63,
  stressAfter: 28,
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

type RootStackParamList = {
  Onboarding: undefined;
  Dashboard: undefined;
};

function VibeLogModal({
  visible,
  onClose,
  vibeJournalData,
}: {
  visible: boolean;
  onClose: () => void;
  vibeJournalData: VibeJournalData;
}) {
  return (
    <Modal visible={visible} transparent animationType="slide">
      <View style={styles.modalBackdrop}>
        <View style={styles.modalCard}>
          <Text style={styles.modalEyebrow}>Vibe Journal</Text>
          <Text style={styles.modalTitle}>Current baseline snapshot</Text>
          <ScrollView showsVerticalScrollIndicator={false}>
            <Text style={styles.modalText}>Pain: {vibeJournalData.painBefore} before / {vibeJournalData.painAfter} after</Text>
            <Text style={styles.modalText}>Focus: {vibeJournalData.focusBefore} before / {vibeJournalData.focusAfter} after</Text>
            <Text style={styles.modalText}>Stress: {vibeJournalData.stressBefore} before / {vibeJournalData.stressAfter} after</Text>
            <Text style={styles.modalHint}>
              This is still a placeholder logging surface. The app architecture now supports passing Vibe Journal data into the AI service layer for richer context.
            </Text>
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
  const [vibeJournalData] = useState<VibeJournalData>(defaultVibeJournal);
  const [savedSessions, setSavedSessions] = useState<SavedSession[]>([]);
  const [selectedSession, setSelectedSession] = useState<SavedSession | null>(null);

  useEffect(() => {
    void (async () => {
      const storedSessions = await loadSavedSessions();
      setSavedSessions(storedSessions);
    })();
  }, []);

  const handleAnalyze = async () => {
    const userQuestion = question.trim();
    if (!userQuestion || isAnalyzing) {
      return;
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

  const handleRequestAssessment = async () => {
    const smsBody = encodeURIComponent(
      [
        'Hello Lavelle, I would like a clinical assessment.',
        `Question: ${question || 'Not provided'}`,
        `Active device model: ${activeModel}`,
        `Selected body area: ${selectedBodyArea || 'Not tagged'}`,
        `Latest vibe: Pain ${vibeJournalData.painBefore}/${vibeJournalData.painAfter}, Focus ${vibeJournalData.focusBefore}/${vibeJournalData.focusAfter}, Stress ${vibeJournalData.stressBefore}/${vibeJournalData.stressAfter}`,
      ].join(' ')
    );

    const primary = `sms:8105225460&body=${smsBody}`;
    const fallback = `sms:8105225460?body=${smsBody}`;
    const supported = await Linking.canOpenURL(primary);
    await Linking.openURL(supported ? primary : fallback);
  };

  return (
    <NavigationContainer>
      <VibeLogModal
        visible={vibeVisible}
        onClose={() => setVibeVisible(false)}
        vibeJournalData={vibeJournalData}
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
              onContinue={() => props.navigation.replace('Dashboard')}
            />
          )}
        </Stack.Screen>
        <Stack.Screen name="Dashboard">
          {() => (
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
              onClearHistory={() => {
                setSavedSessions([]);
                void clearSavedSessionsStorage();
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
