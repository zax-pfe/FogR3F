import { useKeyboardControls } from "@react-three/drei";
import { useGameStore } from "../../../store/store.js";
import { useEffect, useMemo, useRef } from "react";
import * as THREE from "three";

import {
  toVector3,
  faceTarget,
  saveCamera,
  moveCameraToObject,
  restoreCamera,
} from "../../../utils/useInteractionCamera.js";

//offsets for camera position and target for each object
const CAMERA_SHOTS = {
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
  peluche: {
    cameraOffset: new THREE.Vector3(-1.5, 1.5, -0.7),
    targetOffset: new THREE.Vector3(-0.2, 0.5, 0.5),
  },
};

export default function Interaction() {
  const interact = useKeyboardControls((state) => state.interact); // letterr A to interact
  const cancelInteraction = useKeyboardControls((state) => state.cancelInteraction); //letter X to cancel interaction

  //interactions started - to prevent the same start multiple times
  const wasInteractPressedRef = useRef(false);
  //which element we are currently interacting with
  const activeElementRef = useRef(null);
  //old camera position and target before interaction
  const savedCameraRef = useRef(null);
  //timeout ref for poster
  const posterTimeoutRef = useRef(null);
  //if we stop the interaction
  const wasCancelPressedRef = useRef(false);

  //element we pressed interact on
  const elementContacted = useGameStore((state) => state.elementContacted);
  const setIsInteractionActive = useGameStore((state) => state.setIsInteractionActive);

  //Audio and dialogues
  const currentDialogue = useGameStore((state) => state.currentDialogue);
  const setCurrentDialogue = useGameStore((state) => state.setCurrentDialogue);
  const stopDialogue = useGameStore((state) => state.stopDialogue);

  //Player
  const setPlayerAnimation = useGameStore((state) => state.setPlayerAnimation);
  const playerPosition = useGameStore((state) => state.playerPosition);
  const playerRef = useGameStore((state) => state.playerRef);

  //camera controls
  const controlsRef = useGameStore((state) => state.controlsRef);
  const setCameraOverride = useGameStore((state) => state.setCameraOverride);

  //All points of interest positions
  const posterPosition = useGameStore((state) => state.posterPosition);
  const ammoBoxPosition = useGameStore((state) => state.ammoBoxPosition);
  const tronkPosition = useGameStore((state) => state.tronkPosition);
  const pointerPosition = useGameStore((state) => state.pointerPosition);
  const brokenRobotPosition = useGameStore((state) => state.brokenRobotPosition);
  const tankPosition = useGameStore((state) => state.tankPosition);
  const swingPosition = useGameStore((state) => state.swingPosition);
  const peluchePosition = useGameStore((state) => state.peluchePosition);

  //maped positions to names
  const objectPositions = useMemo(
    () => ({
      poster: posterPosition,
      ammoBox: ammoBoxPosition,
      tronk: tronkPosition,
      pointer: pointerPosition,
      brokenRobot: brokenRobotPosition,
      tank: tankPosition,
      swing: swingPosition,
      peluche: peluchePosition,
    }),
    [
      posterPosition,
      ammoBoxPosition,
      tronkPosition,
      pointerPosition,
      brokenRobotPosition,
      tankPosition,
      swingPosition,
      peluchePosition,
    ],
  );

  function clearPosterTimeout() {
    if (!posterTimeoutRef.current) return;

    clearTimeout(posterTimeoutRef.current);
    posterTimeoutRef.current = null;
  }

  function stopInteraction() {
    if (!activeElementRef.current) return;

    // console.log("Stopping interaction with:", activeElementRef.current);

    const ctrl = controlsRef?.current;

    clearPosterTimeout();
    stopDialogue();

    restoreCamera(ctrl, savedCameraRef.current);
    setCameraOverride(false);

    savedCameraRef.current = null;
    activeElementRef.current = null;
    setIsInteractionActive(false);
  }

  function startInteraction(elementName) {
    const ctrl = controlsRef?.current;

    // console.log("Attempting to start interaction with:", elementName);

    if (!ctrl) return;
    if (!elementName) return;
    if (activeElementRef.current || currentDialogue) return;

    // console.log("Starting interaction with:", elementName);

    const objectPosition = toVector3(objectPositions[elementName]);
    // console.log("Object position for interaction:", objectPosition);
    const shot = CAMERA_SHOTS[elementName];
    // console.log("Camera shot for interaction:", shot);

    if (!objectPosition || !shot) return;

    setIsInteractionActive(true);

    // console.log("Object position:", objectPosition);

    savedCameraRef.current = saveCamera(ctrl);
    activeElementRef.current = elementName;

    setCameraOverride(true);
    setPlayerAnimation("interaction");

    faceTarget(playerRef, playerPosition, objectPosition);
    moveCameraToObject(ctrl, objectPosition, shot);

    if (elementName === "poster") {
      posterTimeoutRef.current = setTimeout(() => {
        stopInteraction();
      }, 4000);

      return;
    }

    setCurrentDialogue(elementName);
  }

  useEffect(() => {
    const justPressed = interact && !wasInteractPressedRef.current;
    wasInteractPressedRef.current = interact;

    //doesnt let to do looped interaction if key is holded
    if (!justPressed) return;

    startInteraction(elementContacted);
  }, [interact, elementContacted]);

  //stop interaction automatically if dialogue ends
  useEffect(() => {
    if (!activeElementRef.current) return;
    if (activeElementRef.current === "poster") return;
    if (currentDialogue) return;

    stopInteraction();
  }, [currentDialogue]);

  //forget the timepout when we unmount the component
  useEffect(() => {
    return () => {
      clearPosterTimeout();
    };
  }, []);

  useEffect(() => {
    const justPressed = cancelInteraction && !wasCancelPressedRef.current;
    wasCancelPressedRef.current = cancelInteraction;

    if (!justPressed) return;

    stopInteraction();
  }, [cancelInteraction]);

  return null;
}
