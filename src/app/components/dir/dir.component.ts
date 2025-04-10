import { Component, type OnInit, AfterViewInit, ElementRef, ViewChild } from "@angular/core"
import { CommonModule } from "@angular/common"
import { FormsModule } from "@angular/forms"
import { Router, RouterModule } from "@angular/router"
import { AuthService } from "../../services/auth.service"

@Component({
  selector: "app-dir",
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  template: `
    <div class="dir-container">
      <canvas #binaryCanvas class="binary-background"></canvas>
      <div class="content-wrapper">
        <header>
          <h1>Fl4G-HunTEr5</h1>
        </header>
        <main>
          <div class="levels-grid">
            <div class="level-card" *ngFor="let level of levels">
              <h2>Nivel {{ level.id }}</h2>
              <div class="level-content">
                <div *ngIf="level.unlocked">
                  <a [routerLink]="level.route">Ir a {{ level.name }}</a>
                </div>
                <div *ngIf="!level.unlocked">
                  <p>Nivel bloqueado</p>
                </div>
              </div>
            </div>
          </div>
          
          <div class="code-input">
            <input 
              type="text" 
              [(ngModel)]="codeInput" 
              placeholder="Ingresa el código de 10 dígitos" 
              class="form-control"
            />
            <button (click)="validateCode()" class="btn-submit">Enviar</button>
            <div *ngIf="errorMessage" class="error-message">{{ errorMessage }}</div>
            <div *ngIf="successMessage" class="success-message">{{ successMessage }}</div>
          </div>
        </main>
      </div>
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

    .dir-container {
      position: relative;
      height: 100%;
      width: 100%;
      background-color: black;
    }

    .binary-background {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      z-index: 1;
    }

    .content-wrapper {
      position: relative;
      z-index: 2;
      height: 100%;
      width: 100%;
      display: flex;
      flex-direction: column;
    }

    header {
      height: 15%;
      width: 100%;
      background-color: rgba(0, 0, 0, 0.6);
      display: flex;
      justify-content: center;
      align-items: center;
      backdrop-filter: blur(5px);
    }

    h1 {
      font-family: 'Courier Prime', monospace;
      color: white;
      margin: 0;
      font-size: clamp(1.5rem, 4vw, 2.5rem);
    }

    main {
      flex: 1;
      width: 100%;
      height: calc(85vh - 4rem);
      padding: 2rem;
      box-sizing: border-box;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      gap: 1.5rem;
      overflow: hidden;
    }

    .levels-grid {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      grid-template-rows: repeat(2, 1fr);
      gap: 2rem;
      width: 95%;
      max-width: 1000px;
      margin: 0 auto;
      height: 60%;
      padding: 1rem;
    }

    .level-card {
      background-color: rgba(0, 0, 0, 0.85);
      border: 1px solid rgba(255, 255, 255, 0.3);
      padding: 0.75rem;
      color: white;
      height: 100%;
      max-height: 150px;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      transition: all 0.3s ease;
      backdrop-filter: blur(5px);
      box-shadow: 0 0 15px rgba(255, 255, 255, 0.1);
      margin: 0.5rem;
      font-family: 'Courier Prime', monospace;
    }

    .level-card:hover {
      transform: scale(1.02);
      border-color: rgba(255, 255, 255, 0.6);
      box-shadow: 0 0 20px rgba(255, 255, 255, 0.2);
    }

    .level-card h2 {
      font-size: clamp(0.9rem, 1.8vw, 1.3rem);
      margin: 0 0 0.5rem 0;
      text-align: center;
      color: white;
      font-family: 'Courier Prime', monospace;
    }

    .level-content {
      text-align: center;
      width: 100%;
      font-size: clamp(0.7rem, 1.3vw, 0.9rem);
      font-family: 'Courier Prime', monospace;
    }

    .level-content p {
      font-family: 'Courier Prime', monospace;
      margin: 0;
    }

    a {
      color: white;
      text-decoration: none;
      transition: color 0.3s ease;
      font-family: 'Courier Prime', monospace;
    }

    a:hover {
      color: #fff;
      text-shadow: 0 0 5px rgba(255, 255, 255, 0.5);
    }

    .code-input {
      width: 100%;
      max-width: 350px;
      margin: 0 auto;
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
      background-color: rgba(0, 0, 0, 0.85);
      padding: 0.75rem;
      backdrop-filter: blur(5px);
      box-shadow: 0 0 15px rgba(255, 255, 255, 0.1);
      border: 1px solid rgba(255, 255, 255, 0.3);
      font-family: 'Courier Prime', monospace;
    }

    .form-control {
      width: 100%;
      padding: 0.5rem;
      background-color: rgba(0, 0, 0, 0.75);
      border: 1px solid rgba(255, 255, 255, 0.3);
      color: white;
      box-sizing: border-box;
      font-family: 'Courier Prime', monospace;
      font-size: 0.9rem;
    }

    .form-control::placeholder {
      color: rgba(255, 255, 255, 0.5);
      font-family: 'Courier Prime', monospace;
    }

    .btn-submit {
      padding: 0.4rem;
      width: 120px;
      margin: 0 auto;
      background-color: rgba(0, 0, 0, 0.75);
      border: 2px solid #ffffff;
      color: white;
      cursor: pointer;
      font-family: 'Courier Prime', monospace;
      font-size: 0.85rem;
      transition: all 0.3s ease;
      border-radius: 4px;
    }

    .btn-submit:hover {
      background-color: rgba(255, 255, 255, 0.1);
      border-color: #ffffff;
    }

    .error-message,
    .success-message {
      font-size: 0.85rem;
      margin: 0;
      font-family: 'Courier Prime', monospace;
    }

    .success-message {
      text-align: center;
      color: white;
      font-family: 'Courier Prime', monospace;
      font-weight: normal;
    }

    .error-message {
      color: #ff4444;
      text-align: center;
    }

    @media (max-width: 1024px) {
      main {
        padding: 1.5rem;
        gap: 1rem;
      }

      .levels-grid {
        gap: 1.5rem;
        width: 90%;
      }
    }

    @media (max-width: 768px) {
      main {
        padding: 1rem;
      }

      .levels-grid {
        gap: 1.25rem;
        grid-template-columns: repeat(2, 1fr);
        grid-template-rows: repeat(3, 1fr);
        height: 75%;
      }

      .level-card {
        max-height: 130px;
      }

      .code-input {
        padding: 0.75rem;
      }
    }

    @media (max-width: 480px) {
      .levels-grid {
        gap: 1rem;
        width: 95%;
        padding: 0.5rem;
      }

      .level-card {
        margin: 0.25rem;
        max-height: 120px;
      }

      .code-input {
        padding: 0.5rem;
      }
    }
    `,
  ],
})
export class DirComponent implements OnInit, AfterViewInit {
  @ViewChild('binaryCanvas') canvasRef!: ElementRef<HTMLCanvasElement>;
  private ctx!: CanvasRenderingContext2D;
  private columns: number[] = [];
  private fontSize = 14;

  levels = [
    { id: 1, name: "Inspect", route: "/inspect", unlocked: false },
    { id: 2, name: "Hexa", route: "/hexa", unlocked: false },
    { id: 3, name: "Deco", route: "/deco", unlocked: false },
    { id: 4, name: "Py", route: "/py", unlocked: false },
    { id: 5, name: "SSH", route: "/ssh", unlocked: false },
    { id: 6, name: "Ulti", route: "/ulti", unlocked: false },
  ]

  codeInput = ""
  errorMessage = ""
  successMessage = ""
  currentLevel = 0

  constructor(
    private authService: AuthService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    // Update unlocked levels
    this.updateUnlockedLevels()
  }

  ngAfterViewInit(): void {
    this.initBinaryBackground();
  }

  private initBinaryBackground(): void {
    const canvas = this.canvasRef.nativeElement;
    this.ctx = canvas.getContext('2d')!;

    // Set canvas size to match window size
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      this.columns = [];
      const columns = canvas.width / this.fontSize;
      for (let i = 0; i < columns; i++) {
        this.columns[i] = 1;
      }
    };

    // Initial setup
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Animation function
    const drawBinary = () => {
      // Add a semi-transparent black layer to create fade effect
      this.ctx.fillStyle = 'rgba(0, 0, 0, 0.1)';
      this.ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Set the color for the binary numbers
      this.ctx.fillStyle = '#00c3ff';
      this.ctx.font = `${this.fontSize}px monospace`;

      // Draw the binary numbers
      for (let i = 0; i < this.columns.length; i++) {
        const text = Math.random() < 0.5 ? '0' : '1';
        const x = i * this.fontSize;
        const y = this.columns[i] * this.fontSize;

        // Add opacity variation for glow effect
        const opacity = Math.random() * 0.5 + 0.5;
        this.ctx.fillStyle = `rgba(0, 195, 255, ${opacity})`;
        
        this.ctx.fillText(text, x, y);

        // Reset column or move it down
        if (y > canvas.height && Math.random() > 0.98) {
          this.columns[i] = 0;
        }
        this.columns[i]++;
      }

      // Continue animation
      requestAnimationFrame(drawBinary);
    };

    // Start the animation
    drawBinary();
  }

  // Update which levels are unlocked
  updateUnlockedLevels(): void {
    for (let i = 1; i <= 6; i++) {
      if (this.authService.isLevelUnlocked(i)) {
        this.levels[i - 1].unlocked = true
      }
    }
  }

  // Validate the entered code
  validateCode(): void {
    this.errorMessage = ""
    this.successMessage = ""

    // Find the first locked level
    for (let i = 0; i < this.levels.length; i++) {
      if (!this.levels[i].unlocked) {
        this.currentLevel = i + 1
        break
      }
    }

    if (this.currentLevel === 0) {
      this.successMessage = "Todos los niveles están desbloqueados"
      return
    }

    // Validate the code for the current level
    if (this.authService.validateLevelCode(this.currentLevel, this.codeInput)) {
      this.successMessage = `¡Nivel ${this.currentLevel} desbloqueado!`
      this.levels[this.currentLevel - 1].unlocked = true
      this.codeInput = ""
    } else {
      this.errorMessage = "Código Invalido"
    }
  }
}
