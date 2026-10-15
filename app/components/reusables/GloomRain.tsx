import { useEffect, useRef } from "react";

// Internal class to manage individual rain line properties and animation
class RainLine {
  x: number;
  y: number;
  length: number;
  speed: number;
  opacity: number;
  color: string;

  constructor(width: number, height: number) {
    // Randomize starting position across the width
    this.x = Math.random() * width;
    // Start somewhere off-screen or in the top half
    this.y = Math.random() * height * -1;
    // Randomize length to feel organic (10px to 30px)
    this.length = Math.random() * 20 + 10;
    // Randomize falling speed (heavy fall)
    this.speed = Math.random() * 10 + 5;
    // Randomize slight opacity variance
    this.opacity = Math.random() * 0.7 + 0.5; // Low opacity for gloominess
    // Muted blue/grey tone
    this.color = `rgba(56, 189, 248, ${this.opacity})`; // muted sky blue base
  }

  update(height: number) {
    this.y += this.speed;
    // When the line falls off the bottom, reset it above the top
    if (this.y > height) {
      this.y = -this.length;
      // Slightly change X so it doesn't look like a repeating loop
      this.x = Math.random() * window.innerWidth;
    }
  }

  draw(ctx: CanvasRenderingContext2D) {
    ctx.beginPath();
    // Thin line width
    ctx.lineWidth = 1;
    ctx.lineCap = "round"; // Rounded ends for softer, tear-like look
    ctx.strokeStyle = this.color;
    // Draw the straight vertical line
    ctx.moveTo(this.x, this.y);
    ctx.lineTo(this.x, this.y + this.length);
    ctx.stroke();
  }
}

export function GloomRain() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationFrameId = useRef<number | undefined>(undefined);
  const rainLines = useRef<RainLine[]>([]);

  useEffect(() => {
    if ( !canvasRef.current) {
      // Clean up animation if trigger is false
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
      }
      return;
    }

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Set canvas dimensions to full viewport, handling DPI density
    const handleResize = () => {
      const dpr = window.devicePixelRatio || 1;
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      ctx.scale(dpr, dpr);
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;

      // Initialize or reset the lines array based on new width
      initializeRain(window.innerWidth, window.innerHeight);
    };

    const initializeRain = (width: number, height: number) => {
      const lineCount = Math.floor(width / 8); // Density based on screen width
      const lines = [];
      for (let i = 0; i < lineCount; i++) {
        lines.push(new RainLine(width, height));
      }
      rainLines.current = lines;
    };

    const animate = () => {
      // Clear the canvas on every frame (critical!)
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Update and draw every line
      const currentHeight = window.innerHeight;
      rainLines.current.forEach((line) => {
        line.update(currentHeight);
        line.draw(ctx);
      });

      // Request next frame
      animationFrameId.current = requestAnimationFrame(animate);
    };

    // Initial setup and event listener
    window.addEventListener("resize", handleResize);
    handleResize(); // Initial call
    animate(); // Start animation loop

    // Cleanup function when unmounting or trigger changes
    return () => {
      window.removeEventListener("resize", handleResize);
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
      }
    };
  });

  return (
    <canvas
      ref={canvasRef}
      // pointer-events-none ensures users can still click UI underneath the rain
      className="pointer-events-none fixed inset-0 z-100 motion-reduce:hidden"
      style={{ opacity: 1, transition: "opacity 0.5s ease" }}
      aria-hidden="true"
    />
  );
}