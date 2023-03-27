import { Cloud } from '@react-three/drei'
import { useSpring, animated } from '@react-spring/three'

export default function Clouds({ initialTransition }) {
  const { cloudOpacity } = useSpring({ cloudOpacity: initialTransition ? 0.3 : 0, config: { tension: 15 } })
  const AnimatedCloud = animated(Cloud)
  return (
    <group position={[0, 0, -40]} scale={5}>
      <AnimatedCloud
        opacity={cloudOpacity}
        speed={0.07} // Rotation speed
        width={20} // Width of the full cloud
        depth={0} // Z-dir depth
        segments={30} // Number of particles
      />
    </group>
  )
}
