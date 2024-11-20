import { create } from 'zustand';

interface LoginSettings {
  minPasswordLength: number;
  requireUppercase: boolean;
  requireNumbers: boolean;
  requireSpecialChars: boolean;
  sessionTimeout: number;
  enforcePasswordExpiry: boolean;
  passwordExpiryDays: number;
  enableMFA: boolean;
}

interface LoginSettingsStore {
  settings: LoginSettings;
  updateSettings: (updates: Partial<LoginSettings>) => void;
}

const defaultSettings: LoginSettings = {
  minPasswordLength: 8,
  requireUppercase: true,
  requireNumbers: true,
  requireSpecialChars: true,
  sessionTimeout: 30,
  enforcePasswordExpiry: true,
  passwordExpiryDays: 90,
  enableMFA: false,
};

export const useLoginSettingsStore = create<LoginSettingsStore>((set) => ({
  settings: defaultSettings,
  updateSettings: (updates) =>
    set((state) => ({
      settings: { ...state.settings, ...updates },
    })),
}));