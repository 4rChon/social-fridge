import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { NgMaterialModule } from '@common/modules/ng-material.module';
import { AddComponent } from './add/add.component';
import { EditComponent } from './edit/edit.component';
import { FoodFormComponent } from './food-form/food-form.component';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    NgMaterialModule
  ],
  declarations: [
    AddComponent,
    EditComponent,
    FoodFormComponent
  ]
})
export class DialogsModule { }
