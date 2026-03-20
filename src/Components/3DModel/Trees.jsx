import { useEffect } from 'react'
import { useGLTF } from '@react-three/drei'

export default function Trees(props) {
  const gltf = useGLTF('/assets/3DModels/treeground.glb')

  useEffect(() => {
    gltf.scene.traverse((obj) => {
      if (obj.isInstancedMesh) {
        console.log('InstancedMesh:', obj.name, 'count =', obj.count)
      } else if (obj.isMesh) {
        console.log('Regular Mesh:', obj.name)
      }
    })
  }, [gltf])

  return <primitive object={gltf.scene} {...props} />
}

useGLTF.preload('/assets/3DModels/treeground.glb')