import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FoodViewModel } from '@common/models/food.model';
import { FoodStore, UserStore } from '@common/stores';
import { getTotalServings } from '@common/util/food.helpers';
import { ObservableEventHandler } from '@common/util/observable-event-handler';

@Component({
  selector: 'app-dec-dibs-button',
  templateUrl: './dec-dibs-button.component.html'
})
export class DecDibsButtonComponent implements OnInit, OnDestroy {
  @Input() food!: FoodViewModel;

  hasDibs: boolean = false;
  userId?: string;

  private eventHandler = new ObservableEventHandler();

  constructor(private readonly userStore: UserStore, private readonly foodStore: FoodStore) { }

  ngOnInit(): void {
    this.eventHandler.add(
      this.userStore.onChange(user => {
        this.userId = user.uid
        const dibsAmount = this.food.dibs.get(user.uid) ?? 0;
        this.hasDibs = dibsAmount > 0;
      })
    );
  }

  ngOnDestroy(): void {
    this.eventHandler.dispose();
  }

  public decDibs(event: any): void {
    event.stopPropagation();
    if (!this.userId) {
      return;
    }

    let amount = this.food.dibs.get(this.userId) ?? 0;
    if (amount == 0) {
      return;
    }

    this.food.dibs.set(this.userId, --amount);

    const totalServings = getTotalServings(this.food);
    if (!this.food.locked) {
      this.food.units = this.food.servingUnits * totalServings;
    } else {
      this.food.servingUnits = this.food.units / totalServings;
    }

    this.foodStore.update(this.food);
  }
}
