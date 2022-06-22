import { Subscription } from "rxjs";

export class ObservableEventHandler {
  private subscriptions: Subscription[] = [];

  public add(...subscriptions: Subscription[]): void {
    this.subscriptions.concat(subscriptions);
  }

  public dispose(): void {
    this.subscriptions.forEach(subscription => {
      subscription.unsubscribe();
    })
  }
}
