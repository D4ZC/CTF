import { Injectable } from "@angular/core"
import * as CryptoJS from "crypto-js"

@Injectable({
  providedIn: "root",
})
export class PyService {
  private unlockedLevels = new Set<number>([1]) // Level 1 is unlocked by default

  // Encrypted codes for Python levels
  private readonly levelCodes = {
    level2: CryptoJS.SHA256("Ch0c0L4tE1").toString(),
    level3: CryptoJS.SHA256("C4rAml0Q0uE").toString(),
    level4: CryptoJS.SHA256("D3l1c1a7uFf").toString(),
    level5: CryptoJS.SHA256("T1r4m1sU9Xx").toString(),
    level6: CryptoJS.SHA256("P4strY4F4nT").toString(),
  }

  constructor() {
    // Load unlocked levels from localStorage
    const levels = localStorage.getItem("pyUnlockedLevels")
    if (levels) {
      const parsedLevels = JSON.parse(levels)
      parsedLevels.forEach((level: number) => this.unlockedLevels.add(level))
    }
  }

  // Validate Python level code
  validatePyCode(code: string): number | null {
    const hashedCode = CryptoJS.SHA256(code).toString()

    if (hashedCode === this.levelCodes.level2) return 2
    if (hashedCode === this.levelCodes.level3) return 3
    if (hashedCode === this.levelCodes.level4) return 4
    if (hashedCode === this.levelCodes.level5) return 5
    if (hashedCode === this.levelCodes.level6) return 6

    return null
  }

  // Unlock a Python level
  unlockLevel(level: number): void {
    this.unlockedLevels.add(level)
    localStorage.setItem("pyUnlockedLevels", JSON.stringify(Array.from(this.unlockedLevels)))
  }

  // Check if a Python level is unlocked
  isLevelUnlocked(level: number): boolean {
    return this.unlockedLevels.has(level)
  }
}
