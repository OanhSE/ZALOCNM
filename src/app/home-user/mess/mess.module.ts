import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MessRoutingModule } from './mess-routing.module';
import { MessComponent } from './mess.component';


@NgModule({
  declarations: [MessComponent],
  imports: [
    CommonModule,
    MessRoutingModule
  ]
})
export class MessModule { }
