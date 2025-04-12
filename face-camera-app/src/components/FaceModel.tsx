'use client';

import React, { useRef, useEffect } from 'react';
import { useGLTF } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import { Group } from 'three';

interface FaceModelProps {
  position?: [number, number, number];
  rotation?: [number, number, number];
  scale?: number;
}

const FaceModel: React.FC<FaceModelProps> = ({ 
  position = [0, 0, 0], 
  rotation = [0, 0, 0], 
  scale = 1 
}) => {
  const group = useRef<Group>(null);
  const { scene } = useGLTF('/face3d.glb');
  
  // Clone the scene to avoid issues with multiple instances
  const model = scene.clone();

  // Animate the model slightly to make it more lifelike
  useFrame((state) => {
    if (group.current) {
      // Subtle breathing animation
      group.current.position.y = Math.sin(state.clock.getElapsedTime() * 0.5) * 0.02;
    }
  });

  return (
    <group ref={group} position={position} rotation={rotation as any} scale={[scale, scale, scale]}>
      <primitive object={model} />
    </group>
  );
};

// Preload the model
useGLTF.preload('/face3d.glb');

export default FaceModel;
