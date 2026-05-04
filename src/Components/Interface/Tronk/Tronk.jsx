import s from "./Tronk.module.scss";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import Particles from "../Particles/Particles";

export default function Tronk(props) {
  
  return (
    <div className={s.tronk} {...props}>
      <Canvas
        camera={{ position: [0, 0, 10], fov: 35 }}
        gl={{ antialias: true }}
        dpr={[1, 2]}
      >
        {/* <color attach="background" args={["#181818"]} /> */}

        <Particles />

        {/* <OrbitControls /> */}
      </Canvas>
    </div>
  );
}