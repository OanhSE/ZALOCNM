import { Component, OnInit } from '@angular/core';
import {User} from '@app/_models';
import {ActivatedRoute,Router} from '@angular/router';
import {AccountService, AlertService} from '@app/_services';
import {first} from 'rxjs/operators';


@Component({
  selector: 'app-delete-user',
  templateUrl: './delete-user.component.html',
  styleUrls: ['./delete-user.component.less']
})
export class DeleteUserComponent implements OnInit {
  loading = false;
  users = null;
  user: User;
  constructor(
    private route: ActivatedRoute,
    private  alertService: AlertService,
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

    this.accountService.delete(user.id)
      .pipe(first())
      .subscribe(() => this.users = this.users.filter(x => x.id !== id));

  }

  // tslint:disable-next-line:typedef
/*  deleteUser(id: string){
    const user = this.users.find(x => x.id === id);
    this.accountService.delete(user.id)
      .pipe(first())
      .subscribe({
        next: () => {
          this.alertService.success('Xoa tai khoan thanh cong', { keepAfterRouteChange: true });
          
        },
        error: error => {
          this.alertService.error('Xóa thất bại');

        }
      });
   }*/


}
