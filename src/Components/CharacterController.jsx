import React, { useRef } from "react";
import { RigidBody, CapsuleCollider } from "@react-three/rapier";
import { MathUtils, Vector3 } from "three";
import { useFrame } from "@react-three/fiber";
import { useKeyboardControls } from "@react-three/drei";
import { useControls } from "leva";
import Character from "./3DModel/Character";
import { degToRad } from "three/src/math/MathUtils.js";
import { forwardRef } from "react";

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

// export default function CharacterController({ characterRef }) {
const CharacterController = forwardRef((props, ref) => {
  // ______________________ REFS & VARIABLES __________________/
  // Object refs
  const rb = useRef(); // RigidBody -> hitbox
  // const character = ref;
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
  const {
    WALK_SPEED,
    ROTATION_SPEED,
    camera_target_z,
    camera_position_y,
    camera_position_z,
    cameraPositions,
    orbitControlsEnabled,
  } = useControls("Character Test Controls", {
    WALK_SPEED: { value: 5, min: 0, max: 10, step: 0.1 },
    ROTATION_SPEED: {
      value: degToRad(1.5),
      min: degToRad(0.1),
      max: degToRad(5),
      step: degToRad(0.1),
    },
    camera_target_z: { value: 4, min: -10, max: 10, step: 0.1 },
    camera_position_y: { value: 7, min: 0, max: 20, step: 0.1 },
    camera_position_z: { value: -15, min: -50, max: 0, step: 0.1 },
    // cameraPositions: {
    //   value: { z: 7, y: -15 },
    //   step: 0.1,
    //   joystick: "invertY"z,
    // },
    orbitControlsEnabled: false,
  });

  // ______________________ FRAME UPDATE __________________/

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

    // _________________________ ROTATION _________________________/

    if (movement.x !== 0) {
      rotationTarget.current += ROTATION_SPEED * movement.x * delta * 50;
    }

    // _________________________ TRANSLATION _________________________/
    if (movement.z !== 0) {
      // unknown math to find the angle to rotate
      // the character to face the movement direction
      const moveAngle = Math.atan2(movement.x, movement.z);
      const finalAngle = rotationTarget.current + moveAngle;
      // characterRotationTarget.current = finalAngle;

      vel.z = Math.cos(finalAngle) * WALK_SPEED * delta * 50;
      vel.x = Math.sin(finalAngle) * WALK_SPEED * delta * 50;
    }

    character.current.rotation.y = lerpAngle(
      character.current.rotation.y,
      characterRotationTarget.current,
      0.1,
    );

    rb.current.setLinvel(vel, true);

    // ______________________ CAMERA CONTROLS __________________/
    container.current.rotation.y = MathUtils.lerp(
      container.current.rotation.y,
      rotationTarget.current,
      0.1,
    );
    if (orbitControlsEnabled) {
      cameraPosition.current.getWorldPosition(cameraWorldPosition.current);
      camera.position.lerp(cameraWorldPosition.current, 0.1);

      if (cameraTarget.current) {
        cameraTarget.current.getWorldPosition(
          cameraLookAtWorldPosition.current,
        );
        cameraLookAt.current.lerp(cameraLookAtWorldPosition.current, 0.1);

        camera.lookAt(cameraLookAt.current);
      }
    }
  });

  return (
    <RigidBody colliders={false} position={[0, 5, 0]} lockRotations ref={rb}>
      <group ref={container}>
        <group ref={cameraTarget} position-z={camera_target_z} />
        <group
          ref={cameraPosition}
          position-y={camera_position_y}
          position-z={camera_position_z}
          // position-y={cameraPositions.y}
          // position-z={cameraPositions.z}
        />
        <group ref={character}>
          {/* <Character /> */}
          <Character ref={ref} />
        </group>
      </group>
      <CapsuleCollider args={[0.5, 1]} />
    </RigidBody>
  );
  // }
});
export default CharacterController;
