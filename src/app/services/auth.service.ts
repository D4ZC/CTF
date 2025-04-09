import { Injectable } from "@angular/core"
import { Router } from "@angular/router"
import { BehaviorSubject } from "rxjs"
import * as CryptoJS from "crypto-js"

@Injectable({
  providedIn: "root",
})
export class AuthService {
  private isAuthenticated = new BehaviorSubject<boolean>(false)
  private unlockedLevels = new BehaviorSubject<number[]>([])

  // Storing encrypted codes
  private readonly levelCodes = {
    level1: CryptoJS.SHA256("4F9dH2bK1Q").toString(),
    level2: CryptoJS.SHA256("pW7kX9L0zD").toString(),
    level3: CryptoJS.SHA256("mY8aJ5zV2X").toString(),
    level4: CryptoJS.SHA256("P3rQ7bT1uF").toString(),
    level5: CryptoJS.SHA256("dZ4hW6cV9G").toString(),
    level6: CryptoJS.SHA256("L0rQz8jM3K").toString(),
  }

  constructor(private router: Router) {
    // Check if user is already authenticated
    const auth = localStorage.getItem("isAuthenticated")
    if (auth === "true") {
      this.isAuthenticated.next(true)
    }

    // Load unlocked levels from localStorage
    const levels = localStorage.getItem("unlockedLevels")
    if (levels) {
      this.unlockedLevels.next(JSON.parse(levels))
    }
  }

  // Login validation
  login(username: string, password: string): boolean {
    // SQL injection vulnerable login (intentional for CTF)
    const validUsername = "root"
    const validPassword = "') or '1'='1--"

    if (username === validUsername && password === validPassword) {
      this.isAuthenticated.next(true)
      localStorage.setItem("isAuthenticated", "true")
      return true
    }
    return false
  }

  // Check if level is unlocked
  isLevelUnlocked(level: number): boolean {
    return this.unlockedLevels.value.includes(level)
  }

  // Validate level code
  validateLevelCode(level: number, code: string): boolean {
    const hashedCode = CryptoJS.SHA256(code).toString()

    let isValid = false
    switch (level) {
      case 1:
        isValid = hashedCode === this.levelCodes.level1
        break
      case 2:
        isValid = hashedCode === this.levelCodes.level2
        break
      case 3:
        isValid = hashedCode === this.levelCodes.level3
        break
      case 4:
        isValid = hashedCode === this.levelCodes.level4
        break
      case 5:
        isValid = hashedCode === this.levelCodes.level5
        break
      case 6:
        isValid = hashedCode === this.levelCodes.level6
        break
      default:
        return false
    }

    if (isValid) {
      this.unlockLevel(level)
    }

    return isValid
  }

  // Unlock a level
  unlockLevel(level: number): void {
    const currentLevels = this.unlockedLevels.value
    if (!currentLevels.includes(level)) {
      const newLevels = [...currentLevels, level]
      this.unlockedLevels.next(newLevels)
      localStorage.setItem("unlockedLevels", JSON.stringify(newLevels))
    }
  }

  // Get authentication status
  getAuthStatus() {
    return this.isAuthenticated.asObservable()
  }

  // Get unlocked levels
  getUnlockedLevels() {
    return this.unlockedLevels.asObservable()
  }

  // Logout
  logout(): void {
    this.isAuthenticated.next(false)
    localStorage.removeItem("isAuthenticated")
    this.router.navigate(["/login"])
  }
}
