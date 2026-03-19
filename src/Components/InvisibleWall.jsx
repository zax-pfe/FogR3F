import { RigidBody } from "@react-three/rapier";

export default function InvisibleWall() {
  return (
    <RigidBody type="fixed" colliders="cuboid">
      <mesh position={[0, 1, -5]} visible={false} scale={10}>
        {/* largeur = 10, hauteur = 2, profondeur = 0.5 */}
        <boxGeometry args={[10, 2, 0.5]} />
        <meshBasicMaterial transparent opacity={1} wireframe={true} />
      </mesh>
    </RigidBody>
  );
}
