import { Canvas } from '@react-three/fiber'
import { OrbitControls, Preload, Html, Environment, Cloud } from '@react-three/drei'
import Ground from './Background/Ground'
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
      <color attach='background' args={['#18181b']} />
      <OrbitControls />

      <Ground></Ground>
    </Canvas>
  )
}
