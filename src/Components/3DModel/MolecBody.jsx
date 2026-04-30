import React, { forwardRef } from 'react'
import { useGLTF } from '@react-three/drei'
import * as THREE from 'three';

export const MolecBody = forwardRef(function MolecBody({ children, ...props }, ref) {
    const { nodes, materials } = useGLTF('/assets/3DModels/molec.glb')
    return (


        <group {...props} ref={ref} dispose={null}>
            <group scale={1.904}>
                <mesh
                castShadow
                receiveShadow
                geometry={nodes.Sphere001_1.geometry}
                material={materials['Material.004']}
                />
                <mesh
                castShadow
                receiveShadow
                geometry={nodes.Sphere001_2.geometry}
                material={materials['Material.005']}
                />
                <mesh
                castShadow
                receiveShadow
                geometry={nodes.Icosphere001.geometry}
                material={materials.Crystal}
                />
            </group>
      { children }
    
    </group >
  )
})

useGLTF.preload('/assets/3DModels/molec.glb')
