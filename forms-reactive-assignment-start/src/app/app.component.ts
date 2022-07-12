import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ForbiddenProjectNameAsyncValidator } from './forbidden-projectname-async-validator';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  projectForm: FormGroup = new FormGroup({
    'projectname': new FormControl(null, { 
      validators: Validators.required, 
      asyncValidators: this.forbiddenProjectNameAsyncValidator.validate.bind(this.forbiddenProjectNameAsyncValidator) 
    }),
    'email': new FormControl(null, [Validators.required, Validators.email]),
    'status': new FormControl('stable', Validators.required)
  });

  constructor(private forbiddenProjectNameAsyncValidator: ForbiddenProjectNameAsyncValidator) {}

  onSubmit() {
    console.log(this.projectForm?.value);
    console.log(this.projectForm);
  }
}
