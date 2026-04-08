import { Vector3 } from "three";
import { create } from "zustand";
import { c_Objects } from "../constant/objects";
import { add } from "three/tsl";

export const useGameStore = create((set) => ({
	playerPosition: null,
	setPlayerPosition: (position) => set({ playerPosition: position }),
	playerAnimation: "idle",
	setPlayerAnimation: (animation) => set({ playerAnimation: animation }),
	cristalPosition: null,
	setCristalPosition: (position) => set({ cristalPosition: position }),

	currentTool: "Tool 0",
	setCurrentTool: (tool) => {
		set({ currentTool: tool }), console.log("Current tool set to:", tool);
	},

	objectFind: [c_Objects[0], c_Objects[1]],
	addObjectFind: (object) =>
		set((state) => ({ objectFind: [...state.objectFind, object] })),
}));
