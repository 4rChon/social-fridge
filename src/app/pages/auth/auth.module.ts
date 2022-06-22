import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NgMaterialModule } from '@common/modules/ng-material.module';
import { AuthComponent } from './auth.component';
import { SigninComponent } from './signin/signin.component';

@NgModule({
  declarations: [AuthComponent, SigninComponent],
  imports: [
    CommonModule,
    NgMaterialModule
  ]
})
export class AuthModule { }
