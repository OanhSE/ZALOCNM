import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';

import { AccountService, AlertService } from '@app/_services';
import validate = WebAssembly.validate;
import { DatePipe } from '@angular/common';
import {User} from '../_models';
import * as firebase from 'firebase';

@Component({ templateUrl: './register.component.html' })
export class RegisterComponent implements OnInit {
    form: FormGroup;
    loading = false;
    submitted = false;
    dateCurrent = new Date();
    date = false;
    isShowErrorDate = false;
    users: User[] = new Array();
    u: User;

     constructor(
        private formBuilder: FormBuilder,
        private route: ActivatedRoute,
        private router: Router,
        private accountService: AccountService,
        private alertService: AlertService
    ) {
       this.accountService.getAll().subscribe(x => this.users = x);

     }

  // tslint:disable-next-line:typedef
    ngOnInit() {
        this.form = this.formBuilder.group({
            firstName: ['', [Validators.required, Validators.pattern('^[A-Za-z]+')]],
            lastName: ['', [Validators.required, Validators.pattern('^[A-Za-z]+')]],
            phone: ['', [Validators.required, Validators.maxLength(10), Validators.minLength(10), Validators.pattern('[0-9]{10}')]],
            birthday: ['', Validators.required],
            sex: ['', Validators.required],
            username: ['', Validators.required],
            password: ['', [Validators.required, Validators.minLength(6)]],
            password2: ['', [Validators.required, Validators.minLength(6)]]
        });
    }

    // convenience getter for easy access to form fields
  // tslint:disable-next-line:typedef
    get f() { return this.form.controls; }
    checkPass(): boolean {
      const pass = this.form.get('password').value;
      const pass2 = this.form.get('password2').value;
      if (pass === pass2){
        return  false;
      }
      return true;
    }
    checkPhone(): boolean{
         const phone = this.form.get('phone').value;
         // this.accountService.getByPhone(phone).subscribe(x => {
         //   this.u = x;
         // });
         // if (this.u == null){
         //   return true;
         // }
         return false;
    }

  // tslint:disable-next-line:typedef
    checkDate(){

        const birthday = new Date(this.form.get('birthday').value);
        console.log(birthday);

      // tslint:disable-next-line:prefer-const
        let now = new Date();
      // tslint:disable-next-line:variable-name
        const current_year = now.getFullYear();
      // tslint:disable-next-line:variable-name
        const year_diff = current_year - birthday.getFullYear();
      // tslint:disable-next-line:variable-name
        const birthday_this_year = new Date(current_year, birthday.getMonth(), birthday.getDate());
      // tslint:disable-next-line:variable-name
        const has_had_birthday_this_year = (now >= birthday_this_year);

        const age = has_had_birthday_this_year
            ? year_diff
            : year_diff - 1;

        if (age < 18){
            this.isShowErrorDate = true;
        }
        else{
            this.isShowErrorDate = false;
        }

        console.log(age);
        console.log(this.isShowErrorDate);

    }

  // tslint:disable-next-line:typedef
    onSubmit() {
        this.submitted = true;

        // reset alerts on submit
        this.alertService.clear();

        // stop here if form is invalid
        if (this.form.invalid) {
            return;
        }
        if (this.checkPass()) {
          return;
        }
        if (this.checkPhone()) {
          return;
        }

        this.loading = true;
        this.accountService.register(this.form.value)
            .pipe(first())
            .subscribe({
                next: () => {
                    this.alertService.success('Đăng kí thành công', { keepAfterRouteChange: true });
                    // this.router.navigate(['/']);
                    const phone = this.form.get('phone').value;
                    const password = this.form.get('password').value;

                    // this.accountService.login(this.form.get('phone').value, this.form.get('password').value);
                    this.accountService.login(phone, password)
                        .pipe(first())
                        .subscribe({
                            next: () => {
                                // get return url from query parameters or default to home page
                                this.alertService.success('Đăng nhập thành công', { keepAfterRouteChange: true });
                                const returnUrl = this.route.snapshot.queryParams.returnUrl || '/';
                                this.router.navigateByUrl(returnUrl);
                            },
                            error: error => {
                                this.alertService.error(error);
                                this.loading = false;
                            }
                        });
                },
                error: error => {
                    this.alertService.error(error);
                    this.loading = false;
                }
            });
    }
}
