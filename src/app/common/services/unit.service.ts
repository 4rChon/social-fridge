import { Injectable } from '@angular/core';
import { AddUnitTypeModel, UnitTypeModel } from '@common/models/unit.model';
import { addDoc, collection, doc, Firestore, getDoc, getDocs } from '@firebase/firestore';
import { AuthService } from './auth.service';
import { collections, FirestoreService } from './firestore.service';

@Injectable({ providedIn: 'root' })
export class UnitTypeService {
  private db: Firestore;

  constructor(private readonly firestoreService: FirestoreService, private readonly authService: AuthService) {
    this.db = this.firestoreService.db;
  }

  public async getUnitTypes(): Promise<UnitTypeModel[]> {
    if (!this.authService.user) {
      console.error('User is not logged in.');

      return [];
    }

    let unitTypes: UnitTypeModel[] = [];
    const querySnapshot = await getDocs(collection(this.db, collections.UNITS));
    querySnapshot.forEach(async (doc) => {
      const data = doc.data();
      unitTypes.push({ ...data, uid: doc.id } as UnitTypeModel);
    })

    return unitTypes;
  }

  public async getUnitTypesMap(): Promise<Map<string, UnitTypeModel>> {
    if (!this.authService.user) {
      console.error('User is not logged in.');

      return new Map<string, UnitTypeModel>();
    }

    const unitTypesMap = new Map<string, UnitTypeModel>();
    const unitTypes = await this.getUnitTypes();
    unitTypes.forEach(unitType => {
      unitTypesMap.set(unitType.uid, unitType);
    })

    return unitTypesMap;
  }

  public async getUnitType(uid: string): Promise<UnitTypeModel> {
    if (!this.authService.user) {
      console.error('User is not logged in.');

      return {} as UnitTypeModel;
    }

    const docRef = doc(this.db, collections.UNITS, uid);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      return docSnap.data() as UnitTypeModel;
    }

    console.log('No such document');
    return {} as UnitTypeModel;
  }

  public async addUnitType(unitType: AddUnitTypeModel): Promise<UnitTypeModel> {
    if (!this.authService.user) {
      console.error('User is not logged in.');

      return {} as UnitTypeModel;
    }

    try {
      const docRef = await addDoc(collection(this.db, collections.UNITS), unitType);
      console.log('Document written with ID: ', docRef.id);
      return { ...unitType, uid: docRef.id } as UnitTypeModel;
    } catch (e) {
      console.log('Error adding document: ', e);
    }

    return {} as UnitTypeModel;
  }
}
