import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReceiptComponent } from './receipt.component';
import { NgMaterialModule } from '@common/modules/ng-material.module';



@NgModule({
  declarations: [
    ReceiptComponent
  ],
  imports: [
    CommonModule,
    NgMaterialModule
  ]
})
export class ReceiptModule { }
