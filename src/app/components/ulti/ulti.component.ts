import { Component, OnInit, ElementRef, ViewChild, AfterViewInit } from "@angular/core"
import { CommonModule } from "@angular/common"
import { FormsModule } from "@angular/forms"
import { Router } from "@angular/router"

@Component({
  selector: "app-ulti",
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="ulti-container">
      <div class="hacker-image hacker-image-1"></div>
      <div class="hacker-image hacker-image-2"></div>
      <div class="hacker-image hacker-image-3"></div>
      <canvas #binaryCanvas class="binary-canvas"></canvas>
      <header>
        <button class="back-btn" (click)="goBack()">Volver</button>
        <h1>N0w-y0u-4R3_4_tRu3_H4cK3R!</h1>
      </header>
      <main>
        <div class="flag-input">
          <input 
            type="text" 
            [(ngModel)]="flagInput" 
            placeholder="ptechCTF{}" 
            class="form-control"
          />
          <button (click)="validateFlag()" class="btn-submit">Enviar</button>
          <div *ngIf="message" class="message" [ngClass]="{'success': isSuccess, 'error': !isSuccess}">
            {{ message }}
          </div>
        </div>
      </main>
    </div>
  `,
  styles: [
    `
    :host {
      font-family: 'Courier Prime', monospace;
      display: block;
      height: 100vh;
      width: 100vw;
      overflow: hidden;
    }

    .ulti-container {
      background-color: #000;
      height: 100%;
      display: flex;
      flex-direction: column;
      position: relative;
    }

    .hacker-image {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      z-index: 1;
      background: url('/assets/images/hacker.png') center/30% no-repeat;
      background-position: center 30%;
    }

    .hacker-image-1 {
      opacity: 0.25;
      transform: translate(-250px, 0);
    }

    .hacker-image-2 {
      opacity: 0.25;
      transform: translate(250px, 0);
    }

    .hacker-image-3 {
      opacity: 0.40;
      transform: translate(0, 0);
    }

    .binary-canvas {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      z-index: 2;
    }

    header {
      height: 15%;
      width: 100%;
      background-color: rgba(0, 0, 0, 0.75);
      display: flex;
      justify-content: center;
      align-items: center;
      position: relative;
      z-index: 2;
    }

    h1 {
      color: white;
      margin: 0;
    }

    .back-btn {
      position: absolute;
      left: 20px;
      background-color: transparent;
      border: 1px solid white;
      color: white;
      padding: 0.5rem 1rem;
      cursor: pointer;
      font-family: 'Courier Prime', monospace;
    }

    main {
      height: 85%;
      width: 100%;
      display: flex;
      justify-content: center;
      align-items: flex-end;
      padding: 2rem;
      padding-bottom: 1rem;
      box-sizing: border-box;
      position: relative;
      z-index: 2;
    }

    .flag-input {
      display: flex;
      flex-direction: column;
      gap: 0.8rem;
      width: 100%;
      max-width: 300px;
      background-color: rgba(0, 0, 0, 0.85);
      padding: 1rem;
      border-radius: 10px;
      border: 1px solid rgba(0, 255, 0, 0.3);
      margin-bottom: 1rem;
    }

    .form-control {
      width: 100%;
      padding: 0.6rem;
      background-color: rgba(0, 0, 0, 0.75);
      border: 1px solid #00FF00;
      color: #00FF00;
      box-sizing: border-box;
      font-size: 0.9rem;
    }

    .form-control::placeholder {
      color: rgba(0, 255, 0, 0.5);
      font-family: 'Courier Prime', monospace;
    }

    .btn-submit {
      padding: 0.6rem;
      background-color: rgba(0, 0, 0, 0.75);
      border: 1px solid #00FF00;
      color: #00FF00;
      cursor: pointer;
      font-family: 'Courier Prime', monospace;
      font-size: 0.9rem;
      transition: all 0.3s ease;
    }

    .btn-submit:hover {
      background-color: rgba(0, 255, 0, 0.1);
      box-shadow: 0 0 10px rgba(0, 255, 0, 0.3);
    }

    .message {
      text-align: center;
      padding: 1rem;
      font-size: 1.2rem;
    }

    .success {
      color: #00FF00;
    }

    .error {
      color: red;
    }
  `,
  ],
})
export class UltiComponent implements OnInit, AfterViewInit {
  @ViewChild('binaryCanvas') canvasRef!: ElementRef<HTMLCanvasElement>;
  private ctx!: CanvasRenderingContext2D;
  private columns: number[] = [];
  private fontSize = 10;
  private trails: {x: number, y: number, opacity: number}[][] = []; // Array para almacenar los trazos
  flagInput = ""
  message = ""
  isSuccess = false
  private readonly correctFlag: string = "ptechCTF{N0w-y0u-4R3_4_tRu3_H4cK3R!}"

  constructor(private router: Router) {}

  ngOnInit() {}

  ngAfterViewInit() {
    this.initializeCanvas();
  }

  private initializeCanvas() {
    const canvas = this.canvasRef.nativeElement;
    this.ctx = canvas.getContext('2d')!;
    
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      this.columns = Array(Math.floor(canvas.width / (this.fontSize * 0.8))).fill(0);
      this.trails = this.columns.map(() => []);
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    const drawBinary = () => {
      this.ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      this.ctx.font = `${this.fontSize}px monospace`;
      
      for (let i = 0; i < this.columns.length; i++) {
        const x = i * (this.fontSize * 0.8);
        const y = this.columns[i] * this.fontSize;
        
        // Dibujar el trazo
        if (this.trails[i].length > 0) {
          for (let j = 0; j < this.trails[i].length; j++) {
            const trail = this.trails[i][j];
            this.ctx.fillStyle = `rgba(0, 255, 0, ${trail.opacity})`;
            this.ctx.fillText(Math.random() < 0.5 ? '0' : '1', trail.x, trail.y);
            trail.opacity -= 0.05; // Velocidad de desvanecimiento
          }
          // Eliminar trazos completamente desvanecidos
          this.trails[i] = this.trails[i].filter(trail => trail.opacity > 0);
        }
        
        // Dibujar el número actual
        const text = Math.random() < 0.5 ? '0' : '1';
        const opacity = Math.random() * 0.7 + 0.3;
        this.ctx.fillStyle = `rgba(0, 255, 0, ${opacity})`;
        this.ctx.fillText(text, x, y);
        
        // Agregar posición actual al trazo
        this.trails[i].push({x, y, opacity: 1});
        
        if (y > canvas.height && Math.random() > 0.98) {
          this.columns[i] = 0;
          this.trails[i] = []; // Limpiar trazo al reiniciar la columna
        }
        this.columns[i] += 1.5;
      }
      
      requestAnimationFrame(drawBinary);
    };

    drawBinary();
  }

  goBack(): void {
    this.router.navigate(["/dir"])
  }

  validateFlag(): void {
    if (this.flagInput === this.correctFlag) {
      this.isSuccess = true
      this.message = "Felicidades conseguiste la Flag, ahora eres un flag-hunter"
    } else {
      this.isSuccess = false
      this.message = "Sigue intentandolo"
      setTimeout(() => {
          this.message = "";
        }, 5000);
    }
  }
}
