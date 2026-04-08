import React, { useEffect, useMemo } from "react";
import { useGameStore } from "../../store/store.js";
import * as THREE from "three";

// Component to calculate the distance based on the position stored in the game store

const DISTANCE_THRESHOLD = 2; // Distance threshold for interaction
export default function CalculateDistance() {
  // ______________________ PLAYER __________________/
  const playerPosition = useGameStore((state) => state.playerPosition);
  //______________________ CRISTAL __________________/
  const cristalPosition = useGameStore((state) => state.cristalPosition);
  //______________________ PANEL __________________/
  const panelPosition = useGameStore((state) => state.panelPosition);
  //______________________ AMMO BOX __________________/
  const ammoBoxPosition = useGameStore((state) => state.ammoBoxPosition);
  //______________________ CONTACT __________________/
  const setElementContacted = useGameStore(
    (state) => state.setElementContacted,
  );

  const memoizedPosition = useMemo(
    () => playerPosition,
    [playerPosition?.x, playerPosition?.y, playerPosition?.z],
  );

  useEffect(() => {
    if (memoizedPosition) {
      const playerPositionWorld = new THREE.Vector3(
        playerPosition.x,
        0,
        playerPosition.z,
      );
      {
        // faire une liste avec tout les cristalPosition
        // par default elementContacted = null
        // boucler dans la liste, et mettre a true l'element contacted si
        // distance est inf a x
      }

      const objectPositions = [
        {
          name: "cristal",
          position: new THREE.Vector3(cristalPosition.x, 0, cristalPosition.z),
        },
        {
          name: "panel",
          position: new THREE.Vector3(panelPosition?.x, 0, panelPosition?.z),
        },
        // {
        //   name: "ammoBox",
        //   position: new THREE.Vector3(
        //     ammoBoxPosition?.x,
        //     0,
        //     ammoBoxPosition?.z,
        //   ),
        // },
      ];

      setElementContacted(null);
      for (const obj of objectPositions) {
        const distance = playerPositionWorld.distanceTo(obj.position);
        if (distance < DISTANCE_THRESHOLD) {
          setElementContacted(obj.name);
        }
      }
    }
  }, [memoizedPosition]);

  return <></>;
}
