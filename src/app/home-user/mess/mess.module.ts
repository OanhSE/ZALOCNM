import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MessRoutingModule } from './mess-routing.module';
import { MessComponent } from './mess.component';
import { MessChatComponent } from './mess-chat/mess-chat.component';
import {FormsModule} from '@angular/forms';
import {Ng2SearchPipeModule} from 'ng2-search-filter';



@NgModule({
  declarations: [MessComponent, MessChatComponent],
  imports: [
    CommonModule,
    MessRoutingModule,
    FormsModule,
    Ng2SearchPipeModule,

  ]
})
export class MessModule { }
