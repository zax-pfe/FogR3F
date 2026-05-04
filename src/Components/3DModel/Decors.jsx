import { useRef, useEffect } from "react";
import { useGLTF } from "@react-three/drei";
import { RigidBody, CuboidCollider } from "@react-three/rapier";
import { useGameStore } from "../../store/store.js";
import { Outlines, Sparkles } from "@react-three/drei";
import PressButtonUI from "./PointsOfInterest/PressButtonUI.jsx";
import { useFrame } from "@react-three/fiber";

import * as THREE from "three";

export default function Decors(props) {
  const { nodes, materials } = useGLTF("/assets/3DModels/DECORS.glb");

  return (
    <group {...props} dispose={null}>
      {/* ================= VISUALS ================= */}

      <group {...props} dispose={null}>
        <mesh 
          geometry={nodes['+barac'].geometry}
          material={materials.FINAL}
        />
      </group>
      {/* ================= PHYSICS ONLY ================= */}

      <group name="physics-obstacles">
        <RigidBody type="fixed" colliders={false} position={[2.3, 4, 4]}>
          <CuboidCollider args={[1.2, 0.5, 1]} />
        </RigidBody>

        <RigidBody
          type="fixed"
          colliders={false}
          position={[25.47, 3.98, 18.309]}
        >
          <CuboidCollider args={[1, 0.4, 0.5]} />
        </RigidBody>

        <RigidBody
          type="fixed"
          colliders={false}
          position={[29.045, 3.761, -10.396]}
        >
          <CuboidCollider args={[0.7, 0.7, 0.7]} />
        </RigidBody>

        <RigidBody type="fixed" colliders={false} position={[7.8, 2, -3]}>
          <CuboidCollider args={[1.3, 2, 1.4]} />
        </RigidBody>

        <RigidBody type="fixed" colliders={false} position={[-3.7, 4.9, 5.7]}>
          <CuboidCollider args={[1.1, 0.8, 1]} />
        </RigidBody>

        <RigidBody type="fixed" colliders={false} position={[-8.8, 4.1, -5.6]}>
          <CuboidCollider args={[1.3, 0.8, 1.3]} />
        </RigidBody>

        <RigidBody type="fixed" colliders={false} position={[-4.4, 4.4, 13.6]}>
          <CuboidCollider args={[1.3, 0.9, 1.3]} />
        </RigidBody>

        <RigidBody type="fixed" colliders={false} position={[17.7, 4.4, 19.5]}>
          <CuboidCollider args={[2, 1, 1.1]} />
        </RigidBody>

        <RigidBody type="fixed" colliders={false} position={[0, 3.8, -4.5]}>
          <CuboidCollider args={[2.1, 1, 1.2]} />
        </RigidBody>

        <RigidBody type="fixed" colliders={false} position={[32.1, 4.6, 7]}>
          <CuboidCollider args={[1.5, 1, 1.6]} />
        </RigidBody>

        <RigidBody type="fixed" colliders={false} position={[-6.4, 4.8, -15]}>
          <CuboidCollider args={[1.1, 1, 1.1]} />
        </RigidBody>

        <RigidBody type="fixed" colliders={false} position={[10.4, 4.5, 4.6]}>
          <CuboidCollider args={[1.2, 1, 1.2]} />
        </RigidBody>
      </group>
    </group>
  );
}

useGLTF.preload("/assets/3DModels/DECORS.glb");
