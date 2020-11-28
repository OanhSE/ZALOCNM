import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {AccountService} from '@app/_services';
import {User} from '@app/_models';
import {first} from 'rxjs/operators';

@Component({
  selector: 'app-directory-chat',
  templateUrl: './directory-chat.component.html',
  styleUrls: ['./directory-chat.component.less']
})
export class DirectoryChatComponent implements OnInit {
  u: User;
  user: User;
  id: string;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private accountService: AccountService,
  ) {
    this.accountService.user.subscribe(x => this.user = x);
    // this.user = this.accountService.user;
  }

  ngOnInit(): void {
    this.id = this.route.snapshot.params.id;
    if (this.id != null) {
      this.accountService.getById(this.id)
        .pipe(first())
        .subscribe(x => this.u = x);
    }else {
      this.u = this.user;
    }
  }

}
