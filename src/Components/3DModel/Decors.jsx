import React from "react";
import { useGLTF } from "@react-three/drei";
import { RigidBody, CuboidCollider } from "@react-three/rapier";

export default function Decors(props) {
  const { nodes, materials } = useGLTF("/assets/3DModels/DECORS.glb");

  return (
    <group {...props} dispose={null}>
      {/* ================= VISUALS ================= */}
 
      <mesh
        geometry={nodes['+Broken_roof'].geometry}
        material={materials['+Wood_light']}
      />
      <mesh
        geometry={nodes['+Ruins'].geometry}
        material={materials['+Wood_dark']}
      />
      <mesh
        geometry={nodes['+Destroyed'].geometry}
        material={materials['+Wood_dark']}
      />
      <mesh
        geometry={nodes['+dest'].geometry}
        material={materials['+Wood_dark']}
      />
      <mesh
        geometry={nodes['+Boat'].geometry}
        material={materials['+Wood_dark']}
        position={[-2.587, 0.541, -5.515]}
      />
      <mesh
        geometry={nodes['+Bridge'].geometry}
        material={materials['+Wood_dark']}
        position={[0.83, -0.533, 6.138]}
      />
    
      <mesh
        geometry={nodes['+scarecrow'].geometry}
        material={materials['+Fiero']}
      />
      <mesh
        geometry={nodes['+LeafsALL001'].geometry}
        material={materials['+Leafs']}
      />
      <mesh
        geometry={nodes['+tronk'].geometry}
        material={materials['+Tronk']}
        position={[29.045, 3.761, -10.396]}
        rotation={[-Math.PI / 2, 0, -1.458]}
        scale={0.371}
      />
      <mesh
        geometry={nodes['+house3_1'].geometry}
        material={materials['+Stone_dark']}
      />
      <mesh
        geometry={nodes['+house3_2'].geometry}
        material={materials['+Wood_dark']}
      />
      <mesh
        geometry={nodes['+house4_1'].geometry}
        material={materials['+Wood_dark']}
      />
      <mesh
        geometry={nodes['+house4_2'].geometry}
        material={materials['+BlueDark']}
      />
      <mesh
        geometry={nodes['+house4_3'].geometry}
        material={materials['+Stone']}
      />
      <mesh
        geometry={nodes['+house_1'].geometry}
        material={materials['+Wood_dark']}
      />
      <mesh
        geometry={nodes['+house_2'].geometry}
        material={materials['+Stone_dark']}
      />
      <mesh
        geometry={nodes['+house_3'].geometry}
        material={materials['+Wood_dark']}
      />
      <mesh
        geometry={nodes['+house2_1'].geometry}
        material={materials['+Stone']}
      />
      <mesh
        geometry={nodes['+house2_2'].geometry}
        material={materials['+Wood_dark']}
      />
      <mesh
        geometry={nodes['+BigHouse_dest_1'].geometry}
        material={materials['+Wood_dark']}
      />
      <mesh
        geometry={nodes['+BigHouse_dest_2'].geometry}
        material={materials['+Wood_light']}
      />
      <mesh
        geometry={nodes['+BigHouse_dest_3'].geometry}
        material={materials['+Texture_stone_circle']}
      />
      <mesh
        geometry={nodes['+BigHouse_dest_4'].geometry}
        material={materials['+Stone']}
      />
      <mesh
        geometry={nodes['+BigHouse_des1'].geometry}
        material={materials['+Wood_dark']}
      />
      <mesh
        geometry={nodes['+BigHouse_des1_1'].geometry}
        material={materials['+Stone']}
      />
      <mesh
        geometry={nodes['+BigHouse_des1_2'].geometry}
        material={materials['+Green_walls']}
      />
      <mesh
        geometry={nodes['+dest_house_1'].geometry}
        material={materials['+BlueDark']}
      />
      <mesh
        geometry={nodes['+dest_house_2'].geometry}
        material={materials['+Wood_dark']}
      />
      <mesh
        geometry={nodes['+Tent_dest_1'].geometry}
        material={materials['+Wood_dark']}
      />
      <mesh
        geometry={nodes['+Tent_dest_2'].geometry}
        material={materials['+DarkGreen ']}
      />
      <mesh
        geometry={nodes['+Tent_dest_3'].geometry}
        material={materials['+Wood_dark']}
      />
      <mesh
        geometry={nodes['+Tent_dest_4'].geometry}
        material={materials['+Wood_light']}
      />
      <mesh
        geometry={nodes['+barac_1'].geometry}
        material={materials['+Wood_dark']}
      />
      <mesh
        geometry={nodes['+barac_2'].geometry}
        material={materials['+Wood_light']}
      />
      <mesh
        geometry={nodes['+ROCKSALL2_1'].geometry}
        material={materials['+Brics']}
      />
      <mesh
        geometry={nodes['+ROCKSALL2_2'].geometry}
        material={materials['+Stone']}
      />
      <mesh
        geometry={nodes['+ROCKSALL2_3'].geometry}
        material={materials['+Stone_dark']}
      />
      <mesh
        geometry={nodes['+ROCKSALL2_4'].geometry}
        material={materials['+DarkGreen ']}
      />
      <mesh
        geometry={nodes['+ROCKSALL2_5'].geometry}
        material={materials['+GreenDark2']}
      />
      <mesh
        geometry={nodes['+ROCKSALL2_6'].geometry}
        material={materials['+GreenDark2']}
      />
      <mesh
        geometry={nodes['+ROCKSALL2_7'].geometry}
        material={materials['+Texture_stone_circle']}
      />
      <mesh
        geometry={nodes['+ROCKSALL2_8'].geometry}
        material={materials['+Stone']}
      />
      <mesh
        geometry={nodes['+Pointer_1'].geometry}
        material={materials['+Wood_dark']}
      />
      <mesh
        geometry={nodes['+Pointer_2'].geometry}
        material={nodes['+Pointer_2'].material}
      /> 
      {/* ================= PHYSICS ONLY ================= */}

      <group name="physics-obstacles">
        <RigidBody type="fixed" colliders={false} position={[2.3, 4, 4]}>
          <CuboidCollider args={[1.2, 0.5, 1]} />
        </RigidBody>

        <RigidBody type="fixed" colliders={false} position={[25.47, 3.98, 18.309]}>
          <CuboidCollider args={[1, 0.4, 0.5]} />
        </RigidBody>

        <RigidBody type="fixed" colliders={false} position={[29.045, 3.761, -10.396]}>
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