
import { AbstractControl, ValidationErrors } from '@angular/forms';
import {AppComponent} from '@app/app.component';
import {User} from '@app/_models';


export class EditPassValidators {
  static u: AppComponent;
  user: User = new User();
  static shouldBe1234(control: AbstractControl): Promise<ValidationErrors | null> {
    return new Promise((resolve, reject) => {
        if (control.value !== this.u.getUser().password) {
          resolve({ shouldBe1234: true });
        }
        else {
          resolve(null);
        }
    });
  }

  // tslint:disable-next-line:typedef
  static matchPwds(control: AbstractControl) {
    const newPwd2 = control.get('newPwd');
    const confirmPwd2 = control.get('confirmPwd');
    if (newPwd2.value !== confirmPwd2.value){
      return { pwdsDontMatch: true };
    }
    return null;
  }
}
