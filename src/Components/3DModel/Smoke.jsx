import React, { useRef, useMemo } from "react";
import { InstancedMesh2 } from "@three.ez/instanced-mesh";
import { extend, useFrame, useLoader } from "@react-three/fiber";

// import cloudImg from "../../../public/images/smoke.png";
import cloudImg from "../../../public/textures/circle_05.png";

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
  const {
    speedGeneration,
    lifeTime,
    speed,
    offsetX,
    offsetY,
    offsetZ,
    particlesColor,
    opacity,
    sizeX,
    sizeY,
  } = useControls(
    "Smoke",
    {
      speedGeneration: { value: 5, min: 0.01, max: 5, step: 0.01 },
      lifeTime: { value: 0.7, min: 0.1, max: 5, step: 0.1 },
      speed: { value: 0.08, min: 0.01, max: 2, step: 0.01 },
      offsetX: { value: 0.2, min: 0, max: 10, step: 0.1 },
      offsetY: { value: 0.5, min: 0, max: 10, step: 0.1 },
      offsetZ: { value: 0.5, min: 0, max: 10, step: 0.1 },
      particlesColor: "#ccb087",
      opacity: { value: 0.8, min: 0, max: 1, step: 0.01 },
      sizeX: { value: 0.4, min: 0.01, max: 1, step: 0.01 },
      sizeY: { value: 0.4, min: 0.01, max: 1, step: 0.01 },
    },
    { collapsed: true },
  );

  const ref = useRef(null);

  let time = 0;
  const geometry = useMemo(
    () => new PlaneGeometry(sizeX, sizeY),
    [sizeX, sizeY],
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
        opacity: opacity,
      }),
    [texture, particlesColor, opacity],
  );

  useFrame((state, delta) => {
    if (!ref.current || ref.current.instancesCount >= 1000) return;
    const playerTranslation = useGameStore.getState().playerPosition;
    const playerAnimation = useGameStore.getState().playerAnimation;
    // console.log("player anmation", playerAnimation);
    const camera = state.camera;
    if (!playerTranslation) return;
    const { x, y, z } = playerTranslation;

    const elapsedTime = state.clock.getElapsedTime();

    if (
      elapsedTime - time > Math.random() * speedGeneration &&
      playerAnimation === "walk"
    ) {
      time = elapsedTime;
      ref.current.addInstances(2, (obj) => {
        obj.position.copy({
          x: x + (Math.random() - 0.5) * offsetX,
          y: y - offsetY,
          z: z + (Math.random() - 0.5) * offsetZ,
        });
        const scale = Math.random() + 0.6;
        obj.scale.set(scale, scale, scale);
        obj.currentTime = 0;
        // obj.randomZRotation = Math.random() * Math.PI * 2;
        obj.randomZRotation = Math.PI * 2;
        // obj.direction = new Vector3(0, 0.0, 0);
        obj.rotationSpeed = (Math.random() - 0.5) * 4;
      });
    }

    ref.current.updateInstances((obj) => {
      obj.currentTime += delta * 0.1;
      const lifeRatio = obj.currentTime / lifeTime;
      const slowFactor = 1 - lifeRatio;

      if (obj.direction) {
        obj.position.addScaledVector(obj.direction, 2 * delta);
      } else {
        // obj.position.addScaledVector(direction, speed * delta);

        const playerPos = new Vector3(x, y, z);
        const dir = new Vector3()
          .subVectors(playerPos, obj.position)
          .normalize();
        obj.position.addScaledVector(dir, speed * delta * slowFactor);
      }

      obj.rotation += obj.rotationSpeed * slowFactor * delta;

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

      // const rotationQuaternion = new Quaternion().setFromEuler(
      //   new Euler(0, 0, obj.rotation),
      // );

      // particleQuaternion.multiply(rotationQuaternion);
      // obj.quaternion.copy(particleQuaternion);

      // const scale = Math.max(0, lifeTime - obj.currentTime * 2);
      const scale = Math.max(0, lifeRatio * 2);

      obj.scale.set(scale, scale, scale);
      // obj.opacity = Math.max(0, slowFactor * 2);
      obj.opacity = Math.max(0, lifeTime - obj.currentTime * 3);

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

// ajouter mouvement vers la direction du personnage
// ajouter une rotattion aux partciles
// faire peut etre en mode trace de pas, donc ajouter un plane  a gauche puis a droite par terre avec une
