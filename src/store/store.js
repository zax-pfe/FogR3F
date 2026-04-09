import { create } from "zustand";
import { c_Objects } from "../constant/objects";

export const useGameStore = create((set) => ({
  // ______________________ PLAYER __________________/
  playerPosition: null,
  setPlayerPosition: (position) => set({ playerPosition: position }),
  playerAnimation: "idle",
  setPlayerAnimation: (animation) => set({ playerAnimation: animation }),

  // ______________________ CAMERA __________________/
  controlsRef: null,
  setControlsRef: (ref) => set({ controlsRef: ref }),

  // ______________________ POINTS OF INTEREST __________________/

  cristalPosition: null,
  setCristalPosition: (position) => set({ cristalPosition: position }),
  panelPosition: null,
  setPanelPosition: (position) => set({ panelPosition: position }),
  ammoBoxPosition: null,
  setAmmoBoxPosition: (position) => set({ ammoBoxPosition: position }),
  pointerPosition: null,
  setPointerPosition: (position) => set({ pointerPosition: position }),

  // ______________________ CONTACT __________________/
  elementContacted: null,
  setElementContacted: (element) => set({ elementContacted: element }),

  // ______________________ GAMEPLAY __________________/
  currentTool: "Tool 0",
  setCurrentTool: (tool) => {
    (set({ currentTool: tool }), console.log("Current tool set to:", tool));
  },

  objectFind: [c_Objects[0], c_Objects[1]],
  addObjectFind: (object) =>
    set((state) => ({ objectFind: [...state.objectFind, object] })),
}));
