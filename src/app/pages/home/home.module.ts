import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NgMaterialModule } from '@common/modules/ng-material.module';
import { SimpleItemComponent } from '@pages/home/simple-item/simple-item.component';
import { HomeComponent } from './home.component';
import { AddItemButtonComponent } from './add-item-button/add-item-button.component';
import { EditButtonComponent } from './edit-button/edit-button.component';
import { IncDibsButtonComponent } from './inc-dibs-button/inc-dibs-button.component';
import { DeleteButtonComponent } from './delete-button/delete-button.component';
import { ToggleLockButtonComponent } from './toggle-lock-button/toggle-lock-button.component';
import { DecDibsButtonComponent } from './dec-dibs-button/dec-dibs-button.component';

@NgModule({
  declarations: [
    HomeComponent,
    SimpleItemComponent,
    AddItemButtonComponent,
    EditButtonComponent,
    IncDibsButtonComponent,
    DecDibsButtonComponent,
    DeleteButtonComponent,
    ToggleLockButtonComponent
  ],
  imports: [
    CommonModule,
    NgMaterialModule
  ]
})
export class HomeModule { }
