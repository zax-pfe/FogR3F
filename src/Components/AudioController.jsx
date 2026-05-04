import {Howl, Howler} from 'howler';
import { useGameStore } from '../store/store';
import { useEffect, useState } from 'react';
import { c_Dialogue, c_Mix } from '../constant/audio';

const AudioController = () => {

    const { currentAudio, setCurrentAudio } = useGameStore();
    const [dialogues, setDialogues] = useState([]);

    useEffect(() => {
        let dialogueArray = []
        c_Dialogue.forEach(dialogue => {
            dialogueArray.push({
                index: dialogue.index,
                audio: new Howl({ src: [dialogue.src], volume: c_Mix.dialogue }),
            });
        });
        setDialogues(dialogueArray);
    }, []);

    useEffect(() => {
        console.log("Dialogue in AudioController: ", dialogues);
    }, [dialogues]);

    useEffect(() => {
        if (currentAudio) {
            const dialogue = dialogues.find(d => d.index === currentAudio);
            if (dialogue) {
                dialogue.audio.play();
            } else {
                console.warn(`Audio with index ${currentAudio} not found.`);
            }
        }
    }, [currentAudio]);

    return (
        <></>
    );
};

export default AudioController;