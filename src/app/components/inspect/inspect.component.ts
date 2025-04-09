import { Component } from "@angular/core"
import { CommonModule } from "@angular/common"
import { Router } from "@angular/router"

@Component({
  selector: "app-inspect",
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="inspect-container">
      <header>
        <button class="back-btn" (click)="goBack()">Volver</button>
        <h1>InsP3ctor 3n la S0mbra</h1>
      </header>
      <main>
        <div class="content">
          <!-- Hidden comment with the next level code -->
          <!-- El código para el siguiente nivel es: pW7kX9L0zD -->
          <p>Bienvenido al nivel de inspección. Busca pistas ocultas en el código fuente de esta página.</p>
          <p>A veces, los desarrolladores dejan información sensible en comentarios HTML o en el código JavaScript.</p>
          <p>Usa las herramientas de desarrollador de tu navegador para inspeccionar esta página.</p>
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

    .inspect-container {
      background-color: #808080; /* Gray background */
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

    .content {
      background-color: rgba(0, 0, 0, 0.75);
      padding: 2rem;
      color: white;
      width: 80%;
      max-width: 800px;
    }
  `,
  ],
})
export class InspectComponent {
  constructor(private router: Router) {}

  goBack(): void {
    this.router.navigate(["/dir"])
  }
}
