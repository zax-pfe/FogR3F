import React, { forwardRef } from 'react'
import { useGLTF } from '@react-three/drei'
import * as THREE from 'three';
import { useGameStore } from '../../store/store.js';

export const MolecBody = forwardRef(function MolecBody({ children, ...props }, ref) {
  
    const { isCompressed, setIsCompressed } = useGameStore( );
    const objName = isCompressed ? "molec_compressed" : "molec";
        
    const { nodes, materials } = useGLTF(
        `/assets/3DModels/${objName}.glb`,
    );  
    
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

// useGLTF.preload('/assets/3DModels/molec.glb')
