import React, { useEffect } from 'react'
import { useGLTF } from '@react-three/drei'

export default function Trees(props) {
  const { scene } = useGLTF('/assets/3DModels/TREES.glb')

  useEffect(() => {
    scene.traverse((obj) => {
      if (obj.isInstancedMesh) {
        console.log('INSTANCED MESH:', obj.name, 'count =', obj.count)
      }
      if (obj.isMesh) {
        // obj.castShadow = true
        // obj.receiveShadow = true
      }
    })
  }, [scene])

  return <primitive object={scene} {...props} />
}

useGLTF.preload('/assets/3DModels/TREES.glb')