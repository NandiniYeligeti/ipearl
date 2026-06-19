'use client'

import React, { useRef, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import {
  PresentationControls,
  Float,
  RoundedBox,
} from '@react-three/drei'
import * as THREE from 'three'

interface Soap3DProps {
  color: string
  engravedText?: string
}

function SoapModel({
  color,
  engravedText = 'Luxe Soap',
}: Soap3DProps) {
  const groupRef = useRef<THREE.Group>(null)

  useFrame(() => {
    if (groupRef.current) {
      groupRef.current.rotation.y += 0.005
    }
  })

  const soapColor = useMemo(() => {
    const colorMap: Record<string, string> = {
      rose: '#d4a5a5',
      lavender: '#d1c4e9',
      mint: '#c8e6c9',
      peach: '#f0c4b8',
      honey: '#ffe0b2',
      coral: '#ff9999',
    }

    return colorMap[color] || '#d4a5a5'
  }, [color])

  const textTexture = useMemo(() => {
    const canvas = document.createElement('canvas')
    canvas.width = 1024
    canvas.height = 256

    const ctx = canvas.getContext('2d')
    if (!ctx) return null

    ctx.clearRect(0, 0, canvas.width, canvas.height)

    ctx.font = 'bold 80px Georgia'
    ctx.textAlign = 'center'
    ctx.textBaseline = 'middle'

    ctx.fillStyle = 'rgba(0,0,0,0.45)'
    ctx.fillText(engravedText, 516, 132)

    ctx.fillStyle = 'rgba(255,255,255,0.15)'
    ctx.fillText(engravedText, 512, 128)

    const texture = new THREE.CanvasTexture(canvas)
    texture.needsUpdate = true

    return texture
  }, [engravedText])

  return (
    <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.2}>
      <group ref={groupRef}>
        {/* Rounded Rectangle */}

        <RoundedBox
          args={[7, 3.5, 1.6]}
          radius={0.28}
          smoothness={8}
          castShadow
          receiveShadow
        >
        {/* <RoundedBox
          args={[4.5, 2.2, 1]}
          radius={0.18}
          smoothness={8}
          castShadow
          receiveShadow
        > */}
          <meshStandardMaterial
            color={soapColor}
            roughness={0.35}
            metalness={0.05}
          />
        </RoundedBox>

        {/* Engraved Text */}
        {textTexture && (
          <mesh position={[0, 1.76, 0]}>
            <planeGeometry args={[3.3, 0.7]} />
            <meshBasicMaterial
              map={textTexture}
              transparent
            />
          </mesh>
        )}
      </group>
    </Float>
  )
}

export function Soap3D({
  color,
  engravedText,
}: Soap3DProps) {
  return (
    <div className="w-full h-full min-h-[500px] mt-12 overflow-visible">
      <Canvas
        camera={{
          position: [0, 0, 7],
          fov: 45,
        }}
        shadows
        gl={{ alpha: true }}
      >
        <ambientLight intensity={1} />

        <directionalLight
          position={[5, 5, 5]}
          intensity={1.4}
          castShadow
        />

        <directionalLight
          position={[-5, -2, 5]}
          intensity={0.6}
        />

        <PresentationControls
          global
          speed={1.5}
          zoom={1}
          rotation={[0.12, 0.25, 0]}
        >
          <SoapModel
            color={color}
            engravedText={engravedText}
          />
        </PresentationControls>
      </Canvas>
    </div>
  )
}