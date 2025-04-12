'use client';

import React, { useRef, useCallback } from 'react';
import Webcam from 'react-webcam';

interface CameraFeedProps {
  onCapture?: (imageData: string | null) => void;
}

const CameraFeed: React.FC<CameraFeedProps> = ({ onCapture }) => {
  const webcamRef = useRef<Webcam>(null);

  const capture = useCallback(() => {
    const imageSrc = webcamRef.current?.getScreenshot() || null;
    if (onCapture) {
      onCapture(imageSrc);
    }
  }, [onCapture]);

  return (
    <div className="relative">
      <Webcam
        audio={false}
        ref={webcamRef}
        screenshotFormat="image/jpeg"
        videoConstraints={{
          width: 640,
          height: 480,
          facingMode: "user"
        }}
        className="rounded-lg"
      />
      {onCapture && (
        <button
          onClick={capture}
          className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-blue-500 text-white px-4 py-2 rounded-full"
        >
          Capture
        </button>
      )}
    </div>
  );
};

export default CameraFeed;
