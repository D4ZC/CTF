import { Component } from "@angular/core"
import { CommonModule } from "@angular/common"
import { Router } from "@angular/router"

@Component({
  selector: "app-hexa",
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="hexa-container">
      <header>
        <button class="back-btn" (click)="goBack()">Volver</button>
        <h1>Hexaverso</h1>
      </header>
      <main>
        <div class="hex-grid">
          <!-- Row 1 -->
          <div class="hex-row">
            <div class="hex-cell">
              <div class="hex-content">48 65 78 61</div>
            </div>
            <div class="hex-cell">
              <div class="hex-content">76 65 72 73 6f</div>
            </div>
          </div>
          
          <!-- Row 2 -->
          <div class="hex-row">
            <div class="hex-cell">
              <div class="hex-content">43 6f 64 69 67 6f</div>
            </div>
            <div class="hex-cell">
              <div class="hex-content">4e 69 76 65 6c 33</div>
            </div>
          </div>
          
          <!-- Row 3 -->
          <div class="hex-row">
            <div class="hex-cell">
              <div class="hex-content">6d 59 38 61</div>
            </div>
            <div class="hex-cell">
              <div class="hex-content">4a 35 7a 56 32 58</div>
            </div>
          </div>
          
          <!-- Row 4 -->
          <div class="hex-row">
            <div class="hex-cell">
              <div class="hex-content">44 65 63 6f 64 65</div>
            </div>
            <div class="hex-cell">
              <div class="hex-content">48 65 78 61 64 65 63 69 6d 61 6c</div>
            </div>
          </div>
          
          <!-- Row 5 -->
          <div class="hex-row">
            <div class="hex-cell">
              <div class="hex-content">41 53 43 49 49</div>
            </div>
            <div class="hex-cell">
              <div class="hex-content">43 6f 6e 76 65 72 74</div>
            </div>
          </div>
          
          <!-- Row 6 -->
          <div class="hex-row">
            <div class="hex-cell">
              <div class="hex-content">42 79 74 65 73</div>
            </div>
            <div class="hex-cell">
              <div class="hex-content">43 68 61 72 61 63 74 65 72 73</div>
            </div>
          </div>
          
          <!-- Row 7 -->
          <div class="hex-row">
            <div class="hex-cell">
              <div class="hex-content">45 6e 63 6f 64 69 6e 67</div>
            </div>
            <div class="hex-cell">
              <div class="hex-content">44 65 63 6f 64 69 6e 67</div>
            </div>
          </div>
          
          <!-- Row 8 -->
          <div class="hex-row">
            <div class="hex-cell">
              <div class="hex-content">42 69 6e 61 72 79</div>
            </div>
            <div class="hex-cell">
              <div class="hex-content">54 65 78 74</div>
            </div>
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

    .hexa-container {
      background-color: #4d4d4d; /* Medium dark gray */
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
      position: sticky;
      top: 0;
      z-index: 10;
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
      overflow-y: auto;
      padding: 2rem;
      box-sizing: border-box;
    }

    .hex-grid {
      display: flex;
      flex-direction: column;
      gap: 2rem;
    }

    .hex-row {
      display: flex;
      gap: 1.5rem;
      justify-content: center;
    }

    .hex-cell {
      background-color: rgba(0, 0, 0, 0.75);
      border: 1px solid white;
      padding: 1.5rem;
      width: 200px;
      height: 100px;
      display: flex;
      justify-content: center;
      align-items: center;
    }

    .hex-content {
      color: white;
      text-align: center;
      word-break: break-all;
    }
  `,
  ],
})
export class HexaComponent {
  constructor(private router: Router) {}

  goBack(): void {
    this.router.navigate(["/dir"])
  }
}
