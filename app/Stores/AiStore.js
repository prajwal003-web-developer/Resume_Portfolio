import { create } from "zustand";

export const useAiStore = create((set) => ({
  isOpen: false,

  setIsOpen: (status) => set({ isOpen: status }),

  Messages: [],

  setMessages: (data) =>
    set((state) => ({
      Messages: [...state.Messages, data], // ✅ immutable update
    })),
}));
