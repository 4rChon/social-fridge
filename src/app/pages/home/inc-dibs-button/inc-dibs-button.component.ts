import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FoodViewModel } from '@common/models/food.model';
import { FoodStore, UserStore } from '@common/stores';
import { getTotalServings } from '@common/util/food.helpers';
import { ObservableEventHandler } from '@common/util/observable-event-handler';

@Component({
  selector: 'app-inc-dibs-button',
  templateUrl: './inc-dibs-button.component.html'
})
export class IncDibsButtonComponent implements OnInit, OnDestroy {
  @Input() food!: FoodViewModel;

  userId?: string;

  private eventHandler = new ObservableEventHandler();

  constructor(private readonly userStore: UserStore, private readonly foodStore: FoodStore) { }

  ngOnInit(): void {
    this.eventHandler.add(
      this.userStore.onChange(user => {
        this.userId = user.uid
      })
    );
  }

  ngOnDestroy(): void {
    this.eventHandler.dispose();
  }

  public incDibs(event: any): void {
    event.stopPropagation();

    if (!this.userId) {
      return;
    }

    let amount = this.food.dibs.get(this.userId) ?? 0;
    this.food.dibs.set(this.userId, ++amount);

    const totalServings = getTotalServings(this.food);
    if (!this.food.locked) {
      this.food.units = this.food.servingUnits * totalServings;
    } else {
      this.food.servingUnits = this.food.units / totalServings;
    }

    this.foodStore.update(this.food);
  }
}
