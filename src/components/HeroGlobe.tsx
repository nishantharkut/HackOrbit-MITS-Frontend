import { useEffect, useRef, useState } from 'react';
import createGlobe, { type Arc, type Globe, type Marker } from 'cobe';

const HOST_NODE: [number, number] = [26.2183, 78.1828];

const MARKERS: Marker[] = [
  { id: 'gwalior', location: HOST_NODE, size: 0.14, color: [0.98, 0.72, 0.26] },
  { location: [28.6139, 77.2090], size: 0.07 },
  { location: [19.0760, 72.8777], size: 0.07 },
  { location: [12.9716, 77.5946], size: 0.07 },
  { location: [17.3850, 78.4867], size: 0.065 },
  { location: [13.0827, 80.2707], size: 0.06 },
  { location: [22.5726, 88.3639], size: 0.065 },
  { location: [18.5204, 73.8567], size: 0.055 },
  { location: [23.0225, 72.5714], size: 0.055 },
  { location: [26.9124, 75.7873], size: 0.05 },
  { location: [23.2599, 77.4126], size: 0.05 },
  { location: [21.1458, 79.0882], size: 0.05 },
  { location: [25.5941, 85.1376], size: 0.05 },
  { location: [26.1445, 91.7362], size: 0.045 },
  { location: [9.9312, 76.2673], size: 0.045 },
];

const ROUTE_ORIGINS: Array<[number, number]> = [
  [28.6139, 77.2090],
  [19.0760, 72.8777],
  [12.9716, 77.5946],
  [17.3850, 78.4867],
  [22.5726, 88.3639],
  [13.0827, 80.2707],
  [18.5204, 73.8567],
  [23.0225, 72.5714],
  [26.1445, 91.7362],
];

const ARCS: Arc[] = ROUTE_ORIGINS.map((from, index) => ({
  from,
  to: HOST_NODE,
  color: index % 2 === 0 ? [0.75, 0.95, 0.42] : [0.98, 0.72, 0.26],
}));

const INITIAL_PHI = -1.35;

const HeroGlobe = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const globeRef = useRef<Globe | null>(null);
  const frameRef = useRef(0);
  const pointerOriginRef = useRef<number | null>(null);
  const pointerRotationRef = useRef(0);
  const phiRef = useRef(INITIAL_PHI);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    let resizeFrame = 0;

    const destroyGlobe = () => {
      window.cancelAnimationFrame(frameRef.current);
      if (globeRef.current) {
        globeRef.current.destroy();
        globeRef.current = null;
      }
    };

    const mountGlobe = () => {
      const size = Math.min(container.offsetWidth, container.offsetHeight || container.offsetWidth, 560);
      if (!size) return;

      setReady(false);
      destroyGlobe();

      const devicePixelRatio = Math.min(window.devicePixelRatio || 1, 2);

      canvas.width = size * devicePixelRatio;
      canvas.height = size * devicePixelRatio;
      canvas.style.width = `${size}px`;
      canvas.style.height = `${size}px`;
      canvas.style.display = 'block';

      globeRef.current = createGlobe(canvas, {
        devicePixelRatio,
        width: size * devicePixelRatio,
        height: size * devicePixelRatio,
        phi: phiRef.current,
        theta: 0.34,
        dark: 1,
        diffuse: 1.15,
        scale: 1.02,
        mapSamples: 16000,
        mapBrightness: 2.2,
        mapBaseBrightness: 0.03,
        baseColor: [0.08, 0.11, 0.14],
        markerColor: [0.75, 0.95, 0.42],
        glowColor: [0.18, 0.23, 0.18],
        offset: [0, -0.02],
        opacity: 0.96,
        markers: MARKERS,
        arcs: ARCS,
        arcColor: [0.98, 0.72, 0.26],
        arcWidth: 0.55,
        arcHeight: 0.24,
        markerElevation: 0.05,
      });

      const animate = () => {
        if (pointerOriginRef.current === null) {
          phiRef.current += 0.0022;
        }

        globeRef.current?.update({
          phi: phiRef.current + pointerRotationRef.current,
        });

        frameRef.current = window.requestAnimationFrame(animate);
      };

      frameRef.current = window.requestAnimationFrame(animate);
      setReady(true);
    };

    mountGlobe();

    const resizeObserver = new ResizeObserver(() => {
      window.cancelAnimationFrame(resizeFrame);
      resizeFrame = window.requestAnimationFrame(mountGlobe);
    });

    resizeObserver.observe(container);

    return () => {
      window.cancelAnimationFrame(resizeFrame);
      resizeObserver.disconnect();
      destroyGlobe();
    };
  }, []);

  return (
    <div ref={containerRef} className="flex h-full w-full items-center justify-center">
      <canvas
        ref={canvasRef}
        aria-label="HackOrbit participation globe"
        className={`transition-opacity duration-700 ${ready ? 'opacity-100' : 'opacity-0'}`}
        onPointerDown={(event) => {
          pointerOriginRef.current = event.clientX;
          event.currentTarget.setPointerCapture(event.pointerId);
        }}
        onPointerMove={(event) => {
          if (pointerOriginRef.current === null) return;
          pointerRotationRef.current = (event.clientX - pointerOriginRef.current) / 160;
        }}
        onPointerUp={(event) => {
          if (pointerOriginRef.current !== null) {
            phiRef.current += pointerRotationRef.current;
            pointerRotationRef.current = 0;
          }
          pointerOriginRef.current = null;
          event.currentTarget.releasePointerCapture(event.pointerId);
        }}
        onPointerCancel={(event) => {
          if (pointerOriginRef.current !== null) {
            phiRef.current += pointerRotationRef.current;
            pointerRotationRef.current = 0;
          }
          pointerOriginRef.current = null;
          event.currentTarget.releasePointerCapture(event.pointerId);
        }}
      />
    </div>
  );
};

export default HeroGlobe;
