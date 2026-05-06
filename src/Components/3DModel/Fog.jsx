import GroundFog from "./GroundFog";

const Fog = () => {
  return (
    <>
      {/* very light fig more in the air */}
      <GroundFog position={[6, 3.9, 8]} opacity={0.02} scale={2} color="#aaaaaa" />
      {/* light fog next to the ground */}
      <GroundFog
        position={[20, 3.8, 0]}
        scale={1}
        opacity={0.03}
        rotation={Math.PI}
        color="#b0b0b0"
      />
      {/* thick fog next to the ground */}
      <GroundFog position={[-2, 3.6, -0]} scale={2} opacity={0.04} color="#8a8a8a" />
    </>
  );
};

export default Fog;
