import { Component, PLATFORM_ID, Inject } from "@angular/core"
import { CommonModule, isPlatformBrowser } from "@angular/common"
import { FormsModule } from "@angular/forms"
import { Router } from "@angular/router"

@Component({
  selector: "app-ulti",
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="ulti-container">
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
    }

    .ulti-container {
      background-color: #1a472a;
      height: 100%;
      display: flex;
      flex-direction: column;
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
      color: #00FF00;
      margin: 0;
      font-size: 2.5rem;
      animation: neonTitle 3s infinite;
      font-family: 'Orbitron', sans-serif;
      font-weight: 800;
      letter-spacing: 2px;
    }

    @keyframes neonTitle {
      0% {
        text-shadow: 0 0 5px #00FF00,
                     0 0 10px #00FF00,
                     0 0 15px #00FF00,
                     0 0 20px #00FF00,
                     0 0 25px #00FF00;
        opacity: 1;
      }
      25% {
        text-shadow: 0 0 10px #00FF00,
                     0 0 20px #00FF00,
                     0 0 30px #00FF00,
                     0 0 40px #00FF00,
                     0 0 50px #00FF00;
        opacity: 1;
      }
      50% {
        text-shadow: none;
        opacity: 0.3;
      }
      75% {
        text-shadow: 0 0 10px #00FF00,
                     0 0 20px #00FF00,
                     0 0 30px #00FF00,
                     0 0 40px #00FF00,
                     0 0 50px #00FF00;
        opacity: 1;
      }
      100% {
        text-shadow: 0 0 5px #00FF00,
                     0 0 10px #00FF00,
                     0 0 15px #00FF00,
                     0 0 20px #00FF00,
                     0 0 25px #00FF00;
        opacity: 1;
      }
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
      align-items: center;
      padding: 2rem;
      box-sizing: border-box;
    }

    .flag-input {
      display: flex;
      flex-direction: column;
      gap: 1.5rem;
      width: 100%;
      max-width: 500px;
    }

    .form-control {
      width: 100%;
      padding: 1rem;
      background-color: rgba(0, 0, 0, 0.75);
      border: 1px solid white;
      color: white;
      box-sizing: border-box;
      font-size: 1.2rem;
    }

    .form-control::placeholder {
      color: white;
      font-family: 'Courier Prime', monospace;
    }

    .btn-submit {
      padding: 1rem;
      background-color: rgba(0, 0, 0, 0.75);
      border: 1px solid white;
      color: white;
      cursor: pointer;
      font-family: 'Courier Prime', monospace;
      font-size: 1.2rem;
    }

    .message {
      text-align: center;
      padding: 1rem;
      font-size: 1.2rem;
    }

    .success {
      color: white;
    }

    .error {
      color: red;
    }
  `,
],
})
export class UltiComponent {
  flagInput = ""
  message = ""
  isSuccess = false
  private readonly correctFlag: string = "ptechCTF{N0w-y0u-4R3_4_tRu3_H4cK3R!}"
  private isBrowser: boolean

  constructor(
    private router: Router,
    @Inject(PLATFORM_ID) platformId: Object
  ) {
    this.isBrowser = isPlatformBrowser(platformId)
  }

  goBack(): void {
    this.router.navigate(["/dir"])
  }

  validateFlag(): void {
    if (this.flagInput === this.correctFlag) {
      this.isSuccess = true
      this.message = "Felicidades conseguiste la Flag, ahora eres un flag-hunter"
      if (this.isBrowser) {
        try {
          localStorage.setItem('ultiFlag', 'true')
        } catch (error) {
          console.error('Error accessing localStorage:', error)
        }
      }
    } else {
      this.isSuccess = false
      this.message = "Sigue intentandolo"
    }
  }
}
