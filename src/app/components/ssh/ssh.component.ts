import { Component } from "@angular/core"
import { CommonModule } from "@angular/common"
import { Router } from "@angular/router"

@Component({
  selector: "app-ssh",
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="ssh-container">
      <header>
        <button class="back-btn" (click)="goBack()">Volver</button>
        <h1>Secure_Shell</h1>
      </header>
      <main>
        <div class="download-box" (click)="downloadFile()">
          <span>Download</span>
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

    .ssh-container {
      background-color: #8b0000; /* Dark red */
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

    .download-box {
      background-color: rgba(0, 0, 0, 0.75);
      border: 1px solid white;
      padding: 3rem 5rem;
      color: white;
      cursor: pointer;
      transition: all 0.3s ease;
      font-size: 1.5rem;
      text-align: center;
    }

    .download-box:hover {
      background-color: rgba(0, 0, 0, 0.9);
      transform: scale(1.05);
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
