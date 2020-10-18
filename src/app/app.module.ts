import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

// used to create fake backend
import { fakeBackendProvider } from './_helpers';

import { AppRoutingModule } from './app-routing.module';
import { JwtInterceptor, ErrorInterceptor } from './_helpers';
import { AppComponent } from './app.component';
import { AlertComponent } from './_components';
import { HomeComponent } from './home';
import { EditPassComponent } from './edit-pass/edit-pass.component';
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
@NgModule({
    imports: [
        BrowserModule,
        ReactiveFormsModule,
        HttpClientModule,
        AppRoutingModule
    ],
    declarations: [
        AppComponent,
        AlertComponent,
        HomeComponent ,
        EditPassComponent ,
        EditPhoneComponent ,
        UpdateInformationComponent,
        DirectoryComponent,
        MessagerComponent,
        TransferAccountComponent,
        DeleteAccountComponent],
    providers: [
        { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
        { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },

        // provider used to create fake backend
        fakeBackendProvider
    ],
    bootstrap: [AppComponent]
})
export class AppModule { };
