import { Component } from "@angular/core"
import { CommonModule } from "@angular/common"
import { FormsModule } from "@angular/forms"
import { Router } from "@angular/router"
import { DecoService } from "../../services/deco.services"

@Component({
  selector: "app-deco",
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="deco-container">
      <header>
        <button class="back-btn" (click)="goBack()">Volver</button>
        <h1>Dec0de0ps</h1>
      </header>
      <main>
        <section class="deco-section">
          <div class="code-blocks">
            <div class="code-block-row">
              <div class="code-block" *ngFor="let i of [1, 2, 3, 4, 5, 6, 7]"></div>
            </div>
            <div class="code-input-area">
              <input 
                type="text" 
                [(ngModel)]="codeInput" 
                placeholder="Ingresa el código" 
                class="form-control"
              />
              <button (click)="validateCode()" class="btn-submit">Enviar</button>
            </div>
            <div *ngIf="resultMessage" class="result-message" [ngClass]="{'success': isSuccess, 'error': !isSuccess}">
              {{ resultMessage }}
            </div>
            <div class="code-block-row">
              <div class="code-block" *ngFor="let i of [1, 2, 3, 4, 5, 6, 7]"></div>
            </div>
          </div>
          
          <div class="downloads">
            <a href="assets/deco/hint1.txt" download class="download-link">Pista 1</a>
            <a href="assets/deco/hint2.txt" download class="download-link">Pista 2</a>
            <a href="assets/deco/hint3.txt" download class="download-link">Pista 3</a>
            <a href="assets/deco/hint4.txt" download class="download-link">Pista 4</a>
            <a href="assets/deco/hint5.txt" download class="download-link">Pista 5</a>
          </div>
        </section>
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

    .deco-container {
      background-color: #ffcccb; /* Light pink */
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

    .deco-section {
      background-color: rgba(0, 0, 0, 0.75);
      padding: 2rem;
      width: 80%;
      max-width: 800px;
      border-radius: 5px;
      display: flex;
      flex-direction: column;
      gap: 2rem;
    }

    .code-blocks {
      display: flex;
      flex-direction: column;
      gap: 2rem;
    }

    .code-block-row {
      display: flex;
      justify-content: space-between;
      gap: 1rem;
    }

    .code-block {
      width: 50px;
      height: 30px;
      background-color: #ffcccb;
      border-radius: 5px;
    }

    .code-input-area {
      display: flex;
      gap: 1rem;
      margin: 2rem 0;
    }

    .form-control {
      flex: 1;
      padding: 0.75rem;
      background-color: transparent;
      border: 1px solid white;
      color: white;
      box-sizing: border-box;
    }

    .form-control::placeholder {
      color: white;
      font-family: 'Courier Prime', monospace;
    }

    .btn-submit {
      padding: 0.75rem 1.5rem;
      background-color: transparent;
      border: 1px solid white;
      color: white;
      cursor: pointer;
      font-family: 'Courier Prime', monospace;
    }

    .result-message {
      text-align: center;
      padding: 1rem;
      margin: 1rem 0;
    }

    .success {
      color: white;
    }

    .error {
      color: red;
    }

    .downloads {
      display: flex;
      flex-wrap: wrap;
      gap: 1rem;
      justify-content: center;
      margin-top: 2rem;
    }

    .download-link {
      color: white;
      text-decoration: none;
      padding: 0.5rem 1rem;
      border: 1px solid white;
      border-radius: 5px;
    }

    .download-link:hover {
      background-color: rgba(255, 255, 255, 0.1);
    }
  `,
  ],
})
export class DecoComponent {
  codeInput = ""
  resultMessage = ""
  isSuccess = false

  constructor(
    private decoService: DecoService,
    private router: Router,
  ) {}

  goBack(): void {
    this.router.navigate(["/dir"])
  }

  validateCode(): void {
    const result = this.decoService.validateDecoCode(this.codeInput)

    if (result) {
      this.isSuccess = true
      this.resultMessage = `La primera parte de tu código es "${result}"`
    } else {
      this.isSuccess = false
      this.resultMessage = "Código inválido"
    }
  }
}
