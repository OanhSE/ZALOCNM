import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import { AccountService, AlertService } from '@app/_services';
@Component({
  selector: 'app-edit-phone',
  templateUrl: './edit-phone.component.html',
  styleUrls: ['./edit-phone.component.less']
})
export class EditPhoneComponent implements OnInit {

     form: FormGroup;
     id: string;
     isAddMode: boolean;
     loading = false;
     submitted = false;

     constructor(
         private formBuilder: FormBuilder,
         private route: ActivatedRoute,
         private router: Router,
         private accountService: AccountService,
         private alertService: AlertService
     ) {}

     ngOnInit() {
         this.id = this.route.snapshot.params['id'];
         this.isAddMode = !this.id;


         this.form = this.formBuilder.group({
                        oldPhone: ['', Validators.required],
                        newPhone: ['', Validators.required]
         });

         if (!this.isAddMode) {
             this.accountService.getById(this.id)
                 .pipe(first())
                 .subscribe(x => this.form.patchValue(x));
         }
     }

     // convenience getter for easy access to form fields
     get f() { return this.form.controls; }


}
