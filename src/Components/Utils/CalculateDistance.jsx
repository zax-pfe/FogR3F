import React, { useEffect, useMemo } from "react";
import { useGameStore } from "../../store/store.js";
import * as THREE from "three";

// Component to calculate the distance based on the position stored in the game store

export default function CalculateDistance() {
  const playerPosition = useGameStore((state) => state.playerPosition);
  const playerAnimation = useGameStore((state) => state.playerAnimation);
  const cristalPosition = useGameStore((state) => state.cristalPosition);
  const cristalContacted = useGameStore((state) => state.cristalContacted);
  const setCristalContacted = useGameStore(
    (state) => state.setCristalContacted,
  );

  const memoizedPosition = useMemo(
    () => playerPosition,
    [playerPosition?.x, playerPosition?.z],
  );

  useEffect(() => {
    if (memoizedPosition) {
      const playerPositionWorld = new THREE.Vector3(
        playerPosition.x,
        0,
        playerPosition.z,
      );
      const cristalPositionWorld = new THREE.Vector3(
        cristalPosition.x,
        0,
        cristalPosition.z,
      );
      const distance = playerPositionWorld.distanceTo(cristalPositionWorld);

      if (distance < 2.5) {
        console.log("the cristal !");
        if (!cristalContacted) {
          setCristalContacted(true);
        }
      } else {
        console.log("Distance to cristal:", distance);
        if (cristalContacted) {
          setCristalContacted(false);
        }
      }
    }
  }, [memoizedPosition]);

  return <></>;
}
