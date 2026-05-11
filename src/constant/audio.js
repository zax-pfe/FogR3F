import { Howl, Howler } from "howler";

export const c_Dialogue = [
  {
    index: "ammoBox",
    src: "/assets/audio/dialogue/miliBox.mp3",
    srcSubtitle: "/assets/audio/dialogue/subtitle/miliBox.srt",
  },
  {
    index: "swing",
    src: "/assets/audio/dialogue/balancoire.mp3",
    srcSubtitle: "/assets/audio/dialogue/subtitle/balancoire.srt",
  },
  {
    index: "brokenRobot",
    src: "/assets/audio/dialogue/brokenRobot.mp3",
    srcSubtitle: "/assets/audio/dialogue/subtitle/brokenRobot.srt",
  },
  {
    index: "peluche",
    src: "/assets/audio/dialogue/peluche.mp3",
    srcSubtitle: "/assets/audio/dialogue/subtitle/peluche.srt",
  },
  {
    index: "tank",
    src: "/assets/audio/dialogue/tank.mp3",
    srcSubtitle: "/assets/audio/dialogue/subtitle/tank.srt",
  },
  {
    index: "pointer",
    src: "/assets/audio/dialogue/pointer.mp3",
    srcSubtitle: "/assets/audio/dialogue/subtitle/pointer.srt",
  },
  {
    index: "tronk",
    src: "/assets/audio/dialogue/tronk.mp3",
    srcSubtitle: "/assets/audio/dialogue/subtitle/tronk.srt",
  },
  {
    index: "wrongTool",
    src: "/assets/audio/dialogue/tronk.mp3", // A changer
    srcSubtitle: "/assets/audio/dialogue/subtitle/wrongTool.srt",
  },
];

export const c_Mix = {
  dialogue: 1.0,
  ambiance: 0.15,
  interface: 0.8,
  music: 0.7,
  game: 0.15,
};

export const c_AudioUI = new Howl({
  src: "/assets/audio/ui/UI_Sound.mp3",
  preload: true,
  volume: c_Mix.interface,
  sprite: {
    open: [500, 500],
    close: [1000, 500],
    click: [1500, 500],
    remove: [2000, 500],
    toolRoll: [2500, 500],
    toolSelect: [3000, 500],
    hover: [4000, 100],
  },
});

export const c_Click = new Howl({
  src: "/assets/audio/ui/click.mp3",
  preload: true,
  volume: c_Mix.interface,
});

export const steps = new Howl({
  src: "/assets/audio/game/step.mp3",
  preload: true,
  volume: c_Mix.game,
});

export const transition = new Howl({
  src: "/assets/audio/ui/transition.mp3",
  preload: true,
  volume: c_Mix.game,
});
