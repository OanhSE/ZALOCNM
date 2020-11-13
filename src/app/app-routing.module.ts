import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './_helpers';
const accountModule = () => import('./account/account.module').then(x => x.AccountModule);
const homeUserModule = () => import('./home-user/home-user.module').then(x => x.HomeUserModule);



const routes: Routes = [

      { path: '', loadChildren: homeUserModule, canActivate: [AuthGuard] },
      { path: 'account', loadChildren: accountModule },
      { path: '**', redirectTo: '' }

];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
