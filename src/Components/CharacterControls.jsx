import React from "react";
import { useControls, button } from "leva";
import { useRef } from "react";
import Character from "./Character.jsx";
import { Center, Sparkles, PivotControls } from "@react-three/drei";
import { useKeyboardControls } from "@react-three/drei";

export default function CharacterControls() {
  const characterRef = useRef();

  const [allKeys, get] = useKeyboardControls();
  const [position, setPosition] = React.useState([0, -3.7, 20]);

  const characterControls = useControls("Character", {
    scale: { value: 0.6, min: 0.1, max: 10, step: 0.1 },
    x: { value: 0, min: -50, max: 50, step: 0.1 },
    y: { value: -3.7, min: -50, max: 50, step: 0.1 },
    z: { value: 20, min: -50, max: 50, step: 0.1 },
  });

  // Update position avec les touches
  React.useEffect(() => {
    const velocityX = (get("right") ? 1 : 0) - (get("left") ? 1 : 0);
    const velocityZ = (get("forward") ? 1 : 0) - (get("backward") ? 1 : 0);

    setPosition((prev) => [
      prev[0] + velocityX * characterControls.speed,
      prev[1],
      prev[2] + velocityZ * characterControls.speed,
    ]);
  }, [get, characterControls.speed]);

  return (
    // <PivotControls depthTest={false}>
    <Character
      scale={characterControls.scale}
      position={[characterControls.x, characterControls.y, characterControls.z]}
    />
    //</PivotControls>
  );
}
