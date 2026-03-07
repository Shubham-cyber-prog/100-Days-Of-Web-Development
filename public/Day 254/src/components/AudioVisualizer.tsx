import { useRef, useEffect } from "react";

interface AudioVisualizerProps {
  analyser: AnalyserNode | null;
  isPlaying: boolean;
}

export default function AudioVisualizer({ analyser, isPlaying }: AudioVisualizerProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>(0);
  const fakeDataRef = useRef<number[]>([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Initialize fake frequency data for demo
    if (fakeDataRef.current.length === 0) {
      fakeDataRef.current = Array.from({ length: 64 }, () => Math.random() * 50 + 10);
    }

    const resize = () => {
      canvas.width = canvas.offsetWidth * window.devicePixelRatio;
      canvas.height = canvas.offsetHeight * window.devicePixelRatio;
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
    };
    resize();
    window.addEventListener("resize", resize);

    const draw = () => {
      const width = canvas.offsetWidth;
      const height = canvas.offsetHeight;

      ctx.clearRect(0, 0, width, height);

      let dataArray: number[];
      let bufferLength: number;

      if (analyser) {
        bufferLength = analyser.frequencyBinCount;
        const raw = new Uint8Array(bufferLength);
        analyser.getByteFrequencyData(raw);
        dataArray = Array.from(raw);
      } else if (isPlaying) {
        // Simulate visualization for demo tracks
        bufferLength = 64;
        fakeDataRef.current = fakeDataRef.current.map((val) => {
          const target = Math.random() * 180 + 20;
          return val + (target - val) * 0.15;
        });
        dataArray = fakeDataRef.current;
      } else {
        // Idle state - gentle wave
        bufferLength = 64;
        const time = Date.now() / 1000;
        dataArray = Array.from({ length: bufferLength }, (_, i) => {
          return 15 + Math.sin(time * 0.5 + i * 0.2) * 10;
        });
      }

      const barCount = Math.min(bufferLength, 64);
      const gap = 3;
      const barWidth = (width - gap * barCount) / barCount;
      const centerY = height / 2;

      for (let i = 0; i < barCount; i++) {
        const value = (dataArray[i] as number) / 255;
        const barHeight = value * centerY * 0.9;

        const x = i * (barWidth + gap);

        // Create gradient for each bar
        const gradient = ctx.createLinearGradient(x, centerY - barHeight, x, centerY + barHeight);
        const hue = 175 + (i / barCount) * 25;
        const alpha = 0.4 + value * 0.6;
        gradient.addColorStop(0, `hsla(${hue}, 80%, 60%, ${alpha})`);
        gradient.addColorStop(0.5, `hsla(${hue}, 80%, 50%, ${alpha * 0.9})`);
        gradient.addColorStop(1, `hsla(${hue + 20}, 80%, 40%, ${alpha * 0.6})`);

        ctx.fillStyle = gradient;

        // Draw mirrored bars
        const radius = Math.min(barWidth / 2, 4);
        // Top bar
        roundRect(ctx, x, centerY - barHeight, barWidth, barHeight, radius);
        // Bottom bar (mirror)
        roundRect(ctx, x, centerY, barWidth, barHeight, radius);

        // Glow effect for active bars
        if (value > 0.5) {
          ctx.shadowColor = `hsla(${hue}, 80%, 50%, 0.3)`;
          ctx.shadowBlur = 10;
          ctx.fillRect(x, centerY - barHeight, barWidth, barHeight * 2);
          ctx.shadowBlur = 0;
        }
      }

      animationRef.current = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      cancelAnimationFrame(animationRef.current);
      window.removeEventListener("resize", resize);
    };
  }, [analyser, isPlaying]);

  return (
    <canvas
      ref={canvasRef}
      className="w-full h-full"
      style={{ display: "block" }}
    />
  );
}

function roundRect(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  w: number,
  h: number,
  r: number
) {
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.lineTo(x + w - r, y);
  ctx.quadraticCurveTo(x + w, y, x + w, y + r);
  ctx.lineTo(x + w, y + h - r);
  ctx.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
  ctx.lineTo(x + r, y + h);
  ctx.quadraticCurveTo(x, y + h, x, y + h - r);
  ctx.lineTo(x, y + r);
  ctx.quadraticCurveTo(x, y, x + r, y);
  ctx.closePath();
  ctx.fill();
}
