import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FoodStore } from '@common/stores';

@Component({
  selector: 'app-delete-button',
  templateUrl: './delete-button.component.html'
})
export class DeleteButtonComponent {
  @Input() foodUid!: string;
  @Input() isOwner!: boolean;
  @Input() isLoading!: boolean;
  @Output() isLoadingChange = new EventEmitter<boolean>();

  isDeleting: boolean = false;

  constructor(private readonly foodStore: FoodStore) { }

  public async deleteFood(event: any, foodUid: string): Promise<void> {
    event.stopPropagation();
    this.isLoadingChange.emit(true);
    this.foodStore.delete(foodUid);
  }
}
