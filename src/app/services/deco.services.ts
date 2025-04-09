import { Injectable } from "@angular/core"

@Injectable({
  providedIn: "root",
})
export class DecoService {
  // Codes for the deco challenge
  private readonly decoCodeParts = {
    A3g9D: "mY",
    xP7tL: "8a",
    M2qZ4: "J5",
    nV5uK: "zV",
    B8wE1: "2X",
  }

  validateDecoCode(code: string): string | null {
    return this.decoCodeParts[code as keyof typeof this.decoCodeParts] || null
  }
}
