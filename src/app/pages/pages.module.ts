import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeModule } from './home/home.module';
import { AuthModule } from './auth/auth.module';
import { ReceiptModule } from './receipt/receipt.module';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    HomeModule,
    AuthModule,
    ReceiptModule
  ]
})
export class PagesModule { }
