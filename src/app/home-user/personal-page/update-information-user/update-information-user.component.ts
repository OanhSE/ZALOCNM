import { Component, OnInit } from '@angular/core';
import {User} from '@app/_models';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {AccountService, AlertService} from '@app/_services';
import {first} from 'rxjs/operators';
import {BehaviorSubject} from 'rxjs';

@Component({
  selector: 'app-update-information-user',
  templateUrl: './update-information-user.component.html',
  styleUrls: ['./update-information-user.component.less']
})
export class UpdateInformationUserComponent implements OnInit {

  user: User;
  form: FormGroup;
  id: string;
  isAddMode: boolean;
  loading = false;
  submitted = false;
  userSubject: BehaviorSubject<User>;
  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private accountService: AccountService,
    private alertService: AlertService
  ) {
     this.accountService.user.subscribe(x => this.user = x);
    // this.user = this.accountService.user;
     this.id = this.user.id;

  }

  // tslint:disable-next-line:typedef
  ngOnInit() {

    this.form = this.formBuilder.group({
    
      id: [this.user.id, Validators.required],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      phone: ['', Validators.required],
      birthday: ['', Validators.required],
      sex: ['', Validators.required],
      username: ['', Validators.required],
      password: ['', Validators.required]

    });
    this.accountService.user
      .subscribe(x => this.form.patchValue(x));
    // this.user = this.accountService.user;

  }

  // convenience getter for easy access to form fields
  // tslint:disable-next-line:typedef
  get f() { return this.form.controls; }

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

    this.updateUser();

  }
  // tslint:disable-next-line:typedef
  private updateUser(){
    this.userSubject = new BehaviorSubject<User>(this.form.value);
    this.accountService.update(this.userSubject.value)
      .pipe(first())
      .subscribe({
        next: () => {
          this.alertService.success('Cập nhật thành công', { keepAfterRouteChange: true });
          this.router.navigate(['../'], { relativeTo: this.route });
        },
        error: error => {
          this.alertService.error(error);
          this.loading = false;
        }
      });
  }


}
