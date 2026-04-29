import AsyncStorage from '@react-native-async-storage/async-storage';
import type { SavedSession } from '../components/SessionHistory';

export const SAVED_SESSIONS_STORAGE_KEY = 'azul_vantedge_saved_sessions_v1';
const MAX_SAVED_SESSIONS = 25;

export async function loadSavedSessions() {
  try {
    const raw = await AsyncStorage.getItem(SAVED_SESSIONS_STORAGE_KEY);
    if (!raw) {
      return [] as SavedSession[];
    }

    const parsed = JSON.parse(raw) as SavedSession[];
    return Array.isArray(parsed) ? parsed : [];
  } catch (error) {
    console.warn('Unable to load saved Azul sessions', error);
    return [] as SavedSession[];
  }
}

export async function saveSavedSessions(sessions: SavedSession[]) {
  try {
    const trimmed = sessions.slice(0, MAX_SAVED_SESSIONS);
    await AsyncStorage.setItem(SAVED_SESSIONS_STORAGE_KEY, JSON.stringify(trimmed));
  } catch (error) {
    console.warn('Unable to persist saved Azul sessions', error);
  }
}

export async function clearSavedSessionsStorage() {
  try {
    await AsyncStorage.removeItem(SAVED_SESSIONS_STORAGE_KEY);
  } catch (error) {
    console.warn('Unable to clear saved Azul sessions', error);
  }
}

export { MAX_SAVED_SESSIONS };
