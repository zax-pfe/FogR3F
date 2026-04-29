import React, { useEffect, useMemo } from "react";
import { useGameStore } from "../../store/store.js";
import * as THREE from "three";

// Component to calculate the distance based on the position stored in the game store

const DISTANCE_THRESHOLD = 2; // Distance threshold for interaction
export default function CalculateDistance() {
  // ______________________ PLAYER __________________/
  const playerPosition = useGameStore((state) => state.playerPosition);
  //______________________ INTERACTIONS OBJECTS __________________/
  const posterPosition = useGameStore((state) => state.posterPosition);
  const ammoBoxPosition = useGameStore((state) => state.ammoBoxPosition);
  const pointerPosition = useGameStore((state) => state.pointerPosition);
  const brokenRobotPosition = useGameStore(
    (state) => state.brokenRobotPosition,
  );
  //______________________ CONTACT __________________/
  const setElementContacted = useGameStore(
    (state) => state.setElementContacted,
  );

  const memorizedPosition = useMemo(
    () => playerPosition,
    [playerPosition?.x, playerPosition?.y, playerPosition?.z],
  );

  useEffect(() => {
    if (memorizedPosition) {
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
          name: "poster",
          position: new THREE.Vector3(posterPosition?.x, 0, posterPosition?.z),
        },
        {
          name: "pointer",
          position: new THREE.Vector3(
            pointerPosition?.x,
            0,
            pointerPosition?.z,
          ),
        },
        {
          name: "ammoBox",
          position: new THREE.Vector3(
            ammoBoxPosition?.x,
            0,
            ammoBoxPosition?.z,
          ),
        },
        {
          name: "brokenRobot",
          position: new THREE.Vector3(
            brokenRobotPosition?.x,
            0,
            brokenRobotPosition?.z,
          ),
        },
      ];

      setElementContacted(null);
      for (const obj of objectPositions) {
        const distance = playerPositionWorld.distanceTo(obj.position);
        if (distance < DISTANCE_THRESHOLD) {
          setElementContacted(obj.name);
          console.log(`Player is close to ${obj.name}`);
          break; // Stop checking after the first match
        }
      }
    }
  }, [memorizedPosition]);

  return <></>;
}
