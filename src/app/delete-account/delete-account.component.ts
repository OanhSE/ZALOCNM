import { Component, OnInit } from '@angular/core';
import {first} from 'rxjs/operators';
import {AccountService} from '@app/_services';
import {User} from '@app/_models';
import {Router} from '@angular/router';

@Component({
  selector: 'app-delete-account',
  templateUrl: './delete-account.component.html',
  styleUrls: ['./delete-account.component.less']
})
export class DeleteAccountComponent implements OnInit {
  users = null;
  user: User;
  constructor(
    private router: Router,
    private accountService: AccountService) {
    this.accountService.user.subscribe(x => this.user = x);
  }

  ngOnInit(): void {
    this.accountService.getAll()
      .pipe(first())
      .subscribe(users => this.users = users);
  }
  // tslint:disable-next-line:typedef
  deleteUser(id: string) {

    const user = this.users.find(x => x.id === id);

    this.accountService.delete(id)
      .pipe(first())
      .subscribe(() => this.users = this.users.filter(x => x.id !== id));
  }

}
