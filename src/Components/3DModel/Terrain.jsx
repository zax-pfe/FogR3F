import React, { useRef } from 'react'
import { useGLTF } from '@react-three/drei'
import { RigidBody, MeshCollider } from "@react-three/rapier";
import { MeshBasicMaterial } from 'three';
import { useGameStore } from '../../store/store.js';

export default function Terrain(props) { 

  const { isCompressed, setIsCompressed } = useGameStore( );
  const objName = isCompressed ? "TERRAIN_compressed" : "TERRAIN";
    
  const { nodes, materials } = useGLTF(
    `/assets/3DModels/${objName}.glb`,
  ); 

  return (
    <group {...props} dispose={null}  > 
       <mesh
        castShadow
        receiveShadow
        geometry={nodes.TERRAIN.geometry}
        material={materials['Material.003']}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Plane.geometry}
        material={materials['Material.001']}
      /> 
      <RigidBody type="fixed"  colliders={false}>
         <MeshCollider type="trimesh" >
         <mesh 
          geometry={nodes.RIDGID.geometry} 
        >
          <meshBasicMaterial
            transparent
            opacity={0}
            depthWrite={false}
            depthTest={false}
            visible={false}
          />
        
        </mesh>
        </MeshCollider>
      </RigidBody>
    </group>
  )
}

// useGLTF.preload('/assets/3DModels/TERRAIN.glb')

