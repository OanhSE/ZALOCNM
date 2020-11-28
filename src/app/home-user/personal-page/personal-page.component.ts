import { Component, OnInit } from '@angular/core';
import {User} from '@app/_models';
import {AccountService} from '@app/_services';

@Component({
  selector: 'app-personal-page',
  templateUrl: './personal-page.component.html',
  styleUrls: ['./personal-page.component.less']
})
export class PersonalPageComponent implements OnInit {

  user: User;

  constructor(private accountService: AccountService) {
    this.accountService.user.subscribe(x => this.user = x);
    // this.user = this.accountService.user;
  }

  // tslint:disable-next-line:typedef
  logout() {
    this.accountService.logout();
  }
  // tslint:disable-next-line:typedef
  public getUser(){
    return this.user;
  }

  ngOnInit(): void {
  }

}
