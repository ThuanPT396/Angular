import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule,ReactiveFormsModule} from '@angular/forms';
import { HttpModule } from '@angular/http';
import { AppComponent } from './app.component';
//Call Api
import { HttpClientModule } from '@angular/common/http';
//Table,ICon
import { DataTablesModule } from 'angular-datatables';
import { AngularFontAwesomeModule } from 'angular-font-awesome';
//User
import { UserListComponent } from './list-user/user-list.component'
import { UserEditComponent } from './list-user/edit-user/user-edit.component'
// clinic
import { ClinicListComponent } from './list-clinic/clinic-list.component'
import { ClinicEditComponent } from './list-clinic/edit-clinic/clinic-edit.component'
//license
import {ListLicenseComponent} from './list-license/list-license.component'
import {EditLicenseComponent} from './list-license/edit-license/edit-license.component'
//Font-end
import { AppheaderComponent } from './components/appheader/appheader.component';
import { AppmenuComponent } from './components/appmenu/appmenu.component';
import { AppsettingComponent } from './components/appsetting/appsetting.component';
// Routing
import { RouterModule, Routes } from '@angular/router';
import { AppRoutingModule, appRoutes } from './app-routing.modules';
//Marterial Table
import '../polyfills';
import { CdkTableModule } from '@angular/cdk/table';
import {
  MatAutocompleteModule,
  MatBadgeModule,
  MatBottomSheetModule,
  MatButtonModule,
  MatButtonToggleModule,
  MatCardModule,
  MatCheckboxModule,
  MatChipsModule,
  MatDatepickerModule,
  MatDialogModule,
  MatDividerModule,
  MatExpansionModule,
  MatGridListModule,
  MatIconModule,
  MatInputModule,
  MatListModule,
  MatMenuModule,
  MatNativeDateModule,
  MatPaginatorModule,
  MatProgressBarModule,
  MatProgressSpinnerModule,
  MatRadioModule,
  MatRippleModule,
  MatSelectModule,
  MatSidenavModule,
  MatSliderModule,
  MatSlideToggleModule,
  MatSnackBarModule,
  MatSortModule,
  MatStepperModule,
  MatTableModule,
  MatTabsModule,
  MatToolbarModule,
  MatTooltipModule,
  MatTreeModule,
} from '@angular/material';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HomeComponent } from './home/home.component';
import { SignInComponent } from './list-user/sign-in/sign-in.component';
import { UserService } from './service/user.service';
import { AuthGuard } from './auth/auth.guard';


@NgModule({
  exports: [
    CdkTableModule,
    MatAutocompleteModule,
    MatBadgeModule,
    MatBottomSheetModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatCardModule,
    MatCheckboxModule,
    MatChipsModule,
    MatStepperModule,
    MatDatepickerModule,
    MatDialogModule,
    MatDividerModule,
    MatExpansionModule,
    MatGridListModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatMenuModule,
    MatNativeDateModule,
    MatPaginatorModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatRadioModule,
    MatRippleModule,
    MatSelectModule,
    MatSidenavModule,
    MatSliderModule,
    MatSlideToggleModule,
    MatSnackBarModule,
    MatSortModule,
    MatTableModule,
    MatTabsModule,
    MatToolbarModule,
    MatTooltipModule,
    MatTreeModule,
  ],
  
})
export class DemoMaterialModule { }

@NgModule({
  declarations: [
    AppComponent,
    UserListComponent,
    UserEditComponent,
    ClinicListComponent,
    ClinicEditComponent,
    ListLicenseComponent,
    EditLicenseComponent,
    AppheaderComponent,
    AppmenuComponent,
    AppsettingComponent,
    HomeComponent,
    SignInComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AngularFontAwesomeModule,
    AppRoutingModule,
    HttpClientModule,
    DataTablesModule,

    BrowserAnimationsModule,
    DemoMaterialModule,
    MatNativeDateModule,
    ReactiveFormsModule,
  ],
  exports: [
    CdkTableModule,
    MatTableModule
  ],
  providers: [UserService],
  bootstrap: [AppComponent]
})
export class AppModule { }
