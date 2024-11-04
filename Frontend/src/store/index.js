import { create } from "zustand";

export const useAppStore = create((set) => ({
  userInfo: undefined,
  setUserInfo: (newUserInfo) => set({ userInfo: newUserInfo }),
}));
