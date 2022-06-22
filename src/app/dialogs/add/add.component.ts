import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AddFoodViewModel } from '@common/models/food.model';
import { UnitTypeModel } from '@common/models/unit.model';
import { FoodStore, UnitTypeStore } from '@common/stores';
import { ObservableEventHandler } from '@common/util/observable-event-handler';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html'
})
export class AddComponent implements OnInit, OnDestroy {
  itemForm: FormGroup;
  unitTypeMap = new Map<string, UnitTypeModel>();

  private eventHandler = new ObservableEventHandler();

  constructor(private readonly foodStore: FoodStore, readonly unitTypeStore: UnitTypeStore) {
    this.itemForm = new FormGroup({
      name: new FormControl(null, [Validators.required]),
      price: new FormControl(null, [Validators.required]),
      volume: new FormGroup({
        units: new FormControl(null, [Validators.required]),
        servingUnits: new FormControl(null, [Validators.required]),
        unitType: new FormControl(null, [Validators.required])
      }),
      locked: new FormControl(false, [Validators.required])
    });
  }

  ngOnInit(): void {
    this.eventHandler.add(
      this.unitTypeStore.onChange(unitTypeMap => {
        this.unitTypeMap = unitTypeMap;
      })
    );
  }

  ngOnDestroy(): void {
    this.eventHandler.dispose();
  }

  public onSubmit(itemForm: any): void {
    console.log(itemForm);

    const addViewModel = {
      name: itemForm.get('name')?.value,
      price: itemForm.get('price')?.value,
      units: itemForm.get('volume')?.get('units')?.value,
      servingUnits: itemForm.get('volume')?.get('servingUnits')?.value,
      unitType: this.unitTypeMap.get(itemForm.get('volume')?.get('unitType')?.value),
      locked: itemForm.get('locked')?.value,
      dibs: new Map<string, number>()
    } as AddFoodViewModel

    this.foodStore.add(addViewModel);
  }
}
