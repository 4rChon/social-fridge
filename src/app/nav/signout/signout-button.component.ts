import { Component } from '@angular/core';
import { AuthService } from '../../common/services/auth.service';

@Component({
  selector: 'app-signout-button',
  templateUrl: './signout-button.component.html',
})
export class SignoutButtonComponent {
  constructor(private readonly authService: AuthService) { }

  public signOut(): void {
    this.authService.signOut();
  }
}
