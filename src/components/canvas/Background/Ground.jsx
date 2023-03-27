import { useTexture } from '@react-three/drei'
import { useSpring, animated } from '@react-spring/three'
import { useMemo, useRef } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import * as THREE from 'three'
import { render } from 'react-dom'
import fragmentShader from './fragment.glsl'
import vertexShader from './vertex.glsl'

export default function Ground({ initialTransition }) {
  const groundTexture = useTexture('./models/ground.jpg')
  const brushTexture = useTexture('./models/burash01.png')

  const maxMeshes = 3
  const meshAttributes = useMemo(
    () =>
      new Array(maxMeshes).fill({}).map((_, i) => ({
        position: [0, i * 0.5, i * -40],
        visible: false,
        rotation: [0, 0, 2 * Math.PI * Math.random()],
      })),
    [],
  )

  const { currentWave } = useSpring({ currentWave: initialTransition ? 50 : 0 })
  const state = useThree()
  const sceneOne = new THREE.Scene()

  const baseTextureRenderTarget = useMemo(() => {
    return new THREE.WebGLRenderTarget(state.size.width, state.size.height, {
      minFilter: THREE.LinearFilter,
      magFilter: THREE.LinearFilter,
      format: THREE.RGBAFormat,
    })
  }, [])
  const sceneRef = useRef()
  const sceneOneRef = useRef()
  const backgroundTextureRef = useRef()
  useFrame((state) => {
    //backgroundTextureRef.current.material.uniforms.time.value += 0.05

    state.gl.setRenderTarget(baseTextureRenderTarget)
    state.gl.render(sceneRef.current, state.camera)
    backgroundTextureRef.current.material.uniforms.uDisplacement.value = baseTextureRenderTarget.texture

    state.gl.setRenderTarget(null)
    state.gl.clear()
    state.gl.render(sceneOneRef.current, state.camera)
  })

  return (
    <>
      <scene ref={sceneRef}>
        <group>
          {meshAttributes.map((attributes, index) => {
            return (
              <Waves
                initialTransition={initialTransition}
                brushTexture={brushTexture}
                key={index}
                attributes={attributes}></Waves>
            )
          })}
          {/* <mesh>
        <planeGeometry></planeGeometry>
        <meshBasicMaterial color={'red'} map={brushTexture}></meshBasicMaterial>
      </mesh> */}
        </group>
      </scene>
      <scene ref={sceneOneRef}>
        <mesh ref={backgroundTextureRef}>
          <planeGeometry args={[10, 10]}></planeGeometry>
          <shaderMaterial
            extensions={{ derivatives: '#extension GL_OES_standard_derivatives: enable' }}
            side={THREE.DoubleSide}
            uniforms={{
              time: { value: 0 },
              uDisplacement: { value: null },
              uTexture: { value: groundTexture },
              resolution: { value: new THREE.Vector4() },
            }}
            vertexShader={vertexShader}
            fragmentShader={fragmentShader}></shaderMaterial>
        </mesh>
      </scene>
    </>
  )
}

// function WavesScene() {
//   const brushTexture = useTexture('./models/burash01.png')

//   const maxMeshes = 5
//   const meshAttributes = useMemo(
//     () =>
//       new Array(maxMeshes).fill({}).map((_, i) => ({
//         position: [0, i * 0.5, i * -40],
//         visible: false,
//       })),
//     [],
//   )

//   return (
//     <scene>
//       <group>
//         {meshAttributes.map((attributes, index) => {
//           return <Waves initialTransition={initialTransition} brushTexture={brushTexture} key={index}></Waves>
//         })}
//         {/* <mesh>
//         <planeGeometry></planeGeometry>
//         <meshBasicMaterial color={'red'} map={brushTexture}></meshBasicMaterial>
//       </mesh> */}
//       </group>
//     </scene>
//   )
// }

function Waves({ initialTransition, brushTexture, attributes }) {
  const waveRef = useRef()
  useFrame(() => {
    waveRef.current.rotation.z += 0.01
    waveRef.current.material.opacity *= 0.99
    waveRef.current.scale.x = 0.98 * waveRef.current.scale.x + 0.1 //slow exponential growth
    waveRef.current.scale.y = waveRef.current.scale.x
  })

  return (
    <group>
      <mesh visible={initialTransition} ref={waveRef} rotation={attributes.rotation}>
        <planeGeometry args={[0.5, 0.5]}></planeGeometry>
        <meshBasicMaterial
          map={brushTexture}
          transparent={true}
          blending={THREE.AdditiveBlending}
          depthTest={false}
          depthWrite={false}
          toneMapped={false}
          opacity={1}></meshBasicMaterial>
      </mesh>
    </group>
  )
}
