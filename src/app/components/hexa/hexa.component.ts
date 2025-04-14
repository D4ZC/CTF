import { Component, OnInit, AfterViewInit, ElementRef, ViewChild } from "@angular/core"
import { CommonModule } from "@angular/common"
import { Router } from "@angular/router"
import { HttpClient } from "@angular/common/http"

/**
 * Componente HexaComponent: Implementa una galería de imágenes con efectos visuales futuristas
 * Incluye efectos de matriz binaria, partículas espaciales, líneas de escaneo y efectos de glitch
 */
@Component({
  selector: "app-hexa",
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="nebula"></div>
    <div class="galactic-grid"></div>
    <div class="space-particles"></div>
    <div class="scan-line"></div>
    <canvas #binaryCanvas class="binary-canvas"></canvas>
    <button class="back-btn" (click)="goBack()">
      <span class="back-text">BACK</span>
      <div class="back-glow"></div>
    </button>
    <header>
      <h1>H3X4V3RS0</h1>
    </header>
    <div class="x-container">
      <div class="image-container" *ngFor="let img of images; let i = index" [style.grid-area]="getGridArea(i)">
        <img [src]="getImagePath(img)" 
             [alt]="getName(img)"
             class="image"
             (click)="downloadImage(getName(img))"
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

    .binary-canvas {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      z-index: 1;
      pointer-events: none;
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

    .scan-line {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      z-index: 2;
      overflow: hidden;
      pointer-events: none;
    }

    .scan-effect {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 2px;
      background: rgba(200, 200, 220, 0.3);
      box-shadow: 0 0 10px rgba(200, 200, 220, 0.7);
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
      margin-top: 50px;
      margin-bottom: 50px;
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

    .back-btn {
      position: fixed;
      top: 20px;
      left: 20px;
      padding: 10px 20px;
      background: rgba(0, 0, 0, 0.7);
      border: 1px solid rgba(255, 255, 255, 0.1);
      color: #fff;
      font-family: 'Share Tech Mono', monospace;
      font-size: 16px;
      cursor: pointer;
      z-index: 1000;
      overflow: hidden;
      transition: all 0.3s ease;
      text-shadow: 0 0 5px rgba(255, 255, 255, 0.5);
      box-shadow: 0 0 10px rgba(255, 255, 255, 0.1);
      border-radius: 4px;
    }

    .back-text {
      position: relative;
      z-index: 2;
    }

    .back-glow {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: radial-gradient(
        circle at center,
        rgba(255, 255, 255, 0.1) 0%,
        rgba(255, 255, 255, 0) 70%
      );
      opacity: 0;
      transition: opacity 0.3s ease;
    }

    .back-btn:hover {
      background: rgba(0, 0, 0, 0.8);
      border-color: rgba(255, 255, 255, 0.3);
      transform: translateY(-1px);
      box-shadow: 0 0 15px rgba(255, 255, 255, 0.2);
    }

    .back-btn:hover .back-glow {
      opacity: 1;
    }

    .back-btn:active {
      transform: translateY(1px);
    }

    @keyframes glowPulse {
      0% { box-shadow: 0 0 5px rgba(255, 255, 255, 0.1); }
      50% { box-shadow: 0 0 15px rgba(255, 255, 255, 0.2); }
      100% { box-shadow: 0 0 5px rgba(255, 255, 255, 0.1); }
    }

    .back-btn {
      animation: glowPulse 2s infinite;
    }
  `]
})
export class HexaComponent implements OnInit, AfterViewInit {
  // Referencia al elemento canvas para el efecto de matriz binaria
  @ViewChild('binaryCanvas') binaryCanvas!: ElementRef<HTMLCanvasElement>;
  // Contexto de renderizado del canvas
  private ctx!: CanvasRenderingContext2D;
  // Array para almacenar la posición de cada columna de caracteres binarios
  private columns: number[] = [];
  // Tamaño de fuente para los caracteres binarios
  private fontSize = 14;
  // ID del frame de animación para controlar la animación
  private animationFrameId: number | null = null;
  // Bandera para controlar si el canvas ya ha sido inicializado
  private isCanvasInitialized = false;

  // Lista de nombres de imágenes a mostrar en la galería
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

  /**
   * Constructor del componente
   * @param router - Servicio para la navegación entre rutas
   * @param http - Servicio para realizar peticiones HTTP
   */
  constructor(
    private router: Router,
    private http: HttpClient
  ) {}

  /**
   * Método del ciclo de vida OnInit
   * Inicializa los efectos visuales cuando el componente se crea
   */
  ngOnInit() {
    this.createScanEffect();
    this.createSpaceParticles();
  }

  /**
   * Método del ciclo de vida AfterViewInit
   * Inicializa el canvas de matriz binaria después de que la vista se haya renderizado
   */
  ngAfterViewInit() {
    this.createScanEffect();
    if (!this.isCanvasInitialized) {
      setTimeout(() => {
        this.initBinaryCanvas();
        this.isCanvasInitialized = true;
      }, 100);
    }
  }

  /**
   * Inicializa el canvas para el efecto de matriz binaria
   * Configura el tamaño del canvas, crea las columnas de caracteres y comienza la animación
   */
  private initBinaryCanvas() {
    if (!this.binaryCanvas || this.isCanvasInitialized) return;
    
    const canvas = this.binaryCanvas.nativeElement;
    this.ctx = canvas.getContext('2d')!;

    const setupCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      canvas.style.width = '100%';
      canvas.style.height = '100%';
      this.columns = Array(Math.floor(canvas.width / this.fontSize)).fill(0);
    };

    setupCanvas();

    const debouncedResize = this.debounce(() => {
      setupCanvas();
    }, 250);

    window.addEventListener('resize', debouncedResize);

    const animate = () => {
      if (!this.ctx || !canvas) return;

      this.ctx.fillStyle = 'rgba(0, 0, 0, 0.1)';
      this.ctx.fillRect(0, 0, canvas.width, canvas.height);

      this.ctx.font = `${this.fontSize}px monospace`;

      for (let i = 0; i < this.columns.length; i++) {
        const text = Math.random() < 0.5 ? '0' : '1';
        const x = i * this.fontSize;
        const y = this.columns[i] * this.fontSize;
        const opacity = Math.random() * 0.3 + 0.2;
        this.ctx.fillStyle = `rgba(255, 255, 255, ${opacity})`;
        this.ctx.fillText(text, x, y);

        if (y > canvas.height && Math.random() > 0.98) {
          this.columns[i] = 0;
        }
        this.columns[i]++;
      }

      if (this.animationFrameId) {
        cancelAnimationFrame(this.animationFrameId);
      }
      this.animationFrameId = requestAnimationFrame(animate);
    };

    animate();
  }

  /**
   * Implementa la función debounce para limitar la frecuencia de ejecución de una función
   * @param func - Función a ejecutar
   * @param wait - Tiempo de espera en milisegundos
   * @returns Función debounceada
   */
  private debounce(func: Function, wait: number) {
    let timeout: NodeJS.Timeout;
    return function executedFunction(...args: any[]) {
      const later = () => {
        clearTimeout(timeout);
        func(...args);
      };
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  }

  /**
   * Método del ciclo de vida OnDestroy
   * Limpia los recursos cuando el componente se destruye
   */
  ngOnDestroy() {
    if (this.animationFrameId) {
      cancelAnimationFrame(this.animationFrameId);
      this.animationFrameId = null;
    }
    this.isCanvasInitialized = false;
  }

  /**
   * Determina la posición de una imagen en la cuadrícula
   * @param index - Índice de la imagen
   * @returns Cadena con la posición en la cuadrícula (formato: fila-inicio/columna-inicio/fila-fin/columna-fin)
   */
  getGridArea(index: number): string {
    const gridAreas = [
      '1/1/2/2', '2/2/3/3', '3/3/4/4', '4/4/5/5',
      '5/5/6/6', '6/6/7/7', '7/7/8/8', '8/8/9/9',
      '1/8/2/9', '2/7/3/8', '3/6/4/7', '4/5/5/6',
      '5/4/6/5', '6/3/7/4', '7/2/8/3', '8/1/9/2'
    ];
    return gridAreas[index];
  }

  /**
   * Obtiene el nombre de la imagen a partir de su ruta
   * @param path - Ruta de la imagen
   * @returns Nombre de la imagen
   */
  getName(path: string): string {
    return path;
  }

  /**
   * Construye la ruta completa para una imagen
   * @param filename - Nombre del archivo de imagen
   * @returns Ruta completa para la imagen
   */
  getImagePath(filename: string): string {
    return `/assets/img/${filename}`;
  }

  /**
   * Maneja errores al cargar imágenes
   * @param event - Evento de error
   */
  handleImageError(event: Event): void {
    const img = event.target as HTMLImageElement;
    console.error(`Error loading image: ${img.src}`);
    img.src = 'assets/img/error-placeholder.jpg'; // Opcional: imagen de respaldo
  }

  /**
   * Crea el efecto de línea de escaneo
   * Añade un elemento div con la clase 'scan-effect' dentro del contenedor 'scan-line'
   */
  private createScanEffect() {
    const scanLine = document.querySelector('.scan-line');
    if (!scanLine) return;
    
    const scanEffect = document.createElement('div');
    scanEffect.className = 'scan-effect';
    scanLine.appendChild(scanEffect);
  }

  /**
   * Crea partículas espaciales para el efecto de fondo
   * Genera un número determinado de partículas con posiciones y tamaños aleatorios
   */
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

  /**
   * Descarga una imagen al hacer clic en ella
   * @param filename - Nombre del archivo a descargar
   */
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

  /**
   * Navega de vuelta a la página anterior
   */
  goBack(): void {
    this.router.navigate(['/dir']);
  }
}