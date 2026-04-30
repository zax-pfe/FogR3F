import React, { useRef, useEffect } from "react";
import { RigidBody, CapsuleCollider } from "@react-three/rapier";
import { MathUtils, Vector3 } from "three";
import { useFrame, useThree } from "@react-three/fiber";
import { useKeyboardControls } from "@react-three/drei";
import { useControls } from "leva";
import Character from "./3DModel/Character";
import { degToRad } from "three/src/math/MathUtils.js";
import { forwardRef } from "react";
import MolecTest from "./3DModel/MolecTest.jsx";
import { Points, PointMaterial } from "@react-three/drei";
import * as THREE from "three";
import { useGameStore } from "../store/store.js";

// import AnimatedSoren from "./3DModel/animatedSoren/Soren.jsx";
import AnimatedSoren from "./3DModel/animatedSoren/UpdatedSoren.jsx";

// ______________________ UTILS __________________/

const normalizeAngle = (angle) => {
  while (angle > Math.PI) angle -= 2 * Math.PI;
  while (angle < -Math.PI) angle += 2 * Math.PI;

  return angle;
};

const lerpAngle = (start, end, t) => {
  start = normalizeAngle(start);
  end = normalizeAngle(end);

  if (Math.abs(end - start) > Math.PI) {
    if (end > start) {
      start += 2 * Math.PI;
    } else {
      end += 2 * Math.PI;
    }
  }

  return normalizeAngle(start + (end - start) * t);
};

export default function CharacterController() {
  // ______________________ REFS & VARIABLES __________________/
  // Object refs
  const rb = useRef(); // RigidBody -> hitbox
  const character = useRef();
  const setPlayerPosition = useGameStore((state) => state.setPlayerPosition);
  const setPlayerAnimation = useGameStore((state) => state.setPlayerAnimation);
  const controlsRef = useGameStore((state) => state.controlsRef);

  const { camera } = useThree();

  // ______________________ INIT CAMERA AND PLAYER POSITION __________________/

  useEffect(() => {
    // console.log(":", controlsRef);
    camera.position.set(0, 1.6, -5);
    if (rb.current) {
      const pos = rb.current.translation();
      setPlayerPosition(pos);
    }
  }, [rb.current]);

  // Camera refs
  const container = useRef();
  const [, get] = useKeyboardControls(); // Get input controls

  // ______________________ LEVA CONTROLS __________________/
  const { WALK_SPEED, CAMERA_LOCK } = useControls("Character Test Controls", {
    WALK_SPEED: { value: 1.3, min: 0, max: 20, step: 0.1 },
    CAMERA_LOCK: true,
  });

  // ______________________ FRAME UPDATE __________________/

  useFrame(({ camera }, delta) => {
    // ______________________ CAMERA CONTROLS __________________/

    if (!rb.current || !controlsRef?.current) return;
    const controls = controlsRef.current;

    if (CAMERA_LOCK) {
      const playerPos = rb.current.translation();
      // console.log("Player position:", playerPos);
      const target = new THREE.Vector3(playerPos.x, playerPos.y, playerPos.z);

      const offset = new THREE.Vector3().subVectors(
        controls.object.position,
        controls.target,
      );
      const newCameraPos = target.clone().add(offset);

      controls.object.position.copy(newCameraPos);

      controls.target.copy(target);

      controls.update();
    }

    // ______________________ PLAYER CONTROLS __________________/
    const cameraDirection = new THREE.Vector3();
    camera.getWorldDirection(cameraDirection);
    cameraDirection.y = 0;
    cameraDirection.normalize();
    // console.log("Camera direction:", cameraDirection);

    const right = new THREE.Vector3();
    right.crossVectors(cameraDirection, new THREE.Vector3(0, 1, 0));
    right.normalize();

    const vel = rb.current.linvel();

    const movement = { x: 0, z: 0 };
    // Inputs
    if (get().forward) movement.z = 1;
    if (get().backward) movement.z = -1;
    if (get().left) movement.x = -1;
    if (get().right) movement.x = 1;

    // _________________________ ROTATION _________________________/

    const moveDirection = new THREE.Vector3();

    moveDirection.addScaledVector(cameraDirection, movement.z);
    moveDirection.addScaledVector(right, movement.x);
    // console.log("Move direction:", moveDirection);
    if (moveDirection.length() === 0) {
      setPlayerAnimation("idle");
      return;
    }

    const targetAngle = Math.atan2(moveDirection.x, moveDirection.z);

    container.current.rotation.y = lerpAngle(
      container.current.rotation.y,
      targetAngle,
      0.1,
    );
    setPlayerAnimation("walk");

    vel.x =
      (cameraDirection.x * movement.z + right.x * movement.x) * WALK_SPEED;

    vel.z =
      (cameraDirection.z * movement.z + right.z * movement.x) * WALK_SPEED;

    rb.current.setLinvel(vel, true);

    setPlayerPosition(rb.current.translation());
  });

  return (
    <RigidBody
      colliders={false}
      lockRotations
      ref={rb}
      linearDamping={4}
      angularDamping={8}
      position={[-6.058, 5, 24.83]}
    >
      <group ref={container}>
        <group ref={character}>
          {/* <Character /> */}
          <AnimatedSoren />
        </group>
      </group>
      <CapsuleCollider args={[0.1, 0.4]} />
    </RigidBody>
  );
  // }
}
