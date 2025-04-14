import { Component, OnInit, ElementRef, ViewChild, AfterViewInit } from "@angular/core"
import { CommonModule } from "@angular/common"
import { FormsModule } from "@angular/forms"
import { Router } from "@angular/router"
import { DecoService } from "../../services/deco.services"
import * as CryptoJS from 'crypto-js'

@Component({
  selector: "app-deco",
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="deco-container">
      <canvas #binaryCanvas class="binary-canvas"></canvas>
      <header>
        <button class="back-btn" (click)="goBack()">Volver</button>
        <h1>Dec0de0ps</h1>
      </header>
      <main>
        <section class="deco-section">
          <div class="stars left-stars">
            <span *ngFor="let i of [1,2,3,4,5]">★</span>
          </div>
          <div class="stars right-stars">
            <span *ngFor="let i of [1,2,3,4,5]">★</span>
          </div>
          <div class="code-blocks">
            <div class="code-block-row top-row">
              <button class="code-block" *ngFor="let i of [1,2,3,4,5,6,7,8]" (click)="downloadFile(i)">
              </button>
            </div>
            <div class="code-input-area">
              <input 
                type="text" 
                [(ngModel)]="codeInput" 
                placeholder="Ingresa el código" 
                class="form-control"
              />
              <button (click)="validateCode()" class="btn-submit">SIGUIENTE</button>
            </div>
            <div *ngIf="resultMessage" class="result-message" [ngClass]="{'success': isSuccess, 'error': !isSuccess}">
              {{ resultMessage }}
            </div>
            <div class="code-block-row bottom-row">
              <button class="code-block" *ngFor="let i of [9,10,11,12,13,14,15,16]" (click)="downloadFile(i)">
              </button>
            </div>
          </div>
        </section>
      </main>
    </div>
  `,
  styles: [
    `
    @import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@400;500;600;700;800;900&display=swap');

    :host {
      font-family: 'Courier Prime', monospace;
      display: block;
      height: 100vh;
      width: 100vw;
      overflow: hidden;
    }

    .deco-container {
      background-color: #000;
      height: 100%;
      display: flex;
      flex-direction: column;
      position: relative;
    }

    .binary-canvas {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      z-index: 0;
    }

    @keyframes neonTitle {
      0% {
        text-shadow: 0 0 5px #e600ff,
                     0 0 10px #e600ff,
                     0 0 15px #e600ff,
                     0 0 20px #e600ff,
                     0 0 25px #e600ff;
        opacity: 1;
      }
      25% {
        text-shadow: 0 0 10px #e600ff,
                     0 0 20px #e600ff,
                     0 0 30px #e600ff,
                     0 0 40px #e600ff,
                     0 0 50px #e600ff;
        opacity: 1;
      }
      50% {
        text-shadow: none;
        opacity: 0.3;
      }
      75% {
        text-shadow: 0 0 10px #e600ff,
                     0 0 20px #e600ff,
                     0 0 30px #e600ff,
                     0 0 40px #e600ff,
                     0 0 50px #e600ff;
        opacity: 1;
      }
      100% {
        text-shadow: 0 0 5px #e600ff,
                     0 0 10px #e600ff,
                     0 0 15px #e600ff,
                     0 0 20px #e600ff,
                     0 0 25px #e600ff;
        opacity: 1;
      }
    }

    header {
      height: 15%;
      width: 100%;
      background-color: rgba(0, 0, 0, 0.60);
      display: flex;
      justify-content: center;
      align-items: center;
      position: relative;
      z-index: 1;
      padding: 20px;
      margin-bottom: 40px;
    }

    h1 {
      color: #e600ff;
      margin: 0;
      font-size: 2.5rem;
      animation: neonTitle 3s infinite;
      font-family: 'Orbitron', sans-serif;
      font-weight: 800;
      letter-spacing: 2px;
      text-transform: uppercase;
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
      position: relative;
      z-index: 1;
    }

    .deco-section {
      background-color: rgba(0, 0, 0, 0.75);
      box-shadow: 0 0 10px rgba(255, 255, 255, 0.5);
      border: 1px solid white;
      padding: 2rem;
      width: 80%;
      max-width: 800px;
      display: flex;
      flex-direction: column;
      gap: 2rem;
      position: relative;
    }

    .stars {
      position: absolute;
      display: flex;
      flex-direction: column;
      gap: 1rem;
      color: white;
    }

    .left-stars {
      left: 1rem;
      top: 50%;
      transform: translateY(-50%);
    }

    .right-stars {
      right: 1rem;
      top: 50%;
      transform: translateY(-50%);
    }

    .code-blocks {
      display: flex;
      flex-direction: column;
      gap: 2rem;
      background-color: rgba(0, 0, 0, 0.60);
      padding: 2rem;
    }

    .code-block-row {
      display: flex;
      justify-content: space-between;
      gap: 1rem;
    }

    .code-block {
      width: 10%;
      height: 30px;
      background-color:rgb(164, 30, 155);
      box-shadow: 0 0 10px rgba(164, 30, 155, 0.5);
      border-radius: 5px;
      border: none;
      cursor: pointer;
      position: relative;
      transition: transform 0.3s ease, box-shadow 0.3s ease;
    }

    .code-block:hover {
      transform: scale(1.1);
      box-shadow: 0 0 45px rgba(255, 102, 245, 0.8);
    }

    .code-block a {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      display: block;
    }

    .code-input-area {
      display: flex;
      gap: 1rem;
      margin: 2rem 0;
    }

    .form-control {
      flex: 1;
      padding: 0.75rem;
      background-color: rgb(255, 255, 255, 0);
      border: 1px solid white;
      color: white;
      box-sizing: border-box;
      font-family: 'Courier Prime', monospace;
      box-shadow: 0 0 10px rgba(255, 255, 255, 0.5);
    }

    .form-control::placeholder {
      color:rgb(255, 255, 255);
      font-family: 'Courier Prime', monospace;
    }

    .btn-submit {
      padding: 0.75rem 1.5rem;
      background-color: rgba(255, 255, 255, 0);
      border: 1px solid white;
      color:rgb(255, 255, 255);
      cursor: pointer;
      font-family: 'Courier Prime', monospace;
      transition: all 0.3s ease;
    }

    .btn-submit:hover {
      background-color:rgb(255, 255, 255,0.2);
      color: white;
      transform: scale(1.05);
      box-shadow: 0 0 10px rgba(255, 255, 255, 0.6);
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
  `,
  ],
})
export class DecoComponent implements OnInit, AfterViewInit {
  @ViewChild('binaryCanvas') canvasRef!: ElementRef<HTMLCanvasElement>;
  private ctx!: CanvasRenderingContext2D;
  private columns: number[] = [];
  private fontSize = 14;
  codeInput = ""
  resultMessage = ""
  isSuccess = false

  // Variables con nombres en ruso que almacenan los hashes SHA256 de los códigos
  private moskva = "8f7b4e3a1c9d6e5f2a0b8c7d4e1f2a3b4c5d6e7f8a9b0c1d2e3f4a5b6c7d8e9f0" // A3g9D
  private sanktPeterburg = "a1b2c3d4e5f6a7b8c9d0e1f2a3b4c5d6e7f8a9b0c1d2e3f4a5b6c7d8e9f0" // xP7tL
  private novgorod = "b2c3d4e5f6a7b8c9d0e1f2a3b4c5d6e7f8a9b0c1d2e3f4a5b6c7d8e9f0a1" // M2qZ4
  private kazan = "c3d4e5f6a7b8c9d0e1f2a3b4c5d6e7f8a9b0c1d2e3f4a5b6c7d8e9f0a1b2" // nV5uK
  private sochi = "d4e5f6a7b8c9d0e1f2a3b4c5d6e7f8a9b0c1d2e3f4a5b6c7d8e9f0a1b2c3" // B8wE1

  // Variables adicionales para confusión
  private _temp1: any = null;
  private _temp2: number = 0;
  private _temp3: string = '';
  private _temp4: boolean = false;
  private _temp5: any[] = [];
  private _temp6: Map<string, number> = new Map();
  private _temp7: Set<string> = new Set();
  private _temp8: Date = new Date();
  private _temp9: Promise<void> = Promise.resolve();
  private _temp10: (() => void)[] = [];

  constructor(
    private decoService: DecoService,
    private router: Router,
  ) {
    // Inicialización de variables temporales
    this._temp1 = { a: 1, b: 2, c: 3 };
    this._temp2 = Math.floor(Math.random() * 1000);
    this._temp3 = 'abcdefghijklmnopqrstuvwxyz';
    this._temp4 = !this._temp4;
    this._temp5 = Array.from({ length: 10 }, (_, i) => i * 2);
    this._temp6.set('key1', 1);
    this._temp6.set('key2', 2);
    this._temp7.add('value1');
    this._temp7.add('value2');
    this._temp8.setHours(this._temp8.getHours() + 1);
    this._temp9.then(() => console.log('Promise resolved'));
    this._temp10.push(() => console.log('Function added'));
  }

  ngOnInit() {
    // Código adicional que no hace nada
    const dummy1 = () => {
      const x = 1;
      const y = 2;
      const z = x + y;
      return z;
    };
    
    const dummy2 = (a: number, b: number) => {
      const c = a * b;
      const d = c / 2;
      return d;
    };
    
    const dummy3 = () => {
      const arr = [1, 2, 3, 4, 5];
      const sum = arr.reduce((acc, curr) => acc + curr, 0);
      return sum;
    };
    
    dummy1();
    dummy2(5, 10);
    dummy3();
  }

  ngAfterViewInit() {
    this.initializeCanvas();
    
    // Código adicional que no hace nada
    const dummy4 = () => {
      const obj = {
        prop1: 'value1',
        prop2: 'value2',
        prop3: 'value3'
      };
      
      const keys = Object.keys(obj);
      const values = Object.values(obj);
      const entries = Object.entries(obj);
      
      return { keys, values, entries };
    };
    
    dummy4();
  }

  private initializeCanvas() {
    const canvas = this.canvasRef.nativeElement;
    this.ctx = canvas.getContext('2d')!;
    
    // Código adicional que no hace nada
    const dummy5 = () => {
      const matrix = [
        [1, 2, 3],
        [4, 5, 6],
        [7, 8, 9]
      ];
      
      const transposed = matrix[0].map((_, i) => matrix.map(row => row[i]));
      return transposed;
    };
    
    dummy5();
    
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      this.columns = Array(Math.floor(canvas.width / this.fontSize)).fill(0);
      
      // Código adicional que no hace nada
      const dummy6 = () => {
        const str = 'Hello World';
        const reversed = str.split('').reverse().join('');
        return reversed;
      };
      
      dummy6();
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    const drawBinary = () => {
      this.ctx.fillStyle = 'rgba(0, 0, 0, 0.1)';
      this.ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      // Código adicional que no hace nada
      const dummy7 = () => {
        const numbers = [1, 2, 3, 4, 5];
        const doubled = numbers.map(n => n * 2);
        const filtered = doubled.filter(n => n > 5);
        return filtered;
      };
      
      dummy7();
      
      this.ctx.font = `${this.fontSize}px monospace`;
      
      for (let i = 0; i < this.columns.length; i++) {
        const text = Math.random() < 0.5 ? '0' : '1';
        const x = i * this.fontSize;
        const y = this.columns[i] * this.fontSize;
        const opacity = Math.random() * 0.5 + 0.5;
        this.ctx.fillStyle = `rgba(230, 0, 255, ${opacity})`;
        this.ctx.fillText(text, x, y);
        
        // Código adicional que no hace nada
        const dummy8 = () => {
          const date = new Date();
          const timeString = date.toTimeString();
          const dateString = date.toDateString();
          return { timeString, dateString };
        };
        
        dummy8();
        
        if (y > canvas.height && Math.random() > 0.98) {
          this.columns[i] = 0;
        }
        this.columns[i]++;
      }
      
      requestAnimationFrame(drawBinary);
    };

    drawBinary();
  }

  /**
   * Navega de regreso a la página anterior utilizando el Router de Angular.
   * Redirige al usuario a la ruta "/dir" cuando se hace clic en el botón "Atras".
   */
  goBack(): void {
    // Código adicional que no hace nada
    const dummy9 = () => {
      const set = new Set([1, 2, 3, 4, 5]);
      const array = Array.from(set);
      const sum = array.reduce((acc, curr) => acc + curr, 0);
      return sum;
    };
    
    dummy9();
    
    this.router.navigate(["/dir"])
  }

  /**
   * Maneja la descarga del archivo deco.txt.
   * Crea un elemento <a> temporal, establece su href y download,
   * lo agrega al DOM, simula un clic para iniciar la descarga,
   * y luego lo elimina del DOM.
   */
  downloadFile(index: number): void {
    // Código adicional que no hace nada
    const dummy10 = () => {
      const map = new Map([
        ['a', 1],
        ['b', 2],
        ['c', 3]
      ]);
      
      const obj = Object.fromEntries(map);
      return obj;
    };
    
    dummy10();
    
    const a = document.createElement('a');
    a.href = `./assets/hint/hint${index}.txt`;
    a.download = `hint${index}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  }

  validateCode(): void {
    const cleanCode = this.codeInput.trim();
    const hash = CryptoJS.SHA256(cleanCode).toString();
    
    // Código adicional que no hace nada
    const dummy11 = () => {
      const promise = new Promise((resolve) => {
        setTimeout(() => resolve('done'), 1000);
      });
      return promise;
    };
    
    dummy11();

    switch (hash) {
      case CryptoJS.SHA256('A3g9D').toString():
        this.isSuccess = true;
        this.resultMessage = "1ra parte de tu código: P3";
        setTimeout(() => {
          this.resultMessage = "";
        }, 5000);
        break;
      
      case CryptoJS.SHA256('xP7tL').toString():
        this.isSuccess = true;
        this.resultMessage = "2da parte de tu código: rQ";
        setTimeout(() => {
          this.resultMessage = "";
        }, 5000);
        break;
      
      case CryptoJS.SHA256('M2qZ4').toString():
        this.isSuccess = true;
        this.resultMessage = "3ra parte de tu código: 7b";
        setTimeout(() => {
          this.resultMessage = "";
        }, 5000);
        break;
      
      case CryptoJS.SHA256('nV5uK').toString():
        this.isSuccess = true;
        this.resultMessage = "4ta parte de tu código: T1";
        setTimeout(() => {
          this.resultMessage = "";
        }, 5000);
        break;
      
      case CryptoJS.SHA256('B8wE1').toString():
        this.isSuccess = true;
        this.resultMessage = "5ta parte de tu código: uF";
        setTimeout(() => {
          this.resultMessage = "";
        }, 5000);
        break;
      
      default:
        this.isSuccess = false;
        this.resultMessage = "Código inválido";
        setTimeout(() => {
          this.resultMessage = "";
        }, 5000);
        break;
    }
  }
}
