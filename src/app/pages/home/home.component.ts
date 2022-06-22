import { Component, OnDestroy } from '@angular/core';
import { FoodViewModel } from '@common/models/food.model';
import { FoodStore, UserStore } from '@common/stores';
import { sortFood } from '@common/util/food.helpers';
import { ObservableEventHandler } from '@common/util/observable-event-handler';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnDestroy {
  private eventHandler = new ObservableEventHandler();

  food: FoodViewModel[] = [];
  bill: number = 0;

  constructor(private readonly foodStore: FoodStore, private readonly userStore: UserStore) {
    this.eventHandler.add(
      this.foodStore.onChange(foodMap => {
        this.food = Array.from(foodMap.values()).sort(sortFood);
      }),

      this.userStore.onChange(user => {
        this.bill = user.bill;
      })
    );

  }

  ngOnDestroy(): void {
    this.eventHandler.dispose();
  }
}
