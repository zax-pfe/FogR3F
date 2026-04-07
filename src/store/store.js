import { Vector3 } from "three";
import { element } from "three/tsl";
import { create } from "zustand";

export const useGameStore = create((set) => ({
  // ______________________ PLAYER __________________/
  playerPosition: null,
  setPlayerPosition: (position) => set({ playerPosition: position }),
  playerAnimation: "idle",
  setPlayerAnimation: (animation) => set({ playerAnimation: animation }),

  // ______________________ CRISTAL __________________/

  cristalPosition: null,
  setCristalPosition: (position) => set({ cristalPosition: position }),

  // ______________________ PANEL __________________/

  panelPosition: null,
  setPanelPosition: (position) => set({ panelPosition: position }),

  // ______________________ CONTACT __________________/
  elementContacted: null,
  setElementContacted: (element) => set({ elementContacted: element }),
}));
