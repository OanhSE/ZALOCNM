import {Component, OnInit} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {first} from 'rxjs/operators';
import {AccountService, AlertService} from '@app/_services';
import {User} from '@app/_models';
import {AppComponent} from '@app/app.component';

@Component({
  selector: 'app-edit-phone',
  templateUrl: './edit-phone.component.html',
  styleUrls: ['./edit-phone.component.less']
})
export class EditPhoneComponent implements OnInit {
  form: FormGroup;
  id: string;
  // isAddMode: boolean;
  loading: boolean;
  submitted: boolean;
  user: User = new User();

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private accountService: AccountService,
    private alertService: AlertService,
    private u: AppComponent
  ) {
  }


  // tslint:disable-next-line:typedef
  ngOnInit() {
    /*this.form = this.formBuilder.group({
      id: [''],
      oldPhone: ['', Validators.required],
      newPhone: ['', Validators.required]
    });*/
    this.submitted = false;
    this.loading = false;
    // this.id = this.route.snapshot.paramMap.get('id');
//    const result = JSON.parse(window.localStorage.getItem())
    console.log(this.id);
    // console.log(this.form.value.id);
    // this.isAddMode = !this.id;
    this.user = this.u.getUser();
    console.log(this.user.id);
    this.getUser(this.user.id);

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


  // convenience getter for easy access to form fields
  /*get f() {
    return this.form.controls;
  }*/

  // tslint:disable-next-line:typedef
  editPhone() {
    this.submitted = true;
    this.accountService.update(this.user.id, this.user)
      .subscribe(response => {
          alert('success');
          /*this.message = 'The tutorial was updated successfully!';*/
         // this.router.navigate(['/']);
          },
        error => {
          console.log(error);
          alert('error');
        });
  }


}
