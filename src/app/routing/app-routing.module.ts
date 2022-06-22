import { NgModule } from '@angular/core';
import { RouteReuseStrategy, RouterModule } from '@angular/router';
import { AppRouteReuseStrategy } from './app-route-reuse-strategy';
import { routes } from './routes';


@NgModule({
  imports: [
    RouterModule.forRoot(routes),
  ],
  providers: [{
    provide: RouteReuseStrategy,
    useClass: AppRouteReuseStrategy
  }],
  exports: [RouterModule]
})
export class AppRoutingModule { }
