import React, { useRef, useEffect } from "react";
import { useGLTF, useAnimations } from "@react-three/drei";
import { useGameStore } from "../../../store/store.js";
import { useControls, button } from "leva";

export default function AnimatedSoren(props) {
  const group = useRef();
  const { nodes, materials, animations } = useGLTF(
    "/assets/3DModels/Soren/characterAnimation.glb",
  );
  const animationsNames = animations.map((anim) => anim.name);
  console.log("Available animations:", animationsNames);
  const { actions } = useAnimations(animations, group);

  useEffect(() => {
    const action = actions["breathing Idle"];
    // const action = actions["dance"];

    action.reset().fadeIn(0.2).play();
  }, []);
  const playerAnimation = useGameStore((state) => state.playerAnimation);
  const setPlayerAnimation = useGameStore((state) => state.setPlayerAnimation);

  useEffect(() => {
    // console.log("currentAction changed to:", currentAction);
    // console.log("Player animation changed to:", playerAnimation);

    const walking_action = actions["Action"];
    const idle_action = actions["breathing Idle"];

    if (playerAnimation === "walk") {
      idle_action.fadeOut(0.2);
      console.log("Playing walk animation");

      walking_action.reset().fadeIn(0.2).play();
      // setCurrentAction("none");
      // return;
    } else if (playerAnimation === "idle") {
      walking_action.fadeOut(1);
      idle_action.reset().fadeIn(0.2).play();
      console.log("Playing idle animation");
    }
    return () => {
      walking_action.fadeOut(0.2);
      idle_action.fadeOut(0.2);
    };
  }, [playerAnimation]);

  return (
    <group ref={group} {...props} dispose={null}>
      <group name="Scene">
        <group name="Armature" position={[0, -0.5, 0]} scale={0.35}>
          <group name="Base002_Material_#46_0">
            <skinnedMesh
              name="Base002_Material_#46_0_1"
              geometry={nodes["Base002_Material_#46_0_1"].geometry}
              material={materials.Material_46}
              skeleton={nodes["Base002_Material_#46_0_1"].skeleton}
            />
            <skinnedMesh
              name="Base002_Material_#46_0_2"
              geometry={nodes["Base002_Material_#46_0_2"].geometry}
              material={materials.Rope}
              skeleton={nodes["Base002_Material_#46_0_2"].skeleton}
            />
          </group>
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
        <group name="cs_grp">
          <group name="cs_arm_fk" position={[1.5, 8.5, 0]} scale={0.822} />
          <group name="cs_calf_fk" position={[0.5, 8.5, 0]} scale={0.822} />
          <group name="cs_circle" />
          <group name="cs_circle_025" position={[2.5, 4.5, 0]} scale={0.206} />
          <group
            name="cs_foot"
            position={[0.5, 10.5, 0]}
            rotation={[-Math.PI, 0, 0]}
            scale={0.308}
          />
          <group
            name="cs_foot_01"
            position={[0.5, 18.5, 0]}
            rotation={[0, Math.PI / 2, 0]}
            scale={2.186}
          />
          <group name="cs_foot_roll" position={[0.5, 12.5, 0]} scale={0.592} />
          <group name="cs_forearm_fk" position={[2.5, 8.5, 0]} scale={0.822} />
          <group name="cs_hand" />
          <group name="cs_head" />
          <group name="cs_hips" />
          <group name="cs_master" position={[0.5, 17.5, 0]} scale={0.1} />
          <group name="cs_neck" />
          <group
            name="cs_shoulder_left"
            position={[0.5, 15.5, 0]}
            rotation={[-Math.PI, -Math.PI / 2, 0]}
            scale={1.038}
          />
          <group
            name="cs_shoulder_right"
            position={[0.5, 16.5, 0]}
            rotation={[-Math.PI, -Math.PI / 2, 0]}
            scale={1.038}
          />
          <group name="cs_sphere_012" position={[3.5, 2.5, 0]} scale={0.206} />
          <group name="cs_square_2" />
          <group name="cs_thigh_fk" position={[0.5, 7.5, 0]} scale={0.822} />
          <group name="cs_toe" position={[0.5, 9.5, 0]} scale={0.429} />
          <group
            name="cs_user_Ctrl_Hand_FK_Left"
            position={[0.5, 4.5, 0]}
            scale={0.206}
          />
          <group
            name="cs_user_Ctrl_Hand_FK_Right"
            position={[0.5, 4.5, 0]}
            scale={0.206}
          />
          <group
            name="cs_user_Ctrl_Hand_IK_Left"
            position={[0.5, 4.5, 0]}
            scale={0.206}
          />
          <group
            name="cs_user_Ctrl_Hand_IK_Right"
            position={[0.5, 4.5, 0]}
            scale={0.206}
          />
          <group
            name="cs_user_Ctrl_Head"
            position={[0.5, 13.5, 0]}
            scale={0.206}
          />
          <group
            name="cs_user_Ctrl_Hips"
            position={[0.5, 1.497, 0]}
            rotation={[-Math.PI, 0, 0]}
            scale={0.154}
          />
          <group
            name="cs_user_Ctrl_Hips_Free"
            position={[0.5, 11.5, 0]}
            scale={0.206}
          />
          <group
            name="cs_user_Ctrl_Neck"
            position={[0.5, 14.5, 0]}
            scale={0.206}
          />
          <group
            name="cs_user_Ctrl_Spine"
            position={[0.5, 4.5, 0]}
            scale={0.206}
          />
          <group
            name="cs_user_Ctrl_Spine1"
            position={[0.5, 4.5, 0]}
            scale={0.206}
          />
          <group
            name="cs_user_Ctrl_Spine2"
            position={[0.5, 4.5, 0]}
            scale={0.206}
          />
        </group>
      </group>
    </group>
  );
}

useGLTF.preload("/assets/3DModels/Soren/characterAnimation2.glb");
