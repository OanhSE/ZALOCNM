import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EditPassUserComponent } from './edit-pass-user/edit-pass-user.component';
import { UpdateInformationUserComponent } from './update-information-user/update-information-user.component';
import { TranferUserComponent } from './tranfer-user/tranfer-user.component';
import { EditPhoneUserComponent } from './edit-phone-user/edit-phone-user.component';
import { DeleteUserComponent } from './delete-user/delete-user.component';
import { LogoutUserComponent } from './logout-user/logout-user.component';



@NgModule({
  declarations: [EditPassUserComponent, UpdateInformationUserComponent, TranferUserComponent, EditPhoneUserComponent, DeleteUserComponent, LogoutUserComponent],
  imports: [
    CommonModule
  ]
})
export class PersonalPageModule { }
