import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {DirectoryComponent} from './directory.component';
import {DeleteUserComponent} from '../personal-page/delete-user/delete-user.component';
import {AuthGuard} from '../../_helpers';
import {EditPassUserComponent} from '../personal-page/edit-pass-user/edit-pass-user.component';
import {EditPhoneUserComponent} from '../personal-page/edit-phone-user/edit-phone-user.component';
import {LogoutUserComponent} from '../personal-page/logout-user/logout-user.component';
import {TranferUserComponent} from '../personal-page/tranfer-user/tranfer-user.component';
import {UpdateInformationUserComponent} from '../personal-page/update-information-user/update-information-user.component';
import {DirectoryChatComponent} from './directory-chat/directory-chat.component';

const routes: Routes = [
  {path: '', component: DirectoryComponent,
    children: [

      {path: 'directory-chat/:id', component: DirectoryChatComponent, canActivate: [AuthGuard]},
      {path: '', component: DirectoryChatComponent, canActivate: [AuthGuard]},


    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DirectoryRoutingModule { }
