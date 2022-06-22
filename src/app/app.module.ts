import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgMaterialModule } from '@common/modules/ng-material.module';
import { DialogsModule } from '@dialogs/dialogs.module';
import { PagesModule } from '@pages/pages.module';
import { AppRoutingModule } from '@routing/app-routing.module';
import { SignoutListComponent } from 'src/app/nav/signout/signout-list.component';
import { AppComponent } from './app.component';
import { BottomNavComponent } from './nav/bottom-nav/bottom-nav.component';
import { SideNavComponent } from './nav/side-nav/side-nav.component';
import { SignoutButtonComponent } from './nav/signout/signout-button.component';

@NgModule({
  declarations: [
    AppComponent,
    SignoutListComponent,
    SignoutButtonComponent,
    SideNavComponent,
    BottomNavComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    NgMaterialModule,
    PagesModule,
    DialogsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule { }
