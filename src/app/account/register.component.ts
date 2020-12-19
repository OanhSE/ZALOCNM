import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';

import { AccountService, AlertService } from '@app/_services';
import validate = WebAssembly.validate;
import { DatePipe } from '@angular/common';

@Component({ templateUrl: './register.component.html' })
export class RegisterComponent implements OnInit {
    form: FormGroup;
    loading = false;
    submitted = false;
    dateCurrent = new Date();
    date = false;
    isShowErrorDate = false;
     constructor(
        private formBuilder: FormBuilder,
        private route: ActivatedRoute,
        private router: Router,
        private accountService: AccountService,
        private alertService: AlertService
    ) { }

  // tslint:disable-next-line:typedef
    ngOnInit() {
        this.form = this.formBuilder.group({
            firstName: ['', Validators.required, Validators.pattern('^[A-Za-z]+[A-Z a-z]')],
            lastName: ['', Validators.required],
            phone: ['', [Validators.required, Validators.maxLength(10), Validators.minLength(10), Validators.pattern('[0-9]{10}')]],
            birthday: ['', Validators.required],
            sex: ['', Validators.required],
            username: ['', Validators.required],
            password: ['', [Validators.required, Validators.minLength(6)]]
        });
    }

    // convenience getter for easy access to form fields
  // tslint:disable-next-line:typedef
    get f() { return this.form.controls; }
    checkDate(){

        let birthday = new Date(this.form.get('birthday').value);
        console.log(birthday);

        var now = new Date();
        var current_year = now.getFullYear();
        var year_diff = current_year - birthday.getFullYear();
        var birthday_this_year = new Date(current_year, birthday.getMonth(), birthday.getDate());
        var has_had_birthday_this_year = (now >= birthday_this_year);

        let age = has_had_birthday_this_year
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

        this.loading = true;
        this.accountService.register(this.form.value)
            .pipe(first())
            .subscribe({
                next: () => {
                    this.alertService.success('Đăng kí thành công', { keepAfterRouteChange: true });
                    // this.router.navigate(['/']);
                    let phone = this.form.get('phone').value;
                    let password = this.form.get('password').value;

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
