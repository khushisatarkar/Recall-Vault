import React, { useEffect, useRef } from "react";
type Particle = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  r: number;
  color: string;
  rotation: number;
  vr: number;
};

interface Props {
  refCallback?: (el: HTMLCanvasElement | null) => void;
}

export default function ConfettiCanvas({ refCallback }: Props) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const particlesRef = useRef<Particle[]>([]);

  useEffect(() => {
    const canvas = canvasRef.current!;
    if (!canvas) return;
    refCallback?.(canvas);
    const ctx = canvas.getContext("2d")!;
    let raf = 0;
    let w = (canvas.width = window.innerWidth);
    let h = (canvas.height = window.innerHeight);

    const onResize = () => {
      w = canvas.width = window.innerWidth;
      h = canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", onResize);

    function spawnBurst() {
      particlesRef.current = [];
      
      // Left corner confetti
      for (let i = 0; i < 60; i++) {
        particlesRef.current.push({
          x: Math.random() * 100, // Bottom left area
          y: h - Math.random() * 50, // Bottom of screen
          vx: Math.random() * 8 + 2, // Shoot right and up
          vy: -(Math.random() * 12 + 8), // Shoot upward
          r: Math.random() * 4 + 2,
          color: `hsl(${Math.floor(Math.random() * 360)} 80% 55%)`,
          rotation: Math.random() * 360,
          vr: (Math.random() - 0.5) * 10,
        });
      }
      
      // Right corner confetti
      for (let i = 0; i < 60; i++) {
        particlesRef.current.push({
          x: w - Math.random() * 100, // Bottom right area
          y: h - Math.random() * 50, // Bottom of screen
          vx: -(Math.random() * 8 + 2), // Shoot left and up
          vy: -(Math.random() * 12 + 8), // Shoot upward
          r: Math.random() * 4 + 2,
          color: `hsl(${Math.floor(Math.random() * 360)} 80% 55%)`,
          rotation: Math.random() * 360,
          vr: (Math.random() - 0.5) * 10,
        });
      }
      
      run();
    }

    function run() {
      function loop() {
        ctx.clearRect(0, 0, w, h);

        for (const p of particlesRef.current) {
          p.x += p.vx;
          p.y += p.vy;
          p.vy += 0.3; // gravity
          p.rotation += p.vr;

          ctx.save();
          ctx.translate(p.x, p.y);
          ctx.rotate((p.rotation * Math.PI) / 180);
          ctx.fillStyle = p.color;
          ctx.fillRect(-p.r / 2, -p.r / 2, p.r * 2, p.r);
          ctx.restore();
        }

        particlesRef.current = particlesRef.current.filter((p) => p.y < h + 50);

        if (particlesRef.current.length > 0) {
          raf = requestAnimationFrame(loop);
        } else {
          cancelAnimationFrame(raf);
        }
      }

      loop();
    }

    // listen for celebrate event dispatched by GameBoard
    const celebrateHandler = () => spawnBurst();
    canvas.addEventListener("celebrate", celebrateHandler as EventListener);

    return () => {
      window.removeEventListener("resize", onResize);
      canvas.removeEventListener(
        "celebrate",
        celebrateHandler as EventListener
      );
      cancelAnimationFrame(raf);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "fixed",
        left: 0,
        top: 0,
        width: "100%",
        height: "100%",
        pointerEvents: "none",
        zIndex: 50,
      }}
    />
  );
}
