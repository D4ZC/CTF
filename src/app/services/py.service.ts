import { Injectable, PLATFORM_ID, Inject } from "@angular/core"
import { isPlatformBrowser } from "@angular/common"
import * as CryptoJS from "crypto-js"

@Injectable({
  providedIn: "root",
})
export class PyService {
  private unlockedLevels = new Set<number>([1]) // Level 1 is unlocked by default
  private isGameCompleted = false
  private storage: Storage | null = null
  private isBrowser: boolean

  // Flag for level 1 and encrypted codes for other levels
  private readonly level1Flag = 'py7h0n_b3g1n'
  private readonly levelCodes = {
    level2: CryptoJS.SHA256("Ch0c0L4tE1").toString(),
    level3: CryptoJS.SHA256("C4rAml0Q0uE").toString(),
    level4: CryptoJS.SHA256("D3l1c1a7uFf").toString(),
    level5: CryptoJS.SHA256("T1r4m1sU9Xx").toString(),
    level6: CryptoJS.SHA256("P4strY4F4nT").toString(),
  }

  constructor(@Inject(PLATFORM_ID) platformId: Object) {
    this.isBrowser = isPlatformBrowser(platformId)
    
    if (this.isBrowser) {
      // Check if storage is available
      try {
        this.storage = window.sessionStorage
        // Check if game was completed previously
        this.isGameCompleted = this.storage.getItem("pyGameCompleted") === "true"
        
        // Only load saved progress if game wasn't completed
        if (!this.isGameCompleted) {
          const levels = this.storage.getItem("pyUnlockedLevels")
          if (levels) {
            const parsedLevels = JSON.parse(levels)
            parsedLevels.forEach((level: number) => this.unlockedLevels.add(level))
          }
        } else {
          // If game was completed, reset everything
          this.resetProgress()
        }
      } catch (e) {
        // If storage is not available, use default values
        console.warn('Storage not available, using default values')
        this.storage = null
      }
    }
  }

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
    if (!this.isGameCompleted && this.storage && this.isBrowser) {
      try {
        this.storage.setItem("pyUnlockedLevels", JSON.stringify(Array.from(this.unlockedLevels)))
      } catch (e) {
        console.warn('Failed to save progress to storage')
      }
    }
  }

  // Check if a Python level is unlocked
  isLevelUnlocked(level: number): boolean {
    return this.unlockedLevels.has(level)
  }

  // Mark game as completed and trigger reset
  private markGameAsCompleted(): void {
    this.isGameCompleted = true
    if (this.storage && this.isBrowser) {
      try {
        this.storage.setItem("pyGameCompleted", "true")
        // Clear unlocked levels from storage
        this.storage.removeItem("pyUnlockedLevels")
      } catch (e) {
        console.warn('Failed to save game completion status')
      }
    }
  }

  // Reset all progress
  resetProgress(): void {
    this.unlockedLevels = new Set<number>([1])
    this.isGameCompleted = false
    if (this.storage && this.isBrowser) {
      try {
        this.storage.removeItem("pyUnlockedLevels")
        this.storage.removeItem("pyGameCompleted")
      } catch (e) {
        console.warn('Failed to reset progress in storage')
      }
    }
  }
}
