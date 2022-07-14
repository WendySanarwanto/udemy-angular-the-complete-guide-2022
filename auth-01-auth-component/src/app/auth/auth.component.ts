import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from './auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html'
})
export class AuthComponent {
  isLoginMode: boolean = true;

  constructor(private authService: AuthService) {}

  onSwitchMode() {
    this.isLoginMode = !this.isLoginMode;
  }

  async onSubmit(form: NgForm) {
    // console.log(form.value);
    const email = form.value.email;
    const password = form.value.password;
    if (!form.valid) {
      return;
    }
    
    if (!this.isLoginMode) {
      try{
        await this.authService.signUp(email, password);
      } catch(err){
        // TODO: Display nice error message to user
        console.log(err);
      }
    }
    form.reset();
  }
}
