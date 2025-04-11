import { Component } from "@angular/core"
import { CommonModule } from "@angular/common"
import { Router } from "@angular/router"

@Component({
  selector: "app-ssh",
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="ssh-container">
      <div class="binary-background">
        <div class="binary-row" *ngFor="let row of [].constructor(20)"></div>
      </div>
      <header>
        <button class="back-btn" (click)="goBack()">Atras</button>
        <h1>Secure_Shell</h1>
      </header>
      <main>
        <div class="download-box" (click)="downloadFile()">
          <div class="energy-field"></div>
          <span>Are you sure you can do it?</span>
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
      overflow: hidden;
    }

    .ssh-container {
      position: relative;
      height: 100%;
      display: flex;
      flex-direction: column;
      background-color: #000000;
      overflow: hidden;
    }

    .binary-background {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background-color: #000000;
      overflow: hidden;
      z-index: 1;
      pointer-events: none;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      filter: contrast(1.2);
      padding: 0;
      margin: 0;
    }

    .binary-row {
      font-family: 'Courier New', monospace;
      font-size: 20px;
      white-space: nowrap;
      color: rgba(255, 0, 0, 0.5);
      line-height: 1.5;
      animation-duration: 30s;
      animation-timing-function: linear;
      animation-iteration-count: infinite;
      text-shadow: 0 0 10px rgba(255, 0, 0, 0.5);
      font-weight: bold;
      position: relative;
      width: 100%;
      height: 5%;
      display: flex;
      align-items: center;
      overflow: hidden;
    }

    .binary-row::before {
      content: '1 0 1 0 1 1 0 1 0 1 0 1 1 0 1 0 1 0 1 0 1 1 0 1 1 0 1 0 1 1 0 1 0 1 0 1 1 0 1 0 1 0 1 1 0 1 1 0 1 0 1 1 0 1 1 0 1 0 1 1 0 1 0 1 0 1 1 0 1 0 1 0 1 1 0 1 1 0 1 0 1 1 0 1';
      position: absolute;
      width: 300%;
      animation: moveBinary 30s linear infinite;
      white-space: nowrap;
    }

    .binary-row:nth-child(odd)::before {
      animation: moveBinary 25s linear infinite reverse;
      content: '1 0 1 1 0 1 0 1 0 1 1 0 1 0 1 0 1 1 0 1 1 0 1 0 1 1 0 1 0 1 0 1 1 0 1 0 1 0 1 1 0 1 1 0 1 0 1 1 0 1 1 0 1 0 1 1 0 1 0 1 0 1 1 0 1 0 1 0 1 1 0 1 1 0 1 0 1 1 0 1';
    }

    .binary-row:nth-child(even)::before {
      animation: moveBinary 35s linear infinite;
      content: '1 0 1 0 1 1 0 1 0 1 0 1 1 0 1 0 1 0 1 0 1 1 0 1 1 0 1 0 1 1 0 1 0 1 0 1 1 0 1 0 1 0 1 1 0 1 1 0 1 0 1 1 0 1 1 0 1 0 1 1 0 1 0 1 0 1 1 0 1 0 1 0 1 1 0 1 1 0 1 0 1 1 0 1';
    }

    @keyframes moveBinary {
      0% {
        transform: translateX(0);
      }
      100% {
        transform: translateX(-33.33%);
      }
    }

    .binary-background::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: 
        radial-gradient(circle at center, transparent 0%, rgba(0, 0, 0, 0.8) 100%),
        repeating-linear-gradient(
          45deg,
          rgba(255, 0, 0, 0.1) 0px,
          rgba(255, 0, 0, 0.1) 1px,
          transparent 1px,
          transparent 10px
        ),
        repeating-linear-gradient(
          -45deg,
          rgba(255, 0, 0, 0.1) 0px,
          rgba(255, 0, 0, 0.1) 1px,
          transparent 1px,
          transparent 10px
        );
      animation: gridPulse 4s ease-in-out infinite;
      z-index: 1;
      pointer-events: none;
    }

    .binary-background::after {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: 
        radial-gradient(
          circle at 50% 50%,
          rgba(255, 0, 0, 0.1) 0%,
          transparent 50%
        );
      animation: glowPulse 3s ease-in-out infinite;
      z-index: 2;
      pointer-events: none;
    }

    @keyframes gridPulse {
      0%, 100% {
        opacity: 0.5;
        transform: scale(1);
      }
      50% {
        opacity: 0.8;
        transform: scale(1.02);
      }
    }

    @keyframes glowPulse {
      0%, 100% {
        opacity: 0.3;
        transform: scale(1);
      }
      50% {
        opacity: 0.6;
        transform: scale(1.1);
      }
    }

    .binary-row:nth-child(3n) {
      color: rgba(255, 0, 0, 0.4);
      animation-duration: 40s;
      text-shadow: 0 0 15px rgba(255, 0, 0, 0.6);
    }

    .binary-row:nth-child(3n+1) {
      color: rgba(255, 0, 0, 0.6);
      animation-duration: 20s;
      text-shadow: 0 0 20px rgba(255, 0, 0, 0.7);
    }

    .binary-row:nth-child(3n+2) {
      color: rgba(255, 0, 0, 0.5);
      animation-duration: 30s;
      text-shadow: 0 0 15px rgba(255, 0, 0, 0.6);
    }

    .ssh-container::after {
      position: fixed;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      font-family: 'Courier New', monospace;
      font-size: 18px;
      line-height: 1;
      white-space: pre;
      text-align: center;
      letter-spacing: 3px;
      color: #ff0000;
      text-shadow: 0 0 10px rgba(255, 0, 0, 0.8),
                   0 0 20px rgba(255, 0, 0, 0.8),
                   0 0 30px rgba(255, 0, 0, 0.6),
                   0 0 40px rgba(255, 0, 0, 0.4);
      animation: skullGlow 3s ease-in-out infinite;
      z-index: 2;
      font-weight: bold;
    }

    header {
      height: 15%;
      width: 100%;
      background: rgba(0, 0, 0, 0.7);
      backdrop-filter: blur(10px);
      -webkit-backdrop-filter: blur(10px);
      display: flex;
      justify-content: center;
      align-items: center;
      position: relative;
      border-bottom: 1px solid rgba(255, 0, 0, 0.3);
      z-index: 3;
      box-shadow: 0 2px 20px rgba(0, 0, 0, 0.5);
    }

    h1 {
      color: #ff0000;
      margin: 0;
      font-size: 2.5rem;
      text-align: center;
      text-shadow: 0 0 10px rgba(255, 0, 0, 0.8),
                   0 0 20px rgba(255, 0, 0, 0.6);
      letter-spacing: 3px;
      position: relative;
    }

    .back-btn {
      position: absolute;
      left: 20px;
      background-color: rgba(0, 0, 0, 0.4);
      border: 1px solid #ff0000;
      color: #ff0000;
      padding: 0.5rem 1rem;
      cursor: pointer;
      font-family: 'Courier Prime', monospace;
      transition: all 0.3s ease;
      backdrop-filter: blur(5px);
      -webkit-backdrop-filter: blur(5px);
    }

    .back-btn:hover {
      background-color: rgba(255, 0, 0, 0.2);
      box-shadow: 0 0 15px rgba(255, 0, 0, 0.5);
      border-color: #ff3333;
      transform: scale(1.05);
    }

    main {
      position: relative;
      z-index: 3;
      height: 85%;
      width: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
      padding: 2rem;
      box-sizing: border-box;
    }

    .download-box {
      position: relative;
      z-index: 3;
      background-color: #000000;
      border: 2px solid #ff0000;
      padding: 3rem 5rem;
      color: #ff0000;
      cursor: pointer;
      transition: all 0.4s ease;
      font-size: 1.5rem;
      text-align: center;
      text-shadow: 0 0 10px rgba(255, 0, 0, 0.5);
      overflow: hidden;
    }

    .download-box::before {
      content: '';
      position: absolute;
      inset: 0;
      background: radial-gradient(
        circle at center,
        rgba(255, 0, 0, 0.8),
        transparent 70%
      );
      opacity: 0;
      transition: opacity 0.4s ease;
      z-index: -1;
    }

    .download-box:hover::before {
      opacity: 0.4;
    }

    .download-box span {
      position: relative;
      z-index: 1;
      display: inline-block;
      transition: all 0.4s ease;
    }

    .download-box:hover {
      border-color: #ff3333;
      box-shadow: 
        0 0 30px rgba(255, 0, 0, 0.4),
        inset 0 0 20px rgba(255, 0, 0, 0.4);
      text-shadow: 0 0 15px rgba(255, 0, 0, 1);
    }

    .download-box:hover span {
      transform: scale(1.05);
      text-shadow: 0 0 10px rgba(255, 0, 0, 1);
    }

    .download-box:active {
      transform: scale(0.98);
      border-color: #ff0000;
      box-shadow: 
        0 0 50px rgba(255, 0, 0, 0.6),
        inset 0 0 30px rgba(255, 0, 0, 0.6);
    }

    .download-box:active span {
      transform: scale(0.95);
    }

    .download-box .energy-field {
      position: absolute;
      inset: 0;
      z-index: -2;
      overflow: hidden;
    }

    .download-box .energy-field::before {
      content: '';
      position: absolute;
      inset: -50%;
      background: radial-gradient(
        circle at center,
        transparent 0%,
        rgba(255, 0, 0, 0.1) 50%,
        transparent 100%
      );
      animation: energyPulse 4s ease-in-out infinite;
    }

    @keyframes energyPulse {
      0%, 100% {
        transform: scale(1) rotate(0deg);
        opacity: 0.3;
      }
      50% {
        transform: scale(1.5) rotate(180deg);
        opacity: 0.6;
      }
    }
  `,
  ],
})
export class SshComponent {
  constructor(private router: Router) {}

  goBack(): void {
    this.router.navigate(["/dir"])
  }

  downloadFile(): void {
    const link = document.createElement("a")
    link.href = "assets/ssh/secure_shell.txt"
    link.download = "secure_shell.txt"
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }
}

