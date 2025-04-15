import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from "@angular/core"
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
      <canvas #binaryCanvas class="binary-rain"></canvas>
      <div class="content-wrapper">
        <header>
          <h1>In1C10-D3-SeS10n</h1>
          <!-- "Vivo en el navegador, pero no soy visible.
Escucho sin orejas y actúo sin pedir permiso.
Me llaman cuando pasa algo,
como un clic o un error imprevisto.
¿Quién soy?" -->
        </header>
        <main>
                  <!-- Este campo ama las citas... especialmente las simples (') -->

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
                  <!-- Por que validar inputs si podemos dejar que el usuario administre la base de datos? -->

            <button (click)="onLogin()" class="btn-submit">Ingresar</button>
            <div *ngIf="errorMessage" class="error-message">{{ errorMessage }}</div>
          </section>
          <!-- "Estoy presente en cada color,
pero nadie me ve.
Si me aumentas, todo arde;
si me bajas, todo se va."
¿Qué componente de un valor rgba soy? -->
        </main>
      </div>
    </div>
  `,
  styles: [`
    :host {
      font-family: 'Courier Prime', monospace;
      display: block;
      height: 100vh;
      width: 100vw;
    }
    /*Sigue buscando*/
    .login-container {
      position: relative;
      height: 100%;
      width: 100%;
      background-color: black;
      overflow: hidden;
    }

    .binary-rain {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      z-index: 1;
    }

    .content-wrapper {
      position: absolute;
      top: 0;
      left: 0;
      z-index: 2;
      height: 100%;
      width: 100%;
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
      
    h1 { /* Codigo nivel 1: 4F9dH2bK1Q*/
      color: white;
      margin: 0;
      font-size: 2rem;
      font-family: 'Courier New', monospace;
      letter-spacing: 2px;
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
      width: 300px;
      display: flex;
      flex-direction: column;
      gap: 1.5rem;
      border: 1px solid white;
    }

    .form-group {
      width: 100%;
    }

    .form-control {
      width: 100%;
      padding: 0.75rem;
      background-color: rgba(0, 0, 0, 0.9);
      border: none;
      color: white;
      border: 1px solid white;
      box-sizing: border-box;
      font-family: 'Courier Prime', monospace;
      font-size: 1rem;
    }
      /* Busca mas arriba */

    .form-control::placeholder {
      color: rgba(255, 255, 255, 0.7);
      font-family: 'Courier Prime', monospace;
    }

    .btn-submit {
      padding: 0.5rem 1.5rem;
      background-color: rgba(0, 0, 0, 0.9);
      border: none;
      color: white;
      border: 1px solid white;
      cursor: pointer;
      font-family: 'Courier Prime', monospace;
      font-size: 1rem;
      align-self: flex-end;
    }  

    .error-message {
      color: #ff0000;
      text-align: center;
    }
  `],
})
export class LoginComponent implements OnInit, AfterViewInit {
  @ViewChild('binaryCanvas') canvasRef!: ElementRef<HTMLCanvasElement>;
  
  private ctx: CanvasRenderingContext2D | null = null;
  private animationId: number = 0;
  private fontSize: number = 14;
  private columns: number[] = [];
  
  username = ""
  password = ""
  errorMessage = ""

  constructor(
    private authService: AuthService,
    private router: Router,
  ) {}

  ngOnInit() {}

  ngAfterViewInit() {
    this.initBinaryRain();
    window.addEventListener('resize', () => {
      this.resizeCanvas();
    });
  }

  ngOnDestroy() {
    if (this.animationId) {
      cancelAnimationFrame(this.animationId);
    }
    window.removeEventListener('resize', () => this.resizeCanvas());
  }

  private resizeCanvas() {
    const canvas = this.canvasRef.nativeElement;
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    
    // Recalcular columnas después del redimensionamiento
    const columns = Math.floor(canvas.width / this.fontSize);
    this.columns = Array(columns).fill(1);
  }

  private initBinaryRain() {
    const canvas = this.canvasRef.nativeElement;
    this.ctx = canvas.getContext('2d');
    
    if (!this.ctx) {
      console.error('Canvas context not available');
      return;
    }

    this.resizeCanvas();
    window.addEventListener('resize', () => this.resizeCanvas());

    const drawBinary = () => {
      if (!this.ctx || !canvas) return;

      // Capa semitransparente para efecto fade
      this.ctx.fillStyle = 'rgba(0, 0, 0, 0.1)';
      this.ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Configurar estilo para los números binarios
      this.ctx.font = `${this.fontSize}px monospace`;

      // Dibujar los números binarios
      for (let i = 0; i < this.columns.length; i++) {
        const text = Math.random() < 0.5 ? '0' : '1';
        const x = i * this.fontSize;
        const y = this.columns[i] * this.fontSize;
        
        // Color verde más similar al de la imagen
        const opacity = Math.random() * 0.5 + 0.5;
        this.ctx.fillStyle = `rgba(0, 255, 0, ${opacity})`;
        
        this.ctx.fillText(text, x, y);

        if (y > canvas.height && Math.random() > 0.98) {
          this.columns[i] = 0;
        } else {
          this.columns[i]++;
        }
      }

      this.animationId = requestAnimationFrame(drawBinary);
    };

    drawBinary();
  }

  onLogin(): void {
    if (this.authService.login(this.username, this.password)) {
      this.router.navigate(["/dir"])
    } else {
      this.errorMessage = "Credenciales incorrectas"
    }
  }
}
