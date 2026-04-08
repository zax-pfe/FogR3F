import React, { useRef } from 'react'
import { useGLTF } from '@react-three/drei'

export default function Decors(props) {
  const { nodes, materials } = useGLTF('/assets/3DModels/DECORS.glb')
  return ( 
    <group {...props} dispose={null}>
      <group position={[2.176, 4.837, 4.114]} scale={1.584}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cylinder000_WoodHandle_0002.geometry}
          material={materials['WoodHandle.004']}
          position={[0.18, -0.808, -0.216]}
          rotation={[-1.348, -0.026, -0.049]}
          scale={0.069}
        />
      </group>
      <group position={[7.683, 3.31, -3.336]} rotation={[2.695, 1.21, -2.938]} scale={2.042}>
        <group position={[-0.057, 0.081, -0.048]} rotation={[-Math.PI / 2, 0, 0]} scale={0.056}>
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Cylinder000_Material002_0022.geometry}
            material={materials['WoodPlank.002']}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Cylinder000_Material002_0022_1.geometry}
            material={materials['WoodBark.001']}
          />
        </group>
      </group>
      <group position={[-3.461, 4.021, 4.315]} rotation={[0.143, 0, 0]} scale={1.686}>
        <group position={[-0.166, 0.469, 0.718]} rotation={[-1.388, -0.42, 0.009]} scale={0.056}>
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Cylinder000_WoodBark002_0018.geometry}
            material={materials['WoodBark.001']}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Cylinder000_WoodBark002_0018_1.geometry}
            material={materials['Thatch.002']}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Cylinder000_WoodBark002_0018_2.geometry}
            material={materials['WoodPlank.002']}
          />
        </group>
      </group>
      <group position={[-9.081, 4.316, -5.512]} rotation={[0, 0.691, 0]} scale={1.945}>
        <group position={[-0.061, -0.237, 0.445]} rotation={[-Math.PI / 2, 0, 0]} scale={0.056}>
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Cylinder000_Hair004_0003.geometry}
            material={materials['Black.001']}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Cylinder000_Hair004_0003_1.geometry}
            material={materials['WoodPlank.002']}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Cylinder000_Hair004_0003_2.geometry}
            material={materials['WoodBark.001']}
          />
        </group>
      </group>
      <group position={[-4.905, 3.259, 13.387]} rotation={[0, -1.257, 0]} scale={1.208}>
        <group position={[0.673, 0.637, -0.393]} rotation={[-Math.PI / 2, 0, 0]} scale={0.111}>
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Cylinder000_Material002_0021.geometry}
            material={materials['WoodPlank.002']}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Cylinder000_Material002_0021_1.geometry}
            material={materials['WoodBark.001']}
          />
        </group>
      </group>
      <group position={[-8.988, 3.696, 18.8]} rotation={[0.778, 1.291, -0.938]} scale={1.354}>
        <group position={[-2.275, -0.143, 1.002]} rotation={[-1.568, -0.014, 0.003]} scale={0.077}>
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Cylinder000_Material002_0019_1.geometry}
            material={materials['WoodPlank.001']}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Cylinder000_Material002_0019_2.geometry}
            material={materials['WoodBark.004']}
          />
        </group>
      </group>
      <group position={[17.167, 4.256, 19.772]} rotation={[-Math.PI / 2, 0, 0]} scale={0.073}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cylinder000_WoodBeam_0002.geometry}
          material={materials['WoodBeam.003']}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cylinder000_WoodBeam_0002_1.geometry}
          material={materials['WoodWall.001']}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cylinder000_WoodBeam_0002_2.geometry}
          material={materials.AxeHead}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cylinder000_WoodBeam_0002_3.geometry}
          material={materials['WoodPlank.003']}
        />
      </group>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes['+Destroyed'].geometry}
        material={materials['WoodBeam.003']}
        position={[-10.91, 4.453, 7.478]}
        rotation={[-Math.PI / 2, 0, -1.283]}
        scale={0.073}
      />
      <group position={[-0.313, 3.29, -4.552]} scale={1.241}>
        <group rotation={[-Math.PI / 2, 0, 0]} scale={0.073}>
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Cylinder000_WoodBeam_0001_1.geometry}
            material={materials['WoodBeam.003']}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Cylinder000_WoodBeam_0001_2.geometry}
            material={materials['WoodPlank.004']}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Cylinder000_WoodBeam_0001_3.geometry}
            material={materials['WoodWall.004']}
          />
        </group>
      </group>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes['+dest'].geometry}
        material={materials['WoodBeam.001']}
        position={[35.742, 4.34, 21.693]}
        rotation={[-Math.PI / 2, 0, -0.492]}
        scale={0.128}
      />
      <group position={[32.256, 4.225, 6.749]} rotation={[-2.339, 0.105, 0.782]} scale={0.128}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cylinder000_Thatch007_0002.geometry}
          material={materials['Thatch.005']}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cylinder000_Thatch007_0002_1.geometry}
          material={materials['WoodBeam.001']}
        />
      </group>
      <group position={[-6.257, 3.741, -14.099]} rotation={[-Math.PI / 2, 0, 0.913]} scale={0.117}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cylinder000_Thatch_0001.geometry}
          material={materials['Straw.001']}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cylinder000_Thatch_0001_1.geometry}
          material={materials.Straw}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cylinder000_Thatch_0001_2.geometry}
          material={materials['WoodPlank.005']}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cylinder000_Thatch_0001_3.geometry}
          material={materials['WoodBark.002']}
        />
      </group>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes['+Boat'].geometry}
        material={materials['Boat_texture.001']}
        position={[26.325, 3.574, 21.909]}
        rotation={[2.927, 1.445, -2.847]}
        scale={0.373}
      />
      <group position={[29.904, 4.51, 16.175]} rotation={[-1.426, 0, 1.68]} scale={0.103}>
        <group
          position={[1.381, 5.524, 6.209]}
          rotation={[-0.054, 0.006, 0.008]}
          scale={[0.997, 0.762, 1]}>
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Cube010_4_1.geometry}
            material={materials.bridge_wood05}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Cube010_4_2.geometry}
            material={materials['BRIDGE MAT']}
          />
        </group>
      </group>
      <group position={[10.265, 5.141, 4.72]} rotation={[-1.571, 0, -0.58]} scale={0.117}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cylinder000_WoodDark_0001.geometry}
          material={materials['WoodDark.001']}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cylinder000_WoodDark_0001_1.geometry}
          material={materials['WoodHandle.001']}
        />
      </group>
      <group position={[-4.051, 3.73, 8.795]} rotation={[-Math.PI / 2, 0, 0]} scale={0.084}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cylinder000_CutStone001_0.geometry}
          material={materials.CutStone}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cylinder000_CutStone001_0_1.geometry}
          material={materials.autumn_yellow_mat}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cylinder000_CutStone001_0_2.geometry}
          material={materials['rock_1_material.002']}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cylinder000_CutStone001_0_3.geometry}
          material={materials.rock_2_mat}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cylinder000_CutStone001_0_4.geometry}
          material={materials.grass3}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cylinder000_CutStone001_0_5.geometry}
          material={materials.grass1}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cylinder000_CutStone001_0_6.geometry}
          material={materials.grass2}
        />
      </group>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes['+Pointer'].geometry}
        material={materials['material.001']}
        position={[-3.749, 3.584, 22.975]}
        rotation={[Math.PI, -0.72, Math.PI]}
        scale={0.508}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Text001.geometry}
          material={nodes.Text001.material}
          position={[0.298, 0.452, 0.583]}
          rotation={[2.504, 1.21, -2.731]}
          scale={0.094}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Text002.geometry}
          material={nodes.Text002.material}
          position={[0.011, 1.512, -0.138]}
          rotation={[1.59, 0.047, -1.599]}
          scale={0.217}
        />
      </mesh>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes['+river'].geometry}
        material={materials['Material.015']}
        position={[23.523, 1.994, -12.474]}
        rotation={[-Math.PI / 2, 0, 0.152]}
        scale={[-0.539, -2.718, -0.513]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes['+scarecrow'].geometry}
        material={materials.scarecrow_material}
        position={[-3.331, 5.331, 2.171]}
        rotation={[-1.371, 0.153, -1.919]}
      />
      <group position={[12.387, 3.854, 11.549]} rotation={[-1.624, -0.115, -1.571]} scale={1.143}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.rock_2011_0.geometry}
          material={materials.rock_2_mat}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.rock_2011_0_1.geometry}
          material={materials['Material.007']}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.rock_2011_0_2.geometry}
          material={materials['material.002']}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.rock_2011_0_3.geometry}
          material={materials['rock_1_material.002']}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.rock_2011_0_4.geometry}
          material={materials.autumn_yellow_mat}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.rock_2011_0_5.geometry}
          material={materials.grass3}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.rock_2011_0_6.geometry}
          material={materials.grass1}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.rock_2011_0_7.geometry}
          material={materials.grass2}
        />
      </group>
      <group position={[6.016, 3.703, 9.06]} rotation={[-1.514, 0.142, 0.319]} scale={0.831}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Plane020_0.geometry}
          material={materials.leafs_mat}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Plane020_0_1.geometry}
          material={materials.autumn_yellow_mat}
        />
      </group>
    </group>
  )
}

useGLTF.preload('/assets/3DModels/DECORS.glb')