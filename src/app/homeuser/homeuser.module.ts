import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeuserComponent } from './homeuser.component';
import { PersonalPageComponent } from './personal-page/personal-page.component';
import { DirectoryComponent } from './directory/directory.component';



@NgModule({
  declarations: [HomeuserComponent, PersonalPageComponent, DirectoryComponent],
  imports: [
    CommonModule,
    PersonalPageComponent
  ]
})
export class HomeuserModule { }
