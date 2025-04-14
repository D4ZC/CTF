import { Injectable } from "@angular/core"
import * as CryptoJS from "crypto-js"

@Injectable({
  providedIn: "root",
})
export class PyService {
  private unlockedLevels = new Set<number>([1]) // Level 1 is unlocked by default

  // Encrypted codes for Python levels
  private readonly levelCodes = {
    level2: CryptoJS.SHA256("py7h0n_b3g1n").toString(),
    level3: CryptoJS.SHA256("Ch0c0L4tE1").toString(),
    level4: CryptoJS.SHA256("C4rAml0Q0uE").toString(),
    level5: CryptoJS.SHA256("D3l1c1a7uFf").toString(),
    level6: CryptoJS.SHA256("T1r4m1sU9Xx").toString(),
    final: CryptoJS.SHA256("P4strY4F4nT").toString()
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
  validatePyCode(code: string): { level: number | null, isFinal: boolean } {
    const hashedCode = CryptoJS.SHA256(code).toString()
    
    // Check if all levels are unlocked before allowing final flag
    const allLevelsUnlocked = this.unlockedLevels.has(2) && 
                            this.unlockedLevels.has(3) && 
                            this.unlockedLevels.has(4) && 
                            this.unlockedLevels.has(5) && 
                            this.unlockedLevels.has(6);

    if (hashedCode === this.levelCodes.final && allLevelsUnlocked) {
      return { level: null, isFinal: true };
    }

    // Check for level codes in order
    if (!this.unlockedLevels.has(2) && hashedCode === this.levelCodes.level2) return { level: 2, isFinal: false }
    if (this.unlockedLevels.has(2) && !this.unlockedLevels.has(3) && hashedCode === this.levelCodes.level3) return { level: 3, isFinal: false }
    if (this.unlockedLevels.has(3) && !this.unlockedLevels.has(4) && hashedCode === this.levelCodes.level4) return { level: 4, isFinal: false }
    if (this.unlockedLevels.has(4) && !this.unlockedLevels.has(5) && hashedCode === this.levelCodes.level5) return { level: 5, isFinal: false }
    if (this.unlockedLevels.has(5) && !this.unlockedLevels.has(6) && hashedCode === this.levelCodes.level6) return { level: 6, isFinal: false }

    return { level: null, isFinal: false }
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
