import { Component, OnInit } from '@angular/core';
import {User} from '@app/_models';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {AccountService, AlertService} from '@app/_services';
import {first} from 'rxjs/operators';
import {BehaviorSubject} from 'rxjs';
import {transformAll} from '@angular/compiler/src/render3/r3_ast';
import {Formatter} from 'tslint/lib/formatters/pmdFormatter';
import {DatePipe, formatDate} from '@angular/common';

@Component({
  selector: 'app-update-information-user',
  templateUrl: './update-information-user.component.html',
  styleUrls: ['./update-information-user.component.less'],
  providers:[DatePipe]
})
export class UpdateInformationUserComponent implements OnInit {
  date: Date;
  user: User;
  form: FormGroup;
  sex: string;
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
    private alertService: AlertService,
    private datePipe: DatePipe
  ) {
     this.accountService.user.subscribe(x => this.user = x);
    // this.user = this.accountService.user;
     this.id = this.user.id;

  }

  // tslint:disable-next-line:typedef
  ngOnInit() {
    console.log("inside update info");

    this.form = this.formBuilder.group({
      id: [this.user.id, Validators.required],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      phone: ['', [Validators.required, Validators.maxLength(10), Validators.minLength(10), Validators.pattern('[0-9]{10}')]],
      birthday: ['', Validators.required],
      sex: ['', Validators.required],
      username: ['', Validators.required],
      password: ['', Validators.required]

    });
    this.accountService.user
      .subscribe(x => {
            this.form.patchValue(x);
      });
    // this.user = this.accountService.user;


    
    // console.log()
    // let date = this.form.get('sex').value;
    let date = this.form.get('birthday').value;
    this.form.controls.birthday.setValue(this.datePipe.transform(date ,'yyyy-MM-dd','en'));

    this.sex = this.form.get('sex').value;
    console.log(this.form.get('sex').value)
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
    this.Huy();

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

  private Huy(){
    
    this.router.navigate(['../'], { relativeTo: this.route });
       
  }


}
