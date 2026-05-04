import { useKeyboardControls } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useGameStore } from "../../../store/store.js";
import { useEffect } from "react";

export default function Interaction() {
  const elementContacted = useGameStore((state) => state.elementContacted);
  const interact = useKeyboardControls((state) => state.interact);
  const setPlayerAnimation = useGameStore((state) => state.setPlayerAnimation);
  const setMolecSpeaking = useGameStore((state) => state.setMolecSpeaking);

  useEffect(() => {
    if (interact && elementContacted) {
      console.log("Interaction key pressed:", elementContacted);
      setPlayerAnimation("interaction");
      setMolecSpeaking(true);
    }
  }, [interact, elementContacted]);

  useEffect(() => {
    console.log("Element contacted changed:", elementContacted);
  }, [elementContacted]);

  return null;
}
