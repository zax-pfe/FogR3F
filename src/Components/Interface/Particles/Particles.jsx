import * as THREE from "three";
import { useLoader, useFrame, useThree } from "@react-three/fiber";
import { useMemo, useRef, useEffect } from "react";

import particlesVertexShader from "../../../shaders/particles/vertex.glsl?raw";
import particlesFragmentShader from "../../../shaders/particles/fragment.glsl?raw";
import { useGameStore } from "../../../store/store";

const SIZE = 6;
const COUNT = 260;
const NOISE = 0.025;
const DISPLACEMENT_SIZE = 128;

export default function Particles() {
  const { camera } = useThree();
  const { hotspotCurrent } = useGameStore();

  const materialRef = useRef();

  const tronkBase = useLoader(THREE.TextureLoader, "/textures/MIL_tronkBase.png");
  const tronkClimat = useLoader(THREE.TextureLoader, "/textures/MIL_tronkClimat.png");
  const tronkFeu = useLoader(THREE.TextureLoader, "/textures/MIL_tronkFeu.png");
  const tronkAge = useLoader(THREE.TextureLoader, "/textures/MIL_tronkAge.png");
  const tronkInsectes = useLoader(THREE.TextureLoader, "/textures/MIL_tronkInsectes.png");
  const tronkBalle = useLoader(THREE.TextureLoader, "/textures/MIL_tronkBalle.png");

  const tronkTextures = useMemo(() => {
    return {
      base: tronkBase,
      climat: tronkClimat,
      feu: tronkFeu,
      age: tronkAge,
      insectes: tronkInsectes,
      balle: tronkBalle,
    };
  }, [tronkBase, tronkClimat, tronkFeu, tronkAge, tronkInsectes, tronkBalle]);

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

  const displacementTexture = useMemo(() => {
    const texture = new THREE.CanvasTexture(displacementCanvas);
    texture.minFilter = THREE.LinearFilter;
    texture.magFilter = THREE.LinearFilter;
    return texture;
  }, [displacementCanvas]);

  const glowImage = useRef(null);
  const mouse = useRef(new THREE.Vector2(9999, 9999));
  const mouseStrength = useRef(0);

  useEffect(() => {
    const image = new Image();
    image.src = "/textures/glow.png";
    glowImage.current = image;
  }, []);

  const uniforms = useMemo(() => {
    return {
      uPictureTexture: { value: tronkBase },
      uDisplacementTexture: { value: displacementTexture },
      uMouse: { value: new THREE.Vector2(9999, 9999) },
      uMouseStrength: { value: 0 },
      uTime: { value: 0 },
    };
  }, [tronkBase, displacementTexture]);

  useEffect(() => {
    if (!materialRef.current) return;

    const textureName = hotspotCurrent?.logTexture || "base";
    materialRef.current.uniforms.uPictureTexture.value =
      tronkTextures[textureName] || tronkTextures.base;
  }, [hotspotCurrent, tronkTextures]);

  useFrame((state) => {
    if (!materialRef.current) return;

    const mat = materialRef.current;

    mat.uniforms.uTime.value = state.clock.elapsedTime;
    mat.uniforms.uMouse.value.copy(mouse.current);
    mat.uniforms.uMouseStrength.value = mouseStrength.current;

    displacementContext.globalCompositeOperation = "source-over";
    displacementContext.globalAlpha = 0.12;
    displacementContext.fillStyle = "black";
    displacementContext.fillRect(0, 0, DISPLACEMENT_SIZE, DISPLACEMENT_SIZE);

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

    displacementTexture.needsUpdate = true;
  });

  const particlesGeometry = useMemo(() => {
    const geometry = new THREE.PlaneGeometry(SIZE, SIZE, COUNT, COUNT);

    geometry.setIndex(null);
    geometry.deleteAttribute("normal");

    const count = geometry.attributes.position.count;
    const positionAttribute = geometry.attributes.position;

    const intensitiesArray = new Float32Array(count);
    const anglesArray = new Float32Array(count);

    for (let i = 0; i < count; i++) {
      const x = positionAttribute.getX(i);
      const y = positionAttribute.getY(i);

      positionAttribute.setX(i, x + (Math.random() - 0.5) * NOISE);
      positionAttribute.setY(i, y + (Math.random() - 0.5) * NOISE);

      intensitiesArray[i] = 0.75 + Math.random() * 0.25;
      anglesArray[i] = Math.random() * Math.PI * 2;
    }

    positionAttribute.needsUpdate = true;

    geometry.setAttribute(
      "aIntensity",
      new THREE.BufferAttribute(intensitiesArray, 1)
    );

    geometry.setAttribute(
      "aAngle",
      new THREE.BufferAttribute(anglesArray, 1)
    );

    return geometry;
  }, []);

  useEffect(() => {
    const raycaster = new THREE.Raycaster();
    const mouse3D = new THREE.Vector2();
    const plane = new THREE.Plane(new THREE.Vector3(0, 0, 1), 0);
    const intersection = new THREE.Vector3();

    const handleMouseMove = (event) => {
      const canvas = document.querySelector("canvas");
      if (!canvas) return;

      const rect = canvas.getBoundingClientRect();

      mouse3D.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
      mouse3D.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;

      raycaster.setFromCamera(mouse3D, camera);
      raycaster.ray.intersectPlane(plane, intersection);

      const x = intersection.x / SIZE + 0.5;
      const y = intersection.y / SIZE + 0.5;

      mouse.current.set(x, y);
      mouseStrength.current = 1;
    };

    const handleMouseLeave = () => {
      mouse.current.set(9999, 9999);
      mouseStrength.current = 0;
    };

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [camera]);

  return (
    <group>
      <points geometry={particlesGeometry}>
        <shaderMaterial
          ref={materialRef}
          vertexShader={particlesVertexShader}
          fragmentShader={particlesFragmentShader}
          uniforms={uniforms}
          blending={THREE.AdditiveBlending}
          transparent
          depthWrite={false}
        />
      </points>

      <mesh>
        <planeGeometry args={[SIZE, SIZE]} />
        <meshBasicMaterial transparent opacity={0} depthWrite={false} />
      </mesh>
    </group>
  );
}