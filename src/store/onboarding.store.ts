import type { DanceLevel, StyleCategory } from '@/types/domain';
import { create } from 'zustand';

// Onboarding store — holds multi-step form state across screen transitions.
//
// This is one of two justified Zustand stores in the app.
// Rationale: the onboarding flow spans 3 screens. The user accumulates answers
// across steps before a single combined save to the database on completion.
// This is genuinely client-side transient state, not server state — TanStack Query
// is not the right tool for this pattern.
//
// This store is reset after onboarding completes.

type OnboardingState = {
  danceLevel: DanceLevel | null;
  styleInterests: StyleCategory[];
  learningGoals: string[];
  interestedInMentorship: boolean;
};

type OnboardingActions = {
  setDanceLevel: (level: DanceLevel) => void;
  setStyleInterests: (styles: StyleCategory[]) => void;
  setLearningGoals: (goals: string[]) => void;
  setInterestedInMentorship: (value: boolean) => void;
  reset: () => void;
};

const initialState: OnboardingState = {
  danceLevel: null,
  styleInterests: [],
  learningGoals: [],
  interestedInMentorship: false,
};

export const useOnboardingStore = create<OnboardingState & OnboardingActions>((set) => ({
  ...initialState,
  setDanceLevel: (level) => set({ danceLevel: level }),
  setStyleInterests: (styles) => set({ styleInterests: styles }),
  setLearningGoals: (goals) => set({ learningGoals: goals }),
  setInterestedInMentorship: (value) => set({ interestedInMentorship: value }),
  reset: () => set(initialState),
}));
