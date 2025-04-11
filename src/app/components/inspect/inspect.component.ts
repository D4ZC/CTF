import { Component, OnInit, OnDestroy, AfterViewInit, ElementRef, ViewChild } from "@angular/core"
import { CommonModule } from "@angular/common"
import { Router } from "@angular/router"

@Component({
  selector: "app-inspect",
  standalone: true,
  imports: [CommonModule],
  template: `
    <canvas #binaryCanvas id="binary-background"></canvas>
    
    <header>
      <button class="back-button" (click)="goBack()">volver</button>
      <div id="titulo">
        <h1>1nsp3cc10n4r</h1>
      </div>
    </header>

    <main>
      <div class="content-box">
        <p>Yn sbeznpvóa qr ha qrgrpgvir chrqr inevne frtúa ry cníf b ry ázovgb ra ry dhr fr qrfrzcrñr,
        creb trarenyzragr vapyhlr rfghqvbf ra pevzvabybtín, qrerpub, cfvpbybtín b pvrapvnf sberafrf.
        Nqrzáf qr yn sbeznpvóa npnqézvpn, rf shaqnzragny nqdhveve rkcrevrapvn ra ry pnzcb, ln dhr 
        zhpunf unovyvqnqrf fr qrfneebyyna pba yn ceápgvpn qverpgn ra vairfgvtnpvbarf ernyrf.
        Rfgn pbzovanpvóa qr grbeín l ceápgvpn rf pynir cnen sbezne n ha cebsrfvbany pncnm qr raseragnefr 
        n phnydhvre gvcb qr pnfb.Hab qr ybf nfcrpgbf záf qrfnsvnagrf qry genonwb qr ha qrgrpgvir rf yvqvne 
        pba yn vapregvqhzoer. Ab fvrzcer lnf cvfgnf pbaqhpra n erfchrfgnf pynenf, l ra bpnfvbarf, qrora frthve
        zúygvcyrf yíarnf qr vairfgvtnpvóa nagrf qr rapbagene han pbapyhfvóa iáyvqn. Rfgn nzovtürqnq rkvtr han 
        tena pncnpvqnq qr nqncgnpvóa l han zragr novregn cnen pbafvqrene qvfgvagnf uvcógrfvf fva nsreenefr n han
        fbyn irefvóa qr ybf urpubf.Yn pbasvqrapvnyvqnq gnzovéa rf ha cvyne ra yn ynobe qry qrgrpgvir. Zhpubf pnfbf 
        vaibyhpena vasbeznpvóa qryvpnqn, gnagb ra vairfgvtnpvbarf pevzvanyrf pbzb ra nfhagbf cevinqbf. Cbe ryyb, ybf
        qrgrpgvirf qrora fre qvfpergbf l erfcrgne yn cevinpvqnq qr ynf crefbanf vaibyhpenqnf, npghnaqb fvrzcer qrageb
        qry znepb yrtny l égvpb. Han svygenpvóa qr qngbf cbqeín ab fbyb neehvane han vairfgvtnpvóa, fvab gnzovéa cbare
        ra evrftb n ybf vzcyvpnqbf.</p>
      </div>
    </main>
  `,
  styles: [
    `
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }

    :host {
      font-family: "Courier New", Courier, monospace;
      height: 100vh;
      width: 100vw;
      background-color: #000;
      overflow: hidden;
      position: relative;
    }

    #binary-background {
      position: fixed;
      top: 0;
      left: 0;
      width: 100vw;
      height: 100vh;
      z-index: 0;
      background-color: #000;
    }

    header {
      display: flex;
      justify-content: center;
      align-items: center;
      padding: 20px;
      background-color: transparent;
      position: relative;
      width: 100%;
      z-index: 1;
      min-height: 80px;
    }

    #titulo {
      text-align: center;
      flex-grow: 1;
    }

    #titulo h1 {
      margin: 0;
      color: #ffffff;
      font-size: 2.5rem;
      text-transform: uppercase;
      letter-spacing: 2px;
      text-shadow: none;
      animation: none;
    }

    .back-button {
      position: absolute;
      left: 20px;
      background-color: transparent;
      color: white;
      border: 1px solid white;
      border-radius: 5px;
      padding: 8px 15px;
      font-size: 16px;
      font-weight: bold;
      cursor: pointer;
      transition: all 0.3s;
      z-index: 2;
      letter-spacing: 1px;
      text-decoration: none;
      display: inline-block;
    }

    .back-button:hover {
      background-color: rgba(255, 255, 255, 0.2);
      box-shadow: 0 0 10px rgba(255, 255, 255, 0.5);
    }

    main {
      padding: 20px;
      max-width: 1200px;
      margin: 0 auto;
      position: relative;
      z-index: 1;
      flex: 1;
      margin-top: 20px;
    }

    .content-box {
      background-color: transparent;
      border-radius: 10px;
      padding: 15px;
      margin-top: 0px;
      color: white;
      text-shadow: 0 0 3px rgba(255, 255, 255, 0.5);
    }

    .content-box p {
      line-height: 1.6;
      color: #fff;
      font-size: 1.1rem;
      text-align: center;
      animation: none;
      background-color: rgba(0, 0, 0, 0.8);
      padding: 20px;
      box-shadow: 0 0 10px rgba(255, 255, 255, 0.6);
      border: 1px solid rgba(255, 255, 255, 0.5);
    }

    :host::before {
      content: '';
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: radial-gradient(circle at center, transparent 0%, rgba(0, 0, 0, 0.5) 100%);
      z-index: -1;
      pointer-events: none;
    }

    header {
      position: relative;
      z-index: 1;
      background-color: rgba(0, 0, 0, 0.8);
    }
    `
  ],
})
export class InspectComponent implements OnInit, OnDestroy, AfterViewInit {
  @ViewChild('binaryCanvas') canvasRef!: ElementRef<HTMLCanvasElement>;
  private ctx!: CanvasRenderingContext2D;
  private animationFrame: number | null = null;
  private columns: number[] = [];
  private fontSize = 20;
  private isAnimating = false;

  constructor(private router: Router) {}

  ngOnInit(): void {
    // La animación se iniciará en ngAfterViewInit
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.initCanvas();
    }, 100);
  }

  ngOnDestroy(): void {
    this.stopAnimation();
  }

  goBack(): void {
    this.router.navigate(["/dir"]);
  }

  private initCanvas(): void {
    const canvas = this.canvasRef.nativeElement;
    this.ctx = canvas.getContext('2d')!;
    this.resizeCanvas();
    window.addEventListener('resize', () => this.resizeCanvas());
    this.startAnimation();
  }

  private resizeCanvas(): void {
    const canvas = this.canvasRef.nativeElement;
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    
    // Reinicializar columnas
    const numColumns = Math.floor(canvas.width / this.fontSize);
    this.columns = Array(numColumns).fill(0).map(() => Math.floor(Math.random() * canvas.height / this.fontSize));
  }

  private startAnimation(): void {
    if (this.isAnimating) return;
    this.isAnimating = true;
    this.drawBinary();
  }

  private stopAnimation(): void {
    this.isAnimating = false;
    if (this.animationFrame) {
      cancelAnimationFrame(this.animationFrame);
      this.animationFrame = null;
    }
  }

  private drawBinary(): void {
    if (!this.isAnimating) return;

    const canvas = this.canvasRef.nativeElement;
    
    // Añadir capa semi-transparente para efecto de desvanecimiento
    this.ctx.fillStyle = 'rgba(0, 0, 0, 0.1)';
    this.ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    // Configurar estilo para los números binarios
    this.ctx.font = `${this.fontSize}px monospace`;
    
    // Dibujar los números binarios
    for (let i = 0; i < this.columns.length; i++) {
      const text = Math.random() < 0.5 ? '0' : '1';
      const x = i * this.fontSize;
      const y = this.columns[i] * this.fontSize;
      const opacity = Math.random() * 0.5 + 0.5;
      this.ctx.fillStyle = `rgba(255, 165, 0, ${opacity})`;
      this.ctx.fillText(text, x, y);
      
      // Reiniciar columna o moverla hacia abajo
      if (y > canvas.height && Math.random() > 0.98) {
        this.columns[i] = 0;
      }
      this.columns[i]++;
    }
    
    // Continuar animación
    this.animationFrame = requestAnimationFrame(() => this.drawBinary());
  }
}
