import {Component, OnInit} from '@angular/core';
import {FormGroup, FormControl, FormBuilder, Validators} from '@angular/forms';
import {EditPassValidators} from './edit-pass.validators';
import {User} from '@app/_models';
import {ActivatedRoute, Router} from '@angular/router';
import {AccountService, AlertService} from '@app/_services';
import {AppComponent} from '@app/app.component';

@Component({

  templateUrl: './edit-pass.component.html',

})
export class EditPassComponent implements OnInit {
  // form: FormGroup;
  user: User = new User();
  pwd = null;
  old = null;
  confirm = null;
  new = null;
  fake: User = new User();

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
      if (this.fake.password === this.fake.confirmp && this.fake.password !== null) {
        this.user.password = this.fake.password;
        this.accountService.update(this.user.id, this.user).subscribe(response => {
            alert('success');
            /*this.message = 'The tutorial was updated successfully!';*/
            // this.router.navigate(['/']);
          },
          error => {
            console.log(error);
            alert('error');
          });
      } else {
        // tslint:disable-next-line:no-unused-expression
        error => {
          alert('xac thuc password khong trung khop');
        };
      }
    } else {
      // tslint:disable-next-line:no-unused-expression
      error => {
        alert('password nhap vao khong hop le');
      };
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
