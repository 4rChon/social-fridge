import { Injectable } from '@angular/core';
import { Mapper } from '@common/mappers/food.map';
import { AddFoodDataModel, FoodDataModel, FoodViewModel } from '@common/models/food.model';
import { UnitTypeModel } from '@common/models/unit.model';
import { UnitTypeStore } from '@common/stores';
import { ObservableEventHandler } from '@common/util/observable-event-handler';
import { addDoc, collection, deleteDoc, doc, Firestore, getDoc, getDocs, updateDoc } from '@firebase/firestore';
import { AuthService } from './auth.service';
import { collections, FirestoreService } from './firestore.service';

@Injectable({ providedIn: 'root' })
export class FoodService {
  private db: Firestore;
  private eventHandler = new ObservableEventHandler();
  private unitTypeMap = new Map<string, UnitTypeModel>();

  constructor(
    private readonly firestoreService: FirestoreService,
    private readonly authService: AuthService,
    private readonly unitTypeStore: UnitTypeStore
  ) {
    this.db = this.firestoreService.db;
    this.eventHandler.add(
      this.unitTypeStore.onChange(unitTypeMap => {
        this.unitTypeMap = unitTypeMap;
      })
    )
  }

  public async addFood(food: AddFoodDataModel): Promise<FoodDataModel> {
    if (!this.authService.user) {
      console.error('User is not logged in.');

      return {} as FoodDataModel;
    }

    try {
      const dataModel = {
        ...food, owner: this.authService.user.uid, dibs: {}
      }

      const docRef = await addDoc(collection(this.db, collections.FOOD), dataModel);
      console.log('Document written with ID: ', docRef.id);
      return { ...dataModel, uid: docRef.id } as FoodDataModel;
    } catch (e) {
      console.log('Error adding document: ', e);
    }

    return {} as FoodDataModel;
  }

  public async updateFood(food: FoodDataModel): Promise<FoodDataModel> {
    if (!this.authService.user) {
      console.error('User is not logged in.');

      return {} as FoodDataModel;
    }

    try {
      await updateDoc(doc(this.db, collections.FOOD, food.uid), {
        name: food.name,
        owner: food.owner,
        price: food.price,
        units: food.units,
        unitTypeUid: food.unitTypeUid,
        dibs: food.dibs,
        locked: food.locked
      });

      console.log(`Document with ID ${food.uid} updated.`);
      return food;
    } catch (e) {
      console.log('Error adding document: ', e);
    }

    return {} as FoodDataModel;
  }

  public async getFoodMap(): Promise<Map<string, FoodViewModel>> {
    if (!this.authService.user) {
      console.error('User is not logged in.');

      return new Map<string, FoodViewModel>();
    }

    const food = await this.getFoodModels();
    const foodMap = new Map<string, FoodViewModel>();
    food.forEach(dataModel => {
      const viewModel = Mapper.FoodDataToView(dataModel, this.unitTypeMap);
      foodMap.set(viewModel.uid, viewModel);
    });

    return foodMap;
  }

  public async getFood(foodUid: string): Promise<FoodViewModel> {
    if (!this.authService.user) {
      console.error('User is not logged in.');

      return {} as FoodViewModel;
    }

    const dataModel = await this.getFoodModel(foodUid);

    return Mapper.FoodDataToView(dataModel, this.unitTypeMap);
  }

  public async removeFood(foodUid: string): Promise<void> {
    await deleteDoc(doc(this.db, collections.FOOD, foodUid));
  }

  private async getFoodModels(): Promise<FoodDataModel[]> {
    if (!this.authService.user) {
      console.error('User is not logged in.');

      return [];
    }

    let food: FoodDataModel[] = [];
    const querySnapshot = await getDocs(collection(this.db, collections.FOOD));
    querySnapshot.forEach(doc => {
      const data = doc.data() as FoodDataModel;
      food.push({ ...data, uid: doc.id } as FoodDataModel);
    });

    return food;
  }

  private async getFoodModel(foodUid: string): Promise<FoodDataModel> {
    if (!this.authService.user) {
      console.error('User is not logged in.');

      return {} as FoodDataModel;
    }

    const foodSnapshot = await getDoc(doc(this.db, collections.FOOD, foodUid));
    return { ...foodSnapshot.data(), uid: foodUid } as FoodDataModel;
  }
}
