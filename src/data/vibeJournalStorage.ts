import AsyncStorage from '@react-native-async-storage/async-storage';
import type { DeviceModel } from './deviceModels';
import type { UserMode, VibeJournalData } from '../services/azulAgent';

const VIBE_JOURNAL_STORAGE_KEY = 'azul:vibe-journal-entries:v1';

export const VIBE_JOURNAL_MAX_ENTRIES = 50;

export type SavedVibeJournalEntry = VibeJournalData & {
  id: string;
  createdAt: string;
  note?: string;
  question?: string;
  selectedBodyArea?: string;
  activeDeviceModel?: DeviceModel;
  userMode?: UserMode;
};

function isValidEntry(value: unknown): value is SavedVibeJournalEntry {
  if (!value || typeof value !== 'object') {
    return false;
  }

  const entry = value as Partial<SavedVibeJournalEntry>;

  return (
    typeof entry.id === 'string' &&
    typeof entry.createdAt === 'string' &&
    typeof entry.painBefore === 'number' &&
    typeof entry.painAfter === 'number' &&
    typeof entry.focusBefore === 'number' &&
    typeof entry.focusAfter === 'number' &&
    typeof entry.stressBefore === 'number' &&
    typeof entry.stressAfter === 'number'
  );
}

export async function loadVibeJournalEntries(): Promise<SavedVibeJournalEntry[]> {
  try {
    const raw = await AsyncStorage.getItem(VIBE_JOURNAL_STORAGE_KEY);

    if (!raw) {
      return [];
    }

    const parsed = JSON.parse(raw);

    if (!Array.isArray(parsed)) {
      return [];
    }

    return parsed.filter(isValidEntry).slice(0, VIBE_JOURNAL_MAX_ENTRIES);
  } catch {
    return [];
  }
}

export async function saveVibeJournalEntries(
  entries: SavedVibeJournalEntry[]
): Promise<void> {
  const safeEntries = entries.slice(0, VIBE_JOURNAL_MAX_ENTRIES);
  await AsyncStorage.setItem(VIBE_JOURNAL_STORAGE_KEY, JSON.stringify(safeEntries));
}

export async function clearVibeJournalEntriesStorage(): Promise<void> {
  await AsyncStorage.removeItem(VIBE_JOURNAL_STORAGE_KEY);
}
