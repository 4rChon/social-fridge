import { UnitTypeModel } from "./unit.model";

export interface FoodDataModel {
  uid: string;
  name: string;
  owner: string;
  price: number;
  units: number;
  servingUnits: number;
  unitTypeUid: string;
  dibs: { [key: string]: number };
  locked: boolean;
}

export interface AddFoodDataModel {
  name: string;
  price: number;
  units: number;
  servingUnits: number;
  unitTypeUid: string;
  dibs: { [key: string]: number };
  locked: boolean;
}

export interface AddFoodViewModel {
  name: string;
  price: number;
  units: number;
  servingUnits: number;
  unitType: UnitTypeModel;
  dibs: Map<string, number>;
  locked: boolean;
}

export interface FoodViewModel {
  uid: string;
  name: string;
  owner: string;
  price: number;
  units: number;
  servingUnits: number;
  unitType: UnitTypeModel;
  dibs: Map<string, number>;
  locked: boolean;
}
