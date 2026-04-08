import React from "react";
import { Center, Sparkles, PivotControls } from "@react-three/drei";
import { useControls } from "leva";
import { Points } from "@react-three/drei";

export default function VFX({ particlesColor }) {
  const controlSparkle = useControls(
    "Sparkles",
    {
      scale: { value: 90, min: 1, max: 150, step: 1 },
      size: { value: 28, min: 1, max: 100, step: 1 },
      count: { value: 1000, min: 1, max: 2000, step: 1 },
      speed: { value: 1.5, min: 0.01, max: 3, step: 0.01 },
    },
    { collapsed: true },
  );
  return (
    <>
      <Sparkles
        size={controlSparkle.size}
        count={controlSparkle.count}
        opacity={0.1}
        scale={[
          controlSparkle.scale,
          controlSparkle.scale,
          controlSparkle.scale,
        ]}
        position={[0, 5, 0]}
        speed={controlSparkle.speed}
        color={particlesColor}
      />

      {/* <Points limit={1000}>
        <pointsMaterial color="#fff" size={0.01} transparent opacity={0.6} />
      </Points> */}
    </>
  );
}
