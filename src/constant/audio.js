import { Howl, Howler } from "howler";

export const c_Dialogue = [
	{
		index: "ammoBox",
		src: "/assets/audio/dialogue/RobotvoixCropped.mp3",
		srcSubtitle: "/assets/audio/dialogue/subtitle/test.srt",
	},
	{
		index: "brokenRobot",
		src: "/assets/audio/dialogue/RobotvoixCropped.mp3",
		srcSubtitle: "/assets/audio/dialogue/subtitle/test.srt",
	},
	{
		index: "cristal",
		src: "/assets/audio/dialogue/RobotvoixCropped.mp3",
		srcSubtitle: "/assets/audio/dialogue/subtitle/test.srt",
	},
	{
		index: "panel",
		src: "/assets/audio/dialogue/RobotvoixCropped.mp3",
		srcSubtitle: "/assets/audio/dialogue/subtitle/test.srt",
	},
	{
		index: "pointer",
		src: "/assets/audio/dialogue/balancoire.mp3",
		srcSubtitle: "/assets/audio/dialogue/subtitle/balancoire.srt",
	},
	{
		index: "poster",
		src: "/assets/audio/dialogue/RobotvoixCropped.mp3",
		srcSubtitle: "/assets/audio/dialogue/subtitle/test.srt",
	},
	{
		index: "tronk",
		src: "/assets/audio/dialogue/tronk.mp3",
		srcSubtitle: "/assets/audio/dialogue/subtitle/tronk.srt",
	}
];

export const c_Mix = {
	dialogue: 1.0,
	ambiance: 0.8,
	interface: 0.8,
	music: 0.5,
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
	},
});

export const c_Click = new Howl({
	src: "/assets/audio/ui/click.mp3",
	preload: true,
	volume: c_Mix.interface,
});
