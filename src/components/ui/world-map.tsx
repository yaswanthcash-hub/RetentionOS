import { useRef, useEffect } from "react";

interface MapProps {
  dots?: Array<{
    start: { lat: number; lng: number; label?: string };
    end: { lat: number; lng: number; label?: string };
  }>;
  lineColor?: string;
}

export default function WorldMap({
  dots = [],
  lineColor = "#0ea5e9",
}: MapProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const width = canvas.width;
    const height = canvas.height;

    ctx.clearRect(0, 0, width, height);

    const latToY = (lat: number) => ((90 - lat) / 180) * height;
    const lngToX = (lng: number) => ((lng + 180) / 360) * width;

    ctx.fillStyle = "#d1d5db";
    for (let x = 0; x < width; x += 6) {
      for (let y = 0; y < height; y += 6) {
        ctx.beginPath();
        ctx.arc(x, y, 1, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    dots.forEach(({ start, end }) => {
      const x1 = lngToX(start.lng);
      const y1 = latToY(start.lat);
      const x2 = lngToX(end.lng);
      const y2 = latToY(end.lat);

      const gradient = ctx.createLinearGradient(x1, y1, x2, y2);
      gradient.addColorStop(0, "rgba(14, 165, 233, 0)");
      gradient.addColorStop(0.1, lineColor);
      gradient.addColorStop(0.9, lineColor);
      gradient.addColorStop(1, "rgba(14, 165, 233, 0)");

      ctx.strokeStyle = gradient;
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(x1, y1);
      ctx.lineTo(x2, y2);
      ctx.stroke();

      ctx.fillStyle = lineColor;
      ctx.beginPath();
      ctx.arc(x1, y1, 5, 0, Math.PI * 2);
      ctx.fill();
      ctx.beginPath();
      ctx.arc(x2, y2, 5, 0, Math.PI * 2);
      ctx.fill();

      ctx.strokeStyle = lineColor;
      ctx.globalAlpha = 0.3;
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.arc(x1, y1, 12, 0, Math.PI * 2);
      ctx.stroke();
      ctx.beginPath();
      ctx.arc(x2, y2, 12, 0, Math.PI * 2);
      ctx.stroke();
      ctx.globalAlpha = 1;
    });
  }, [dots, lineColor]);

  return (
    <div className="w-full aspect-[2/1] bg-white rounded-lg relative">
      <canvas
        ref={canvasRef}
        width={1600}
        height={800}
        className="w-full h-full rounded-lg"
      />
    </div>
  );
}
