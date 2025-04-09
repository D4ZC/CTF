import { Component, type OnInit } from "@angular/core"
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
      <header>
        <h1>Flag-Hunters</h1>
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
  `,
  styles: [
    `
    :host {
      font-family: 'Courier Prime', monospace;
      display: block;
      height: 100vh;
      width: 100vw;
    }

    .dir-container {
      background-color: #0a2351; /* Navy blue background */
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
    }

    h1 {
      color: white;
      margin: 0;
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

    .levels-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
      gap: 1.5rem;
    }

    .level-card {
      background-color: rgba(0, 0, 0, 0.75);
      border: 1px solid white;
      padding: 1.5rem;
      color: white;
    }

    .level-content {
      margin-top: 1rem;
    }

    a {
      color: white;
      text-decoration: none;
    }

    a:hover {
      text-decoration: underline;
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

    .error-message {
      color: red;
      text-align: center;
    }

    .success-message {
      color: green;
      text-align: center;
    }
  `,
  ],
})
export class DirComponent implements OnInit {
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
