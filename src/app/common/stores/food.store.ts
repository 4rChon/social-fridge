import { Injectable, OnDestroy } from "@angular/core";
import { Mapper } from "@common/mappers/food.map";
import { AddFoodViewModel, FoodViewModel } from "@common/models/food.model";
import { UnitTypeModel } from "@common/models/unit.model";
import { FoodService } from "@common/services/food.service";
import { ObservableEvent } from "@common/util/observable-event";
import { ObservableEventHandler } from "@common/util/observable-event-handler";
import { ReplaySubject, Subscription } from "rxjs";
import { OnChange } from "./interfaces/on-change";
import { StoreAdd } from "./interfaces/store-add";
import { StoreDelete } from "./interfaces/store-delete";
import { StoreUpdate } from "./interfaces/store-update";
import { UnitTypeStore } from "./unit-type.store";

@Injectable({ providedIn: 'root' })
export class FoodStore implements OnDestroy, StoreAdd<AddFoodViewModel>, StoreUpdate<FoodViewModel>, StoreDelete<string>, OnChange<Map<string, FoodViewModel>> {
  private foodMap = new Map<string, FoodViewModel>();
  private changeEvent = new ObservableEvent(new ReplaySubject<Map<string, FoodViewModel>>(1));
  private eventHandler = new ObservableEventHandler();
  private unitTypeMap = new Map<string, UnitTypeModel>();

  constructor(private readonly foodService: FoodService, private readonly unitTypeStore: UnitTypeStore) {
    this.foodService.getFoodMap().then(foodMap => {
      this.foodMap = foodMap;
      this.changeEvent.next(foodMap);
    });

    this.eventHandler.add(
      this.unitTypeStore.onChange(unitTypeMap => {
        this.unitTypeMap = unitTypeMap;
      })
    )
  }

  ngOnDestroy(): void {
    this.eventHandler.dispose();
  }

  public async add(addViewModel: AddFoodViewModel): Promise<void> {
    const addDataModel = Mapper.AddFoodViewToData(addViewModel);
    const dataModel = await this.foodService.addFood(addDataModel);
    const viewModel = Mapper.FoodDataToView(dataModel, this.unitTypeMap);
    this.foodMap.set(viewModel.uid, viewModel);
    this.changeEvent.next(this.foodMap);
  }

  public async update(viewModel: FoodViewModel): Promise<void> {
    this.foodMap.set(viewModel.uid, viewModel);
    this.changeEvent.next(this.foodMap);

    const dataModel = Mapper.FoodViewToData(viewModel);
    await this.foodService.updateFood(dataModel);
  }

  public async delete(uid: string): Promise<void> {
    this.foodMap.delete(uid);
    this.changeEvent.next(this.foodMap);

    await this.foodService.removeFood(uid);
  }

  public onChange(fn: (foodMap: Map<string, FoodViewModel>) => void): Subscription {
    return this.changeEvent.subscribe(fn);
  }
}
