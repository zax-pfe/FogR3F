import { create } from "zustand";
import { c_Objects } from "../constant/objects";

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

  // ______________________ GAMEPLAY __________________/
  currentTool: "Tool 0",
	setCurrentTool: (tool) => {
		set({ currentTool: tool }), console.log("Current tool set to:", tool);
	},

  showAnalyse: true,
  setShowAnalyse: (show) => set({ showAnalyse: show }),

	objectFind: [c_Objects[0], c_Objects[1]],
	addObjectFind: (object) =>
		set((state) => ({ objectFind: [...state.objectFind, object] })),
}));
