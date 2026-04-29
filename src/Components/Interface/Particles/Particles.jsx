import * as THREE from "three";
import { useLoader, useFrame } from "@react-three/fiber";
import { useMemo, useRef, useEffect } from "react";

import particlesVertexShader from "../../../shaders/particles/vertex.glsl?raw";
import particlesFragmentShader from "../../../shaders/particles/fragment.glsl?raw";

const SIZE = 6;
const COUNT = 260;
const NOISE = 0.025;
const DISPLACEMENT_SIZE = 128; // Size of the canvas used for the displacement texture

export default function Particles() {
  const pictureTexture = useLoader(THREE.TextureLoader, "/textures/tronk.png");

  // Create a small offscreen canvas that we will draw the mouse "glow" into.
  // This canvas is converted to a Three.js texture and sampled by the vertex shader
  const displacementCanvas = useMemo(() => {
    const canvas = document.createElement("canvas");
    canvas.width = DISPLACEMENT_SIZE;
    canvas.height = DISPLACEMENT_SIZE;
    return canvas;
  }, []);

  const displacementContext = useMemo(() => {
    const context = displacementCanvas.getContext("2d");
    context.fillStyle = "black";
    context.fillRect(0, 0, DISPLACEMENT_SIZE, DISPLACEMENT_SIZE);
    return context;
  }, [displacementCanvas]);

  // 2D drawing context for the canvas. We paint a dark background and draw
  // a bright glow image where the mouse is. The R channel is later sampled
  // by the vertex shader to push particles away from the cursor.
  const displacementTexture = useMemo(() => {
    return new THREE.CanvasTexture(displacementCanvas);
  }, [displacementCanvas]);

  const glowImage = useRef(null);
  const mouse = useRef(new THREE.Vector2(9999, 9999));
  const mouseStrength = useRef(0);

  useEffect(() => {
    const image = new Image();
    image.src = "/textures/glow.png";
    glowImage.current = image;
  }, []);

  // Uniforms passed to the shaderMaterial. These are updated each frame.
  const uniforms = useMemo(() => {
    return {
      uPictureTexture: new THREE.Uniform(null), // base image used for particle color
      uDisplacementTexture: new THREE.Uniform(null), // canvas texture for pushing particles
      uMouse: new THREE.Uniform(new THREE.Vector2(9999, 9999)), // mouse UV for shaders
      uMouseStrength: new THREE.Uniform(0), // strength of mouse effect
      uTime: new THREE.Uniform(0), // clock time for animation
    };
  }, []);

  uniforms.uPictureTexture.value = pictureTexture;
  uniforms.uDisplacementTexture.value = displacementTexture;

  useFrame((state) => {
    uniforms.uTime.value = state.clock.elapsedTime;
    uniforms.uMouse.value.copy(mouse.current);
    uniforms.uMouseStrength.value = mouseStrength.current;

    // Main loop runs every frame.
    // Update time and mouse uniforms for shaders.
    displacementContext.globalCompositeOperation = "source-over"; // reset drawing mode
    displacementContext.globalAlpha = 0.12; // how quickly old glow fades
    displacementContext.fillStyle = "black"; // fill color for clearing
    displacementContext.fillRect(0, 0, DISPLACEMENT_SIZE, DISPLACEMENT_SIZE); // clear canvas

    if (mouseStrength.current > 0 && glowImage.current) {
      const glowSize = DISPLACEMENT_SIZE * 0.16;

      displacementContext.globalCompositeOperation = "lighten";
      displacementContext.globalAlpha = 0.55;

      displacementContext.drawImage(
        glowImage.current,
        mouse.current.x * DISPLACEMENT_SIZE - glowSize * 0.5,
        (1 - mouse.current.y) * DISPLACEMENT_SIZE - glowSize * 0.5,
        glowSize,
        glowSize
      );
    }

    // Tell three.js to re-upload the canvas to the GPU texture this frame.
    displacementTexture.needsUpdate = true; // mark texture for update
  });

  const particlesGeometry = useMemo(() => {
    const geometry = new THREE.PlaneGeometry(SIZE, SIZE, COUNT, COUNT);

    geometry.setIndex(null);
    geometry.deleteAttribute("normal");

    const count = geometry.attributes.position.count;
    const positionAttribute = geometry.attributes.position;

    // Prepare arrays for per-particle attributes: intensity and angle.
    const intensitiesArray = new Float32Array(count); // intensity for each particle
    const anglesArray = new Float32Array(count); // angle for each particle

    for (let i = 0; i < count; i++) {
      const x = positionAttribute.getX(i);
      const y = positionAttribute.getY(i);

      positionAttribute.setX(i, x + (Math.random() - 0.5) * NOISE);
      positionAttribute.setY(i, y + (Math.random() - 0.5) * NOISE);

      intensitiesArray[i] = 0.75 + Math.random() * 0.25;
      anglesArray[i] = Math.random() * Math.PI * 2;
    }

    positionAttribute.needsUpdate = true;

    // Attach attributes so the vertex shader can read them as 'aIntensity' and 'aAngle'.
    geometry.setAttribute("aIntensity", new THREE.BufferAttribute(intensitiesArray, 1));

    geometry.setAttribute(
      "aAngle",
      new THREE.BufferAttribute(anglesArray, 1)
    );

    return geometry;
  }, []);

  return (
    <group>
      {/* Render particles as points using a custom shader material. */}
      <points geometry={particlesGeometry}>
        <shaderMaterial
          vertexShader={particlesVertexShader}
          fragmentShader={particlesFragmentShader}
          uniforms={uniforms}
          blending={THREE.AdditiveBlending} // additive blending for glow effects
          transparent
          depthWrite={false} // avoid writing depth to keep transparent blending correct
        />
      </points>

      {/* Invisible interactive plane: captures pointer events and updates mouse refs. */}
      <mesh
        onPointerMove={(event) => {
          // Pointer UV coordinates are used so shaders work in UV space.
          mouse.current.set(event.uv.x, event.uv.y);
          mouseStrength.current = 1; // enable the mouse effect
        }}
        onPointerLeave={() => {
          // When pointer leaves, move mouse offscreen and disable effect.
          mouse.current.set(9999, 9999);
          mouseStrength.current = 0;
        }}
      >
        <planeGeometry args={[SIZE, SIZE]} />
        <meshBasicMaterial transparent opacity={0} depthWrite={false} />
      </mesh>
    </group>
  );
}