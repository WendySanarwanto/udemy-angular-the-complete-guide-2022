import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { ForbiddenEmailAsyncValidator } from './forbidden-email-async-validator';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  genders = ['male', 'female'];
  signUpForm: FormGroup = new FormGroup({
    'userData': new FormGroup({
      'username': new FormControl(null, [Validators.required, this.checkForbiddenNames.bind(this)]),
      'email': new FormControl(null, { validators: [Validators.required, Validators.email], asyncValidators: [this.forbiddenEmailAsyncValidator.validate.bind(this.forbiddenEmailAsyncValidator)] }),
    }),
    'gender': new FormControl('male'),
    'hobbies': new FormArray([])
  });
  forbiddenUsernames = ['Chris', 'Anna'];
  
  constructor(private forbiddenEmailAsyncValidator: ForbiddenEmailAsyncValidator) {}

  ngOnInit(): void {
    // Listenning to valueChanges event on form
    this.signUpForm.valueChanges.subscribe((value) => {
      console.log(value);
    });

    // Listenning to statusChangs event on Form
    this.signUpForm.statusChanges.subscribe((status) => {
      console.log(status);
    });
    // Setting value / patching values on form , programmatically
    this.signUpForm.setValue({
      'userData': {
        'username': 'Max',
        'email': 'max@udemy.com'
      },
      'gender': 'male',
      'hobbies': []
    });

    this.signUpForm.patchValue({

    });
  }

  onSubmit() {
    console.log(this.signUpForm);
    this.signUpForm.reset();
  }

  onAddHobby() {
    const control = new FormControl(null, Validators.required);
    (<FormArray>this.signUpForm.get('hobbies')).push(control);
  }

  getHobbiesControls() {
    return (<FormArray>this.signUpForm.get('hobbies')).controls;
  }

  checkForbiddenNames(control: FormControl): {[s: string]: boolean} | null {
    if (control.value !== null && this.forbiddenUsernames.indexOf(control.value) !== -1) {
      return {'nameIsForbidden': true};
    }

    return null;
  }
}
