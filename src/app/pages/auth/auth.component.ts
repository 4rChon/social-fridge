import { Component, OnDestroy } from '@angular/core';
import { AuthService } from '@common/services/auth.service';
import { ObservableEventHandler } from '@common/util/observable-event-handler';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnDestroy {
  private eventHandler = new ObservableEventHandler();

  isLoading: boolean = true;

  constructor(private readonly authService: AuthService) {
    this.eventHandler.add(
      this.authService.onRedirection(redirecting => {
        this.isLoading = redirecting;
      })
    );
  }

  ngOnDestroy(): void {
    this.eventHandler.dispose();
  }
}
