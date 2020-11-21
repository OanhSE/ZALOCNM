import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DirectoryRoutingModule } from './directory-routing.module';
import { DirectoryComponent } from './directory.component';
import { DirectoryChatComponent } from './directory-chat/directory-chat.component';


@NgModule({
  declarations: [DirectoryComponent, DirectoryChatComponent],
  imports: [
    CommonModule,
    DirectoryRoutingModule
  ]
})
export class DirectoryModule { }
