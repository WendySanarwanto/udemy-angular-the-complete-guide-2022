import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  @ViewChild('myform')
  private myForm?: NgForm;
  submitted: boolean = false;
  defaultSubscription: string = 'advanced';
  formData = {
    email: '',
    subscriptionType: '',
    password: ''
  };

  onSubmit() {
    this.formData.email = this.myForm?.value.email;
    this.formData.password = this.myForm?.value.password;
    this.formData.subscriptionType = this.myForm?.value.subscription;
    this.submitted = true;
    this.myForm?.reset();
  }
}
