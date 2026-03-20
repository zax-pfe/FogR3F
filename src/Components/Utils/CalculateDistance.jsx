import React, { useEffect } from "react";
import { useGameStore } from "../../store/store.js";

// Component to calculate the distance based on the position stored in the game store

export default function CalculateDistance() {
  const playerPosition = useGameStore((state) => state.playerPosition);
  const playerAnimation = useGameStore((state) => state.playerAnimation);

  useEffect(() => {
    if (playerPosition) {
      // console.log("Player position:", playerPosition);
    }
  }, [playerPosition]);

  useEffect(() => {
    if (playerAnimation) {
      console.log("playerAnimation:", playerAnimation);
    }
  }, [playerAnimation]);

  return <></>;
}
