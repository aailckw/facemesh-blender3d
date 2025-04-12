import Link from 'next/link';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <h1 className="text-4xl font-bold mb-8">Face 3D Model + Camera Integration</h1>
      <p className="text-xl mb-8">
        This application allows you to overlay a 3D face model on your camera feed.
      </p>
      <Link 
        href="/face-overlay" 
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        Start Camera + 3D Face Experience
      </Link>
    </main>
  );
}
