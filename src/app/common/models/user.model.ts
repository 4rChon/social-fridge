import { FoodViewModel } from "./food.model";

export interface UserViewModel {
  uid: string;
  food: FoodViewModel[];
  bill: number;
}
