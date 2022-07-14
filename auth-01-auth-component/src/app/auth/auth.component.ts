import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from './auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html'
})
export class AuthComponent {
  isLoginMode: boolean = true;
  isLoading: boolean = false;
  error: string | null = null;

  constructor(private authService: AuthService) {}

  onSwitchMode() {
    this.isLoginMode = !this.isLoginMode;
  }

  async onSubmit(form: NgForm) {
    // console.log(form.value);
    if (!form.valid) {
      return;
    }

    const email = form.value.email;
    const password = form.value.password;
    this.error = null;
    this.isLoading = true;

    if (!this.isLoginMode) {
      try{
        await this.authService.signUp(email, password);
        form.reset();
      } catch(err: any){
        // Display nice error message to user
        switch(err?.error?.error?.message) {
          case 'EMAIL_EXISTS': 
            this.error = 'This email exists already';
            break;
          default:
            this.error = 'Last action got error.';
        }
        console.log(err);
      } finally {
        this.isLoading = false;
      }
    }
  }
}
