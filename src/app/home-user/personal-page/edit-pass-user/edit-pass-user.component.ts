import { Component, OnInit } from '@angular/core';
import {User} from '@app/_models';
import {ActivatedRoute, Router} from '@angular/router';
import {AccountService, AlertService} from '@app/_services';
import {AppComponent} from '@app/app.component';
import {BehaviorSubject} from 'rxjs';
import {first} from 'rxjs/operators';

@Component({
  selector: 'app-edit-pass-user',
  templateUrl: './edit-pass-user.component.html',
  styleUrls: ['./edit-pass-user.component.less']
})
export class EditPassUserComponent implements OnInit {

  user: User = new User();
  pwd = null;
  old = null;
  confirm = null;
  new = null;
  fake: User = new User();
  userSubject: BehaviorSubject<User>;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private accountService: AccountService,
    private alertService: AlertService,
    private u: AppComponent) {

  }

  ngOnInit(): void {
    this.user = this.u.getUser();

    // this.fake = this.u.getUser();
    console.log(this.user.id);
    this.getUser(this.user.id);
    this.pwd = this.user.password;
  }

  // tslint:disable-next-line:typedef
  getUser(id) {
    this.accountService.getById(id)
      .subscribe((data: User) => {
        /*this.category = data;*/
        this.user = data;
        console.log(data);
      });
  }

  // tslint:disable-next-line:typedef
  editPhone() {

    if (this.user.password === this.fake.old) {
      if ((this.fake.password === this.fake.confirmp) && (this.fake.password !== null)) {
        this.user.password = this.fake.password;
        this.userSubject = new BehaviorSubject<User>(this.user);
        this.accountService.update(this.userSubject.value)
          .pipe(first())
          .subscribe({
            next: () => {
              this.alertService.success('Cập nhật thành công', {keepAfterRouteChange: true});
              this.router.navigate(['../'], {relativeTo: this.route});
            },
            error: error => {
              this.alertService.error(error);

            }
          });
      } else {

        alert('xac thuc password khong trung khop');
      }
    } else {
      alert('password nhap vao khong hop le');
}
  }


  // tslint:disable-next-line:typedef
  oldPwd(event: any) {
    this.old = event;
    console.log(this.old);
  }


  // tslint:disable-next-line:typedef
  newPwd(event: string) {
    this.new = event;
  }


  // tslint:disable-next-line:typedef
  confirmPwd(event: string) {
    this.confirm = event;
  }



}
