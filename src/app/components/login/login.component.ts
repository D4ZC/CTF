import { Component } from "@angular/core"
import { FormsModule } from "@angular/forms"
import { Router } from "@angular/router"
import { CommonModule } from "@angular/common"
import { AuthService } from "../../services/auth.service"

@Component({
  selector: "app-login",
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="login-container">
      <header>
        <h1>Inicio de sesion</h1>
      </header>
      <main>
        <section class="login-form">
          <div class="form-group">
            <input 
              type="text" 
              [(ngModel)]="username" 
              placeholder="Usuario" 
              class="form-control"
            />
          </div>
          <div class="form-group">
            <input 
              type="password" 
              [(ngModel)]="password" 
              placeholder="Contraseña" 
              class="form-control"
            />
          </div>
          <button (click)="onLogin()" class="btn-submit">Enviar</button>
          <div *ngIf="errorMessage" class="error-message">{{ errorMessage }}</div>
        </section>
      </main>
    </div>
  `,
  styles: [
    `
    /* Global styles */
    :host {
      font-family: 'Courier Prime', monospace;
      display: block;
      height: 100vh;
      width: 100vw;
    }

    .login-container {
      background-color: #1a472a; /* Dark green background */
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
      display: flex;
      justify-content: center;
      align-items: center;
    }

    .login-form {
      background-color: rgba(0, 0, 0, 0.75);
      padding: 2rem;
      border-radius: 10px;
      width: 300px;
      display: flex;
      flex-direction: column;
      gap: 1rem;
    }

    .form-control {
      width: 100%;
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
      padding: 0.75rem;
      background-color: transparent;
      border: 1px solid white;
      color: white;
      cursor: pointer;
      font-family: 'Courier Prime', monospace;
    }

    .error-message {
      color: red;
      margin-top: 1rem;
      text-align: center;
    }
  `,
  ],
})
export class LoginComponent {
  username = ""
  password = ""
  errorMessage = ""

  constructor(
    private authService: AuthService,
    private router: Router,
  ) {}

  // Handle login attempt
  onLogin(): void {
    if (this.authService.login(this.username, this.password)) {
      this.router.navigate(["/dir"])
    } else {
      this.errorMessage = "Credenciales incorrectas"
    }
  }
}
