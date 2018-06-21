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
        path: 'home', component: HomeComponent,
        children: [{ path: '', component: UserListComponent, canActivate: [AuthGuard] }]
    },
    {
        path: 'adminAdd', component: HomeComponent,
        children: [{ path: '', component: UserEditComponent, canActivate: [AuthGuard] }]
    },
    {
        path: 'adminList', component: HomeComponent,
        children: [{ path: '', component: UserListComponent, canActivate: [AuthGuard] }]
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
        path: 'userList', component: HomeComponent,
        children: [{ path: '', component: DevComponent, canActivate: [AuthGuard] }]
    },
    { path: '', redirectTo: '/login', pathMatch: 'full' }
];

@NgModule({
    imports: [RouterModule.forRoot(appRoutes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }