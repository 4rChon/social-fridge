import { Injectable, OnDestroy } from "@angular/core";
import { FoodViewModel } from "@common/models/food.model";
import { UserViewModel } from "@common/models/user.model";
import { AuthService } from "@common/services/auth.service";
import { getCostPerServing } from "@common/util/food.helpers";
import { ObservableEvent } from "@common/util/observable-event";
import { ObservableEventHandler } from "@common/util/observable-event-handler";
import { ReplaySubject, Subscription } from "rxjs";
import { FoodStore } from "./food.store";
import { OnChange } from "./interfaces/on-change";

@Injectable({ providedIn: 'root' })
export class UserStore implements OnChange<UserViewModel>, OnDestroy {
  private changeEvent = new ObservableEvent(new ReplaySubject<UserViewModel>(1));
  private user: UserViewModel = {} as UserViewModel;
  private eventHandler = new ObservableEventHandler();

  constructor(private readonly authService: AuthService, private readonly foodStore: FoodStore) {
    this.eventHandler.add(
      this.foodStore.onChange(foodMap => this.updateUser(foodMap))
    );
  }

  ngOnDestroy(): void {
    this.eventHandler.dispose();
  }

  public onChange(fn: (user: UserViewModel) => void): Subscription {
    return this.changeEvent.subscribe(fn);
  }

  private updateUser(foodMap: Map<string, FoodViewModel>): void {
    this.user.food = [];
    this.user.bill = 0;

    if (!this.authService.user) {
      return;
    }

    this.user.uid = this.authService.user.uid;

    foodMap.forEach(food => {
      const dibsAmount = food.dibs.get(this.user.uid) ?? 0;
      if (dibsAmount > 0) {
        this.user.food.push(food);
        this.user.bill += getCostPerServing(food) * dibsAmount;
      }
    });

    this.changeEvent.next(this.user);
  }
}
