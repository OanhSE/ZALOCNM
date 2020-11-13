import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PersonalPageRoutingModule } from './personal-page-routing.module';
import { PersonalPageComponent } from './personal-page.component';
import { EditPassUserComponent } from './edit-pass-user/edit-pass-user.component';
import { EditPhoneUserComponent } from './edit-phone-user/edit-phone-user.component';
import { UpdateInformationUserComponent } from './update-information-user/update-information-user.component';
import { DeleteUserComponent } from './delete-user/delete-user.component';
import { TranferUserComponent } from './tranfer-user/tranfer-user.component';
import { LogoutUserComponent } from './logout-user/logout-user.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';


@NgModule({
  declarations: [
    PersonalPageComponent,
    EditPassUserComponent,
    EditPhoneUserComponent,
    UpdateInformationUserComponent,
    DeleteUserComponent,
    TranferUserComponent,
    LogoutUserComponent
  ],
  imports: [
    CommonModule,
    PersonalPageRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class PersonalPageModule { }
