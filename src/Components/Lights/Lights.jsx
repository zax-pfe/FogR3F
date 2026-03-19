import React from "react";
import { useControls } from "leva";

export default function Lights() {
  const {
    directionalLightIntensity,
    color,
    ambiantLightIntensity,
    X_directionalLight,
    Y_directionalLight,
    Z_directionalLight,
  } = useControls(
    "Lights",
    {
      directionalLightIntensity: { value: 4.5, min: 0, max: 10, step: 0.1 },
      X_directionalLight: { value: 1, min: 0, max: 10, step: 0.1 },
      Y_directionalLight: { value: 2, min: 0, max: 10, step: 0.1 },
      Z_directionalLight: { value: 3, min: 0, max: 10, step: 0.1 },
      color: "#ffffff",
      ambiantLightIntensity: { value: 1.5, min: 0, max: 10, step: 0.1 },
    },
    { collapsed: true },
  );
  return (
    <>
      <directionalLight
        position={[X_directionalLight, Y_directionalLight, Z_directionalLight]}
        intensity={directionalLightIntensity}
        color={color}
        castShadow
        // shadow-mapSize-width={2048}
        // shadow-mapSize-height={2048}
        // shadow-bias={-0.00005}
      />
      <ambientLight intensity={ambiantLightIntensity} color={color} />
    </>
  );
}
