import { useRef, useEffect, useState, forwardRef } from "react";
import { useGLTF, useAnimations } from "@react-three/drei";
import { useControls, button } from "leva";

// export default function Character(props) {

const Character = forwardRef((props, ref) => {
  const group = useRef();
  const { nodes, materials, animations } = useGLTF(
    "/assets/3DModels/cap_test.glb",
  );

  const { actions } = useAnimations(animations, group);
  const [currentAction, setCurrentAction] = useState(null);
  const animationsNames = animations.map((anim) => anim.name);

  const { animationName } = useControls("soren", {
    animationName: {
      value: animationsNames[0],
      options: animationsNames,
    },
    playAnimation: button(() => {
      setCurrentAction(animationName ?? animationsNames[0]);
    }),
  });

  useEffect(() => {
    if (!currentAction) return;
    const action = actions[currentAction];
    if (!action) return;
    action.reset().fadeIn(0.2).play();

    return () => {
      action.fadeOut(0.2);
    };
  }, [actions, currentAction]);

  return (
    <group ref={group} {...props} dispose={null}>
      <group ref={ref}>
        <group name="Scene">
          <group
            name="Armature"
            position={[0, 0, 2]}
            rotation={[0, Math.PI, 0]}
          >
            <skinnedMesh
              name="Cone"
              geometry={nodes.Cone.geometry}
              material={materials["Material.001"]}
              skeleton={nodes.Cone.skeleton}
            />
            <primitive object={nodes.Bone} />
            <primitive object={nodes.neutral_bone} />
          </group>
        </group>
      </group>
    </group>
  );
  // }
});
export default Character;

useGLTF.preload("/assets/3DModels/cap_test.glb");
