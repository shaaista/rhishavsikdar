import { useEffect, useRef } from "react";

const vsSource = `
  attribute vec2 position;
  varying vec2 vUv;
  void main() {
    vUv = position * 0.5 + 0.5;
    gl_Position = vec4(position, 0.0, 1.0);
  }
`;

const fsSource = `
  precision highp float;
  uniform float uTime;
  uniform vec3 uColor;
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
    for (float i = 0.0; i < 8.0; ++i) {
      a += cos(i - d - a * uv.x);
      d += sin(uv.y * i + a);
    }
    d += uTime * 0.5 * uSpeed;
    vec3 col = vec3(cos(uv * vec2(d, a)) * 0.6 + 0.4, cos(a + d) * 0.5 + 0.5);
    col = cos(col * cos(vec3(d, a, 2.5)) * 0.5 + 0.5) * uColor;
    gl_FragColor = vec4(col, 1.0);
  }
`;

const WebGLCanvas = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const canvas = document.createElement("canvas");
    container.appendChild(canvas);
    const gl = canvas.getContext("webgl") || canvas.getContext("experimental-webgl");
    if (!gl) return;

    const g = gl as WebGLRenderingContext;

    function createShader(type: number, source: string) {
      const shader = g.createShader(type)!;
      g.shaderSource(shader, source);
      g.compileShader(shader);
      return shader;
    }

    const vs = createShader(g.VERTEX_SHADER, vsSource);
    const fs = createShader(g.FRAGMENT_SHADER, fsSource);
    const program = g.createProgram()!;
    g.attachShader(program, vs);
    g.attachShader(program, fs);
    g.linkProgram(program);
    g.useProgram(program);

    const vertices = new Float32Array([-1, -1, 3, -1, -1, 3]);
    const buffer = g.createBuffer();
    g.bindBuffer(g.ARRAY_BUFFER, buffer);
    g.bufferData(g.ARRAY_BUFFER, vertices, g.STATIC_DRAW);

    const posLoc = g.getAttribLocation(program, "position");
    g.enableVertexAttribArray(posLoc);
    g.vertexAttribPointer(posLoc, 2, g.FLOAT, false, 0, 0);

    const uTime = g.getUniformLocation(program, "uTime");
    const uColor = g.getUniformLocation(program, "uColor");
    const uRes = g.getUniformLocation(program, "uResolution");
    const uMouse = g.getUniformLocation(program, "uMouse");
    const uAmp = g.getUniformLocation(program, "uAmplitude");
    const uSpeed = g.getUniformLocation(program, "uSpeed");

    const mouse = { x: 0.5, y: 0.5 };

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      g.viewport(0, 0, canvas.width, canvas.height);
    };
    window.addEventListener("resize", resize);
    resize();

    const onMouseMove = (e: MouseEvent) => {
      mouse.x = e.clientX / window.innerWidth;
      mouse.y = 1.0 - e.clientY / window.innerHeight;
    };
    window.addEventListener("mousemove", onMouseMove);

    let raf: number;
    const render = (time: number) => {
      g.uniform1f(uTime, time * 0.001);
      g.uniform3f(uColor, 1.0, 1.0, 1.0);
      g.uniform3f(uRes, canvas.width, canvas.height, canvas.width / canvas.height);
      g.uniform2f(uMouse, mouse.x, mouse.y);
      g.uniform1f(uAmp, 0.1);
      g.uniform1f(uSpeed, 1.0);
      g.drawArrays(g.TRIANGLES, 0, 3);
      raf = requestAnimationFrame(render);
    };
    raf = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMouseMove);
      container.removeChild(canvas);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[1] pointer-events-none"
      style={{ mixBlendMode: "screen", opacity: 0.8 }}
    />
  );
};

export default WebGLCanvas;
