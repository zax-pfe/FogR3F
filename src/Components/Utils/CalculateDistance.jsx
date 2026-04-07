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
      {
        /* ______________________ CRISTAL DISTANCE __________________/ */
      }

      const cristalPositionWorld = new THREE.Vector3(
        cristalPosition.x,
        0,
        cristalPosition.z,
      );
      const distanceToCristal =
        playerPositionWorld.distanceTo(cristalPositionWorld);
      if (distanceToCristal < 2.5) {
        if (!cristalContacted) {
          setCristalContacted(true);
        }
      } else {
        if (cristalContacted) {
          setCristalContacted(false);
        }
      }
    }

    {
      /* ______________________ PANEL DISTANCE __________________/ */
    }
  }, [memoizedPosition]);

  return <></>;
}
