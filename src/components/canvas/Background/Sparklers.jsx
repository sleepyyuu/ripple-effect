import { Sparkles } from '@react-three/drei'
import { useSpring, animated } from '@react-spring/three'
import { useEffect, useState, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { easing } from 'maath'

export default function Sparklers({ initialTransition }) {
  const sparkleRef = useRef()
  // useEffect(() => {
  //   sparkleRef.current.material.opacity = 0
  //   sparkleRef.current.material.needsUpdate = true
  //   console.log(sparkleRef.current.material.opacity)
  // }, [])
  useFrame((state, delta) => {
    // easing.damp(sparkleRef.current.material, 'opacity', initialTransition ? 0.7 : 0, 0.25, delta)
    // sparkleRef.current.material.needsUpdate = true
    // console.log(sparkleRef.current)
  })

  return (
    <group position={[0, 0, 0]}>
      <Sparkles
        ref={sparkleRef}
        opacity={0.9}
        count={300}
        color={'#ffffff'}
        speed={0.2}
        size={4}
        scale={[10, 10, 10]}
      />
    </group>
  )
}
