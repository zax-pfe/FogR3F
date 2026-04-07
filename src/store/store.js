import { Vector3 } from "three";
import { element } from "three/tsl";
import { create } from "zustand";

export const useGameStore = create((set) => ({
  // ______________________ PLAYER __________________/
  playerPosition: null,
  setPlayerPosition: (position) => set({ playerPosition: position }),
  playerAnimation: "idle",
  setPlayerAnimation: (animation) => set({ playerAnimation: animation }),

  // ______________________ POINTS OF INTEREST __________________/

  cristalPosition: null,
  setCristalPosition: (position) => set({ cristalPosition: position }),
  panelPosition: null,
  setPanelPosition: (position) => set({ panelPosition: position }),
  ammoBoxPosition: null,
  setAmmoBoxPosition: (position) => set({ ammoBoxPosition: position }),

  // ______________________ CONTACT __________________/
  elementContacted: null,
  setElementContacted: (element) => set({ elementContacted: element }),
}));
