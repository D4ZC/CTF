import { Component, type OnInit, ViewChild, ElementRef, AfterViewInit, PLATFORM_ID, Inject, NgZone, OnDestroy } from "@angular/core"
import { CommonModule, isPlatformBrowser } from "@angular/common"
import { FormsModule } from "@angular/forms"
import { Router } from "@angular/router"
import { PyService } from "../../services/py.service"
import { HttpClient } from "@angular/common/http"
import { Observable, catchError, of } from "rxjs"

@Component({
  selector: "app-py",
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="py-container">
      <canvas #matrixCanvas class="matrix-canvas"></canvas>
      <header>
        <button class="back-btn" (click)="goBack()">← Back</button>
        <h1>{{ headerText }}</h1>
      </header>
      <main>
        <div class="exercises-grid">
          <div 
            *ngFor="let card of cards" 
            class="exercise-card"
            [class.locked]="!card.unlocked"
          >
            <div class="card-header">
              <h3>Exercise {{ card.id }}</h3>
              <div class="lock-icon">
                <i class="fas" [class.fa-lock]="!card.unlocked" [class.fa-lock-open]="card.unlocked"></i>
              </div>
            </div>
            
            <div class="card-actions">
              <button 
                class="action-btn download-btn" 
                [disabled]="!card.unlocked"
                (click)="downloadPyFile(card)"
              >
                <i class="fas fa-download"></i>
                Download
              </button>
              <button 
                class="action-btn info-btn"
                (click)="showInfo(card)"
              >
                <i class="fas fa-info-circle"></i>
                Info
              </button>
            </div>

            <div *ngIf="card.message" class="message" [class.success]="card.isSuccess" [class.error]="!card.isSuccess">
              {{ card.message }}
            </div>
          </div>
        </div>

        <div class="code-input">
          <input 
            type="text" 
            [(ngModel)]="codeInput" 
            placeholder="Ingresa el código de desbloqueo" 
            class="form-control"
            (keyup.enter)="validateCode()"
          />
          <button (click)="validateCode()" class="btn-submit">Validar</button>
          <div *ngIf="errorMessage" class="error-message">{{ errorMessage }}</div>
          <div *ngIf="successMessage" class="success-message">{{ successMessage }}</div>
        </div>

        <div *ngIf="showInfoModal" class="modal">
          <div class="modal-content">
            <h2>Exercise {{ selectedCard?.id }}</h2>
            <p>{{ selectedCard?.longDescription }}</p>
            <button class="close-btn" (click)="closeInfo()">Close</button>
          </div>
        </div>

        <div *ngIf="showFinalModal" class="modal">
          <div class="modal-content final-modal">
            <h2>Congratulations!</h2>
            <p class="creator">Created by NanoIUTU</p>
            <button class="close-btn" (click)="closeFinalModal()">Close</button>
          </div>
        </div>
      </main>
    </div>
  `,
  styles: [`
    @import url('https://fonts.googleapis.com/css2?family=Share+Tech+Mono&display=swap');
    @import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@400;500;600;700;800;900&display=swap');
    @import url('https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css');

    @keyframes neonTitle {
      0% {
        text-shadow: 0 0 5px #ffff00,
                     0 0 10px #ffff00,
                     0 0 15px #ffff00,
                     0 0 20px #ffff00,
                     0 0 25px #ffff00;
        opacity: 1;
      }
      25% {
        text-shadow: 0 0 10px #ffff00,
                     0 0 20px #ffff00,
                     0 0 30px #ffff00,
                     0 0 40px #ffff00,
                     0 0 50px #ffff00;
        opacity: 1;
      }
      50% {
        text-shadow: none;
        opacity: 0.3;
      }
      75% {
        text-shadow: 0 0 10px #ffff00,
                     0 0 20px #ffff00,
                     0 0 30px #ffff00,
                     0 0 40px #ffff00,
                     0 0 50px #ffff00;
        opacity: 1;
      }
      100% {
        text-shadow: 0 0 5px #ffff00,
                     0 0 10px #ffff00,
                     0 0 15px #ffff00,
                     0 0 20px #ffff00,
                     0 0 25px #ffff00;
        opacity: 1;
      }
    }

    @keyframes neonButton {
      0% {
        box-shadow: 0 0 5px #00a2ff,
                    0 0 10px #00a2ff,
                    0 0 15px #00a2ff;
        transform: scale(1);
      }
      50% {
        box-shadow: 0 0 10px #00a2ff,
                    0 0 20px #00a2ff,
                    0 0 30px #00a2ff;
        transform: scale(1.05);
      }
      100% {
        box-shadow: 0 0 5px #00a2ff,
                    0 0 10px #00a2ff,
                    0 0 15px #00a2ff;
        transform: scale(1);
      }
    }

    :host {
      font-family: 'Share Tech Mono', monospace;
      display: block;
      height: 100vh;
      width: 100vw;
      position: relative;
    }

    .matrix-canvas {
      position: fixed;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      width: 100%;
      height: 100%;
      z-index: 0;
      pointer-events: none;
    }

    .py-container {
      background-color: transparent;
      min-height: 100%;
      display: flex;
      flex-direction: column;
      color: #ffff00;
      padding: 20px;
      box-sizing: border-box;
      position: relative;
      z-index: 1;
    }

    header {
      padding: 20px;
      display: flex;
      justify-content: center;
      align-items: center;
      position: relative;
      margin-bottom: 40px;
      background-color: transparent;
    }

    h1 {
      color: #ffff00;
      margin: 0;
      font-size: 2.5rem;
      animation: neonTitle 3s infinite;
      font-family: 'Orbitron', sans-serif;
      font-weight: 800;
      letter-spacing: 2px;
    }

    .back-btn {
      position: absolute;
      left: 20px;
      background-color: transparent;
      border: 1px solid #00a2ff;
      color: #00a2ff;
      padding: 12px 24px;
      cursor: pointer;
      font-family: 'Share Tech Mono', monospace;
      transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
      text-shadow: 0 0 5px #00a2ff;
      border-radius: 25px;
      animation: subtleGlow 2s ease-in-out infinite;
    }

    .back-btn:hover {
      background-color: rgba(0, 162, 255, 0.1);
      color: #00a2ff;
      transform: translateX(-5px);
      box-shadow: 0 0 15px rgba(0, 162, 255, 0.3);
      text-shadow: 0 0 10px #00a2ff;
    }

    @keyframes subtleGlow {
      0%, 100% {
        box-shadow: 0 0 5px rgba(0, 162, 255, 0.2),
                    0 0 10px rgba(0, 162, 255, 0.1);
      }
      50% {
        box-shadow: 0 0 10px rgba(0, 162, 255, 0.3),
                    0 0 20px rgba(0, 162, 255, 0.2);
      }
    }

    .exercises-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
      gap: 2rem;
      padding: 20px;
      background-color: transparent;
      margin-bottom: 2rem;
    }

    .exercise-card {
      background-color: rgba(0, 0, 0, 0.2);
      border: 1px solid #ffff00;
      border-radius: 10px;
      padding: 20px;
      color: #ffff00;
      box-shadow: 0 0 20px rgba(255, 255, 0, 0.2);
      transition: all 0.3s ease;
      display: flex;
      flex-direction: column;
      gap: 1rem;
      position: relative;
      z-index: 2;
      backdrop-filter: blur(5px);
    }

    .exercise-card:hover {
      box-shadow: 0 0 30px rgba(255, 255, 0, 0.6),
                  0 0 50px rgba(255, 255, 0, 0.4),
                  0 0 70px rgba(255, 255, 0, 0.2);
      transform: translateY(-5px) scale(1.02);
      z-index: 2;
      background-color: rgba(0, 0, 0, 0.3);
    }

    .exercise-card.locked {
      opacity: 0.7;
      filter: grayscale(0.5);
    }

    .exercise-card.locked:hover {
      box-shadow: 0 0 20px rgba(255, 255, 0, 0.2);
      transform: none;
    }

    .card-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 1rem;
      background-color: transparent;
    }

    .card-header h3 {
      margin: 0;
      font-size: 1.5rem;
      text-shadow: 0 0 5px #ffff00;
    }

    .lock-icon {
      font-size: 1.2rem;
      text-shadow: 0 0 5px #ffff00;
    }

    .card-actions {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 1rem;
      background-color: transparent;
    }

    .action-btn {
      background-color: transparent;
      border: 1px solid #00a2ff;
      color: #00a2ff;
      padding: 8px;
      cursor: pointer;
      font-family: 'Share Tech Mono', monospace;
      transition: all 0.3s ease;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 0.5rem;
      border-radius: 5px;
      text-shadow: 0 0 5px #00a2ff;
    }

    .action-btn:hover:not(:disabled) {
      background-color: #00a2ff;
      color: #000000;
      box-shadow: 0 0 20px #00a2ff,
                  0 0 40px #00a2ff,
                  0 0 60px #00a2ff;
      transform: scale(1.05);
      text-shadow: none;
    }

    .action-btn:disabled {
      opacity: 0.5;
      cursor: not-allowed;
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
      font-family: 'Share Tech Mono', monospace;
    }

    .form-control {
      width: 100%;
      padding: 0.5rem;
      background-color: rgba(0, 0, 0, 0.75);
      border: 1px solid rgba(255, 255, 255, 0.3);
      color: white;
      box-sizing: border-box;
      font-family: 'Share Tech Mono', monospace;
      font-size: 0.9rem;
    }

    .form-control::placeholder {
      color: rgba(255, 255, 255, 0.5);
      font-family: 'Share Tech Mono', monospace;
    }

    .btn-submit {
      padding: 0.4rem;
      width: 120px;
      margin: 0 auto;
      background-color: rgba(0, 0, 0, 0.75);
      border: 2px solid #ffffff;
      color: white;
      cursor: pointer;
      font-family: 'Share Tech Mono', monospace;
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
      font-family: 'Share Tech Mono', monospace;
    }

    .success-message {
      text-align: center;
      color: white;
      font-family: 'Share Tech Mono', monospace;
      font-weight: normal;
    }

    .error-message {
      color: #ff4444;
      text-align: center;
    }

    .modal {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-color: rgba(0, 0, 0, 0.7);
      display: flex;
      justify-content: center;
      align-items: center;
      z-index: 1000;
      backdrop-filter: blur(5px);
    }

    .modal-content {
      background-color: rgba(0, 0, 0, 0.2);
      border: 1px solid #ffff00;
      border-radius: 10px;
      padding: 2rem;
      max-width: 500px;
      width: 90%;
      color: #ffff00;
      box-shadow: 0 0 30px rgba(255, 255, 0, 0.3);
      backdrop-filter: blur(5px);
      z-index: 1001;
    }

    .close-btn {
      margin-top: 1rem;
      padding: 8px 16px;
      background-color: transparent;
      border: 1px solid #00a2ff;
      color: #00a2ff;
      cursor: pointer;
      font-family: 'Share Tech Mono', monospace;
      transition: all 0.3s ease;
      border-radius: 5px;
      width: 100%;
      text-shadow: 0 0 5px #00a2ff;
    }

    .close-btn:hover {
      background-color: #00a2ff;
      color: #000000;
      box-shadow: 0 0 20px #00a2ff,
                  0 0 40px #00a2ff,
                  0 0 60px #00a2ff;
      transform: scale(1.05);
      text-shadow: none;
    }

    .modal-content.final-modal {
      text-align: center;
      max-width: 400px;
      background-color: rgba(0, 0, 0, 0.2);
    }

    .final-modal h2 {
      color: #ffff00;
      font-size: 2rem;
      margin-bottom: 1rem;
    }

    .final-modal .creator {
      color: #00a2ff;
      font-size: 1rem;
      margin-top: 1rem;
      font-style: italic;
    }
  `],
})
export class PyComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('matrixCanvas') matrixCanvas!: ElementRef<HTMLCanvasElement>;
  private isBrowser: boolean;
  private animationFrameId: number | null = null;
  private matrixChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ123456789@#$%^&*()*&^%";
  private matrixDrops: number[] = [];
  private matrixFontSize = 10;
  private matrixColumns = 0;

  cards = [
    {
      id: 1,
      unlocked: true,
      message: '',
      isSuccess: false,
      longDescription: 'Level 1: Basic Python syntax and variables'
    },
    {
      id: 2,
      unlocked: false,
      message: '',
      isSuccess: false,
      longDescription: 'Level 2: Control structures and loops'
    },
    {
      id: 3,
      unlocked: false,
      message: '',
      isSuccess: false,
      longDescription: 'Level 3: Functions and modules'
    },
    {
      id: 4,
      unlocked: false,
      message: '',
      isSuccess: false,
      longDescription: 'Level 4: Object-oriented programming'
    },
    {
      id: 5,
      unlocked: false,
      message: '',
      isSuccess: false,
      longDescription: 'Level 5: File handling and exceptions'
    },
    {
      id: 6,
      unlocked: false,
      message: '',
      isSuccess: false,
      longDescription: 'Level 6: Advanced Python concepts'
    }
  ];

  showInfoModal = false;
  selectedCard: any = null;
  headerText = "Py7h0n_3xp10t471on";
  showFinalModal = false;
  codeInput = "";
  errorMessage = "";
  successMessage = "";

  constructor(
    private pyService: PyService,
    private router: Router,
    @Inject(PLATFORM_ID) platformId: Object
  ) {
    this.isBrowser = isPlatformBrowser(platformId);
  }

  ngOnInit(): void {
    this.updateUnlockedLevels();
  }

  ngAfterViewInit(): void {
    if (this.isBrowser) {
      this.startMatrixAnimation();
    }
  }

  ngOnDestroy(): void {
    if (this.isBrowser && this.animationFrameId) {
      cancelAnimationFrame(this.animationFrameId);
    }
  }

  private startMatrixAnimation(): void {
    const canvas = this.matrixCanvas.nativeElement;
    const ctx = canvas.getContext('2d');

    if (!ctx) return;

    // Configurar el canvas
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    // Inicializar las gotas
    this.matrixColumns = Math.floor(canvas.width / this.matrixFontSize);
    this.matrixDrops = Array(this.matrixColumns).fill(1);

    // Función de animación
    const draw = () => {
      if (!ctx) return;

      // Fondo semi-transparente para efecto de rastro
      ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Color y fuente del texto
      ctx.fillStyle = '#0F0';
      ctx.font = this.matrixFontSize + 'px monospace';

      // Dibujar los caracteres
      for (let i = 0; i < this.matrixDrops.length; i++) {
        const text = this.matrixChars.charAt(Math.floor(Math.random() * this.matrixChars.length));
        ctx.fillText(text, i * this.matrixFontSize, this.matrixDrops[i] * this.matrixFontSize);

        // Reiniciar la gota cuando llega al fondo
        if (this.matrixDrops[i] * this.matrixFontSize > canvas.height && Math.random() > 0.975) {
          this.matrixDrops[i] = 0;
        }

        this.matrixDrops[i]++;
      }

      this.animationFrameId = requestAnimationFrame(draw);
    };

    // Iniciar la animación
    draw();

    // Manejar el redimensionamiento de la ventana
    window.addEventListener('resize', () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      this.matrixColumns = Math.floor(canvas.width / this.matrixFontSize);
      this.matrixDrops = Array(this.matrixColumns).fill(1);
    });
  }

  goBack(): void {
    this.router.navigate(['/dir']);
  }

  updateUnlockedLevels(): void {
    this.cards.forEach(card => {
      card.unlocked = this.pyService.isLevelUnlocked(card.id);
    });
  }

  validateCode(): void {
    this.errorMessage = "";
    this.successMessage = "";

    if (!this.codeInput) {
      this.errorMessage = "Por favor ingresa un código";
      return;
    }

    const nextLevel = this.pyService.validatePyCode(this.codeInput);
    if (nextLevel) {
      this.successMessage = `¡Nivel ${nextLevel} desbloqueado!`;
      this.updateUnlockedLevels();
      this.codeInput = "";
      
      if (nextLevel === 6) {
        this.showFinalModal = true;
      }
    } else {
      this.errorMessage = "Código inválido";
    }
  }

  downloadPyFile(card: any): void {
    if (!this.isBrowser) {
      card.message = 'Download not available in this environment.';
      card.isSuccess = false;
      return;
    }

    card.message = 'Downloading...';
    card.isSuccess = false;

    // Obtener el archivo desde assets/py
    this.getFileContent(card.id).subscribe({
      next: (content: string) => {
        if (!content) {
          card.message = 'Error: File content is empty.';
          card.isSuccess = false;
          return;
        }

        try {
          const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
          const url = URL.createObjectURL(blob);
          
          const a = document.createElement('a');
          a.href = url;
          a.download = `exercise_${card.id}.py`;
          a.style.display = 'none';
          
          document.body.appendChild(a);
          a.click();
          
          setTimeout(() => {
            document.body.removeChild(a);
            URL.revokeObjectURL(url);
            card.message = 'Download completed!';
            card.isSuccess = true;
          }, 100);
        } catch (error: any) {
          console.error('Error creating download:', error);
          card.message = 'Error creating download. Please try again.';
          card.isSuccess = false;
        }
      },
      error: (error: any) => {
        console.error('Error downloading file:', error);
        card.message = 'Error downloading file. Please try again.';
        card.isSuccess = false;
      }
    });
  }

  private getFileContent(id: number): Observable<string> {
    if (!this.isBrowser) {
      return of('');
    }
    
    // Usar la ruta relativa correcta para assets
    return this.getFileContent(id);
  }

  showInfo(card: any): void {
    this.selectedCard = card;
    this.showInfoModal = true;
  }

  closeInfo(): void {
    this.showInfoModal = false;
  }

  closeFinalModal(): void {
    this.showFinalModal = false;
  }
}