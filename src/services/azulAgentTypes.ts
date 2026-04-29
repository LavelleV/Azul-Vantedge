import type { DeviceModel } from '../data/deviceModels';
import type { SavedSession } from '../components/SessionHistory';

export type UserMode = 'client' | 'practitioner';

export type VibeJournalData = {
  painBefore: number;
  painAfter: number;
  focusBefore: number;
  focusAfter: number;
  stressBefore: number;
  stressAfter: number;
};

export type AzulAgentRequest = {
  userQuestion: string;
  activeDeviceModel: DeviceModel;
  vibeJournalData: VibeJournalData;
  selectedBodyArea?: string;
  userMode: UserMode;
};

export type AzulAgentResponse = {
  clinicalRead: string[];
  bestStartingProtocol: string[];
  padPlacement: string[];
  whyThisPlacement: string[];
  sessionTips: string[];
  aftercare: string[];
  escalation: string[];
  recommendAssessment: boolean;
};

export type { DeviceModel, SavedSession };
