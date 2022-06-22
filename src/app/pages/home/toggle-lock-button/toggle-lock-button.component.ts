import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { FoodViewModel } from '@common/models/food.model';
import { FoodStore, UserStore } from '@common/stores';
import { ObservableEventHandler } from '@common/util/observable-event-handler';

@Component({
  selector: 'app-toggle-lock-button',
  templateUrl: './toggle-lock-button.component.html'
})
export class ToggleLockButtonComponent implements OnInit, OnDestroy {
  @Input() isOwner!: boolean;
  @Input() food!: FoodViewModel;
  @Input() isLoading!: boolean;

  @Output() isLoadingChange = new EventEmitter<boolean>();

  userId?: string;

  private eventHandler = new ObservableEventHandler();

  ngOnInit(): void {
    this.eventHandler.add(
      this.userStore.onChange(user => {
        this.userId = user.uid;
      })
    )
  }

  ngOnDestroy(): void {
    this.eventHandler.dispose();
  }

  constructor(private readonly userStore: UserStore, private readonly foodStore: FoodStore) { }

  public toggleLock(event: any): void {
    event.stopPropagation();

    if (!this.userId) {
      return;
    }

    this.food.locked = !this.food.locked;
    this.foodStore.update(this.food);
  }
}
