import { Injectable } from "@angular/core"
import * as CryptoJS from "crypto-js"

@Injectable({
  providedIn: "root",
})
export class PyService {
  private unlockedLevels = new Set<number>([1]) // Level 1 is unlocked by default
  private isGameCompleted = false

  // Flag for level 1 and encrypted codes for other levels
  private readonly level1Flag = 'py7h0n_b3g1n'
  private readonly levelCodes = {
    level2: CryptoJS.SHA256("Ch0c0L4tE1").toString(),
    level3: CryptoJS.SHA256("C4rAml0Q0uE").toString(),
    level4: CryptoJS.SHA256("D3l1c1a7uFf").toString(),
    level5: CryptoJS.SHA256("T1r4m1sU9Xx").toString(),
    level6: CryptoJS.SHA256("P4strY4F4nT").toString(),
  }

  constructor() {}

  // Validate a Python code and return the unlocked level if valid
  validatePyCode(code: string): number | null {
    if (code === this.level1Flag) return 2
    const hashedCode = CryptoJS.SHA256(code).toString()
    for (const [level, hash] of Object.entries(this.levelCodes)) {
      if (hashedCode === hash) {
        const levelNum = parseInt(level.replace('level', ''))
        return levelNum + 1
      }
    }
    return null
  }

  // Unlock a Python level
  unlockLevel(level: number): void {
    this.unlockedLevels.add(level)
  }

  // Check if a Python level is unlocked
  isLevelUnlocked(level: number): boolean {
    return this.unlockedLevels.has(level)
  }

  // Reset all progress
  resetProgress(): void {
    this.unlockedLevels = new Set<number>([1])
    this.isGameCompleted = false
  }
}
