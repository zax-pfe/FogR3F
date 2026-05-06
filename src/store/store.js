import { create } from "zustand";
import { c_Objects } from "../constant/objects";

export const useGameStore = create((set) => ({
  // ______________________ PLAYER __________________/
  playerPosition: null,
  setPlayerPosition: (position) => set({ playerPosition: position }),
  playerAnimation: "idle",
  setPlayerAnimation: (animation) => set({ playerAnimation: animation }),
  playerRef: null,
  setPlayerRef: (ref) => set({ playerRef: ref }),

  // ______________________ CAMERA __________________/
  controlsRef: null,
  setControlsRef: (ref) => set({ controlsRef: ref }),

  // ______________________ VIEW __________________/

  currentView: "startScreen",
  setCurrentView: (view) => set({ currentView: view }),

  transitionView: null,
  setTransitionView: (transition) => set({ transitionView: transition }),

  // ______________________ CURSOR __________________/

  smthgIsHovered: false,
  setSmthgIsHovered: (hovered) => set({ smthgIsHovered: hovered }),

  // ______________________ POINTS OF INTEREST __________________/

  ammoBoxPosition: null,
  setAmmoBoxPosition: (position) => set({ ammoBoxPosition: position }),
  tronkPosition: null,
  setTronkPosition: (position) => set({ tronkPosition: position }),
  pointerPosition: null,
  setPointerPosition: (position) => set({ pointerPosition: position }),
  brokenRobotPosition: null,
  setBrokenRobotPosition: (position) => set({ brokenRobotPosition: position }),
  posterPosition: null,
  setPosterPosition: (position) => set({ posterPosition: position }),
  swingPosition: null,
  setSwingPosition: (position) => set({ swingPosition: position }),
  tankPosition: null,
  setTankPosition: (position) => set({ tankPosition: position }),

  // ______________________ CONTACT __________________/
  elementContacted: null,
  setElementContacted: (element) => set({ elementContacted: element }),

  // ______________________ GAMEPLAY __________________/
  currentTool: "Tool 0",
  setCurrentTool: (tool) => {
    (set({ currentTool: tool }), console.log("Current tool set to:", tool));
  },
  toolOpen: false,
  setToolOpen: (isOpen) => set({ toolOpen: isOpen }),

  hotspotCurrent: null,
  setHotspotCurrent: (view) => set({ hotspotCurrent: view }),
  selectedItems: [],
  maxSelectedItems: 4,
  addSelectedItems: (item) => set((state) => ({ selectedItems: [...state.selectedItems, item] })),
  resetSelectedItems: () => set({ selectedItems: [] }),
  removeSelectedItem: (item) =>
    set((state) => {
      const originalSelectedItems = [...state.selectedItems];
      const newSelectedItems = originalSelectedItems.filter((i) => i !== item);
      return { selectedItems: newSelectedItems };
    }),

  objectFind: [c_Objects[0], c_Objects[1]],
  addObjectFind: (object) => set((state) => ({ objectFind: [...state.objectFind, object] })),

  // ______________________ AUDIO __________________/

  currentDialogue: null,
  setCurrentDialogue: (audio) => set({ currentDialogue: audio }),

  whoSpeaks: null,
  setWhoSpeaks: (who) => set({ whoSpeaks: who }),

  // ______________________ SCREENS MANAGEMENT __________________/

  currentScreen: "loading", // loading | menu | game
  setCurrentScreen: (screen) => {
    set({ currentScreen: screen });
    set({ smthgIsHovered: false });
  },

  // ______________________ MEDIAS LOADING __________________/
  mediaProgress: 0,
  mediaLoaded: 0,
  mediaTotal: 0,
  mediaItem: "",
  mediaFinished: false,

  setMediaLoading: (data) => set(data),

  //compressed objects management
  isCompressed: true,
  setIsCompressed: (isCompressed) => set({ isCompressed }),
}));
