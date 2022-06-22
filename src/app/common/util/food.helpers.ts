import { FoodViewModel } from "@common/models/food.model";

export function getCostPerServing(viewModel: FoodViewModel): number {
  return viewModel.price * viewModel.servingUnits;
}

export function getTotalServings(viewModel: FoodViewModel): number {
  let totalServings = 0;
  viewModel.dibs.forEach(value => {
    totalServings += value;
  })

  return totalServings;
}

export function sortFood(left: FoodViewModel, right: FoodViewModel): number {
  if (left.name > right.name) return 1;
  if (left.name < right.name) return -1;
  return 0;
}
