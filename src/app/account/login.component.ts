import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';

import { AccountService, AlertService } from '@app/_services';
import {Alert} from '../_models';

@Component({ templateUrl: 'login.component.html' })
export class LoginComponent implements OnInit {
    form: FormGroup;
    loading = false;
    submitted = false;

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
            phone: ['', Validators.required],
            password: ['', Validators.required],
        });
    }

    
    // convenience getter for easy access to form fields
  // tslint:disable-next-line:typedef
    get f() { return this.form.controls; }

  // tslint:disable-next-line:typedef

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
        this.accountService.login(this.f.phone.value, this.f.password.value)
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
    }
}
