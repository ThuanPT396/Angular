import { BrowserModule } from '@angular/platform-browser';
import { NgModule, InjectionToken } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
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
//license
import { ListLicenseComponent } from './list-license/list-license.component'
import { EditLicenseComponent } from './list-license/edit-license/edit-license.component'
//Font-end
import { AppheaderComponent } from './components/appheader/appheader.component';
import { AppmenuComponent } from './components/appmenu/appmenu.component';
import { AppsettingComponent } from './components/appsetting/appsetting.component';
// Routing
import { AppRoutingModule } from './app-routing.modules';
import { NgxPermissionsModule } from 'ngx-permissions';
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
  MatFormFieldModule
  
} from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HomeComponent } from './home/home.component';
import { SignInComponent } from './list-user/sign-in/sign-in.component';
import { UserService } from './service/user.service';
import { ToasterService } from './service/toast/toaster.service';
import { PopupComponent } from './components/popup/popup.component';
import { DevComponent } from './dev/dev.component';
import { AppmenuStaffComponent } from './components/appmenu-staff/appmenu-staff.component';
import { ListStaffComponent } from './list-staff/list-staff.component';
import { EditStaffComponent } from './list-staff/edit-staff/edit-staff.component';
import { AppmenuClinicComponent } from './components/appmenu-clinic/appmenu-clinic.component';
import { ListPatientComponent } from './list-patient/list-patient.component';
import { BsDatepickerModule } from 'ngx-bootstrap';
import { SelectModule } from 'ng-select';
import { ListTwilioComponent } from './list-twilio/list-twilio.component';
import { EditTwilioComponent } from './list-twilio/edit-twilio/edit-twilio.component';
import { ListBlockComponent } from './list-patient/list-block/list-block.component';
import { ChartYearComponent } from './list-chart/chart-year/chart-year.component';
import { ChartMonthComponent } from './list-chart/chart-month/chart-month.component';
import { ChartDateComponent } from './list-chart/chart-date/chart-date.component';
import { ChartLineMonthComponent } from './list-chart/chart-line-month/chart-line-month.component';
import { ChartLineYearComponent } from './list-chart/chart-line-year/chart-line-year.component';
import { NgxSpinnerModule } from 'ngx-spinner';
//Firestore
import { AngularFireModule } from 'angularfire2';
import { AngularFirestore } from 'angularfire2/firestore';
import { environment } from '../environments/environment';
import { NgxAlertsModule } from '@ngx-plus/ngx-alerts';
import { NgxFormsModule } from '@ngx-plus/ngx-forms'
import { MessageService } from './service/message.service';
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
    MatFormFieldModule,
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
    DevComponent,
    EditStaffComponent,
    ChartLineMonthComponent,
    ListStaffComponent,
    ChartYearComponent,
    ChartMonthComponent,
    ChartDateComponent,
    AppmenuStaffComponent,
    UserListComponent,
    ChartLineYearComponent,
    UserEditComponent,
    ClinicListComponent,
    ListBlockComponent,
    ListTwilioComponent,
    EditTwilioComponent,
    ListLicenseComponent,
    EditLicenseComponent,
    ListPatientComponent,
    AppmenuClinicComponent,
    AppheaderComponent,
    AppmenuComponent,
    AppsettingComponent,
    HomeComponent,
    SignInComponent,
    PopupComponent
  ],
  imports: [    
    BrowserModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    FormsModule,
    HttpModule,
    SelectModule,
    AngularFontAwesomeModule,
    AppRoutingModule,
    HttpClientModule,
    DataTablesModule,
    BrowserAnimationsModule,
    DemoMaterialModule,
    MatNativeDateModule,
    ReactiveFormsModule,
    NgxPermissionsModule.forRoot(),
    BsDatepickerModule.forRoot(),
    NgxSpinnerModule,
    NgxAlertsModule.forRoot(),
    NgxFormsModule.forRoot()
  ],
  exports: [
    CdkTableModule,
    MatTableModule
  ],
  entryComponents: [PopupComponent],
  providers: [UserService, ToasterService, AngularFirestore,MessageService],
  bootstrap: [AppComponent]
})
export class AppModule { }
