import { Component, OnInit } from '@angular/core';
import {User} from '@app/_models';
import {Router} from '@angular/router';
import {AccountService} from '@app/_services';
import {first} from 'rxjs/operators';

@Component({
  selector: 'app-delete-user',
  templateUrl: './delete-user.component.html',
  styleUrls: ['./delete-user.component.less']
})
export class DeleteUserComponent implements OnInit {

  users = null;
  user: User;
  constructor(
    private router: Router,
    private accountService: AccountService) {
     this.accountService.user.subscribe(x => this.user = x);
    // this.user = this.accountService.user;
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
