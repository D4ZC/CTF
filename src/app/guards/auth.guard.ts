import { Injectable } from "@angular/core"
import { CanActivate, Router } from "@angular/router"
import { Observable, map, take } from "rxjs"
import { AuthService } from "../services/auth.service"

@Injectable({
  providedIn: "root",
})
export class AuthGuard implements CanActivate {
  constructor(
    private authService: AuthService,
    private router: Router,
  ) {}

  canActivate(): Observable<boolean> {
    return this.authService.getAuthStatus().pipe(
      take(1),
      map((isAuthenticated) => {
        if (!isAuthenticated) {
          this.router.navigate(["/login"])
          return false
        }
        return true
      }),
    )
  }
}
