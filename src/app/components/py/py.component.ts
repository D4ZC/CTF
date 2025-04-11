import { Component, type OnInit } from "@angular/core"
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
      <header>
        <button class="back-btn" (click)="goBack()">Volver</button>
        <h1>Py7h0n_3xp10t471on</h1>
      </header>
      <main>
        <div class="cards-container">
          <div 
            *ngFor="let card of cards" 
            class="card" 
            [class.unlocked]="card.unlocked"
            (click)="downloadPyFile(card)"
          >
            <h3>{{ card.title }}</h3>
            <p>{{ card.description }}</p>
            <div class="card-status">
              {{ card.unlocked ? 'Desbloqueado' : 'Bloqueado' }}
            </div>
          </div>
        </div>
        
        <div class="code-input">
          <input 
            type="text" 
            [(ngModel)]="codeInput" 
            placeholder="Ingresa tu código" 
            class="form-control"
          />
          <button (click)="validateCode()" class="btn-submit">Enviar</button>
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
    }

    .py-container {
      background-color: #fff8dc; /* Light yellow/pastel */
      height: 100%;
      display: flex;
      flex-direction: column;
    }

    header {
      height: 15%;
      width: 100%;
      background-color: rgba(0, 0, 0, 0.75);
      display: flex;
      justify-content: center;
      align-items: center;
      position: relative;
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
      padding: 2rem;
      box-sizing: border-box;
      display: flex;
      flex-direction: column;
      gap: 2rem;
    }

    .cards-container {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
      gap: 1.5rem;
    }

    .card {
      background-color: rgba(0, 0, 0, 0.75);
      border: 1px solid white;
      padding: 1.5rem;
      color: white;
      cursor: not-allowed;
      opacity: 0.7;
      transition: all 0.3s ease;
    }

    .card.unlocked {
      cursor: pointer;
      opacity: 1;
    }

    .card.unlocked:hover {
      transform: translateY(-5px);
      box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
    }

    .card-status {
      margin-top: 1rem;
      font-size: 0.8rem;
      text-align: right;
    }

    .code-input {
      margin-top: auto;
      display: flex;
      flex-direction: column;
      gap: 1rem;
      max-width: 500px;
      margin-left: auto;
      margin-right: auto;
    }

    .form-control {
      width: 100%;
      padding: 0.75rem;
      background-color: rgba(0, 0, 0, 0.75);
      border: 1px solid white;
      color: white;
      box-sizing: border-box;
    }

    .form-control::placeholder {
      color: white;
      font-family: 'Courier Prime', monospace;
    }

    .btn-submit {
      padding: 0.75rem;
      background-color: rgba(0, 0, 0, 0.75);
      border: 1px solid white;
      color: white;
      cursor: pointer;
      font-family: 'Courier Prime', monospace;
    }

    .message {
      text-align: center;
      padding: 0.5rem;
    }

    .success {
      color: green;
    }

    .error {
      color: red;
    }
  `,
  ],
})
export class PyComponent implements OnInit {
  cards = [
    {
      id: 1,
      title: "Nivel 1",
      description: "Introducción a Python",
      unlocked: true,
      filename: "level1.py",
    },
    {
      id: 2,
      title: "Nivel 2",
      description: "Manipulación de strings",
      unlocked: false,
      filename: "level2.py",
    },
    {
      id: 3,
      title: "Nivel 3",
      description: "Estructuras de datos",
      unlocked: false,
      filename: "level3.py",
    },
    {
      id: 4,
      title: "Nivel 4",
      description: "Funciones y módulos",
      unlocked: false,
      filename: "level4.py",
    },
    {
      id: 5,
      title: "Nivel 5",
      description: "Manejo de archivos",
      unlocked: false,
      filename: "level5.py",
    },
    {
      id: 6,
      title: "Nivel 6",
      description: "Explotación avanzada",
      unlocked: false,
      filename: "level6.py",
    },
  ]

  codeInput = ""
  message = ""
  isSuccess = false

  constructor(
    private pyService: PyService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    // Update unlocked levels
    this.updateUnlockedLevels()
  }

  goBack(): void {
    this.router.navigate(["/dir"])
  }

  // Update which levels are unlocked
  updateUnlockedLevels(): void {
    for (let i = 1; i <= 6; i++) {
      if (this.pyService.isLevelUnlocked(i)) {
        this.cards[i - 1].unlocked = true
      }
    }
  }

  // Validate the entered code
  validateCode(): void {
    this.message = ""

    const unlockedLevel = this.pyService.validatePyCode(this.codeInput)

    if (unlockedLevel) {
      this.pyService.unlockLevel(unlockedLevel)
      this.cards[unlockedLevel - 1].unlocked = true
      this.isSuccess = true
      this.message = `¡Nivel ${unlockedLevel} desbloqueado!`
      this.codeInput = ""
    } else {
      this.isSuccess = false
      this.message = "Código inválido"
    }
  }

  // Download Python file
  downloadPyFile(card: any): void {
    if (card.unlocked) {
      const link = document.createElement('a');
      link.href = `assets/py/${card.id}.py`;
      link.download = `${card.id}.py`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  }
}
