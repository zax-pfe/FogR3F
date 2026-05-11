import GroundFog from "./GroundFog";

const Fog = () => {
  return (
    <>
      {/* very light fig more in the air */}
      {/* <GroundFog
        position={[6, 3.9, 8]}
        opacity={0.02}
        scale={2}
        color="#aaaaaa"
        vertexStrength={0.1}
        vertexScale={0.5}
        timeRatio={0.2}
      /> */}
      {/* light fog next to the ground */}
      <GroundFog
        position={[20, 3.8, 0]}
        scale={1}
        // opacity={0.03}
        opacity={0.2}
        rotation={Math.PI}
        color="#3a4d54"
        vertexStrength={0.04}
        vertexScale={0.5}
        timeRatio={0.3}
      />
      {/* thick fog next to the ground */}
      {/* <GroundFog
        position={[-2, 3.6, -0]}
        scale={2}
        opacity={0.04}
        color="#8a8a8a"
        vertexStrength={0.1}
        vertexScale={0.5}
        timeRatio={0.2}
      /> */}
    </>
  );
};

export default Fog;
