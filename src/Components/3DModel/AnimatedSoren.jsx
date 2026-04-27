import React, { useRef, useEffect, useState } from "react";
import { useGLTF, useAnimations } from "@react-three/drei";
import { useControls, button } from "leva";
import { useGameStore } from "../../store/store.js";

export default function AnimatedSoren(props) {
  const group = useRef();
  const { nodes, materials, animations } = useGLTF(
    "/assets/3DModels/characterAnimation.glb",
  );
  const { actions } = useAnimations(animations, group);

  const [currentAction, setCurrentAction] = useState(null);
  const animationsNames = animations.map((anim) => anim.name);
  animationsNames.push("none"); // Ajout de l'animation "idle" à la liste des options
  const playerAnimation = useGameStore((state) => state.playerAnimation);

  // useEffect(() => {
  //   if (!playerAnimation) return;

  //   if (currentAction === "none") {
  //     console.log("Playing idle animation");
  //     return;
  //   }
  //   const action = actions[currentAction];
  //   if (!action) return;
  //   action.reset().fadeIn(0.2).play();

  //   return () => {
  //     action.fadeOut(0.2);
  //   };
  // }, [actions, currentAction]);

  useEffect(() => {
    // console.log("currentAction changed to:", currentAction);
    // console.log("Player animation changed to:", playerAnimation);

    const action = actions["mixamo.com"];
    if (playerAnimation === "walk") {
      console.log("Playing walk animation");

      action.reset().fadeIn(0.2).play();
      // setCurrentAction("none");
      // return;
    } else if (playerAnimation === "idle") {
      action.paused = true;
      console.log("Playing idle animation");
    }
  }, [currentAction, playerAnimation]);

  const { animationName } = useControls("soren", {
    animationName: {
      value: animationsNames[1],
      options: animationsNames,
      onChange: (value) => {
        console.log("Selected:", value);
        setCurrentAction(value);
      },
    },
    // playAnimation: button(() => {
    //   console.log("leva value:", animationName);

    //   setCurrentAction(animationName);
    // }),
  });

  return (
    <group ref={group} {...props} dispose={null}>
      <group name="Scene">
        <group
          name="Armature"
          position={[0, -0.5, 0]}
          rotation={[Math.PI / 2, 0, 0]}
          scale={0.004}
        >
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
        </group>
        <group name="Sketchfab_model">
          <group name="54e6f801220f40eb97a5b53a8aa3ac0bfbx">
            <group name="RootNode1">
              <group name="Base002" />
            </group>
          </group>
        </group>
      </group>
    </group>
  );
}

useGLTF.preload("/assets/3DModels/characterAnimation.glb");
