import { Component, OnInit, AfterViewInit } from "@angular/core"
import { CommonModule } from "@angular/common"
import { Router } from "@angular/router"
import { HttpClient } from "@angular/common/http"

@Component({
  selector: "app-hexa",
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="nebula"></div>
    <div class="galactic-grid"></div>
    <div class="matrix-bg"></div>
    <div class="space-particles"></div>
    <div class="glitch-overlay"></div>
    <div class="scan-line"></div>
    <header>
      <h1>H3X4V3RS0</h1>
    </header>
    <div class="x-container">
      <div class="image-container" *ngFor="let img of images; let i = index" [style.grid-area]="getGridArea(i)">
        <img [src]="getImagePath(img)" 
             [alt]="getImageName(img)"
             class="image"
             (click)="downloadImage(getImageName(img))"
             (error)="handleImageError($event)"
             loading="lazy">
      </div>
    </div>
  `,
  styles: [`
    @import url('https://fonts.googleapis.com/css2?family=Share+Tech+Mono&display=swap');
    :host {
      display: block;
      margin: 0;
      padding: 0;
      display: flex;
      flex-direction: column;
      align-items: center;
      width: 100%;
      height: 100vh;
      background-color: #000000;
      overflow-y: auto;
      position: relative;
    }

    .matrix-bg {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      z-index: -1;
      background: linear-gradient(rgba(0, 0, 0, 0.9), rgba(0, 0, 0, 0.9));
      overflow: hidden;
    }

    .matrix-column {
      position: absolute;
      top: -100%;
      color: #e0e0e0;
      font-family: 'Share Tech Mono', monospace;
      font-size: 16px;
      line-height: 1.2;
      white-space: nowrap;
      animation: matrixRain linear infinite;
      text-shadow: 0 0 8px rgba(200, 200, 220, 0.8);
      opacity: 0.7;
      letter-spacing: 1px;
      writing-mode: vertical-lr;
      text-orientation: upright;
    }

    @keyframes matrixRain {
      0% {
        transform: translateY(-100%);
        opacity: 0;
      }
      10% {
        opacity: 0.7;
      }
      90% {
        opacity: 0.7;
      }
      100% {
        transform: translateY(200vh);
        opacity: 0;
      }
    }

    .glitch-overlay {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: repeating-linear-gradient(
        0deg,
        rgba(0, 0, 0, 0.15),
        rgba(0, 0, 0, 0.15) 1px,
        transparent 1px,
        transparent 2px
      );
      pointer-events: none;
      z-index: 1;
      animation: glitchScan 12s linear infinite;
    }

    @keyframes glitchScan {
      0% {
        transform: translateY(-100%);
      }
      100% {
        transform: translateY(100%);
      }
    }

    .scan-line {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 2px;
      background: rgba(200, 200, 220, 0.3);
      box-shadow: 0 0 10px rgba(200, 200, 220, 0.7);
      z-index: 2;
      animation: scan 6s linear infinite;
    }

    @keyframes scan {
      0% {
        transform: translateY(-100%);
      }
      100% {
        transform: translateY(100vh);
      }
    }

    .space-particles {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      z-index: 0;
      pointer-events: none;
    }

    .space-particle {
      position: absolute;
      width: 1px;
      height: 1px;
      background-color: #e0e0e0;
      border-radius: 50%;
      box-shadow: 0 0 3px rgba(200, 200, 220, 0.7);
      animation: spaceFloat 20s infinite;
    }

    @keyframes spaceFloat {
      0% {
        transform: translateY(0) translateX(0);
        opacity: 0;
      }
      10% {
        opacity: 0.8;
      }
      90% {
        opacity: 0.8;
      }
      100% {
        transform: translateY(-100vh) translateX(20px);
        opacity: 0;
      }
    }

    .galactic-grid {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-image: 
        linear-gradient(rgba(200, 200, 220, 0.05) 1px, transparent 1px),
        linear-gradient(90deg, rgba(200, 200, 220, 0.05) 1px, transparent 1px);
      background-size: 100px 100px;
      z-index: -2;
      animation: gridPulse 15s linear infinite;
      pointer-events: none;
    }

    @keyframes gridPulse {
      0% {
        opacity: 0.3;
        transform: scale(1);
      }
      50% {
        opacity: 0.5;
        transform: scale(1.05);
      }
      100% {
        opacity: 0.3;
        transform: scale(1);
      }
    }

    .nebula {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: radial-gradient(
        circle at 30% 30%,
        rgba(200, 200, 220, 0.05) 0%,
        rgba(0, 0, 0, 0) 50%
      ),
      radial-gradient(
        circle at 70% 70%,
        rgba(180, 190, 210, 0.05) 0%,
        rgba(0, 0, 0, 0) 50%
      );
      z-index: -3;
      animation: nebulaShift 30s linear infinite;
      pointer-events: none;
    }

    @keyframes nebulaShift {
      0% {
        background-position: 0% 0%, 100% 100%;
      }
      50% {
        background-position: 100% 0%, 0% 100%;
      }
      100% {
        background-position: 0% 0%, 100% 100%;
      }
    }

    header {
      width: 100%;
      background-color: rgba(0, 0, 0, 0.8);
      color: white;
      text-align: center;
      padding: 1rem 0;
      margin-bottom: 4rem;
      position: sticky;
      top: 0;
      z-index: 100;
    }

    h1 {
      margin: 0;
      font-size: 3.5rem;
      line-height: 0.8;
      font-family: 'Share Tech Mono', monospace;
      color: #ffffff;
      position: relative;
      text-transform: uppercase;
      letter-spacing: 0.1em;
      animation: moveTitle 5s infinite;
      text-shadow: 0 0 10px rgba(200, 200, 220, 0.8);
    }

    h1::before,
    h1::after {
      content: 'Hexaverso';
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
    }

    h1::before {
      color: #808080;
      animation: glitchTop 2s infinite linear alternate-reverse;
      clip-path: polygon(0 0, 100% 0, 100% 33%, 0 33%);
      -webkit-clip-path: polygon(0 0, 100% 0, 100% 33%, 0 33%);
    }

    h1::after {
      color: #a0a0b0;
      animation: glitchBottom 4s infinite linear alternate-reverse;
      clip-path: polygon(0 67%, 100% 67%, 100% 100%, 0 100%);
      -webkit-clip-path: polygon(0 67%, 100% 67%, 100% 100%, 0 100%);
    }

    @keyframes moveTitle {
      0%, 100% {
        transform: translateX(0) skew(0deg);
        text-shadow: 0 0 10px rgba(200, 200, 220, 0.8);
      }
      25% {
        transform: translateX(-10px) skew(-5deg);
        text-shadow: 0 0 15px rgba(200, 200, 220, 0.9);
      }
      75% {
        transform: translateX(10px) skew(5deg);
        text-shadow: 0 0 15px rgba(200, 200, 220, 0.9);
      }
    }

    @keyframes glitchTop {
      0% { transform: translate(-2px, -2px); }
      50% { transform: translate(2px, 2px); }
      100% { transform: translate(-2px, -2px); }
    }

    @keyframes glitchBottom {
      0% { transform: translate(2px, 2px); }
      50% { transform: translate(-2px, -2px); }
      100% { transform: translate(2px, 2px); }
    }

    .x-container {
      display: grid;
      grid-template-columns: repeat(8, 80px);
      grid-template-rows: repeat(8, 80px);
      gap: 15px;
      position: relative;
      margin: 50px auto;
      z-index: 10;
    }

    .image {
      width: 80px;
      height: 80px;
      transition: transform 0.3s ease;
      border-radius: 5px;
      background-color: #808080;
      box-shadow: 0 0 15px rgba(128,128,128,0.3);
      cursor: pointer;
      object-fit: cover;
    }

    .image:hover {
      transform: scale(1.1);
    }

    .image-container {
      display: block;
      width: 80px;
      height: 80px;
    }
  `]
})
export class HexaComponent implements OnInit, AfterViewInit {
  images = [
    "1 (1) h.jpg",
    "2 (1) h.jpg",
    "fernet h.jpg",
    "4 h.jpg",
    "5 h.jpg",
    "6 h.jpg",
    "7 h.jpg",
    "8 (1) h.jpg",
    "9.jpg",
    "10.jpg",
    "11.jpg",
    "12.jpg",
    "13.jpg",
    "14 STEGO.png",
    "15.jpg",
    "16.jpg"
  ];

  constructor(
    private router: Router,
    private http: HttpClient
  ) {}

  ngOnInit() {
    this.initMatrixEffect();
    this.createSpaceParticles();
  }

  ngAfterViewInit() {
    this.createMatrixEffect();
    setInterval(() => this.updateMatrixEffect(), 200);
    window.addEventListener('resize', () => this.resizeMatrix());
  }

  getGridArea(index: number): string {
    const gridAreas = [
      '1/1/2/2', '2/2/3/3', '3/3/4/4', '4/4/5/5',
      '5/5/6/6', '6/6/7/7', '7/7/8/8', '8/8/9/9',
      '1/8/2/9', '2/7/3/8', '3/6/4/7', '4/5/5/6',
      '5/4/6/5', '6/3/7/4', '7/2/8/3', '8/1/9/2'
    ];
    return gridAreas[index];
  }

  getImageName(path: string): string {
    return path;
  }

  getImagePath(filename: string): string {
    return `/assets/img/${filename}`;
  }

  handleImageError(event: Event): void {
    const img = event.target as HTMLImageElement;
    console.error(`Error loading image: ${img.src}`);
  }

  private createMatrixEffect() {
    const matrixBg = document.querySelector('.matrix-bg');
    if (!matrixBg) return;
    
    const columns = Math.floor(window.innerWidth / 15);
    for (let i = 0; i < columns; i++) {
      const column = document.createElement('div');
      column.className = 'matrix-column';
      column.style.left = `${i * 15}px`;
      column.style.animationDuration = `${Math.random() * 5 + 8}s`;
      
      let binaryString = '';
      for (let j = 0; j < 30; j++) {
        binaryString += Math.random() > 0.5 ? '1' : '0';
      }
      column.textContent = binaryString;
      
      matrixBg.appendChild(column);
    }
  }

  private updateMatrixEffect() {
    const columns = document.querySelectorAll('.matrix-column');
    columns.forEach(column => {
      let binaryString = '';
      for (let j = 0; j < 30; j++) {
        binaryString += Math.random() > 0.5 ? '1' : '0';
      }
      column.textContent = binaryString;
    });
  }

  private createSpaceParticles() {
    const particlesContainer = document.querySelector('.space-particles');
    if (!particlesContainer) return;
    
    const particleCount = 150;
    for (let i = 0; i < particleCount; i++) {
      const particle = document.createElement('div');
      particle.className = 'space-particle';
      
      particle.style.left = `${Math.random() * 100}%`;
      particle.style.top = `${Math.random() * 100}%`;
      
      const size = Math.random() * 2 + 1;
      particle.style.width = `${size}px`;
      particle.style.height = `${size}px`;
      
      particle.style.animationDuration = `${Math.random() * 30 + 20}s`;
      particle.style.animationDelay = `${Math.random() * 10}s`;
      
      particlesContainer.appendChild(particle);
    }
  }

  private resizeMatrix() {
    const matrixBg = document.querySelector('.matrix-bg');
    if (!matrixBg) return;
    
    const columns = document.querySelectorAll('.matrix-column');
    columns.forEach(column => column.remove());
    
    this.createMatrixEffect();
  }

  private initMatrixEffect() {
    this.createMatrixEffect();
    setInterval(() => this.updateMatrixEffect(), 200);
    window.addEventListener('resize', () => this.resizeMatrix());
  }

  async downloadImage(filename: string) {
    try {
      const response = await this.http.get(`/assets/img/${filename}`, { 
        responseType: 'blob',
        headers: {
          'Accept': 'image/*'
        }
      }).toPromise();
      
      if (response) {
        const blob = new Blob([response], { type: 'image/jpeg' });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = filename;
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
        document.body.removeChild(a);
      }
    } catch (error) {
      console.error('Error downloading image:', error);
    }
  }

  goBack(): void {
    this.router.navigate(['/dir']);
  }
}





















