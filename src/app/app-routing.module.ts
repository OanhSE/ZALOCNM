import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home';
import { EditPassComponent } from  './edit-pass/edit-pass.component';
import { EditPhoneComponent } from './edit-phone/edit-phone.component'
;
import { UpdateInformationComponent } from './update-information/update-information.component'
;
import { DeleteAccountComponent } from './delete-account/delete-account.component'
;
import { TransferAccountComponent } from './transfer-account/transfer-account.component'
;
import { MessagerComponent } from './messager/messager.component'
;
import { DirectoryComponent } from './directory/directory.component'
;
import { AuthGuard } from './_helpers';

const accountModule = () => import('./account/account.module').then(x => x.AccountModule);
const usersModule = () => import('./users/users.module').then(x => x.UsersModule);

const routes: Routes = [
    { path: '', component: HomeComponent, canActivate: [AuthGuard] },
    { path: 'users', loadChildren: usersModule, canActivate: [AuthGuard] },
    { path: 'account', loadChildren: accountModule },
    { path: 'editpass', component: EditPassComponent, canActivate: [AuthGuard] },
    { path: 'mess', component: MessagerComponent, canActivate: [AuthGuard] },
    { path: 'directory', component: DirectoryComponent, canActivate: [AuthGuard] },
    { path: 'editphone', component: EditPhoneComponent, canActivate: [AuthGuard] },
    { path: 'updateinformation', component: UpdateInformationComponent, canActivate: [AuthGuard] },
    { path: 'deleteaccount', component: DeleteAccountComponent, canActivate: [AuthGuard] },
    { path: 'transferaccount', component: TransferAccountComponent, canActivate: [AuthGuard] },

    // otherwise redirect to home
    { path: '**', redirectTo: '' }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
