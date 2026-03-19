import { RigidBody } from "@react-three/rapier";

export default function InvisibleWall() {
  return (
    <RigidBody type="fixed" colliders="cuboid">
      <mesh position={[0, 1, -10]} visible={true} scale={10}>
        {/* largeur = 10, hauteur = 1, profondeur = 0.1 */}
        <boxGeometry args={[10, 2, 0.1]} />
        <meshBasicMaterial
          transparent={false}
          opacity={1}
          wireframe={true}
          color={"lightgreen"}
        />
      </mesh>
    </RigidBody>
  );
}
