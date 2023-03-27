import { useTexture } from '@react-three/drei'
import { useSpring, animated } from '@react-spring/three'
import { useMemo } from 'react'
import * as THREE from 'three'

export default function Ground({ initialTransition }) {
  const brushTexture = useTexture('./models/burash01.png')

  const maxMeshes = 5
  const meshAttributes = useMemo(
    () =>
      new Array(maxMeshes).fill({}).map((_, i) => ({
        position: [0, i * 0.5, i * -40],
      })),
    [],
  )

  return (
    <group>
      {meshAttributes.map((attributes, index) => {
        return (
          <mesh>
            <planeGeometry args={[1, 1]}></planeGeometry>
            <meshBasicMaterial
              map={brushTexture}
              transparent={true}
              blending={THREE.AdditiveBlending}
              depthTest={false}
              depthWrite={false}
              toneMapped={false}></meshBasicMaterial>
          </mesh>
        )
      })}
      {/* <mesh>
        <planeGeometry></planeGeometry>
        <meshBasicMaterial color={'red'} map={brushTexture}></meshBasicMaterial>
      </mesh> */}
    </group>
  )
}
