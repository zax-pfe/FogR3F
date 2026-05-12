import React, { useRef, useEffect } from "react";
import { useGLTF, useAnimations } from "@react-three/drei";
import { useGameStore } from "../../../store/store.js";
import { useControls, button } from "leva";

export default function AnimatedSoren(props) {
  const group = useRef();
  const { nodes, materials, animations } = useGLTF(
    "/assets/3DModels/Soren/animated_soren_textured_ambiant_animation_baked_compressed.glb",
  );
  const animationsNames = animations.map((anim) => anim.name);
  // console.log("Available animations:", animationsNames);

  const { actions } = useAnimations(animations, group);
  useEffect(() => {
    const action = actions["action_idle"];

    action.reset().fadeIn(0.2).play();
  }, []);

  const playerAnimation = useGameStore((state) => state.playerAnimation);
  // const playerAnimation = "walk"; // for testing purposes

  // ("action_idle");

  // ("action_interaction");

  // "action_running"
  // ("action_neutral_idle");

  // ("action_walking");

  useEffect(() => {
    const walking_action = actions["action_walking"];
    const idle_action = actions["action_idle"];
    const interaction_action = actions["action_interaction"];
    const running_action = actions["action_running"];

    // console.log("Current player animation:", playerAnimation);

    if (playerAnimation === "walk") {
      running_action.fadeOut(1);
      idle_action.fadeOut(0.2);
      interaction_action.fadeOut(0.2);
      walking_action.reset().fadeIn(0.2).play();
    } else if (playerAnimation === "idle") {
      running_action.fadeOut(1);
      walking_action.fadeOut(1);
      interaction_action.fadeOut(0.2);
      idle_action.reset().fadeIn(0.2).play();
    } else if (playerAnimation === "interaction") {
      running_action.fadeOut(1);
      walking_action.fadeOut(1);
      idle_action.fadeOut(1);
      interaction_action.reset().fadeIn(0.2).play();
    } else if (playerAnimation === "run") {
      walking_action.fadeOut(1);
      idle_action.fadeOut(1);
      running_action.reset().fadeIn(0.2).play();
    }

    return () => {
      walking_action.fadeOut(0.2);
      idle_action.fadeOut(0.2);
      interaction_action.fadeOut(0.2);
      running_action.fadeOut(0.2);
    };
  }, [playerAnimation]);

  return (
    <group ref={group} {...props} dispose={null} scale={0.37} position={[0, -0.4, 0]}>
      <group name="Scene">
        <group name="character">
          <skinnedMesh
            name="baseMaterial"
            geometry={nodes.baseMaterial.geometry}
            material={materials.BodyMaterial_V3}
            skeleton={nodes.baseMaterial.skeleton}
          />
          <skinnedMesh
            name="bottes001"
            geometry={nodes.bottes001.geometry}
            material={materials.BottesMaterial_V3}
            skeleton={nodes.bottes001.skeleton}
          />
          <skinnedMesh
            name="cape001"
            geometry={nodes.cape001.geometry}
            material={materials.RobeMaterial_V2}
            skeleton={nodes.cape001.skeleton}
          />
          <skinnedMesh
            name="capuche001"
            geometry={nodes.capuche001.geometry}
            material={materials.CapucheMaterial_V2}
            skeleton={nodes.capuche001.skeleton}
          />
          <skinnedMesh
            name="epaulettes001"
            geometry={nodes.epaulettes001.geometry}
            material={materials.EpaulettesMaterial_V2}
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

useGLTF.preload("/assets/3DModels/Soren/animated_soren_textured_grey_compressed.glb");
