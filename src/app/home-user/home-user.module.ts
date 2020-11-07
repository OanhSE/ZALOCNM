import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MessComponent } from './mess/mess.component';
import { PersonalPageComponent } from './personal-page/personal-page.component';
import { DirectoryComponent } from './directory/directory.component';



@NgModule({
  declarations: [MessComponent, PersonalPageComponent, DirectoryComponent],
  imports: [
    CommonModule
  ]
})
export class HomeUserModule { }
