import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {MessComponent} from './mess.component';
import {MessChatComponent} from './mess-chat/mess-chat.component';
import {AuthGuard} from '../../_helpers';

const routes: Routes = [
  { path: '', component: MessComponent,
    children: [

      {path: 'mess/:id', component: MessChatComponent, canActivate: [AuthGuard]},

      {path: '', component: MessChatComponent, canActivate: [AuthGuard]},


    ]
  }

];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MessRoutingModule { }
