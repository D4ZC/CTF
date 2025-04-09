import { Injectable } from "@angular/core"
import { ActivatedRouteSnapshot, CanActivate, Router } from "@angular/router"
import { Observable, map, take } from "rxjs"
import { AuthService } from "../services/auth.service"

@Injectable({
  providedIn: "root",
})
export class LevelGuard implements CanActivate {
  constructor(
    private authService: AuthService,
    private router: Router,
  ) {}

  canActivate(route: ActivatedRouteSnapshot): Observable<boolean> {
    const requiredLevel = route.data["level"]

    return this.authService.getAuthStatus().pipe(
      take(1),
      map((isAuthenticated) => {
        if (!isAuthenticated) {
          this.router.navigate(["/login"])
          return false
        }

        if (!this.authService.isLevelUnlocked(requiredLevel)) {
          this.router.navigate(["/dir"])
          return false
        }

        return true
      }),
    )
  }
}
