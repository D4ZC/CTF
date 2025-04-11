import { Injectable } from "@angular/core"
import * as CryptoJS from "crypto-js"

@Injectable({
  providedIn: "root",
})
export class PyService {
  private unlockedLevels: Set<number> = new Set()
  private isGameCompleted: boolean = false

  // Flag for level 1 and encrypted codes for other levels
  private readonly level1Flag = 'py7h0n_b3g1n'
  private readonly levelCodes = {
    level2: CryptoJS.SHA256("Ch0c0L4tE1").toString(),
    level3: CryptoJS.SHA256("C4rAml0Q0uE").toString(),
    level4: CryptoJS.SHA256("D3l1c1a7uFf").toString(),
    level5: CryptoJS.SHA256("T1r4m1sU9Xx").toString(),
    level6: CryptoJS.SHA256("P4strY4F4nT").toString(),
  }

  constructor() {
    // Inicializar el primer nivel como desbloqueado
    this.unlockedLevels.add(1)
  }

  // Validate a Python code and return the unlocked level if valid
  validatePyCode(code: string): number | null {
    // Validar el código y retornar el siguiente nivel si es correcto
    const nextLevel = this.getNextLevelFromCode(code)
    if (nextLevel) {
      this.unlockLevel(nextLevel)
      return nextLevel
    }
    return null
  }

  private getNextLevelFromCode(code: string): number | null {
    // Lógica de validación de códigos
    const codeMap: { [key: string]: number } = {
      'level1code': 2,
      'level2code': 3,
      'level3code': 4,
      'level4code': 5,
      'level5code': 6,
      'level6code': 7
    }
    return codeMap[code] || null
  }

  // Unlock a Python level
  unlockLevel(level: number): void {
    this.unlockedLevels.add(level)
    if (level === 7) {
      this.isGameCompleted = true
    }
  }

  // Check if a Python level is unlocked
  isLevelUnlocked(level: number): boolean {
    return this.unlockedLevels.has(level)
  }

  getUnlockedLevels(): number[] {
    return Array.from(this.unlockedLevels)
  }

  isGameFinished(): boolean {
    return this.isGameCompleted
  }
}
