import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DirectoryRoutingModule } from './directory-routing.module';
import { DirectoryComponent } from './directory.component';
import { DirectoryChatComponent } from './directory-chat/directory-chat.component';
import {FormsModule} from '@angular/forms';
import {Ng2SearchPipeModule} from 'ng2-search-filter';
import { DirectoryFriendTargetComponent } from './directory-friend-target/directory-friend-target.component';

@NgModule({
  declarations: [DirectoryComponent, DirectoryChatComponent, DirectoryFriendTargetComponent],
    imports: [
        CommonModule,
        DirectoryRoutingModule,
        FormsModule,
        Ng2SearchPipeModule,
    ]
})
export class DirectoryModule { }
