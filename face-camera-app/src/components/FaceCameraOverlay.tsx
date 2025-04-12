'use client';

import React, { useState, useRef } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera } from '@react-three/drei';
import CameraFeed from './CameraFeed';
import FaceModel from './FaceModel';

const FaceCameraOverlay: React.FC = () => {
  const [modelPosition, setModelPosition] = useState<[number, number, number]>([0, 0, -2]);
  const [modelRotation, setModelRotation] = useState<[number, number, number]>([0, 0, 0]);
  const [modelScale, setModelScale] = useState<number>(1);
  
  // Controls for adjusting the model position, rotation, and scale
  const handlePositionChange = (axis: 'x' | 'y' | 'z', value: number) => {
    setModelPosition(prev => {
      const newPos = [...prev] as [number, number, number];
      if (axis === 'x') newPos[0] = value;
      if (axis === 'y') newPos[1] = value;
      if (axis === 'z') newPos[2] = value;
      return newPos;
    });
  };

  const handleRotationChange = (axis: 'x' | 'y' | 'z', value: number) => {
    setModelRotation(prev => {
      const newRot = [...prev] as [number, number, number];
      if (axis === 'x') newRot[0] = value * Math.PI / 180; // Convert to radians
      if (axis === 'y') newRot[1] = value * Math.PI / 180;
      if (axis === 'z') newRot[2] = value * Math.PI / 180;
      return newRot;
    });
  };

  return (
    <div className="relative w-full h-screen">
      {/* Camera feed as background */}
      <div className="absolute inset-0 z-0">
        <CameraFeed />
      </div>
      
      {/* 3D model overlay */}
      <div className="absolute inset-0 z-10 pointer-events-none">
        <Canvas>
          <ambientLight intensity={0.5} />
          <directionalLight position={[10, 10, 5]} intensity={1} />
          <PerspectiveCamera makeDefault position={[0, 0, 5]} />
          <FaceModel 
            position={modelPosition} 
            rotation={modelRotation} 
            scale={modelScale} 
          />
          {/* OrbitControls for development/testing */}
          <OrbitControls 
            enablePan={true}
            enableZoom={true}
            enableRotate={true}
          />
        </Canvas>
      </div>
      
      {/* Controls panel */}
      <div className="absolute bottom-4 right-4 bg-white p-4 rounded-lg shadow-lg z-20">
        <h3 className="text-lg font-bold mb-2">Model Controls</h3>
        
        <div className="mb-2">
          <label className="block text-sm font-medium">Position X</label>
          <input 
            type="range" 
            min="-5" 
            max="5" 
            step="0.1" 
            value={modelPosition[0]} 
            onChange={(e) => handlePositionChange('x', parseFloat(e.target.value))}
            className="w-full"
          />
        </div>
        
        <div className="mb-2">
          <label className="block text-sm font-medium">Position Y</label>
          <input 
            type="range" 
            min="-5" 
            max="5" 
            step="0.1" 
            value={modelPosition[1]} 
            onChange={(e) => handlePositionChange('y', parseFloat(e.target.value))}
            className="w-full"
          />
        </div>
        
        <div className="mb-2">
          <label className="block text-sm font-medium">Position Z</label>
          <input 
            type="range" 
            min="-10" 
            max="0" 
            step="0.1" 
            value={modelPosition[2]} 
            onChange={(e) => handlePositionChange('z', parseFloat(e.target.value))}
            className="w-full"
          />
        </div>
        
        <div className="mb-2">
          <label className="block text-sm font-medium">Rotation Y (Yaw)</label>
          <input 
            type="range" 
            min="-180" 
            max="180" 
            step="1" 
            value={modelRotation[1] * 180 / Math.PI} 
            onChange={(e) => handleRotationChange('y', parseFloat(e.target.value))}
            className="w-full"
          />
        </div>
        
        <div className="mb-2">
          <label className="block text-sm font-medium">Scale</label>
          <input 
            type="range" 
            min="0.1" 
            max="3" 
            step="0.1" 
            value={modelScale} 
            onChange={(e) => setModelScale(parseFloat(e.target.value))}
            className="w-full"
          />
        </div>
      </div>
    </div>
  );
};

export default FaceCameraOverlay;
