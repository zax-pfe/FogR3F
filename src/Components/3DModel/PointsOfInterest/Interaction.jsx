import { useKeyboardControls } from "@react-three/drei";
import { useGameStore } from "../../../store/store.js";
import { useEffect, useMemo, useRef } from "react";
import * as THREE from "three";

function toVector3(pos) {
  if (!pos) return null;

  if (pos instanceof THREE.Vector3) return pos.clone();

  if (Array.isArray(pos)) {
    return new THREE.Vector3(pos[0], pos[1], pos[2]);
  }

  if (
    typeof pos.x === "number" &&
    typeof pos.y === "number" &&
    typeof pos.z === "number"
  ) {
    return new THREE.Vector3(pos.x, pos.y, pos.z);
  }

  return null;
}

// rotate player to face target (XZ only)
function faceTarget(playerRef, playerPos, targetPos) {
  const playerVec = toVector3(playerPos);
  const targetVec = toVector3(targetPos);

  if (!playerRef?.current || !playerVec || !targetVec) return;

  const dx = targetVec.x - playerVec.x;
  const dz = targetVec.z - playerVec.z;

  if (Math.hypot(dx, dz) < 1e-6) return;

  const angle = Math.atan2(dx, dz);
  playerRef.current.rotation.y = angle;
}

export default function Interaction() {
  const interact = useKeyboardControls((state) => state.interact);

  const wasInteractPressedRef = useRef(false);
  const cameraIsOnObjectRef = useRef(false);
  const lastElementRef = useRef(null);
  const posterTimeoutRef = useRef(null);

  //save camera before interaction
  const savedCameraPositionRef = useRef(null);
  const savedCameraTargetRef = useRef(null);

  const elementContacted = useGameStore((state) => state.elementContacted);

  const setPlayerAnimation = useGameStore((state) => state.setPlayerAnimation);
  const setCurrentDialogue = useGameStore((state) => state.setCurrentDialogue);
  const currentDialogue = useGameStore((state) => state.currentDialogue);

  const playerPosition = useGameStore((state) => state.playerPosition);
  const playerRef = useGameStore((state) => state.playerRef);

  //point of interest positions
  const posterPosition = useGameStore((state) => state.posterPosition);
  const ammoBoxPosition = useGameStore((state) => state.ammoBoxPosition);
  const tronkPosition = useGameStore((state) => state.tronkPosition);
  const pointerPosition = useGameStore((state) => state.pointerPosition);
  const brokenRobotPosition = useGameStore(
    (state) => state.brokenRobotPosition
  );
  const tank = useGameStore((state) => state.tankPosition);
  const swing = useGameStore((state) => state.swingPosition);

  //camera controls
  const controlsRef = useGameStore((state) => state.controlsRef);
  const setCameraOverride = useGameStore((state) => state.setCameraOverride);

  //save object positions to avoid calling multiple selectors and to have stable references for useEffects
  const objectPositions = useMemo(
    () => ({
      poster: posterPosition,
      ammoBox: ammoBoxPosition,
      tronk: tronkPosition,
      pointer: pointerPosition,
      brokenRobot: brokenRobotPosition,
      tank: tank,
      swing: swing,
    }),
    [
      posterPosition,
      ammoBoxPosition,
      tronkPosition,
      pointerPosition,
      brokenRobotPosition,
      tank,
      swing,
    ]
  );

  // camera position for every point of interest ajusted manualy
  const cameraShots = useMemo(
    () => ({
      poster: {
        cameraOffset: new THREE.Vector3(0, 1.2, -2.2),
        targetOffset: new THREE.Vector3(0, 0.2, 0),
      },
      ammoBox: {
        cameraOffset: new THREE.Vector3(0, 0.8, 1.4),
        targetOffset: new THREE.Vector3(0, 0.35, 0),
      },
      tronk: {
        cameraOffset: new THREE.Vector3(0, 1.4, 2),
        targetOffset: new THREE.Vector3(0, 0.3, 0),
      },
      pointer: {
        cameraOffset: new THREE.Vector3(0, 0.9, 1.5),
        targetOffset: new THREE.Vector3(0, 0.5, 0),
      },
      brokenRobot: {
        cameraOffset: new THREE.Vector3(0.8, 0.8, -2.2),
        targetOffset: new THREE.Vector3(0, 0.45, 0),
      },
      tank: {
        cameraOffset: new THREE.Vector3(8, 1.2, 8),
        targetOffset: new THREE.Vector3(0, 2, 2),
      },
      swing: {
        cameraOffset: new THREE.Vector3(0, 1.8, -2),
        targetOffset: new THREE.Vector3(0, 0.3, 0),
      },
    }),
    []
  );

  //restore camera to saved position before interaction
  function restoreCameraToPlayer() {
    const ctrl = controlsRef?.current;

    if (!ctrl) return;

    if (!savedCameraPositionRef.current || !savedCameraTargetRef.current) {
      console.log("No saved camera position");
      return;
    }

    ctrl.object.position.copy(savedCameraPositionRef.current);
    ctrl.target.copy(savedCameraTargetRef.current);
    ctrl.update();

    setCameraOverride(false);

    cameraIsOnObjectRef.current = false;
    lastElementRef.current = null;

    savedCameraPositionRef.current = null;
    savedCameraTargetRef.current = null;
  }

  // START INTERACTION
  useEffect(() => {
    const ctrl = controlsRef?.current;

    if (!ctrl) {
      console.log("Controls ref is not ready yet");
      return;
    }

    const justPressed = interact && !wasInteractPressedRef.current;
    wasInteractPressedRef.current = interact;

    if (!justPressed) return;
    if (!elementContacted) return;

    if (cameraIsOnObjectRef.current || currentDialogue) {
      // console.log(
      //   "Interaction ignored because another interaction is already running"
      // );
      return;
    }

    //vecotrise object position and get camera shot for the object interacted with from our map
    const objectPosition = toVector3(objectPositions[elementContacted]);
    const shot = cameraShots[elementContacted];

    if (!objectPosition || !shot) {
      // console.log("No position or camera shot for:", elementContacted);
      return;
    }

    console.log("Interaction key pressed:", elementContacted);

    cameraIsOnObjectRef.current = true;
    lastElementRef.current = elementContacted;

    //save current camera before interaction
    savedCameraPositionRef.current = ctrl.object.position.clone();
    savedCameraTargetRef.current = ctrl.target.clone();

    setCameraOverride(true);
    setPlayerAnimation("interaction");

    // dialogue starts interaction state
    if (elementContacted !== "poster") {
      setCurrentDialogue(elementContacted);
    }

    //turn Soren to face the object
    faceTarget(playerRef, playerPosition, objectPosition);

    //move camera to the object using predefined offsets for every point of interest
    const cameraPos = objectPosition.clone().add(shot.cameraOffset);
    const targetPos = objectPosition.clone().add(shot.targetOffset);

    ctrl.object.position.copy(cameraPos);
    ctrl.target.copy(targetPos);
    ctrl.update();

    //poster has no dialogue so restore camera after timeout
    if (elementContacted === "poster") {
      if (posterTimeoutRef.current) {
        clearTimeout(posterTimeoutRef.current);
      }

      posterTimeoutRef.current = setTimeout(() => {
        console.log("Poster interaction ended");

        restoreCameraToPlayer();

        posterTimeoutRef.current = null;
      }, 4000);
    }
  }, [
    interact,
    elementContacted,
    currentDialogue,
    controlsRef,
    objectPositions,
    cameraShots,
    playerRef,
    playerPosition,
    setPlayerAnimation,
    setCurrentDialogue,
    setCameraOverride,
  ]);

  // END INTERACTION WHEN DIALOGUE IS CLOSED
  useEffect(() => {
    //poster is handled by timeout
    if (lastElementRef.current === "poster") return;

    // if dialogue still exists, interaction is still running
    if (currentDialogue) return;

    // if camera was not moved to object, nothing to restore
    if (!cameraIsOnObjectRef.current) return;

    console.log("Interaction ended:", lastElementRef.current);

    restoreCameraToPlayer();
  }, [currentDialogue]);

  useEffect(() => {
    console.log("Element contacted changed:", elementContacted);
  }, [elementContacted]);

  //cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (posterTimeoutRef.current) {
        clearTimeout(posterTimeoutRef.current);
      }
    };
  }, []);

  return null;
}