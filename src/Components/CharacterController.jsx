import React, { useRef } from "react";
import { RigidBody, CapsuleCollider } from "@react-three/rapier";
import { MathUtils, Vector3 } from "three";
import { useFrame } from "@react-three/fiber";
import { useKeyboardControls } from "@react-three/drei";
import { useControls } from "leva";
import Character from "./3DModel/Character";
import { degToRad } from "three/src/math/MathUtils.js";

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

export default function CharacterTestController() {
  // ______________________ REFS & VARIABLES __________________/
  // Object refs
  const rb = useRef(); // RigidBody -> hitbox
  const character = useRef();

  // Camera refs
  const container = useRef();
  const cameraTarget = useRef();
  const cameraPosition = useRef();
  const cameraWorldPosition = useRef(new Vector3());
  const cameraLookAtWorldPosition = useRef(new Vector3());
  const cameraLookAt = useRef(new Vector3());

  // Rotation
  const characterRotationTarget = useRef(0);
  const rotationTarget = useRef(0);

  const [, get] = useKeyboardControls(); // Get input controls

  // ______________________ LEVA CONTROLS __________________/
  const { WALK_SPEED, ROTATION_SPEED } = useControls(
    "Character Test Controls",
    {
      WALK_SPEED: { value: 5, min: 0, max: 10, step: 0.1 },
      ROTATION_SPEED: {
        value: degToRad(3),
        min: degToRad(0.1),
        max: degToRad(5),
        step: degToRad(0.1),
      },
    },
  );

  useFrame(({ camera }, delta) => {
    // ______________________ OBJECT CONTROLS __________________/

    if (!rb.current) return;

    const vel = rb.current.linvel();

    const movement = { x: 0, z: 0 };
    // Inputs
    if (get().forward) movement.z = 1;
    if (get().backward) movement.z = -1;
    if (get().left) movement.x = 1;
    if (get().right) movement.x = -1;

    if (movement.x !== 0) {
      rotationTarget.current += ROTATION_SPEED * movement.x;
    }

    // if Rotation
    if (movement.x !== 0 || movement.z !== 0) {
      // unknown math to find the angle to rotate
      // the character to face the movement direction
      characterRotationTarget.current = Math.atan2(movement.x, movement.z);
      vel.x =
        Math.sin(rotationTarget.current + characterRotationTarget.current) *
        WALK_SPEED;

      vel.z =
        Math.cos(rotationTarget.current + characterRotationTarget.current) *
        WALK_SPEED;
    }

    character.current.rotation.y = lerpAngle(
      character.current.rotation.y,
      characterRotationTarget.current,
      0.1,
    );

    rb.current.setLinvel(vel, true);

    //   const targetAngle = Math.atan2(movement.x, movement.z);

    //   const angle = rotationTarget.current + characterRotationTarget.curren;

    //   character.current.rotation.y = lerpAngle(
    //     character.current.rotation.y,
    //     targetAngle,
    //     0.1,
    //   );
    //   vel.x = Math.sin(angle) * WALK_SPEED;
    //   vel.z = Math.cos(angle) * WALK_SPEED;
    // } else {
    //   vel.x = 0;
    //   vel.z = 0;
    // }
    // rb.current.setLinvel(vel, true);

    // ______________________ CAMERA CONTROLS __________________/

    container.current.rotation.y = MathUtils.lerp(
      container.current.rotation.y,
      rotationTarget.current,
      0.1,
    );

    cameraPosition.current.getWorldPosition(cameraWorldPosition.current);
    camera.position.lerp(cameraWorldPosition.current, 0.1);

    if (cameraTarget.current) {
      cameraTarget.current.getWorldPosition(cameraLookAtWorldPosition.current);
      cameraLookAt.current.lerp(cameraLookAtWorldPosition.current, 0.1);

      camera.lookAt(cameraLookAt.current);
    }
  });

  return (
    <RigidBody colliders={false} position={[0, 5, 0]} lockRotations ref={rb}>
      <group ref={container}>
        <group ref={cameraTarget} position-z={4} />
        <group ref={cameraPosition} position-y={7} position-z={-15} />
        <group ref={character}>
          <Character />
        </group>
      </group>
      <CapsuleCollider args={[0.5, 1]} />
    </RigidBody>
  );
}
