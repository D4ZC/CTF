import { Component, type OnInit, ViewChild, ElementRef, AfterViewInit } from "@angular/core"
import { CommonModule } from "@angular/common"
import { FormsModule } from "@angular/forms"
import { Router } from "@angular/router"
import { PyService } from "../../services/py.service"

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

            <div class="validation-section" *ngIf="isValidationEnabled(card)">
              <input 
                type="text" 
                [placeholder]="card.unlocked ? 'Enter completion code' : 'Complete previous level first'"
                [(ngModel)]="card.codeInput"
                class="code-input"
                [disabled]="!isValidationEnabled(card)"
                (keyup.enter)="validateCode(card)"
              />
              <button 
                class="validate-btn"
                [disabled]="!isValidationEnabled(card)"
                (click)="validateCode(card)"
              >
                Validate
              </button>
            </div>

            <div *ngIf="card.message" class="message" [class.success]="card.isSuccess" [class.error]="!card.isSuccess">
              {{ card.message }}
            </div>
          </div>
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

    .validation-section {
      display: grid;
      grid-template-columns: 2fr 1fr;
      gap: 1rem;
      margin-top: 1rem;
      background-color: transparent;
    }

    .code-input {
      background-color: transparent;
      border: 1px solid #ffff00;
      color: #ffff00;
      padding: 8px 12px;
      font-family: 'Share Tech Mono', monospace;
      border-radius: 5px;
      width: 100%;
      box-sizing: border-box;
    }

    .code-input::placeholder {
      color: rgba(255, 255, 0, 0.5);
    }

    .validate-btn {
      background-color: transparent;
      border: 1px solid #00a2ff;
      color: #00a2ff;
      padding: 8px 16px;
      cursor: pointer;
      font-family: 'Share Tech Mono', monospace;
      transition: all 0.3s ease;
      border-radius: 5px;
      text-shadow: 0 0 5px #00a2ff;
    }

    .validate-btn:hover:not(:disabled) {
      background-color: #00a2ff;
      color: #000000;
      box-shadow: 0 0 20px #00a2ff,
                  0 0 40px #00a2ff,
                  0 0 60px #00a2ff;
      transform: scale(1.05);
      text-shadow: none;
    }

    .validate-btn:disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }

    .message {
      text-align: center;
      padding: 8px;
      margin-top: 1rem;
      border-radius: 5px;
      font-size: 0.9rem;
      background-color: rgba(0, 0, 0, 0.2);
      backdrop-filter: blur(5px);
    }

    .success {
      color: #ffff00;
      border: 1px solid #ffff00;
      background-color: rgba(255, 255, 0, 0.1);
    }

    .error {
      color: #ff0000;
      border: 1px solid #ff0000;
      background-color: rgba(255, 0, 0, 0.1);
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

    .code-input:disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }

    .validate-btn:disabled {
      opacity: 0.5;
      cursor: not-allowed;
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
export class PyComponent implements OnInit, AfterViewInit {
  @ViewChild('matrixCanvas') matrixCanvas!: ElementRef<HTMLCanvasElement>;
  private ctx!: CanvasRenderingContext2D;
  private columns: number[] = [];
  private fontSize = 14;
  private animationFrameId: number | null = null;

  cards = [
    {
      id: 1,
      title: "Exercise 1",
      description: "Introduction to Python",
      longDescription: "Run the runme.py script to get the flag. Download the script with your browser or with wget in the webshell.",
      unlocked: true,
      filename: "1.py",
      codeInput: "",
      message: "",
      isSuccess: false
    },
    {
      id: 2,
      title: "Exercise 2",
      description: "String Manipulation",
      longDescription: "Fix the syntax error in this Python script to print the flag.",
      unlocked: false,
      filename: "2.py",
      codeInput: "",
      message: "",
      isSuccess: false
    },
    {
      id: 3,
      title: "Exercise 3",
      description: "Data Structures",
      longDescription: "Fix the syntax error in this Python script to print the flag.",
      unlocked: false,
      filename: "3.py",
      codeInput: "",
      message: "",
      isSuccess: false
    },
    {
      id: 4,
      title: "Exercise 4",
      description: "Functions and Modules",
      longDescription: "Run the Python script and convert the given number from decimal to binary to get the flag. Note: There are multiple exercises in this one.",
      unlocked: false,
      filename: "4.py",
      codeInput: "",
      message: "",
      isSuccess: false
    },
    {
      id: 5,
      title: "Exercise 5",
      description: "File Handling",
      longDescription: "Run the Python script code.py in the same directory as respuestas.txt.\nClick the download button to get both required files:\n- code.py\n- respuestas.txt",
      unlocked: false,
      filename: "5.py",
      codeInput: "",
      message: "",
      isSuccess: false
    },
    {
      id: 6,
      title: "Exercise 6",
      description: "Advanced Exploitation",
      longDescription: "Can you get the flag?\nReverse engineer this Python program.",
      unlocked: false,
      filename: "6.py",
      codeInput: "",
      message: "",
      isSuccess: false
    }
  ]

  showInfoModal = false
  selectedCard: any = null
  headerText = "Py7h0n_3xp10t471on"
  completedCodes: string[] = []
  showFinalModal = false;

  constructor(
    private pyService: PyService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.updateUnlockedLevels()
  }

  ngAfterViewInit(): void {
    const canvas = this.matrixCanvas.nativeElement;
    this.ctx = canvas.getContext('2d')!;
    this.resizeCanvas();
    window.addEventListener('resize', () => this.resizeCanvas());
    this.startMatrixAnimation();

    // Add binary rain background
    const binaryCanvas = document.createElement('canvas');
    binaryCanvas.style.position = 'absolute';
    binaryCanvas.style.top = '0';
    binaryCanvas.style.left = '0';
    binaryCanvas.style.width = '100%';
    binaryCanvas.style.height = '100%';
    binaryCanvas.style.zIndex = '-1';
    
    const parentElement = this.matrixCanvas.nativeElement.parentElement;
    if (parentElement) {
      parentElement.appendChild(binaryCanvas);
    }

    const binaryCtx = binaryCanvas.getContext('2d')!;
    const binaryColumns: number[] = [];
    const binaryFontSize = 14;

    const resizeBinaryCanvas = () => {
      binaryCanvas.width = window.innerWidth;
      binaryCanvas.height = window.innerHeight;
      binaryColumns.length = Math.floor(binaryCanvas.width / binaryFontSize);
      binaryColumns.fill(0);
    };

    resizeBinaryCanvas();
    window.addEventListener('resize', resizeBinaryCanvas);

    const drawBinary = () => {
      binaryCtx.fillStyle = 'rgba(0, 0, 0, 0.1)';
      binaryCtx.fillRect(0, 0, binaryCanvas.width, binaryCanvas.height);

      binaryCtx.fillStyle = '#00FF00';
      binaryCtx.font = `${binaryFontSize}px monospace`;

      for (let i = 0; i < binaryColumns.length; i++) {
        const text = Math.random() < 0.5 ? '0' : '1';
        const x = i * binaryFontSize;
        const y = binaryColumns[i] * binaryFontSize;
        const opacity = Math.random() * 0.5 + 0.5;
        binaryCtx.fillStyle = `rgba(0, 255, 0, ${opacity})`;
        binaryCtx.fillText(text, x, y);

        if (y > binaryCanvas.height && Math.random() > 0.98) {
          binaryColumns[i] = 0;
        }
        binaryColumns[i]++;
      }

      requestAnimationFrame(drawBinary);
    };

    drawBinary();
  }

  private resizeCanvas(): void {
    const canvas = this.matrixCanvas.nativeElement;
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    this.columns = Array(Math.floor(canvas.width / this.fontSize)).fill(0);
  }

  private startMatrixAnimation(): void {
    const canvas = this.matrixCanvas.nativeElement;
    const drawBinary = () => {
      // Add a semi-transparent black layer to create fade effect
      this.ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
      this.ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Draw the binary numbers
      for (let i = 0; i < this.columns.length; i++) {
        const text = Math.random() < 0.5 ? '0' : '1';
        const x = i * this.fontSize;
        const y = this.columns[i] * this.fontSize;
        
        // Alternate between yellow and blue colors
        const isYellow = i % 2 === 0;
        const opacity = Math.random() * 0.7 + 0.3; // Increased opacity range
        this.ctx.fillStyle = isYellow 
          ? `rgba(255, 255, 0, ${opacity})`
          : `rgba(0, 162, 255, ${opacity})`;
        
        this.ctx.font = `${this.fontSize}px 'Share Tech Mono', monospace`;
        this.ctx.fillText(text, x, y);

        // Reset column or move it down
        if (y > canvas.height && Math.random() > 0.98) {
          this.columns[i] = 0;
        }
        this.columns[i]++;
      }

      // Continue animation
      this.animationFrameId = requestAnimationFrame(drawBinary);
    };

    drawBinary();
  }

  ngOnDestroy(): void {
    if (this.animationFrameId) {
      cancelAnimationFrame(this.animationFrameId);
    }
    window.removeEventListener('resize', () => this.resizeCanvas());
  }

  goBack(): void {
    this.router.navigate(["/dir"])
  }

  updateUnlockedLevels(): void {
    for (let i = 1; i <= 6; i++) {
      if (this.pyService.isLevelUnlocked(i)) {
        this.cards[i - 1].unlocked = true
      }
    }
  }

  validateCode(card: any): void {
    card.message = ""
    
    // Check if previous level is completed (except for level 1)
    if (card.id > 1 && !this.cards[card.id - 2].unlocked) {
      card.isSuccess = false
      card.message = "Invalid code"
      return
    }
    
    // Check if this level is already completed
    if (card.id < 6 && this.cards[card.id].unlocked) {
      card.isSuccess = false
      card.message = "Invalid code"
      return
    }

    if (!card.codeInput.trim()) {
      card.isSuccess = false
      card.message = "Invalid code"
      return
    }

    const unlockedLevel = this.pyService.validatePyCode(card.codeInput)

    if (unlockedLevel) {
      // Special case for the final code (level 7) - only works on the last card
      if (unlockedLevel === 7) {
        if (card.id !== 6) {
          card.isSuccess = false
          card.message = "Invalid code"
          return
        }
        this.headerText = "dZ4hW6cV9G"
        // Lock all exercises
        this.cards.forEach((c) => {
          c.unlocked = false
          c.codeInput = ""
          c.message = ""
        })
        // Keep the last exercise locked
        card.unlocked = false
        this.completedCodes = []
        // Show the final modal
        this.showFinalModal = true
      } else if (unlockedLevel === card.id + 1) {
        this.pyService.unlockLevel(unlockedLevel)
        this.cards[unlockedLevel - 1].unlocked = true
        card.isSuccess = true
        card.message = "Correct! Next exercise unlocked!"
        this.completedCodes.push(card.codeInput)
        // Clear the current card's input and message after 3 seconds
        setTimeout(() => {
          card.codeInput = ""
          card.message = ""
        }, 3000)
      } else {
        card.isSuccess = false
        card.message = "Invalid code"
      }
    } else {
      card.isSuccess = false
      card.message = "Invalid code"
    }
  }

  isValidationEnabled(card: any): boolean {
    // First level is always enabled until completed
    if (card.id === 1) {
      return !this.cards[1].unlocked;
    }
    
    // Last level is enabled when unlocked and not completed
    if (card.id === 6) {
      return card.unlocked && !this.completedCodes.includes(card.codeInput);
    }
    
    // For other levels, check if the card is unlocked and not completed
    return card.unlocked && !this.cards[card.id]?.unlocked;
  }

  downloadPyFile(card: any): void {
    if (card.unlocked) {
      // For exercise 5, download both files
      if (card.id === 5) {
        // Download 5.py
        const link1 = document.createElement("a")
        link1.href = `/py/${card.filename}`
        link1.download = card.filename
        document.body.appendChild(link1)
        link1.click()
        document.body.removeChild(link1)

        // Download respuestas.txt
        const link2 = document.createElement("a")
        link2.href = `/py/respuestas.txt`
        link2.download = "respuestas.txt"
        document.body.appendChild(link2)
        link2.click()
        document.body.removeChild(link2)
      } else {
        // For other exercises, download only the Python file
        const link = document.createElement("a")
        link.href = `/py/${card.filename}`
        link.download = card.filename
        document.body.appendChild(link)
        link.click()
        document.body.removeChild(link)
      }
    }
  }

  showInfo(card: any): void {
    this.selectedCard = card
    this.showInfoModal = true
  }

  closeInfo(): void {
    this.showInfoModal = false
    this.selectedCard = null
  }

  closeFinalModal(): void {
    this.showFinalModal = false;
  }
}
