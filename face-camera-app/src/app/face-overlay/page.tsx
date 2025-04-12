'use client';

import FaceCameraOverlay from '@/components/FaceCameraOverlay';
import Link from 'next/link';

export default function FaceOverlayPage() {
  return (
    <div className="relative">
      <FaceCameraOverlay />
      <div className="absolute top-4 left-4 z-30">
        <Link 
          href="/" 
          className="bg-gray-800 bg-opacity-70 hover:bg-opacity-100 text-white font-bold py-2 px-4 rounded"
        >
          Back to Home
        </Link>
      </div>
    </div>
  );
}
