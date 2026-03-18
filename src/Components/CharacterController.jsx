import React, { useRef } from "react";
import { RigidBody, CapsuleCollider } from "@react-three/rapier";
import { MathUtils, Vector3 } from "three";
import { useFrame } from "@react-three/fiber";
import { useKeyboardControls } from "@react-three/drei";
import { useControls } from "leva";
import Character from "./3DModel/Character";

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
  const rb = useRef(); // RigidBody -> hitbox
  const container = useRef();
  const character = useRef();
  const cameraTarget = useRef();
  const cameraPosition = useRef();

  const [, get] = useKeyboardControls(); // Get input controls

  // ______________________ LEVA CONTROLS __________________/
  const { WALK_SPEED, ROTATION_SPEED } = useControls(
    "Character Test Controls",
    {
      WALK_SPEED: { value: 5, min: 0, max: 10, step: 0.1 },
      ROTATION_SPEED: { value: 5, min: 0, max: 10, step: 0.1 },
    },
  );

  useFrame(
    ({ camera }, delta) => {
      if (!rb.current) return;

      const vel = rb.current.linvel();

      const movement = { x: 0, z: 0 };
      // Inputs
      if (get().forward) movement.z = -1;
      if (get().backward) movement.z = 1;
      if (get().left) movement.x = -1;
      if (get().right) movement.x = 1;

      // if Rotation
      if (movement.x !== 0 || movement.z !== 0) {
        // unknown math to find the angle to rotate
        // the character to face the movement direction
        const targetAngle = Math.atan2(movement.x, movement.z);

        character.current.rotation.y = lerpAngle(
          character.current.rotation.y,
          targetAngle,
          0.1,
        );

        const angle = character.current.rotation.y;
        vel.x = Math.sin(angle) * WALK_SPEED;
        vel.z = Math.cos(angle) * WALK_SPEED;
      } else {
        vel.x = 0;
        vel.z = 0;
      }

      rb.current.setLinvel(vel, true);
    },

    [WALK_SPEED, ROTATION_SPEED],
  );

  return (
    <RigidBody colliders={false} position={[0, 1, 0]} lockRotations ref={rb}>
      <group ref={container}>
        <group ref={cameraTarget} position-z={1.5}>
          <group ref={cameraPosition} position-y={4} position-z={4}>
            <group ref={character}>
              <Character />
              <CapsuleCollider args={[0.5, 1]} />
            </group>
          </group>
        </group>
      </group>
    </RigidBody>
  );
}
