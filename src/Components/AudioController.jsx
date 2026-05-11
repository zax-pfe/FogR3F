import { Howl, Howler } from "howler";
import { useGameStore } from "../store/store";
import { useEffect, useState } from "react";
import { c_Dialogue, c_Mix } from "../constant/audio";

const AudioController = () => {
  // const { currentDialogue, setCurrentDialogue } = useGameStore();
  const currentDialogue = useGameStore((state) => state.currentDialogue);
  const setCurrentDialogue = useGameStore((state) => state.setCurrentDialogue);
  const currentScreen = useGameStore((state) => state.currentScreen);
  const [dialogues, setDialogues] = useState([]);
  const music = new Howl({
    src: ["/assets/music/Piste_01.mp3"],
    volume: c_Mix.music,
    loop: true,
    preload: true,
  });

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
      music.play();
    }
  }, [currentScreen]);

  useEffect(() => {
    console.log("Dialogue in AudioController: ", dialogues);
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
