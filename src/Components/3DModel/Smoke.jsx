import React, { useRef, useMemo } from "react";
import { InstancedMesh2 } from "@three.ez/instanced-mesh";
import { extend, useFrame, useLoader } from "@react-three/fiber";

import cloudImg from "../../../public/images/smoke.png";
import {
  MeshBasicMaterial,
  PlaneGeometry,
  Quaternion,
  TextureLoader,
  Vector3,
  Euler,
} from "three";
import * as THREE from "three";
import { useControls } from "leva";

extend({ InstancedMesh2 });
import { useGameStore } from "../../store/store.js";

export default function Smoke() {
  const ref = useRef(null);
  const lifeTime = 1.5;
  const speed = 0.5;
  let time = 0;
  const {
    speedGeneration,
    offsetX,
    offsetY,
    offsetZ,
    particlesColor,
    particlesOpacity,
    particlesSizeX,
    particlesSizeY,
  } = useControls("Smoke", {
    speedGeneration: { value: 0.1, min: 0.01, max: 1, step: 0.01 },
    offsetX: { value: 3, min: 0, max: 10, step: 0.1 },
    offsetY: { value: 1, min: 0, max: 10, step: 0.1 },
    offsetZ: { value: 1, min: 0, max: 10, step: 0.1 },
    particlesColor: "#e49c32",
    particlesOpacity: { value: 0.8, min: 0, max: 1, step: 0.01 },
    particlesSizeX: { value: 0.5, min: 0.01, max: 1, step: 0.01 },
    particlesSizeY: { value: 0.3, min: 0.01, max: 1, step: 0.01 },
  });

  const direction = new Vector3(0, 0.5, 0.5).normalize();
  const geometry = useMemo(
    () => new PlaneGeometry(particlesSizeX, particlesSizeY),
    [particlesSizeX, particlesSizeY],
  );
  const texture = useLoader(TextureLoader, cloudImg);

  const material = useMemo(
    () =>
      new MeshBasicMaterial({
        color: particlesColor,
        map: texture,
        alphaMap: texture,
        depthWrite: false,
        transparent: true,
        opacity: particlesOpacity,
      }),
    [texture, particlesColor, particlesOpacity],
  );

  let landingAnimation = false;

  useFrame((state, delta) => {
    if (!ref.current || ref.current.instancesCount >= 1000) return;
    const playerTranslation = useGameStore.getState().playerPosition;
    const playerAnimation = useGameStore.getState().playerAnimation;
    const camera = state.camera;
    if (!playerTranslation) return;
    const { x, y, z } = playerTranslation;

    const elapsedTime = state.clock.getElapsedTime();

    if (
      elapsedTime - time > Math.random() * speedGeneration &&
      playerAnimation === "walk"
    ) {
      time = elapsedTime;
      landingAnimation = false;
      ref.current.addInstances(2, (obj) => {
        obj.position.copy({
          x: x + (Math.random() - 0.5) * offsetX,
          y: y - offsetY,
          z: z + (Math.random() - 0.5) * offsetZ,
        });
        const scale = Math.random() + 0.6;
        obj.scale.set(scale, scale, scale);
        obj.currentTime = 0;
        obj.randomZRotation = Math.random() * Math.PI * 2;
      });
    }

    ref.current.updateInstances((obj) => {
      obj.currentTime += delta;
      if (obj.direction) {
        obj.position.addScaledVector(obj.direction, 2 * delta);
      } else {
        obj.position.addScaledVector(direction, speed * delta);
      }
      const toCamera = new Vector3()
        .subVectors(camera.position, obj.position)
        .normalize();

      const particleQuaternion = new Quaternion().setFromUnitVectors(
        new Vector3(0, 0, 1),
        toCamera,
      );

      const randomRotationQuaternion = new Quaternion().setFromEuler(
        new Euler(0, 0, obj.randomZRotation),
      );

      particleQuaternion.multiply(randomRotationQuaternion);

      obj.quaternion.copy(particleQuaternion);
      const scale = Math.max(0, lifeTime - obj.currentTime * 2);
      obj.scale.set(scale, scale, scale);
      // obj.opacity = Math.max(0, lifeTime - obj.currentTime * 2);

      if (obj.currentTime >= lifeTime + 2) {
        obj.remove();
        return;
      }
    });
  });

  return (
    <instancedMesh2
      ref={ref}
      args={[geometry, material, { createEntities: true }]}
      frustumCulled={false}
    />
  );
}
