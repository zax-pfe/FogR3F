import React, { useEffect } from 'react'
import { useGLTF } from '@react-three/drei'
import { useGameStore } from '../../store/store.js';

export default function Trees(props) { 

    const { isCompressed, setIsCompressed } = useGameStore( );
    const objName = isCompressed ? "TREES_compressed" : "TREES";
      
    const{ scene } = useGLTF(
      `/assets/3DModels/${objName}.glb`,
    ); 

  // useEffect(() => {
  //   scene.traverse((obj) => {
  //     if (obj.isInstancedMesh) {
  //       // console.log('INSTANCED MESH:', obj.name, 'count =', obj.count)
  //     }
  //     if (obj.isMesh) {
  //       // obj.castShadow = true
  //       // obj.receiveShadow = true
  //     }
  //   })
  // }, [scene])

  return <primitive object={scene} {...props} />
}

// useGLTF.preload('/assets/3DModels/TREES.glb')