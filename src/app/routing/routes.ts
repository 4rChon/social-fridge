import { Routes } from "@angular/router";
import { AuthGuard } from "@common/guards/auth.guard";
import { AuthComponent } from "@pages/auth/auth.component";
import { HomeComponent } from "@pages/home/home.component";
import { ReceiptComponent } from "@pages/receipt/receipt.component";

export const routePaths = {
  HOME: 'home',
  RECEIPT: 'receipt',
  LOGIN: 'auth'
}

export const routes: Routes = [
  { path: routePaths.LOGIN, component: AuthComponent },
  { path: routePaths.HOME, component: HomeComponent, canActivate: [AuthGuard] },
  { path: routePaths.RECEIPT, component: ReceiptComponent, canActivate: [AuthGuard] },
  { path: '**', redirectTo: routePaths.HOME }
];
