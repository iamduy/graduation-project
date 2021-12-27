import { Injectable } from '@angular/core';
import { ValidatorFn, AbstractControl, FormGroup } from '@angular/forms';
@Injectable({
  providedIn: 'root'
})
export class CustomValidationService {



  regexName(): ValidatorFn {
    return (ctrl: AbstractControl): { [key: string]: any } => {
      if (!ctrl.value) return null;
      const regex = new RegExp(/^[a-zA-ZÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêếìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ\s]{1,24}$/)
      const valid = regex.test(ctrl.value)
      return valid ? null : { invalidName: true }
    }
  }
  regexText(): ValidatorFn {
    return (ctrl: AbstractControl): { [key: string]: any } => {
      if (!ctrl.value) return null;
      const regex = new RegExp(/^[,a-zA-Z0-9ÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêếìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ\s]{5,100}$/)
      const valid = regex.test(ctrl.value)
      return valid ? null : { invalidText: true }
    }
  }
  regexLocation(): ValidatorFn {
    return (ctrl: AbstractControl): { [key: string]: any } => {
      if (!ctrl.value) return null;
      const regex = new RegExp(/^[,a-zA-Z0-9ÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêếìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ\s]{10,100}$/)
      const valid = regex.test(ctrl.value)
      return valid ? null : { invalidText: true }
    }
  }
  regexPhone(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } => {
      if (!control.value) return null
      const regex = new RegExp(/^(84|0[3|5|7|8|9])+([0-9]{8})\b/)
      const valid = regex.test(control.value)
      return valid ? null : { invalidPhone: true }
    }
  }
  regexCCCD(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } => {
      if (!control.value) return null
      const regex = new RegExp(/^(\d{9}|\d{12})$/)
      const valid = regex.test(control.value)
      return valid ? null : { invalidCCCD: true }
    }
  }
  regexStudentCode(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } => {
      if (!control.value) return null
      const regex = new RegExp(/^[a-zA-Z0-9]{4,15}$/)
      const valid = regex.test(control.value)
      return valid ? null : { invalidStudentCode: true }
    }
  }
  regexNumber(value: boolean): ValidatorFn {

    return (control: AbstractControl): { [key: string]: any } => {
      if (!control.value) return null
      let valid
      if (value === true) {
        const regex = new RegExp(/^[1-6\s]{1}$/);
        valid = regex.test(control.value)
      } else {
        const regex = new RegExp(/^[0-9]{0,9}$/);
        valid = regex.test(control.value)
      }
      return valid ? null : { invalidNumber: true }
    };


  }

  regexPassword(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } => {
      if (!control.value) return null
      const regex = new RegExp(/^(?=.*?[a-z])(?=.*?[0-9]).{8,}$/);
      const valid = regex.test(control.value)
      return valid ? null : { invalidPassword: true }
    };
  }
  MatchPassword(password: string, confirmPassword: string) {
    return (formGroup: FormGroup) => {
      const passwordControl = formGroup.controls[password];
      const confirmPasswordControl = formGroup.controls[confirmPassword];

      if (!passwordControl || !confirmPasswordControl) {
        return null;
      }

      if (confirmPasswordControl.errors && !confirmPasswordControl.errors.passwordMismatch) {
        return null;
      }

      if (passwordControl.value !== confirmPasswordControl.value) {
        confirmPasswordControl.setErrors({ passwordMismatch: true });
      } else {
        confirmPasswordControl.setErrors(null);
      }
    }
  }
}
