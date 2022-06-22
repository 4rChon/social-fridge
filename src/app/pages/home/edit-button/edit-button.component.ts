import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { FoodViewModel } from '@common/models/food.model';
import { EditComponent } from '@dialogs/edit/edit.component';

@Component({
  selector: 'app-edit-button',
  templateUrl: './edit-button.component.html'
})
export class EditButtonComponent {
  @Input() isOwner!: boolean;
  @Input() food!: FoodViewModel;
  @Input() isLoading!: boolean;
  @Output() isLoadingChange = new EventEmitter<boolean>();

  constructor(public dialog: MatDialog) { }

  openDialog() {
    this.dialog.open(EditComponent, {
      data: this.food
    });
  }
}
