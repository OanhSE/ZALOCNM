import { Component, OnInit } from '@angular/core';
import {User} from '@app/_models';
import {AccountService} from '@app/_services';

@Component({
  selector: 'app-home-user',
  templateUrl: './home-user.component.html',
  styleUrls: ['./home-user.component.less']
})
export class HomeUserComponent implements OnInit {
  user: User;

  constructor(private accountService: AccountService) {
    // this.user = this.accountService.user;
    this.accountService.user.subscribe(x => this.user = x);
  }
  ngOnInit(): void {
  }

}
