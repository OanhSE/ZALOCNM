import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {MessComponent} from './mess.component';

const routes: Routes = [
  { path: '', component: MessComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MessRoutingModule { }
