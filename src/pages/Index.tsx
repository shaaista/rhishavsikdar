import portraitImg from "@/assets/rsbw.png";
import WebGLCanvas from "@/components/WebGLCanvas";
import SplitName from "@/components/SplitName";
import GlassBlobs from "@/components/GlassBlobs";
import PageTransition from "@/components/PageTransition";

const blocks = [
  { title: "About", description: "Designer & developer crafting digital experiences with precision and soul." },
  { title: "Work", description: "Selected projects spanning brand identity, web design, and creative development." },
  { title: "Skills", description: "Full-stack development, UI/UX design, motion graphics, and creative coding." },
  { title: "Contact", description: "Let's collaborate on something extraordinary. Always open to new ideas." },
];

const Index = () => {
  return (
    <PageTransition>
      <div className="relative min-h-screen flex flex-col">
        {/* SVG Filter */}
        <svg style={{ position: "absolute", width: 0, height: 0 }} aria-hidden="true">
          <defs>
            <filter id="liquid-distort" x="-20%" y="-20%" width="140%" height="140%">
              <feTurbulence type="fractalNoise" baseFrequency="0.012 0.018" numOctaves={4} seed={5} result="noise">
                <animate attributeName="baseFrequency" values="0.012 0.018;0.016 0.014;0.012 0.018" dur="8s" repeatCount="indefinite" />
              </feTurbulence>
              <feDisplacementMap in="SourceGraphic" in2="noise" scale={3} xChannelSelector="R" yChannelSelector="G" />
            </filter>
          </defs>
        </svg>

        {/* WebGL fluid background */}
        <WebGLCanvas />

        {/* Shadow overlay removed per request to reveal background color */}

        {/* Content Layout (Name top, Photo below) */}
        <div className="fixed inset-0 z-[3] flex flex-col items-center pointer-events-none">

          {/* Name Section */}
          <div className="relative pt-[8vh] md:pt-[4vh] flex justify-center w-full shrink-0 z-[4]">
            <SplitName />
          </div>

          {/* Photo Section */}
          <div className="relative flex-1 w-full flex justify-center items-end z-[3] pb-0 pt-[6vh] md:pt-0">
            <img
              src={portraitImg}
              alt="Rhishav Sikdar"
              className="w-auto h-full max-h-[58vh] md:max-h-[75vh] object-contain object-bottom drop-shadow-2xl origin-bottom"
              style={{
                filter: "brightness(1) contrast(1.15) saturate(1.1)",
              }}
            />
          </div>

        </div>

        {/* Glass blobs */}
        <GlassBlobs />

      </div>
    </PageTransition>
  );
};

export default Index;
