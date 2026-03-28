import { useEffect, useRef, useCallback, useState } from 'react';
import createGlobe from 'cobe';

const MARKERS: { location: [number, number]; size: number }[] = [
  { location: [40.64, -73.78], size: 0.08 },
  { location: [51.47, -0.46], size: 0.08 },
  { location: [25.25, 55.36], size: 0.07 },
  { location: [35.76, 140.39], size: 0.07 },
  { location: [1.35, 103.99], size: 0.07 },
  { location: [33.94, -118.41], size: 0.06 },
  { location: [48.86, 2.35], size: 0.05 },
  { location: [50.03, 8.57], size: 0.05 },
  { location: [37.62, -122.37], size: 0.05 },
  { location: [41.97, -87.9], size: 0.05 },
  { location: [-33.94, 151.17], size: 0.05 },
  { location: [19.08, 72.87], size: 0.05 },
  { location: [22.31, 113.91], size: 0.05 },
  { location: [55.97, 37.41], size: 0.04 },
  { location: [-23.43, -46.47], size: 0.04 },
  { location: [28.57, 77.10], size: 0.04 },
  { location: [39.91, 116.39], size: 0.05 },
  { location: [13.68, 100.75], size: 0.04 },
  { location: [31.12, 121.80], size: 0.05 },
  { location: [25.79, -80.29], size: 0.04 },
  { location: [43.68, -79.63], size: 0.04 },
  { location: [52.56, 13.29], size: 0.04 },
  { location: [41.30, 2.08], size: 0.04 },
  { location: [37.57, 126.98], size: 0.05 },
  { location: [47.46, -122.31], size: 0.04 },
];

const ARCS: { from: [number, number]; to: [number, number] }[] = [
  { from: [33.94, -118.41], to: [41.97, -87.9] },
  { from: [50.03, 8.57], to: [40.64, -73.78] },
  { from: [51.47, -0.46], to: [25.25, 55.36] },
  { from: [35.76, 140.39], to: [37.62, -122.37] },
  { from: [1.35, 103.99], to: [51.47, -0.46] },
  { from: [-33.94, 151.17], to: [33.94, -118.41] },
  { from: [40.64, -73.78], to: [48.86, 2.35] },
  { from: [25.25, 55.36], to: [1.35, 103.99] },
  { from: [19.08, 72.87], to: [51.47, -0.46] },
  { from: [22.31, 113.91], to: [35.76, 140.39] },
  { from: [-23.43, -46.47], to: [40.64, -73.78] },
  { from: [55.97, 37.41], to: [25.25, 55.36] },
];

const HeroGlobe = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const pointerInteracting = useRef<number | null>(null);
  const pointerInteractionMovement = useRef(0);
  const phiRef = useRef(0);
  const globeRef = useRef<ReturnType<typeof createGlobe> | null>(null);
  const rafRef = useRef<number>(0);
  const [ready, setReady] = useState(false);

  const initGlobe = useCallback(() => {
    if (!canvasRef.current || !wrapperRef.current) return;

    const size = Math.min(
      wrapperRef.current.offsetWidth,
      wrapperRef.current.offsetHeight,
      600
    );
    if (size === 0) return;

    if (globeRef.current) {
      cancelAnimationFrame(rafRef.current);
      globeRef.current.destroy();
      globeRef.current = null;
    }

    const pixelRatio = window.devicePixelRatio || 1;
    canvasRef.current.width = size * pixelRatio;
    canvasRef.current.height = size * pixelRatio;
    canvasRef.current.style.width = `${size}px`;
    canvasRef.current.style.height = `${size}px`;
    canvasRef.current.style.display = 'block';
    canvasRef.current.style.margin = '0 auto';

    const globe = createGlobe(canvasRef.current, {
      devicePixelRatio: pixelRatio,
      width: size * pixelRatio,
      height: size * pixelRatio,
      phi: 0.3,
      theta: 0.15,
      dark: 1,
      diffuse: 1.2,
      mapSamples: 40000,
      mapBrightness: 4.2,
      mapBaseBrightness: 0.05,
      baseColor: [0.1, 0.13, 0.17],
      markerColor: [0.976, 0.451, 0.086],
      glowColor: [0.2, 0.24, 0.2],
      markers: MARKERS,
      arcs: ARCS,
      arcColor: [0.976, 0.451, 0.086],
      arcWidth: 0.4,
      arcHeight: 0.3,
      opacity: 1,
    });

    globeRef.current = globe;

    const animate = () => {
      if (!pointerInteracting.current) {
        phiRef.current += 0.003;
      }
      globeRef.current?.update({
        phi: phiRef.current + pointerInteractionMovement.current,
        width: size * pixelRatio,
        height: size * pixelRatio,
      });
      rafRef.current = requestAnimationFrame(animate);
    };
    rafRef.current = requestAnimationFrame(animate);

    setReady(true);
  }, []);

  useEffect(() => {
    const timer = setTimeout(initGlobe, 100);

    let resizeTimer: ReturnType<typeof setTimeout>;
    const handleResize = () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(initGlobe, 200);
    };
    window.addEventListener('resize', handleResize);

    return () => {
      clearTimeout(timer);
      clearTimeout(resizeTimer);
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener('resize', handleResize);
      if (globeRef.current) globeRef.current.destroy();
    };
  }, [initGlobe]);

  return (
    <div ref={wrapperRef} style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div ref={containerRef}>
        <canvas
          ref={canvasRef}
          onPointerDown={(e) => {
            pointerInteracting.current = e.clientX;
            if (canvasRef.current) canvasRef.current.style.cursor = 'grabbing';
          }}
          onPointerUp={() => {
            if (pointerInteracting.current !== null) {
              phiRef.current += pointerInteractionMovement.current;
              pointerInteractionMovement.current = 0;
            }
            pointerInteracting.current = null;
            if (canvasRef.current) canvasRef.current.style.cursor = 'grab';
          }}
          onPointerOut={() => {
            if (pointerInteracting.current !== null) {
              phiRef.current += pointerInteractionMovement.current;
              pointerInteractionMovement.current = 0;
            }
            pointerInteracting.current = null;
            if (canvasRef.current) canvasRef.current.style.cursor = 'grab';
          }}
          onMouseMove={(e) => {
            if (pointerInteracting.current !== null) {
              const delta = e.clientX - pointerInteracting.current;
              pointerInteractionMovement.current = delta / 200;
            }
          }}
          onTouchMove={(e) => {
            if (pointerInteracting.current !== null && e.touches[0]) {
              const delta = e.touches[0].clientX - pointerInteracting.current;
              pointerInteractionMovement.current = delta / 200;
            }
          }}
          className={`cursor-grab transition-opacity duration-700 ${ready ? 'opacity-100' : 'opacity-0'}`}
        />
      </div>
    </div>
  );
};

export default HeroGlobe;
