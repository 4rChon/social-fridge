import { Component, OnDestroy } from '@angular/core';
import { FoodViewModel } from '@common/models/food.model';
import { UserStore } from '@common/stores';
import { sortFood } from '@common/util/food.helpers';
import { ObservableEventHandler } from '@common/util/observable-event-handler';

@Component({
  selector: 'app-receipt',
  templateUrl: './receipt.component.html',
  styleUrls: ['./receipt.component.scss']
})
export class ReceiptComponent implements OnDestroy {
  private eventHandler = new ObservableEventHandler();

  receipts: FoodViewModel[] = [];
  total: number = 0;
  userId?: string;

  constructor(private readonly userStore: UserStore) {
    this.eventHandler.add(
      this.userStore.onChange(user => {
        this.userId = user.uid;
        this.receipts = user.food.sort(sortFood);
        this.total = user.bill;
      })
    )
  }

  ngOnDestroy(): void {
    this.eventHandler.dispose();
  }
}
