

import React, { useRef } from 'react'
import { useGLTF } from '@react-three/drei'
import { RigidBody, MeshCollider } from "@react-three/rapier";
import { MeshBasicMaterial } from 'three';

export default function Terrain(props) {
  const { nodes, materials } = useGLTF('/assets/3DModels/TERRAIN.glb')
  return (
    <group {...props} dispose={null}  >
     
          <mesh 
            receiveShadow
            geometry={nodes.TERRAIN.geometry}
            material={materials['Material.001']}
          /> 

        <RigidBody type="fixed"  colliders={false}>
         <MeshCollider type="trimesh" >
         <mesh 
          geometry={nodes.RIDGID.geometry} 
        >
          <meshBasicMaterial transparent opacity={0} />
        </mesh>
        </MeshCollider>
      </RigidBody>
    </group>
  )
}

useGLTF.preload('/assets/3DModels/TERRAIN.glb')

