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

  constructor() {
    // Check if game was completed previously
    this.isGameCompleted = localStorage.getItem("pyGameCompleted") === "true"
    
    // Only load saved progress if game wasn't completed
    if (!this.isGameCompleted) {
      const levels = localStorage.getItem("pyUnlockedLevels")
      if (levels) {
        const parsedLevels = JSON.parse(levels)
        parsedLevels.forEach((level: number) => this.unlockedLevels.add(level))
      }
    } else {
      // If game was completed, reset everything
      this.resetProgress()
    }
  }

  // Validate Python level code
  validatePyCode(code: string): number | null {
    // Check level 1 flag
    if (code === this.level1Flag) return 2 // Returns 2 because it unlocks level 2

    const hashedCode = CryptoJS.SHA256(code).toString()

    if (hashedCode === this.levelCodes.level2) return 3
    if (hashedCode === this.levelCodes.level3) return 4
    if (hashedCode === this.levelCodes.level4) return 5
    if (hashedCode === this.levelCodes.level5) return 6
    if (hashedCode === this.levelCodes.level6) {
      // Mark game as completed when last level is solved
      this.markGameAsCompleted()
      return 7 // 7 indicates completion of all levels
    }

    return null
  }

  // Unlock a Python level
  unlockLevel(level: number): void {
    this.unlockedLevels.add(level)
    if (!this.isGameCompleted) {
      localStorage.setItem("pyUnlockedLevels", JSON.stringify(Array.from(this.unlockedLevels)))
    }
  }

  // Check if a Python level is unlocked
  isLevelUnlocked(level: number): boolean {
    return this.unlockedLevels.has(level)
  }

  // Mark game as completed and trigger reset
  private markGameAsCompleted(): void {
    this.isGameCompleted = true
    localStorage.setItem("pyGameCompleted", "true")
    // Clear unlocked levels from storage
    localStorage.removeItem("pyUnlockedLevels")
  }

  // Reset all progress
  resetProgress(): void {
    this.unlockedLevels = new Set<number>([1])
    this.isGameCompleted = false
    localStorage.removeItem("pyUnlockedLevels")
    localStorage.removeItem("pyGameCompleted")
  }
}
