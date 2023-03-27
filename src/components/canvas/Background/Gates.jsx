import { useTexture, useGLTF, Instances, Instance } from '@react-three/drei'
import { useMemo } from 'react'
import { useSprings, animated, useSpring } from '@react-spring/three'

export default function Gates({ initialTransition }) {
  const { nodes, materials } = useGLTF('./models/torii.glb')
  const geometry = nodes.tate1_defaultMat1_0.geometry
  const material = materials.defaultMat1
  //   const geometry = nodes.Object_2.geometry
  //   const material = materials['Material.003']

  material.map.metalness = 0
  material.map.tonemapped = false

  const maxGates = 10
  const gateAttributes = useMemo(
    () =>
      new Array(maxGates).fill({}).map((_, i) => ({
        position: [0, i * 0.5, i * -40],
      })),
    [],
  )

  const springs = useSprings(
    maxGates,
    gateAttributes.map((_, index) => {
      return {
        position: initialTransition ? [0, 0, 0] : [0, -150, 0],
        delay: (maxGates - index) * 40,
        config: { tension: (maxGates - index) * 5 + 100, weight: 20 },
      }
    }),
  )

  const { gateVisibility } = useSpring({ gateVisibility: initialTransition ? true : false, delay: 1050 })

  return (
    <>
      <group scale={[0.23, 0.3, 0.2]} position={[0, 9, -5]} rotation={[-0.21 * Math.PI, 0, 0]}>
        <animated.mesh geometry={geometry} material={material} visible={gateVisibility}></animated.mesh>
        <group position={[0, 0, -40]}>
          <Instances limit={maxGates} geometry={geometry} material={material}>
            {gateAttributes.map((attributes, index) => {
              return (
                <Gate position={attributes.position} key={index} index={index} springPosition={springs[index]}></Gate>
              )
            })}
          </Instances>
        </group>
      </group>
    </>
  )
}

function Gate({ position, index, springPosition }) {
  return (
    <animated.group position={springPosition.position}>
      <Instance position={position}></Instance>
    </animated.group>
  )
}
