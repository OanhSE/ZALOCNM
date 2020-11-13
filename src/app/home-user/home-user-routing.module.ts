import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {AuthGuard} from '@app/_helpers';
import {HomeUserComponent} from '@app/home-user/home-user.component';
const  directoryModule = () => import('./directory/directory.module').then(x => x.DirectoryModule);
const  messModule = () => import('./mess/mess.module').then(x => x.MessModule);
const  personalPageModule = () => import('./personal-page/personal-page.module').then(x => x.PersonalPageModule);

const routes: Routes = [
  {
    path: '', component: HomeUserComponent,
    children: [
      { path: 'directory', loadChildren: directoryModule, canActivate: [AuthGuard] },
      { path: 'mess', loadChildren: messModule, canActivate: [AuthGuard] },
      { path: 'person', loadChildren: personalPageModule, canActivate: [AuthGuard] },
      { path: '', redirectTo: 'person', pathMatch: 'full'}

    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeUserRoutingModule { }
