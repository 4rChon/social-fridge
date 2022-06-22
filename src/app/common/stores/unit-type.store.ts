import { Injectable } from "@angular/core";
import { AddUnitTypeModel, UnitTypeModel } from "@common/models/unit.model";
import { UnitTypeService } from "@common/services/unit.service";
import { ObservableEvent } from "@common/util/observable-event";
import { ReplaySubject, Subscription } from "rxjs";
import { OnChange } from "./interfaces/on-change";
import { StoreAdd } from "./interfaces/store-add";
import { StoreDelete } from "./interfaces/store-delete";
import { StoreUpdate } from "./interfaces/store-update";

@Injectable({ providedIn: 'root' })
export class UnitTypeStore implements StoreAdd<AddUnitTypeModel>, StoreUpdate<Map<string, UnitTypeModel>>, StoreDelete<string>, OnChange<Map<string, UnitTypeModel>> {
  private changeEvent = new ObservableEvent(new ReplaySubject<Map<string, UnitTypeModel>>(1));
  private unitTypeMap = new Map<string, UnitTypeModel>();

  constructor(private readonly unitService: UnitTypeService) {
    this.unitService.getUnitTypesMap().then(unitTypeMap => {
      this.update(unitTypeMap);
    })
  }

  public async add(unitType: AddUnitTypeModel): Promise<void> {
    const unitModel = await this.unitService.addUnitType(unitType);
    this.unitTypeMap.set(unitModel.uid, unitModel);
    this.changeEvent.next(this.unitTypeMap);
  }

  public async update(unitTypeMap: Map<string, UnitTypeModel>): Promise<void> {
    this.unitTypeMap = unitTypeMap;
    this.changeEvent.next(this.unitTypeMap);
  }

  public async delete(uid: string): Promise<void> {
    this.unitTypeMap.delete(uid);
    this.changeEvent.next(this.unitTypeMap);
  }

  public onChange(fn: (unitTypeMap: Map<string, UnitTypeModel>) => void): Subscription {
    return this.changeEvent.subscribe(fn);
  }
}
