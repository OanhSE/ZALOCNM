import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {DeleteUserComponent} from './delete-user/delete-user.component';
import {AuthGuard} from '../../_helpers';
import {LogoutUserComponent} from './logout-user/logout-user.component';
import {TranferUserComponent} from './tranfer-user/tranfer-user.component';
import {UpdateInformationUserComponent} from './update-information-user/update-information-user.component';
import {PersonalPageComponent} from './personal-page.component';
import {EditPhoneUserComponent} from './edit-phone-user/edit-phone-user.component';
import {EditPassUserComponent} from './edit-pass-user/edit-pass-user.component';

const routes: Routes = [
  {
    path: '', component: PersonalPageComponent,
    children: [
      {path: 'delete-user', component: DeleteUserComponent, canActivate: [AuthGuard]},
      {path: 'edit-pass-user', component: EditPassUserComponent, canActivate: [AuthGuard]},
      {path: 'edit-phone-user', component: EditPhoneUserComponent, canActivate: [AuthGuard]},
      {path: 'log-out-user', component: LogoutUserComponent, canActivate: [AuthGuard]},
      {path: 'tranfer-user', component: TranferUserComponent, canActivate: [AuthGuard]},
      {path: 'update-information-user', component: UpdateInformationUserComponent, canActivate: [AuthGuard]},
      { path: '', redirectTo: 'update-information-user', pathMatch: 'full'}

    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PersonalPageRoutingModule { }
