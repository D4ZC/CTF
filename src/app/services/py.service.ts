import { Injectable } from "@angular/core"

@Injectable({
  providedIn: "root",
})
export class PyService {
  private unlockedLevels: Set<number> = new Set()
  private isGameCompleted: boolean = false

  // Códigos de validación para cada nivel
  private readonly levelCodes = {
    1: 'py7h0n_b3g1n',
    2: 'Ch0c0L4tE1',
    3: 'C4rAml0Q0uE',
    4: 'D3l1c1a7uFf',
    5: 'T1r4m1sU9Xx',
    6: 'P4strY4F4nT'
  }

  constructor() {
    // Inicializar el primer nivel como desbloqueado
    this.unlockedLevels.add(1)
  }

  // Validate a Python code and return the unlocked level if valid
  validatePyCode(code: string): number | null {
    if (!code) return null;

    // Buscar el nivel correspondiente al código
    for (const [level, validCode] of Object.entries(this.levelCodes)) {
      if (code === validCode) {
        const nextLevel = parseInt(level) + 1;
        this.unlockLevel(nextLevel);
        return nextLevel;
      }
    }
    return null;
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
