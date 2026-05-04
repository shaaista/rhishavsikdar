import Iridescence from '@/components/Iridescence';

/**
 * Home Page - Full-screen Iridescence Animation
 * 
 * Prominent flowing waves with desaturated pastel colors
 * Soft pink, pale lavender, light cyan, and cream tones
 */

export default function Home() {
  return (
    <div className="w-full h-screen overflow-hidden">
      <Iridescence
        speed={1}
        amplitude={0.1}
        mouseReact={true}
      />
    </div>
  );
}
