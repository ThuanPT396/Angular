import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserListComponent } from './list-user/user-list.component'
import { UserEditComponent } from './list-user/edit-user/user-edit.component'
import { ClinicListComponent } from './list-clinic/clinic-list.component'
import { ListLicenseComponent } from './list-license/list-license.component'
import { EditLicenseComponent } from './list-license/edit-license/edit-license.component'
import { SignInComponent } from './list-user/sign-in/sign-in.component';
import { HomeComponent } from './home/home.component';
import { AuthGuard } from './auth/auth.guard';
import { DevComponent } from './dev/dev.component';
import { EditStaffComponent } from './list-staff/edit-staff/edit-staff.component';
import { ListStaffComponent } from './list-staff/list-staff.component';
import { NgxPermissionsGuard } from 'ngx-permissions';
import { ListPatientComponent } from './list-patient/list-patient.component';
import { ListTwilioComponent } from './list-twilio/list-twilio.component';
import { EditTwilioComponent } from './list-twilio/edit-twilio/edit-twilio.component';
import { ListBlockComponent } from './list-patient/list-block/list-block.component';
import { ChartYearComponent } from './list-chart/chart-year/chart-year.component';
import { ChartMonthComponent } from './list-chart/chart-month/chart-month.component';
import { ChartDateComponent } from './list-chart/chart-date/chart-date.component';
import { ChartLineMonthComponent } from './list-chart/chart-line-month/chart-line-month.component';
import { ChartLineYearComponent } from './list-chart/chart-line-year/chart-line-year.component';

export const appRoutes: Routes = [
    // { path: '', component: UserListComponent },
    // { path: 'userAdd', component: UserEditComponent },
    // { path: 'userList', component: UserListComponent },
    // { path: 'clinicAdd', component: ClinicEditComponent },
    // { path: 'clinicList', component: ClinicListComponent },
    // { path: 'licenseAdd',component: EditLicenseComponent},
    // { path: 'licenseList',component:ListLicenseComponent },

    { path: 'login', component: SignInComponent },
    {
        path: 'homeadmin', component: HomeComponent, children: [{
            path: '', component: UserListComponent,
            canActivate: [NgxPermissionsGuard],
            data: {
                permissions: {
                    only: ['ADMIN'],
                    except: ['STAFF','CLINIC'],
                    redirectTo: '/'
                }
            }
        }]
    },
    {
        path: 'homeclinic', component: HomeComponent, children: [{
            path: '', component: ListPatientComponent,
            canActivate: [NgxPermissionsGuard],
            data: {
                permissions: {
                    only: ['CLINIC'],
                    except: ['STAFF','ADMIN'],
                    redirectTo: '/'
                }
            }
        }]
    },
    {
        path: 'homestaff', component: HomeComponent, children: [{
            path: '', component: ClinicListComponent,
            canActivate: [NgxPermissionsGuard],
            data: {
                permissions: {
                    only: ['STAFF'],
                    except: ['CLINIC','ADMIN'],
                    redirectTo: '/'
                }
            }
        }]
    },
    // { path: 'home', component: HomeComponent,canActivate:[AuthGuard] },
    {
        path: 'adminAdd', component: HomeComponent,
        children: [{ path: '', component: UserEditComponent, canActivate: [AuthGuard] }]
    },
    {
        path: 'adminList', component: HomeComponent,
        children: [{
            path: '', component: UserListComponent,
            canActivate: [NgxPermissionsGuard],
            data: {
                permissions: {
                    only: ['ADMIN'],
                    except: ['STAFF'],
                    redirectTo: '/'
                }
            }
        }]
    },
    {
        path: 'clinicList', component: HomeComponent,
        children: [{ path: '', component: ClinicListComponent, canActivate: [AuthGuard] }]
    },
    {
        path: 'licenseAdd', component: HomeComponent,
        children: [{ path: '', component: EditLicenseComponent, canActivate: [AuthGuard] }]
    },
    {
        path: 'licenseList', component: HomeComponent,
        children: [{ path: '', component: ListLicenseComponent, canActivate: [AuthGuard] }]
    },
    {
        path: 'staffAdd', component: HomeComponent,
        children: [{ path: '', component: EditStaffComponent, canActivate: [AuthGuard] }]
    },
    {
        path: 'staffList', component: HomeComponent,
        children: [{ path: '', component: ListStaffComponent, canActivate: [AuthGuard] }]
    },
    {
        path: 'twilioAdd', component: HomeComponent,
        children: [{ path: '', component: EditTwilioComponent, canActivate: [AuthGuard] }]
    },

    {
        path: 'twilioList', component: HomeComponent,
        children: [{ path: '', component: ListTwilioComponent, canActivate: [AuthGuard] }]
    },
    {
        path: 'userList', component: HomeComponent,
        children: [{ path: '', component: DevComponent, canActivate: [AuthGuard] }]
    },
    {
        path: 'blockList', component: HomeComponent,
        children: [{ path: '', component: ListBlockComponent, canActivate: [AuthGuard] }]
    },
    {
        path: 'chartYear', component: HomeComponent,
        children: [{ path: '', component: ChartYearComponent, canActivate: [AuthGuard] }]
    },
    {
        path: 'chartMonth', component: HomeComponent,
        children: [{ path: '', component: ChartMonthComponent, canActivate: [AuthGuard] }]
    },
    {
        path: 'chartDate', component: HomeComponent,
        children: [{ path: '', component: ChartDateComponent, canActivate: [AuthGuard] }]
    },
    {
        path: 'appointmentList', component: HomeComponent,
        children: [{ path: '', component: ListPatientComponent, canActivate: [AuthGuard] }]
    },
    {
        path: 'chartLineMonth', component: HomeComponent,
        children: [{ path: '', component: ChartLineMonthComponent, canActivate: [AuthGuard] }]
    },
    {
        path: 'chartLineYear', component: HomeComponent,
        children: [{ path: '', component: ChartLineYearComponent, canActivate: [AuthGuard] }]
    },
    { path: '', redirectTo: '/login', pathMatch: 'full' }
];

@NgModule({
    imports: [RouterModule.forRoot(appRoutes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }