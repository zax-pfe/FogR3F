import {Howl, Howler} from 'howler';
import { useGameStore } from '../store/store';
import { useEffect, useState } from 'react';
import { c_Dialogue, c_Mix } from '../constant/audio';

const AudioController = () => {

    const { currentDialogue, setCurrentDialogue } = useGameStore();
    const [dialogues, setDialogues] = useState([]);

    useEffect(() => {
        let dialogueArray = []
        c_Dialogue.forEach(dialogue => {
            dialogueArray.push({
                index: dialogue.index,
                audio: new Howl({ src: [dialogue.src], volume: c_Mix.dialogue, preload : true }),
            });
        });
        setDialogues(dialogueArray);
    }, []);

    useEffect(() => {
        console.log("Dialogue in AudioController: ", dialogues);
    }, [dialogues]);

    useEffect(() => {
        if (currentDialogue) {
            const dialogue = dialogues.find(d => d.index === currentDialogue);
            if (dialogue) {
                dialogue.audio.play();
            } else {
                console.warn(`Audio with index ${currentDialogue} not found.`);
            }
        }
    }, [currentDialogue]);

    return (
        <></>
    );
};

export default AudioController;