import { Suspense } from 'react'
import { Canvas } from '@react-three/fiber'
import Experience from './Experience'
import ThreeScene from './Components/ThreeScene/ThreeScene'

function App() {

  return (
    <>
      <ThreeScene>
        <Experience />
      </ThreeScene>
      {/* <Loader /> */}
    </>
  )
}

export default App
