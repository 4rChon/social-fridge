import { Component } from '@angular/core';
import { AuthService } from '@common/services/auth.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent {
  constructor(private readonly authService: AuthService) { }

  public signIn(): void {
    this.authService.signIn();
  }
}
