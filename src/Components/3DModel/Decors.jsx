import { useRef, useEffect } from "react";
import { useGLTF } from "@react-three/drei";
import { RigidBody, CuboidCollider } from "@react-three/rapier";
import { useGameStore } from "../../store/store.js";
import { Outlines, Sparkles } from "@react-three/drei";
import PressButtonUI from "./PointsOfInterest/PressButtonUI.jsx";
import { useFrame } from "@react-three/fiber"; 

import * as THREE from "three";

export default function Decors(props) { 

  const { isCompressed, setIsCompressed } = useGameStore( );
  const objName = isCompressed ? "DECORS_compressed" : "DECORS";
    
  const { nodes, materials } = useGLTF(
    `/assets/3DModels/${objName}.glb`,
  ); 

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
        <RigidBody type="fixed" colliders={false} position={[4.5, 4, 4.7]}>
          <CuboidCollider args={[1.8, 0.5, 1.6]} />
        </RigidBody>

        <RigidBody
          type="fixed"
          colliders={false}
          position={[23.47, 3.98, 16.309]}
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

        <RigidBody type="fixed" colliders={false} position={[8.8, 2, -1.9]} rotation={[0, Math.PI * 1.3, 0]}>
          <CuboidCollider args={[2.3, 2, 2.4]} />
        </RigidBody>

        <RigidBody type="fixed" colliders={false} position={[-2.0, 4.9, 5.7]}>
          <CuboidCollider args={[1.8, 0.8, 1.6]} />
        </RigidBody>

        <RigidBody type="fixed" colliders={false} position={[-10.8, 4.1, -7.0]}>
          <CuboidCollider args={[2.3, 0.8, 2.7]} />
        </RigidBody>
 

        <RigidBody type="fixed" colliders={false} position={[16.1, 4.4, 19.5]}>
          <CuboidCollider args={[3, 1, 2.1]} />
        </RigidBody>

        <RigidBody type="fixed" colliders={false} position={[0, 3.8, -3.7]}>
          <CuboidCollider args={[3.1, 1, 1.8]} />
        </RigidBody>

        <RigidBody type="fixed" colliders={false} position={[32.1, 4.6, 7]}>
          <CuboidCollider args={[1.8, 1, 1.8]} />
        </RigidBody>

        <RigidBody type="fixed" colliders={false} position={[-4.4, 4.8, -13]}>
          <CuboidCollider args={[2.1, 1, 2.1]} />
        </RigidBody>

        <RigidBody type="fixed" colliders={false} position={[13.4, 4.5, 5]} rotation={[0, -14.7, 0]}>
          <CuboidCollider args={[2.2, 1, 1.8]} />
        </RigidBody>

        {/* ammobox */}
        <RigidBody debug type="fixed" colliders={false} position={[-4.85, 3.55, -9.8]}>
        <CuboidCollider args={[0.25, 0.2, 0.25]} />
      </RigidBody>
      </group>
    </group>
  );
}

// useGLTF.preload("/assets/3DModels/DECORS.glb");
