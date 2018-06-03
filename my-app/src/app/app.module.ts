import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule} from '@angular/forms';
import { HttpModule } from '@angular/http';
import { DataTablesModule } from 'angular-datatables';
import { AppComponent } from './app.component';
import {HeaderComponent} from './header/header.component';
import { UserListComponent } from './list-user/user-list.component'
import { UserEditComponent } from './list-user/edit-user/user-edit.component'
import { ClinicListComponent } from './list-clinic/clinic-list.component'
import { ClinicEditComponent } from './list-clinic/edit-clinic/clinic-edit.component'
import { AngularFontAwesomeModule } from 'angular-font-awesome';
@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    UserListComponent,
    UserEditComponent,
    ClinicListComponent,
    ClinicEditComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    DataTablesModule,
    AngularFontAwesomeModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
