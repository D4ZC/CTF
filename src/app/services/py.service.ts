import { Injectable } from "@angular/core"

@Injectable({
  providedIn: "root",
})
export class PyService {
  private unlockedLevels = new Set<number>([1]) // Level 1 is unlocked by default
  private readonly levelCodes: { [key: number]: string } = {
    1: "py7h0n_b3g1n",
    2: "Ch0c0L4tE1",
    3: "C4rAml0Q0uE",
    4: "D3l1c1a7uFf",
    5: "T1r4m1sU9Xx",
    6: "P4strY4F4nT"
  }

  constructor() {}

  validatePyCode(code: string): number | null {
    // Find the next locked level
    const nextLevel = this.getNextLockedLevel()
    if (!nextLevel) return null

    // Check if the code matches the next level's code
    const expectedCode = this.levelCodes[nextLevel]
    console.log('Validating code:', code)
    console.log('Expected code:', expectedCode)
    console.log('Next level:', nextLevel)

    if (code.trim() === expectedCode) {
      console.log('Code matched! Unlocking level:', nextLevel)
      this.unlockLevel(nextLevel)
      return nextLevel
    }

    console.log('Code did not match')
    return null
  }

  unlockLevel(level: number): void {
    this.unlockedLevels.add(level)
  }

  isLevelUnlocked(level: number): boolean {
    return this.unlockedLevels.has(level)
  }

  getNextLockedLevel(): number | null {
    for (let i = 1; i <= 6; i++) {
      if (!this.unlockedLevels.has(i)) {
        return i
      }
    }
    return null
  }
}
