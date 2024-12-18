import { create } from "zustand";
import apiRequest from "./apiRequest";

export const useMessageStore = create((set) => ({
  number: 0,
  fetch: async () => {
    const res = await apiRequest("/inquiries?seen=false");
    set({ number: res.data.length });
  },
  decrease: () => {
    set((prev) => ({ number: prev.number - 1 }));
  },
  reset: () => {
    set({ number: 0 });
  },
}));
