import { Component, OnInit } from '@angular/core';
import {User} from '@app/_models';
import {AccountService} from '@app/_services';

@Component({
  selector: 'app-tranfer-user',
  templateUrl: './tranfer-user.component.html',
  styleUrls: ['./tranfer-user.component.less']
})
export class TranferUserComponent implements OnInit {

  user: User;

  constructor(private accountService: AccountService) {
    this.accountService.user.subscribe(x => this.user = x);
    // this.user = this.accountService.user;
  }

  // tslint:disable-next-line:typedef
  tranferAcc() {
    this.accountService.tranferAccount();
  }
  // tslint:disable-next-line:typedef
  public getUser(){
    return this.user;
  }

  ngOnInit(): void {
  }


}
