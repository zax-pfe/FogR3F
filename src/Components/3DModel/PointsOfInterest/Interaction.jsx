import { useKeyboardControls } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useGameStore } from "../../../store/store.js";
import { useEffect } from "react";

export default function Interaction() {
  const interact = useKeyboardControls((state) => state.interact);

  const { elementContacted, setPlayerAnimation, setCurrentAudio } = useGameStore();

  useEffect(() => {
    if (interact && elementContacted) {
      console.log("Interaction key pressed:", elementContacted);
      setPlayerAnimation("interaction");
      setCurrentAudio(elementContacted);
    }
  }, [interact, elementContacted]);

  useEffect(() => {
    console.log("Element contacted changed:", elementContacted);
  }, [elementContacted]);

  return null;
}
