import { create } from "zustand";
import { devtools } from "zustand/middleware";

interface TimelineState {
  // Playback
  isPlaying: boolean;
  currentCommitIndex: number;
  playbackSpeed: number;

  // Timeline zoom
  zoom: number;

  // Actions
  setPlaying: (value: boolean) => void;
  setCurrentCommit: (index: number) => void;
  setPlaybackSpeed: (speed: number) => void;
  setZoom: (zoom: number) => void;

  nextCommit: () => void;
  previousCommit: () => void;
  resetTimeline: () => void;
}

export const useTimelineStore = create<TimelineState>()(
  devtools((set) => ({
    // Initial state
    isPlaying: false,
    currentCommitIndex: 0,
    playbackSpeed: 1,
    zoom: 1,

    // Setters
    setPlaying: (value) =>
      set({
        isPlaying: value,
      }),

    setCurrentCommit: (index) =>
      set({
        currentCommitIndex: index,
      }),

    setPlaybackSpeed: (speed) =>
      set({
        playbackSpeed: speed,
      }),

    setZoom: (zoom) =>
      set({
        zoom,
      }),

    // Move forward
    nextCommit: () =>
      set((state) => ({
        currentCommitIndex: state.currentCommitIndex + 1,
      })),

    // Move backward
    previousCommit: () =>
      set((state) => ({
        currentCommitIndex: Math.max(
          0,
          state.currentCommitIndex - 1
        ),
      })),

    // Reset everything
    resetTimeline: () =>
      set({
        isPlaying: false,
        currentCommitIndex: 0,
        playbackSpeed: 1,
        zoom: 1,
      }),
  }))
);