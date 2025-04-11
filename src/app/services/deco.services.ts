import { Injectable } from "@angular/core"

@Injectable({
  providedIn: "root",
})
export class DecoService {
  // Codes for the deco challenge
  private readonly decoCodeParts = {
    A3g9D: "P3",
    xP7tL: "rQ",
    M2qZ4: "7b",
    nV5uK: "T1",
    B8wE1: "uF",
  }

  validateDecoCode(code: string): string | null {
    return this.decoCodeParts[code as keyof typeof this.decoCodeParts] || null
  }
}
