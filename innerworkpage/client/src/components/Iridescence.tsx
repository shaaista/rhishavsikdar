import { Renderer, Program, Mesh, Color, Triangle } from 'ogl';
import { useEffect, useRef } from 'react';

/**
 * Iridescence Component - Exact Color Replication
 * 
 * Design Philosophy:
 * - Exact color match: soft pink, pale lavender, light blue, white
 * - Prominent flowing waves with clear wave patterns
 * - Calm, ethereal aesthetic with fluid motion
 */

const vertexShader = `
attribute vec2 uv;
attribute vec2 position;

varying vec2 vUv;

void main() {
  vUv = uv;
  gl_Position = vec4(position, 0, 1);
}
`;

/**
 * Fragment Shader - Exact Color Replication
 * 
 * Colors extracted from reference image:
 * - Soft Pink: RGB(242, 218, 230) = (0.949, 0.855, 0.902)
 * - Pale Lavender: RGB(220, 210, 245) = (0.863, 0.824, 0.961)
 * - Light Blue: RGB(210, 235, 250) = (0.824, 0.922, 0.980)
 * - White: RGB(250, 250, 252) = (0.980, 0.980, 0.988)
 * - Subtle Cream: RGB(252, 248, 242) = (0.988, 0.973, 0.949)
 */
const fragmentShader = `
precision highp float;

uniform float uTime;
uniform vec3 uResolution;
uniform vec2 uMouse;
uniform float uAmplitude;
uniform float uSpeed;

varying vec2 vUv;

void main() {
  float mr = min(uResolution.x, uResolution.y);
  vec2 uv = (vUv.xy * 2.0 - 1.0) * uResolution.xy / mr;

  uv += (uMouse - vec2(0.5)) * uAmplitude;

  float d = -uTime * 0.5 * uSpeed;
  float a = 0.0;
  
  // Generate prominent wave patterns
  for (float i = 0.0; i < 8.0; ++i) {
    a += cos(i - d - a * uv.x);
    d += sin(uv.y * i + a);
  }
  
  d += uTime * 0.5 * uSpeed;
  
  // Create wave-based patterns with smoother transitions
  float wave1 = sin(uv.x * 2.0 + d * 0.3) * 0.5 + 0.5;
  float wave2 = cos(uv.y * 1.5 + a * 0.3) * 0.5 + 0.5;
  float wave3 = sin((uv.x + uv.y) * 1.0 + (d + a) * 0.2) * 0.5 + 0.5;
  float wave4 = cos(uv.x * 1.2 + uv.y * 0.8 + d * 0.25) * 0.5 + 0.5;
  
  // Exact color palette from reference image - darkened
  vec3 colorPink = vec3(0.88, 0.72, 0.82);        // Darker pink
  vec3 colorLavender = vec3(0.78, 0.70, 0.92);     // Darker lavender
  vec3 colorBlue = vec3(0.70, 0.85, 0.95);        // Darker blue
  vec3 colorWhite = vec3(0.95, 0.95, 0.97);       // Slightly darker white
  vec3 colorCream = vec3(0.96, 0.94, 0.90);       // Darker cream
  
  // Blend colors based on wave patterns
  vec3 col = mix(colorPink, colorLavender, wave1);
  col = mix(col, colorBlue, wave2);
  col = mix(col, colorWhite, wave3);
  col = mix(col, colorCream, wave4 * 0.15);  // Minimal cream influence
  
  // Subtle wave line enhancement for depth
  float waveLines = sin(uv.y * 8.0 + d * 0.5) * 0.06 + 0.94;
  col = col * waveLines;
  
  // Very gentle brightness modulation
  col = col * (0.98 + sin(uTime * 0.05) * 0.02);
  
  // Ensure smooth output
  col = clamp(col, 0.0, 1.0);

  gl_FragColor = vec4(col, 1.0);
}
`;

interface IridescenceProps {
  /**
   * Animation speed multiplier (default: 0.5 for slower animation)
   */
  speed?: number;
  
  /**
   * Mouse interaction amplitude (default: 0.1)
   */
  amplitude?: number;
  
  /**
   * Enable mouse reactivity (default: true)
   */
  mouseReact?: boolean;
}

export default function Iridescence({
  speed = 0.5,
  amplitude = 0.1,
  mouseReact = true,
  ...rest
}: IridescenceProps) {
  const ctnDom = useRef<HTMLDivElement>(null);
  const mousePos = useRef({ x: 0.5, y: 0.5 });

  useEffect(() => {
    if (!ctnDom.current) return;
    const ctn = ctnDom.current;
    const renderer = new Renderer();
    const gl = renderer.gl;
    gl.clearColor(1, 1, 1, 1);

    let program: Program;

    function resize() {
      const scale = 1;
      renderer.setSize(ctn.offsetWidth * scale, ctn.offsetHeight * scale);
      if (program) {
        program.uniforms.uResolution.value = new Color(
          gl.canvas.width,
          gl.canvas.height,
          gl.canvas.width / gl.canvas.height
        );
      }
    }
    window.addEventListener('resize', resize, false);
    resize();

    const geometry = new Triangle(gl);
    program = new Program(gl, {
      vertex: vertexShader,
      fragment: fragmentShader,
      uniforms: {
        uTime: { value: 0 },
        uResolution: {
          value: new Color(gl.canvas.width, gl.canvas.height, gl.canvas.width / gl.canvas.height)
        },
        uMouse: { value: new Float32Array([mousePos.current.x, mousePos.current.y]) },
        uAmplitude: { value: amplitude },
        uSpeed: { value: speed }
      }
    });

    const mesh = new Mesh(gl, { geometry, program });
    let animateId: number;

    function update(t: number) {
      animateId = requestAnimationFrame(update);
      program.uniforms.uTime.value = t * 0.001;
      renderer.render({ scene: mesh });
    }
    animateId = requestAnimationFrame(update);
    ctn.appendChild(gl.canvas);

    function handleMouseMove(e: MouseEvent) {
      const rect = ctn.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width;
      const y = 1.0 - (e.clientY - rect.top) / rect.height;
      mousePos.current = { x, y };
      program.uniforms.uMouse.value[0] = x;
      program.uniforms.uMouse.value[1] = y;
    }
    if (mouseReact) {
      ctn.addEventListener('mousemove', handleMouseMove);
    }

    return () => {
      cancelAnimationFrame(animateId);
      window.removeEventListener('resize', resize);
      if (mouseReact) {
        ctn.removeEventListener('mousemove', handleMouseMove);
      }
      ctn.removeChild(gl.canvas);
      gl.getExtension('WEBGL_lose_context')?.loseContext();
    };
  }, [speed, amplitude, mouseReact]);

  return <div ref={ctnDom} className="w-full h-full" {...rest} />;
}
