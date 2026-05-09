import { create } from 'zustand';

// Video player preferences store.
//
// This is one of two justified Zustand stores in the app.
// Rationale: playback preferences (speed, loop, mirror) are device-local UX preferences
// that should persist across video views within a session. They are not server state.
// Phase 10 may add persist() middleware to survive app restarts if desirable.

type VideoPlayerState = {
  playbackRate: number;
  isLooping: boolean;
  isMirrored: boolean;
};

type VideoPlayerActions = {
  setPlaybackRate: (rate: number) => void;
  setLooping: (looping: boolean) => void;
  setMirrored: (mirrored: boolean) => void;
  reset: () => void;
};

const initialState: VideoPlayerState = {
  playbackRate: 1,
  isLooping: false,
  isMirrored: false,
};

export const useVideoPlayerStore = create<VideoPlayerState & VideoPlayerActions>((set) => ({
  ...initialState,
  setPlaybackRate: (rate) => set({ playbackRate: rate }),
  setLooping: (looping) => set({ isLooping: looping }),
  setMirrored: (mirrored) => set({ isMirrored: mirrored }),
  reset: () => set(initialState),
}));
