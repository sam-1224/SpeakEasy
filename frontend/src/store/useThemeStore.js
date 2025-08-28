import { create } from "zustand";

export const useThemeStore = create((set) => ({
  theme: localStorage.getItem("speakEasyTheme") || "night",
  setTheme: (newTheme) => {
    localStorage.setItem("speakEasyTheme", newTheme);
    set({ theme: newTheme });
  },
}));

// ? This is a custom hook that returns the theme and setTheme functions
// ? Learned about Zustand and its API
// ? Explored how to persist state in localStorage
