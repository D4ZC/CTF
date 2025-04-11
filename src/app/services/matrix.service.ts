import { Injectable, PLATFORM_ID, Inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class MatrixService {
  private isBrowser: boolean;
  private animationFrameId: number | null = null;
  private columns: number[] = [];
  private fontSize = 14;

  constructor(@Inject(PLATFORM_ID) platformId: Object) {
    this.isBrowser = isPlatformBrowser(platformId);
  }

  startAnimation(canvas: HTMLCanvasElement): void {
    if (!this.isBrowser) return;

    const ctx = canvas.getContext('2d')!;
    this.resizeCanvas(canvas);

    const drawBinary = () => {
      ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.fillStyle = '#0F0';
      ctx.font = this.fontSize + 'px monospace';

      for (let i = 0; i < this.columns.length; i++) {
        const text = Math.random() > 0.5 ? '1' : '0';
        const x = i * this.fontSize;
        const y = this.columns[i] * this.fontSize;

        ctx.fillText(text, x, y);

        if (y > canvas.height && Math.random() > 0.975) {
          this.columns[i] = 0;
        } else {
          this.columns[i]++;
        }
      }

      this.animationFrameId = requestAnimationFrame(drawBinary);
    };

    drawBinary();
  }

  private resizeCanvas(canvas: HTMLCanvasElement): void {
    if (!this.isBrowser) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    this.columns = Array(Math.floor(canvas.width / this.fontSize)).fill(0);
  }

  stopAnimation(): void {
    if (this.isBrowser && this.animationFrameId) {
      cancelAnimationFrame(this.animationFrameId);
    }
  }
} 