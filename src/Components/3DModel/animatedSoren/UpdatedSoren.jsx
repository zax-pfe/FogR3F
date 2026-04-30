import React, { useRef, useEffect } from "react";
import { useGLTF, useAnimations } from "@react-three/drei";
import { useGameStore } from "../../../store/store.js";
import { useControls, button } from "leva";

export default function AnimatedSoren(props) {
  const group = useRef();
  const { nodes, materials, animations } = useGLTF(
    "/assets/3DModels/Soren/animated_soren.glb",
  );
  const animationsNames = animations.map((anim) => anim.name);
  console.log("Available animations:", animationsNames);

  const { actions } = useAnimations(animations, group);
  useEffect(() => {
    const action = actions["action_looking_idle"];

    action.reset().fadeIn(0.2).play();
  }, []);

  const playerAnimation = useGameStore((state) => state.playerAnimation);
  const setPlayerAnimation = useGameStore((state) => state.setPlayerAnimation);

  // "action_calm_idle"
  // "action_interaction"
  // "action_looking_idle"
  // "action_walking"
  // "action_interaction_2"

  useEffect(() => {
    const walking_action = actions["action_walking"];
    const idle_action = actions["action_looking_idle"];
    const interaction_action = actions["action_interaction_2"];

    // console.log("Current player animation:", playerAnimation);

    if (playerAnimation === "walk") {
      idle_action.fadeOut(0.2);
      interaction_action.fadeOut(0.2);
      walking_action.reset().fadeIn(0.2).play();
    } else if (playerAnimation === "idle") {
      walking_action.fadeOut(1);
      interaction_action.fadeOut(0.2);
      idle_action.reset().fadeIn(0.2).play();
    } else if (playerAnimation === "interaction") {
      walking_action.fadeOut(1);
      idle_action.fadeOut(1);
      interaction_action.reset().fadeIn(0.2).play();
    }

    return () => {
      walking_action.fadeOut(0.2);
      idle_action.fadeOut(0.2);
      interaction_action.fadeOut(0.2);
    };
  }, [playerAnimation]);

  return (
    <group
      ref={group}
      {...props}
      dispose={null}
      scale={0.35}
      position={[0, -0.8, 0]}
    >
      <group name="Scene">
        <group name="character">
          <skinnedMesh
            name="baseMaterial"
            geometry={nodes.baseMaterial.geometry}
            material={nodes.baseMaterial.material}
            skeleton={nodes.baseMaterial.skeleton}
          />
          <skinnedMesh
            name="bottes001"
            geometry={nodes.bottes001.geometry}
            material={materials.bottes}
            skeleton={nodes.bottes001.skeleton}
          />
          <skinnedMesh
            name="cape001"
            geometry={nodes.cape001.geometry}
            material={materials["Rope.003"]}
            skeleton={nodes.cape001.skeleton}
          />
          <skinnedMesh
            name="capuche001"
            geometry={nodes.capuche001.geometry}
            material={materials.capuche}
            skeleton={nodes.capuche001.skeleton}
          />
          <skinnedMesh
            name="epaulettes001"
            geometry={nodes.epaulettes001.geometry}
            material={materials.epaulettes}
            skeleton={nodes.epaulettes001.skeleton}
          />
          <primitive object={nodes.mixamorigHips} />
          <primitive object={nodes.Ctrl_Master} />
          <primitive object={nodes.Ctrl_Foot_IK_Left} />
          <primitive object={nodes.Ctrl_LegPole_IK_Left} />
          <primitive object={nodes.Ctrl_Foot_IK_Right} />
          <primitive object={nodes.Ctrl_LegPole_IK_Right} />
          <primitive object={nodes.Ctrl_ArmPole_IK_Left} />
          <primitive object={nodes.Ctrl_Hand_IK_Left} />
          <primitive object={nodes.Ctrl_ArmPole_IK_Right} />
          <primitive object={nodes.Ctrl_Hand_IK_Right} />
        </group>
      </group>
    </group>
  );
}

useGLTF.preload("/assets/3DModels/Soren/animated_soren.glb");
