import { Howl, Howler } from "howler";
import { useGameStore } from "../store/store";
import { useEffect, useRef, useState } from "react";
import { c_Dialogue, c_Mix } from "../constant/audio";
import { i } from "motion/react-client";

const AudioController = () => {
  // const { currentDialogue, setCurrentDialogue } = useGameStore();
  const currentDialogue = useGameStore((state) => state.currentDialogue);
  const setCurrentDialogue = useGameStore((state) => state.setCurrentDialogue);
  const currentScreen = useGameStore((state) => state.currentScreen);
  const [musicFading, setMusicFading] = useState(false);
  const [dialogues, setDialogues] = useState([]);

  const musicRef = useRef(null);
  const ambianceGameRef = useRef(null);
  const musicVintageRef = useRef(null);

  // Créer une seule fois
  useEffect(() => {
    musicRef.current = new Howl({
      src: ["/assets/music/Piste_01.mp3"],
      volume: c_Mix.music,
      loop: true,
      preload: true,
    });

    ambianceGameRef.current = new Howl({
      src: ["/assets/audio/ambiance/ambiance.mp3"],
      volume: c_Mix.ambiance,
      loop: true,
      preload: true,
    });

    musicVintageRef.current = new Howl({
      src: ["/assets/music/Piste_01_vintage.mp3"],
      volume: 0,
      loop: true,
      preload: true,
    });

    return () => {
      musicRef.current?.stop();
      ambianceGameRef.current?.stop();
      musicVintageRef.current?.stop();
    };
  }, []);

  useEffect(() => {
    let dialogueArray = [];
    c_Dialogue.forEach((dialogue) => {
      dialogueArray.push({
        index: dialogue.index,
        audio: new Howl({ src: [dialogue.src], volume: c_Mix.dialogue, preload: true }),
      });
    });
    setDialogues(dialogueArray);
  }, []);

  useEffect(() => {
    if (currentScreen === "menu") {
      musicRef.current.play();
      musicRef.current.fade(0, c_Mix.music, 2000);
      musicVintageRef.current.play();
    } else if (currentScreen === "game") {
      ambianceGameRef.current.play();
      ambianceGameRef.current.fade(0, c_Mix.ambiance, 2000);

      if (musicFading) {
        musicVintageRef.current.fade(c_Mix.music, 0, 2000);
        musicRef.current.fade(0, c_Mix.music, 2000);
        setMusicFading(false);
      }
    } else if (currentScreen === "memory") {
      musicRef.current.stop();
      ambianceGameRef.current.stop();

      musicVintageRef.current.fade(c_Mix.music, 0, 200);
      setTimeout(() => {
        musicVintageRef.current.stop();
      }, 200);
    } else if (currentScreen === "analyse") {
      // console.log("Fading out ambiance...");
      ambianceGameRef.current.fade(c_Mix.ambiance, 0, 200);
      setTimeout(() => {
        // console.log("Stopping ambiance...");
        ambianceGameRef.current.stop();
      }, 200);

      musicVintageRef.current.fade(0, c_Mix.music, 2000);
      musicRef.current.fade(c_Mix.music, 0, 2000);
      setMusicFading(true);
    }
  }, [currentScreen]);

  useEffect(() => {
    // console.log("Dialogue in AudioController: ", dialogues);
  }, [dialogues]);

  useEffect(() => {
    // stop all previous dialogue audios
    dialogues.forEach((d) => {
      d.audio.stop();
    });

    if (currentDialogue) {
      const dialogue = dialogues.find((d) => d.index === currentDialogue);
      if (dialogue) {
        dialogue.audio.play();
      } else {
        console.warn(`Audio with index ${currentDialogue} not found.`);
      }
    }
  }, [currentDialogue, dialogues]);

  return <></>;
};

export default AudioController;
