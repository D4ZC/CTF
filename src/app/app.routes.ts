import type { Routes } from "@angular/router"
import { AuthGuard } from "./guards/auth.guard"
import { LevelGuard } from "./guards/level.guard"

export const routes: Routes = [
  { path: "", redirectTo: "login", pathMatch: "full" },
  {
    path: "login",
    loadComponent: () => import("./components/login/login.component").then((m) => m.LoginComponent),
  },
  {
    path: "dir",
    loadComponent: () => import("./components/dir/dir.component").then((m) => m.DirComponent),
    canActivate: [AuthGuard],
  },
  {
    path: "inspect",
    loadComponent: () => import("./components/inspect/inspect.component").then((m) => m.InspectComponent),
    canActivate: [LevelGuard],
    data: { level: 1 },
  },
  {
    path: "hexa",
    loadComponent: () => import("./components/hexa/hexa.component").then((m) => m.HexaComponent),
    canActivate: [LevelGuard],
    data: { level: 2 },
  },
  {
    path: "deco",
    loadComponent: () => import("./components/deco/deco.component").then((m) => m.DecoComponent),
    canActivate: [LevelGuard],
    data: { level: 3 },
  },
  {
    path: "py",
    loadComponent: () => import("./components/py/py.component").then((m) => m.PyComponent),
    canActivate: [LevelGuard],
    data: { level: 4 },
  },
  {
    path: "ssh",
    loadComponent: () => import("./components/ssh/ssh.component").then((m) => m.SshComponent),
    canActivate: [LevelGuard],
    data: { level: 5 },
  },
  {
    path: "ulti",
    loadComponent: () => import("./components/ulti/ulti.component").then((m) => m.UltiComponent),
    canActivate: [LevelGuard],
    data: { level: 6 },
  },
  { path: "**", redirectTo: "login" },
]
