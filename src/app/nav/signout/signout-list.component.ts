import { Component } from '@angular/core';
import { AuthService } from '../../common/services/auth.service';

@Component({
  selector: 'app-signout-list',
  templateUrl: './signout-list.component.html',
})
export class SignoutListComponent {
  constructor(private readonly authService: AuthService) { }

  public signOut(): void {
    this.authService.signOut();
  }
}
