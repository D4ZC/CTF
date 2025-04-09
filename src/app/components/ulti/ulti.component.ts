import { Component } from "@angular/core"
import { CommonModule } from "@angular/common"
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
      background-color: #1a472a; /* Dark green */
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

  // The correct flag
  private readonly correctFlag: string = "ptechCTF{N0w-y0u-4R3_4_tRu3_H4cK3R!}"

  constructor(private router: Router) {}

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
    }
  }
}
