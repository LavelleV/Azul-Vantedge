import React from 'react';
import { Alert, Pressable, StyleSheet, Text, View } from 'react-native';
import type { DeviceModel } from '../data/deviceModels';
import type { AzulAgentResponse, UserMode, VibeJournalData } from '../services/azulAgent';

export type SavedSession = {
  id: string;
  createdAt: string;
  question: string;
  selectedBodyArea?: string;
  activeDeviceModel: DeviceModel;
  userMode: UserMode;
  response: AzulAgentResponse;
  vibeJournalData: VibeJournalData;
};

function formatTimestamp(timestamp: string) {
  const date = new Date(timestamp);
  return `${date.toLocaleDateString()} ${date.toLocaleTimeString([], {
    hour: 'numeric',
    minute: '2-digit',
  })}`;
}

export function SessionHistory({
  sessions,
  onOpen,
  onClear,
}: {
  sessions: SavedSession[];
  onOpen: (session: SavedSession) => void;
  onClear: () => void;
}) {
  const handleClear = () => {
    Alert.alert('Clear Session History', 'Remove all saved session history from this device view?', [
      { text: 'Cancel', style: 'cancel' },
      { text: 'Clear', style: 'destructive', onPress: onClear },
    ]);
  };

  return (
    <View style={styles.card}>
      <View style={styles.headerRow}>
        <View>
          <Text style={styles.eyebrow}>Session History</Text>
          <Text style={styles.title}>Saved protocol guidance</Text>
        </View>
        {sessions.length ? (
          <Pressable style={styles.clearButton} onPress={handleClear}>
            <Text style={styles.clearButtonLabel}>Clear History</Text>
          </Pressable>
        ) : null}
      </View>

      {sessions.length ? (
        sessions.map((session) => (
          <View key={session.id} style={styles.sessionCard}>
            <Text style={styles.timestamp}>{formatTimestamp(session.createdAt)}</Text>
            <Text style={styles.meta}>
              {session.selectedBodyArea || 'No body area tagged'} • {session.activeDeviceModel} • {session.userMode === 'client' ? 'Client Mode' : 'Practitioner Mode'}
            </Text>
            <Text style={styles.questionPreview} numberOfLines={2}>
              {session.question}
            </Text>
            <Pressable style={styles.openButton} onPress={() => onOpen(session)}>
              <Text style={styles.openButtonLabel}>View</Text>
            </Pressable>
          </View>
        ))
      ) : (
        <Text style={styles.emptyText}>
          Saved sessions will appear here after you analyze a question.
        </Text>
      )}
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
    gap: 12,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: 10,
  },
  eyebrow: {
    color: '#D4AF37',
    textTransform: 'uppercase',
    letterSpacing: 2.2,
    fontSize: 12,
    fontWeight: '700',
    marginBottom: 4,
  },
  title: {
    color: '#002366',
    fontSize: 20,
    fontWeight: '700',
  },
  clearButton: {
    minHeight: 36,
    borderRadius: 999,
    backgroundColor: 'rgba(0, 35, 102, 0.06)',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 12,
  },
  clearButtonLabel: {
    color: '#002366',
    fontSize: 12,
    fontWeight: '700',
  },
  sessionCard: {
    borderRadius: 18,
    backgroundColor: '#F8FAFD',
    borderWidth: 1,
    borderColor: 'rgba(0, 35, 102, 0.08)',
    padding: 14,
    gap: 6,
  },
  timestamp: {
    color: '#002366',
    fontSize: 12,
    fontWeight: '700',
  },
  meta: {
    color: '#5F6C84',
    fontSize: 12,
    lineHeight: 18,
  },
  questionPreview: {
    color: '#474747',
    fontSize: 14,
    lineHeight: 20,
    fontWeight: '600',
  },
  openButton: {
    alignSelf: 'flex-start',
    minHeight: 38,
    borderRadius: 14,
    backgroundColor: '#002366',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 16,
    marginTop: 4,
  },
  openButtonLabel: {
    color: '#FFFFFF',
    fontSize: 13,
    fontWeight: '800',
  },
  emptyText: {
    color: '#474747',
    fontSize: 14,
    lineHeight: 21,
  },
});
