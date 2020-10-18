
import { Component } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { EditPassValidators } from './edit-pass.validators';

@Component({

  templateUrl: './edit-pass.component.html',

})
export class EditPassComponent {
  form: FormGroup;

  constructor(fb: FormBuilder){
    this.form = fb.group({
      'oldPwd': ['',Validators.required,EditPassValidators.shouldBe1234],
      'newPwd': ['',[Validators.required, Validators.minLength(6)]],
      'confirmPwd': ['',[Validators.required, Validators.minLength(6)]]
    }, {
      validator: EditPassValidators.matchPwds
    });
  }

  get oldPwd(){
    return this.form.get('oldPwd');
  }

   get newPwd(){
    return this.form.get('newPwd');
  }

   get confirmPwd(){
    return this.form.get('confirmPwd');
  }
}
