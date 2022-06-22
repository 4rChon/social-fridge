import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { UnitTypeModel } from '@common/models/unit.model';

@Component({
  selector: 'app-food-form',
  templateUrl: './food-form.component.html',
  styleUrls: ['./food-form.component.scss']
})
export class FoodFormComponent {
  @Input() itemForm!: FormGroup;
  @Input() unitTypeMap = new Map<string, UnitTypeModel>();
  @Output() submitForm = new EventEmitter<FormGroup>();

  public onSubmit(): void {
    this.submitForm.emit(this.itemForm);
  }
}
