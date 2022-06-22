import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FoodViewModel } from '@common/models/food.model';
import { UnitTypeModel } from '@common/models/unit.model';
import { FoodStore, UnitTypeStore } from '@common/stores';
import { getTotalServings } from '@common/util/food.helpers';
import { ObservableEventHandler } from '@common/util/observable-event-handler';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html'
})
export class EditComponent implements OnInit, OnDestroy {
  food: FoodViewModel;
  itemForm: FormGroup;
  unitTypeMap = new Map<string, UnitTypeModel>();

  private eventHandler = new ObservableEventHandler();

  constructor(@Inject(MAT_DIALOG_DATA) public data: FoodViewModel, private readonly foodStore: FoodStore, readonly unitTypeStore: UnitTypeStore) {
    this.food = data;

    this.itemForm = new FormGroup({
      name: new FormControl(this.food.name, [Validators.required]),
      price: new FormControl(this.food.price, [Validators.required]),
      volume: new FormGroup({
        units: new FormControl(this.food.units, [Validators.required]),
        servingUnits: new FormControl(this.food.servingUnits, [Validators.required]),
        unitType: new FormControl(this.food.unitType.uid, [Validators.required])
      }),
      locked: new FormControl(this.food.locked, [Validators.required])
    });
  }

  ngOnInit(): void {
    this.eventHandler.add(
      this.unitTypeStore.onChange(unitTypeMap => this.unitTypeMap = unitTypeMap),
      this.itemForm.get('locked')!.valueChanges.subscribe(isLocked => this.onToggleLock(isLocked))
    );
  }

  ngOnDestroy(): void {
    this.eventHandler.dispose();
  }

  public onSubmit(itemForm: any): void {
    const viewModel = {
      uid: this.food.uid,
      name: itemForm.get('name')?.value,
      owner: this.food.owner,
      price: itemForm.get('price')?.value,
      units: itemForm.get('volume')?.get('units')?.value,
      servingUnits: itemForm.get('volume')?.get('servingUnits')?.value,
      unitType: this.unitTypeMap.get(itemForm.get('volume')?.get('unitType')?.value),
      dibs: this.food.dibs,
      locked: this.itemForm.get('locked')?.value
    } as FoodViewModel;

    this.foodStore.update(viewModel);
  }

  private onToggleLock(isLocked: boolean): void {
    const servingUnitsControl = this.itemForm.get('volume')?.get('servingUnits');
    const unitsControl = this.itemForm.get('volume')?.get('units');

    var totalServings = getTotalServings(this.food);
    if (isLocked) {
      unitsControl?.setValue(servingUnitsControl?.value * totalServings);
    } else {
      servingUnitsControl?.setValue(unitsControl?.value / totalServings);
    }
  }
}
