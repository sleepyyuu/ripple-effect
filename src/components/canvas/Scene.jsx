import { Canvas } from '@react-three/fiber'
import { OrbitControls, Preload, Html, Environment, Cloud } from '@react-three/drei'
import Gates from './Background/Gates'
import Clouds from './Background/Clouds'
import Sparklers from './Background/Sparklers'
import { useState } from 'react'

export default function Scene({ children, ...props }) {
  const [initialTransition, setInitialTransition] = useState(false)

  // Everything defined in here will persist between route changes, only children are swapped
  return (
    <Canvas {...props}>
      {/* <directionalLight intensity={0.1} /> */}
      <ambientLight intensity={0.6} color={'#121db8'} />
      <ambientLight intensity={0.15} />
      {children}
      <Preload all />
      <Environment preset={'night'}></Environment>
      <fog attach='fog' color='#18181b' near={12} far={69} />
      <color attach='background' args={['#18181b']} />
      {initialTransition ? null : (
        <Html>
          <div
            style={{ color: 'black', border: '2px black solid', width: '100px', cursor: 'pointer' }}
            onClick={() => {
              setInitialTransition(true)
            }}>
            Click to enter
          </div>
        </Html>
      )}

      <OrbitControls />
      <Clouds initialTransition={initialTransition}></Clouds>
      <Gates initialTransition={initialTransition}></Gates>
      {/* <Sparklers initialTransition={initialTransition}></Sparklers> */}
    </Canvas>
  )
}
