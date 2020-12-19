import { Component, OnInit } from '@angular/core';
import {User} from '@app/_models';
import {ActivatedRoute, Router} from '@angular/router';
import {AccountService, AlertService} from '@app/_services';
import {AppComponent} from '@app/app.component';
import {BehaviorSubject} from 'rxjs';
import {first} from 'rxjs/operators';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

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
  form: FormGroup;

  // oldPassword: new FormControl('', Validators.required),
  // newPassword: new FormControl( '', [Validators.required, Validators.minLength(6)]),
  // reNewPassword: new FormControl('', [Validators.required])

  fake: User = new User();
  userSubject: BehaviorSubject<User>;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private accountService: AccountService,
    private alertService: AlertService,
    private u: AppComponent,
    private formBuilder: FormBuilder
    ) {

  }

  ngOnInit(): void {
    this.user = this.u.getUser();
    console.log(this.user.password);

    // // this.fake = this.u.getUser();
    // console.log(this.user.id);
    // this.getUser(this.user.id);
    // this.pwd = this.user.password;

    this.form = this.formBuilder.group({
      oldPassword: ['', Validators.required],
      newPassword: ['', [Validators.required, Validators.minLength(6)]],
      reNewPassword: ['', [Validators.required]]
  });

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
    const oldPassword = this.form.get('oldPassword').value;
    const newPassword = this.form.get('newPassword').value;
    console.log(this.form);
    const reNewPassword = this.form.get('reNewPassword').value;
    this.alertService.clear();

    if (this.form.invalid){
      // console.log("invalid")
      if (oldPassword === ''){
        this.alertService.error('Vui lòng nhập password cũ.');
      }
      if (newPassword === ''){
        this.alertService.error('Vui lòng nhập password mới.');
      }
      if (newPassword.length < 6){
        this.alertService.error('Vui lòng nhập password mới dài hơn 6 kí tự.');
      }
      return;
    }
    console.log(this.form.get('newPassword'));
     // stop here if form is invalid
    console.log(this.form.errors);
    // console.log(this.form.get('newPassword').)


    if (this.user.password === oldPassword) {
      if ((newPassword === reNewPassword) && (newPassword !== null)) {
        this.user.password = newPassword;
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

        this.form.reset();
      } else {

        alert('Xác thực mật khẩu không khớp.');
      }
    } else {
      alert('Vui lòng nhập đúng password cũ.');
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
