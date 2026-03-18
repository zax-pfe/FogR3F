import { Suspense } from 'react'
import { Canvas } from '@react-three/fiber'
import Experience from './Experience'
import ThreeScene from './Components/ThreeScene/ThreeScene'

import { KeyboardControls } from "@react-three/drei";
import Hud from './Components/Interface/Hud/Hud';

const keys = {
  left: "arrowleft",
  right: "arrowright",
  forward: "arrowup",
  backward: "arrowdown",
};

function App() {

  return (
    <>
      <KeyboardControls
        map={[
          { name: "forward", keys: ["ArrowUp", "KeyW"] },
          { name: "backward", keys: ["ArrowDown", "KeyS"] },
          { name: "leftward", keys: ["ArrowLeft", "KeyA"] },
          { name: "rightward", keys: ["ArrowRight", "KeyD"] },
        ]}
      >
        <ThreeScene placeholder>
          <Experience />
        </ThreeScene>
        <Hud />
        {/* <Loader /> */}
      </KeyboardControls>
    </>
  )
}

export default App
