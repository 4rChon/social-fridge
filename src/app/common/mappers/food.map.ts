import { AddFoodDataModel, AddFoodViewModel, FoodDataModel, FoodViewModel } from "@common/models/food.model";
import { UnitTypeModel } from "@common/models/unit.model";

export class Mapper {
  public static FoodViewToData(viewModel: FoodViewModel): FoodDataModel {
    const dibsObject: { [key: string]: number } = {};
    viewModel.dibs.forEach((amount, dibber) => {
      dibsObject[dibber] = amount;
    });

    return {
      uid: viewModel.uid,
      name: viewModel.name,
      owner: viewModel.owner,
      price: viewModel.price,
      units: viewModel.units,
      servingUnits: viewModel.servingUnits,
      unitTypeUid: viewModel.unitType.uid,
      locked: viewModel.locked,
      dibs: dibsObject
    }
  }

  public static FoodDataToView(dataModel: FoodDataModel, unitTypeMap: Map<string, UnitTypeModel>): FoodViewModel {
    const dibsMap = new Map<string, number>();
    Object.keys(dataModel.dibs).forEach(dibber => {
      dibsMap.set(dibber, dataModel.dibs[dibber]);
    });

    return {
      uid: dataModel.uid,
      name: dataModel.name,
      owner: dataModel.owner,
      price: dataModel.price,
      units: dataModel.units,
      servingUnits: dataModel.servingUnits,
      unitType: unitTypeMap.get(dataModel.unitTypeUid) as UnitTypeModel,
      locked: dataModel.locked,
      dibs: dibsMap
    }
  }

  public static AddFoodViewToData(viewModel: AddFoodViewModel): AddFoodDataModel {
    const dibsObject: { [key: string]: number } = {};
    viewModel.dibs.forEach((amount, dibber) => {
      dibsObject[dibber] = amount;
    });

    return {
      name: viewModel.name,
      price: viewModel.price,
      units: viewModel.units,
      servingUnits: viewModel.servingUnits,
      unitTypeUid: viewModel.unitType.uid,
      locked: viewModel.locked,
      dibs: dibsObject
    }
  }

  public static AddFoodDataToView(dataModel: AddFoodDataModel, unitTypeMap: Map<string, UnitTypeModel>): AddFoodViewModel {
    const dibsMap = new Map<string, number>();
    Object.keys(dataModel.dibs).forEach(dibber => {
      dibsMap.set(dibber, dataModel.dibs[dibber]);
    });

    return {
      name: dataModel.name,
      price: dataModel.price,
      units: dataModel.units,
      servingUnits: dataModel.servingUnits,
      unitType: unitTypeMap.get(dataModel.unitTypeUid) as UnitTypeModel,
      locked: dataModel.locked,
      dibs: dibsMap
    }
  }
}
