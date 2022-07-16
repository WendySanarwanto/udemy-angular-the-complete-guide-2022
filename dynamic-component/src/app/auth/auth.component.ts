import { Component, ComponentFactoryResolver, OnDestroy, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';
import { AlertComponent } from '../shared/alert/alert.component';
import { PlaceholderDirective } from '../shared/placeholder/placeholder.directive';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html'
})
export class AuthComponent implements OnDestroy {
  isLoginMode: boolean = true;
  isLoading: boolean = false;
  error: string | null = null;
  @ViewChild(PlaceholderDirective, { static: false }) alertHost!: PlaceholderDirective;
  alertClosedSubscription!: Subscription;

  constructor(private authService: AuthService, private router: Router,
              private componentFactoryResolver: ComponentFactoryResolver) {}

  ngOnDestroy(): void {
    if (this.alertClosedSubscription) {
      this.alertClosedSubscription.unsubscribe();
    }
  }

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
      await this.doSignUp(email, password, form);
    } else {
      await this.doLogin(email, password, form);
    }
  }

  private async doLogin(email: any, password: any, form: NgForm) {
    try {
      const loginResponse = await this.authService.login(email, password);
      form.reset();
      // redirect to protected home route
      this.router.navigate(['/recipes']);
    } catch (err) {
      // Display nice error message to user
      this.error = 'Incorrect credential';
      this.showErrorAlert(this.error);
    } finally {
      this.isLoading = false;
    }
  }

  private async doSignUp(email: any, password: any, form: NgForm) {
    try {
      await this.authService.signUp(email, password);
      form.reset();
    } catch (err: any) {
      // Display nice error message to user
      switch (err?.error?.error?.message) {
        case 'EMAIL_EXISTS':
          this.error = 'This email exists already';
          break;
        default:
          this.error = 'Last action got error.';
      }
      this.showErrorAlert(this.error);
      console.log(err);
    } finally {
      this.isLoading = false;
    }
  }

  onHandleError() {
    this.error = null;
  }

  private showErrorAlert(message: string) {
    const alertComponentFactory =
      this.componentFactoryResolver.resolveComponentFactory(AlertComponent);
    const hostViewContainerRef = this.alertHost.viewContainerRef;
    hostViewContainerRef.clear();

    const componentRef = hostViewContainerRef.createComponent(alertComponentFactory);
    componentRef.instance.message = message;
    this.alertClosedSubscription = componentRef.instance.closed.subscribe(() => {
      this.alertClosedSubscription.unsubscribe();
      hostViewContainerRef.clear();
    });
  }

}

