import AsyncStorage from '@react-native-async-storage/async-storage';

export const DISCLAIMER_ACK_STORAGE_KEY = 'azul_vantedge_disclaimer_ack_v1';

export async function loadDisclaimerAcknowledgment() {
  try {
    const raw = await AsyncStorage.getItem(DISCLAIMER_ACK_STORAGE_KEY);
    return raw === 'true';
  } catch (error) {
    console.warn('Unable to load disclaimer acknowledgment', error);
    return false;
  }
}

export async function saveDisclaimerAcknowledgment() {
  try {
    await AsyncStorage.setItem(DISCLAIMER_ACK_STORAGE_KEY, 'true');
  } catch (error) {
    console.warn('Unable to persist disclaimer acknowledgment', error);
  }
}

export async function clearDisclaimerAcknowledgment() {
  try {
    await AsyncStorage.removeItem(DISCLAIMER_ACK_STORAGE_KEY);
  } catch (error) {
    console.warn('Unable to clear disclaimer acknowledgment', error);
  }
}
