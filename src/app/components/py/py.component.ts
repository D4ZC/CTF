import { Component, type OnInit, ViewChild, ElementRef, AfterViewInit, PLATFORM_ID, Inject, NgZone } from "@angular/core"
import { CommonModule, isPlatformBrowser } from "@angular/common"
import { FormsModule } from "@angular/forms"
import { Router } from "@angular/router"
import { PyService } from "../../services/py.service"
import { MatrixService } from "../../services/matrix.service"
import { PyFilesService } from "../../services/py-files.service"

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
  private isBrowser: boolean;

  cards = [
    {
      id: 1,
      unlocked: true,
      codeInput: '',
      message: '',
      isSuccess: false,
      longDescription: 'Level 1: Basic Python syntax and variables',
      content: `# Exercise 1
# Created by NanoIUTU

def main():
    # Your code here
    pass

if __name__ == "__main__":
    main()`
    },
    {
      id: 2,
      unlocked: false,
      codeInput: '',
      message: '',
      isSuccess: false,
      longDescription: 'Level 2: Control structures and loops',
      content: `# Exercise 2
# Created by NanoIUTU

def main():
    # Your code here
    pass

if __name__ == "__main__":
    main()`
    },
    {
      id: 3,
      unlocked: false,
      codeInput: '',
      message: '',
      isSuccess: false,
      longDescription: 'Level 3: Functions and modules',
      content: `# Exercise 3
# Created by NanoIUTU

def main():
    # Your code here
    pass

if __name__ == "__main__":
    main()`
    },
    {
      id: 4,
      unlocked: false,
      codeInput: '',
      message: '',
      isSuccess: false,
      longDescription: 'Level 4: Object-oriented programming',
      content: `# Exercise 4
# Created by NanoIUTU

def main():
    # Your code here
    pass

if __name__ == "__main__":
    main()`
    },
    {
      id: 5,
      unlocked: false,
      codeInput: '',
      message: '',
      isSuccess: false,
      longDescription: 'Level 5: File handling and exceptions',
      content: `# Exercise 5
# Created by NanoIUTU

def main():
    # Your code here
    pass

if __name__ == "__main__":
    main()`
    },
    {
      id: 6,
      unlocked: false,
      codeInput: '',
      message: '',
      isSuccess: false,
      longDescription: 'Level 6: Advanced Python concepts',
      content: `# Exercise 6
# Created by NanoIUTU

def main():
    # Your code here
    pass

if __name__ == "__main__":
    main()`
    }
  ];

  showInfoModal = false;
  selectedCard: any = null;
  headerText = "Py7h0n_3xp10t471on";
  showFinalModal = false;

  constructor(
    private pyService: PyService,
    private matrixService: MatrixService,
    private pyFilesService: PyFilesService,
    private router: Router,
    private ngZone: NgZone,
    @Inject(PLATFORM_ID) platformId: Object
  ) {
    this.isBrowser = isPlatformBrowser(platformId);
  }

  ngOnInit(): void {
    this.updateUnlockedLevels();
  }

  ngAfterViewInit(): void {
    if (this.isBrowser) {
      this.ngZone.runOutsideAngular(() => {
        this.matrixService.startAnimation(this.matrixCanvas.nativeElement);
      });
    }
  }

  ngOnDestroy(): void {
    if (this.isBrowser) {
      this.matrixService.stopAnimation();
    }
  }

  goBack(): void {
    this.router.navigate(['/']);
  }

  updateUnlockedLevels(): void {
    this.cards.forEach(card => {
      card.unlocked = this.pyService.isLevelUnlocked(card.id);
    });
  }

  validateCode(card: any): void {
    if (!card.codeInput) return;

    const nextLevel = this.pyService.validatePyCode(card.codeInput);
    if (nextLevel) {
      card.message = 'Success! Level unlocked!';
      card.isSuccess = true;
      this.pyService.unlockLevel(nextLevel);
      this.updateUnlockedLevels();
      
      if (nextLevel === 7) {
        this.showFinalModal = true;
      }
    } else {
      card.message = 'Invalid code. Try again!';
      card.isSuccess = false;
    }
  }

  isValidationEnabled(card: any): boolean {
    return card.unlocked;
  }

  downloadPyFile(card: any): void {
    if (!this.isBrowser) {
      card.message = 'Download not available in this environment.';
      card.isSuccess = false;
      return;
    }

    card.message = 'Downloading...';
    card.isSuccess = false;

    this.pyFilesService.getFileContent(card.id).subscribe({
      next: (content) => {
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
        } catch (error) {
          console.error('Error creating download:', error);
          card.message = 'Error creating download. Please try again.';
          card.isSuccess = false;
        }
      },
      error: (error) => {
        console.error('Error downloading file:', error);
        card.message = 'Error downloading file. Please try again.';
        card.isSuccess = false;
      }
    });
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
