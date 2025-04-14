import { Component, type OnInit, ViewChild, ElementRef, AfterViewInit, PLATFORM_ID, Inject } from "@angular/core"
import { CommonModule, isPlatformBrowser } from "@angular/common"
import { FormsModule } from "@angular/forms"
import { Router } from "@angular/router"
import { PyService } from "../../services/py.service"
import * as CryptoJS from 'crypto-js'

@Component({
  selector: "app-py",
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="py-container">
      <canvas #matrixCanvas class="matrix-canvas"></canvas>
      <header>
        <button class="back-btn" (click)="goBack()">← Volver</button>
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
              <h3>Nivel {{ card.id }}</h3>
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
                Descargar
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

        <div class="code-input-container">
          <div class="code-input">
            <input 
              type="text" 
              [(ngModel)]="codeInput" 
              placeholder="Ingresa el código de desbloqueo" 
              class="form-control"
              (keyup.enter)="validateCode()"
            />
            <button (click)="validateCode()" class="btn-submit">Validar</button>
          </div>
          <div *ngIf="errorMessage" class="error-message">{{ errorMessage }}</div>
          <div *ngIf="successMessage" class="success-message">{{ successMessage }}</div>
        </div>

        <div *ngIf="showInfoModal" class="modal">
          <div class="modal-content">
            <h2>Nivel {{ selectedCard?.id }}</h2>
            <p>{{ selectedCard?.longDescription }}</p>
            <button class="close-btn" (click)="closeInfo()">Cerrar</button>
          </div>
        </div>

        <div *ngIf="showFinalModal" class="modal">
          <div class="modal-content final-modal">
            <h2>¡Felicidades!</h2>
            <p class="creator">Creado por NanoIUTU</p>
            <button class="close-btn" (click)="closeFinalModal()">Cerrar</button>
          </div>
        </div>
      </main>
    </div>
  `,
  styles: [
    `
    @import url('https://fonts.googleapis.com/css2?family=Share+Tech+Mono&display=swap');
    @import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@400;500;600;700;800;900&display=swap');
    @import url('https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css');

    :host {
      font-family: 'Share Tech Mono', monospace;
      display: block;
      height: 100vh;
      width: 100vw;
      position: relative;
      background-color: #000;
    }

    .matrix-canvas {
      position: fixed;
      top: 0;
      left: 0;
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
      box-sizing: border-box;
      position: relative;
      z-index: 1;
    }

    header {
      height: %;
      width: 100%;
      background-color: rgba(0, 0, 0, 0.75);
      display: flex;
      justify-content: center;
      align-items: center;
      position: relative;
      margin-bottom: 20px;
      border-bottom: 1px solid rgba(255, 255, 0, 0.3);
    }

    h1 {
      color: #ffff00;
      margin: 0;
      font-size: 2.5rem;
      font-family: 'Orbitron', sans-serif;
      font-weight: 800;
      letter-spacing: 2px;
      text-shadow: 0 0 10px #ffff00;
    }

    .back-btn {
      position: absolute;
      left: 20px;
      background-color: transparent;
      border: 1px solid #ffff00;
      color: #ffff00;
      padding: 12px 24px;
      cursor: pointer;
      font-family: 'Share Tech Mono', monospace;
      transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
      text-shadow: 0 0 5px #ffff00;
      border-radius: 25px;
    }

    .back-btn:hover {
      background-color: rgba(255, 255, 0, 0.1);
      color: #ffff00;
      transform: translateX(-5px);
      box-shadow: 0 0 15px rgba(255, 255, 0, 0.3);
      text-shadow: 0 0 10px #ffff00;
    }

    main {
      padding: 20px;
      flex: 1;
      overflow-y: auto;
    }

    .exercises-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
      gap: 1.5rem;
      padding: 10px;
    }

    .exercise-card {
      background-color: rgba(0, 0, 0, 0.5);
      border: 1px solid rgba(255, 255, 0, 0.3);
      border-radius: 8px;
      padding: 15px;
      color: #ffff00;
      transition: all 0.3s ease;
      display: flex;
      flex-direction: column;
      gap: 0.8rem;
      backdrop-filter: blur(5px);
    }

    .exercise-card:hover {
      border-color: #ffff00;
      box-shadow: 0 0 20px rgba(255, 255, 0, 0.2);
      transform: translateY(-3px);
    }

    .exercise-card.locked {
      opacity: 0.7;
      filter: grayscale(0.5);
    }

    .card-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 0.5rem;
    }

    .card-header h3 {
      margin: 0;
      font-size: 1.3rem;
      text-shadow: 0 0 5px #ffff00;
    }

    .lock-icon {
      font-size: 1.2rem;
      text-shadow: 0 0 5px #ffff00;
    }

    .card-actions {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 0.8rem;
    }

    .action-btn {
      background-color: transparent;
      border: 1px solid #ffff00;
      color: #ffff00;
      padding: 8px;
      cursor: pointer;
      font-family: 'Share Tech Mono', monospace;
      transition: all 0.3s ease;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 0.5rem;
      border-radius: 4px;
      text-shadow: 0 0 5px #ffff00;
    }

    .action-btn:hover:not(:disabled) {
      background-color: rgba(255, 255, 0, 0.1);
      transform: scale(1.05);
    }

    .action-btn:disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }

    .code-input-container {
      width: 100%;
      max-width: 500px;
      margin: 30px auto;
      padding: 20px;
      background-color: rgba(0, 0, 0, 0.5);
      border-radius: 8px;
      border: 1px solid rgba(255, 255, 0, 0.3);
      position: relative;
      z-index: 2;
    }

    .code-input {
      display: flex;
      gap: 10px;
      margin-bottom: 10px;
      position: relative;
      z-index: 2;
    }

    .form-control {
      flex: 1;
      padding: 10px 15px;
      background-color: rgba(0, 0, 0, 0.3);
      border: 1px solid rgba(255, 255, 0, 0.3);
      color: #ffff00;
      border-radius: 4px;
      font-family: 'Share Tech Mono', monospace;
      position: relative;
      z-index: 2;
    }

    .form-control::placeholder {
      color: rgba(255, 255, 0, 0.5);
    }

    .btn-submit {
      padding: 10px 20px;
      background-color: transparent;
      border: 1px solid #ffff00;
      color: #ffff00;
      cursor: pointer;
      font-family: 'Share Tech Mono', monospace;
      transition: all 0.3s ease;
      border-radius: 4px;
      text-shadow: 0 0 5px #ffff00;
      position: relative;
      z-index: 2;
    }

    .btn-submit:hover {
      background-color: rgba(255, 255, 0, 0.1);
      transform: scale(1.05);
    }

    .error-message,
    .success-message {
      position: relative;
      z-index: 2;
    }

    .error-message {
      color: #ff4444;
      background-color: rgba(255, 0, 0, 0.1);
      border: 1px solid rgba(255, 0, 0, 0.3);
    }

    .success-message {
      color: #ffff00;
      background-color: rgba(255, 255, 0, 0.1);
      border: 1px solid rgba(255, 255, 0, 0.3);
    }

    .modal {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-color: rgba(0, 0, 0, 0.8);
      display: flex;
      justify-content: center;
      align-items: center;
      z-index: 1000;
    }

    .modal-content {
      background-color: rgba(0, 0, 0, 0.9);
      border: 1px solid #ffff00;
      border-radius: 8px;
      padding: 20px;
      max-width: 500px;
      width: 90%;
      color: #ffff00;
    }

    .close-btn {
      margin-top: 15px;
      padding: 8px 16px;
      background-color: transparent;
      border: 1px solid #ffff00;
      color: #ffff00;
      cursor: pointer;
      font-family: 'Share Tech Mono', monospace;
      transition: all 0.3s ease;
      border-radius: 4px;
      width: 100%;
    }

    .close-btn:hover {
      background-color: rgba(255, 255, 0, 0.1);
      transform: scale(1.05);
    }

    .modal-content.final-modal {
      text-align: center;
      max-width: 400px;
    }

    .final-modal h2 {
      color: #ffff00;
      font-size: 2rem;
      margin-bottom: 1rem;
    }

    .final-modal .creator {
      color: #ffff00;
      font-size: 1rem;
      margin-top: 1rem;
      font-style: italic;
      opacity: 0.8;
    }
    `
  ],
})
export class PyComponent implements OnInit, AfterViewInit {
  @ViewChild('matrixCanvas') matrixCanvas!: ElementRef<HTMLCanvasElement>;
  private animationFrameId: number | null = null;
  private matrixChars = "01";
  private matrixDrops: number[] = [];
  private matrixFontSize = 12;
  private matrixColumns = 0;
  private isBrowser: boolean;

  cards = [
    {
      id: 1,
      unlocked: true,
      message: '',
      isSuccess: false,
      longDescription: 'Nivel 1: Run the runme.py script to get the flag. Download the script with your browser or with wget in the webshell.'
    },
    {
      id: 2,
      unlocked: false,
      message: '',
      isSuccess: false,
      longDescription: 'Nivel 2: Fix the syntax error in this Python script to print the flag.'
    },
    {
      id: 3,
      unlocked: false,
      message: '',
      isSuccess: false,
      longDescription: 'Nivel 3: Fix the syntax error in this Python script to print the flag.'
    },
    {
      id: 4,
      unlocked: false,
      message: '',
      isSuccess: false,
      longDescription: 'Nivel 4: Run the Python script and convert the given number from decimal to binary to get the flag'
    },
    {
      id: 5,
      unlocked: false,
      message: '',
      isSuccess: false,
      longDescription: 'Nivel 5: Run the Python script code.py in the same directory as codebook.txt.'
    },
    {
      id: 6,
      unlocked: false,
      message: '',
      isSuccess: false,
      longDescription: 'Nivel 6: Can you get the flag?'
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
      ctx.fillStyle = '#ffff00';
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

    const result = this.pyService.validatePyCode(this.codeInput);
    if (result.isFinal) {
      this.headerText = "dZ4hW6cV9G";
      this.showFinalModal = true;
      this.successMessage = "¡Has encontrado la flag final!";
      this.codeInput = "";
    } else if (result.level) {
      this.successMessage = `¡Nivel ${result.level} desbloqueado!`;
      this.pyService.unlockLevel(result.level);
      this.updateUnlockedLevels();
      this.codeInput = "";
    } else {
      // Check if trying to use final flag before all levels are unlocked
      const hashedCode = CryptoJS.SHA256(this.codeInput).toString();
      if (hashedCode === this.pyService['levelCodes'].final) {
        this.errorMessage = "Debes desbloquear todos los niveles antes de usar la flag final";
      } else {
        this.errorMessage = "Código inválido o nivel no disponible en este momento";
      }
    }
  }

  downloadPyFile(card: any): void {
    if (card.unlocked) {
      // Download Python file
      const pyLink = document.createElement('a');
      pyLink.href = `assets/py/${card.id}.py`;
      pyLink.download = `${card.id}.py`;
      document.body.appendChild(pyLink);
      pyLink.click();
      document.body.removeChild(pyLink);

      // Download answers file
      const answersLink = document.createElement('a');
      answersLink.href = `assets/py/respuestas.txt`;
      answersLink.download = `respuestas.txt`;
      document.body.appendChild(answersLink);
      answersLink.click();
      document.body.removeChild(answersLink);
    }
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
