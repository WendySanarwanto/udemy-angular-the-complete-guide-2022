import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { UserService } from './user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
  userActivated: boolean = false;
  userActivatedSubscription?: Subscription;

  constructor(private userService: UserService) {}

  ngOnDestroy(): void {
    this.userActivatedSubscription?.unsubscribe();
  }

  ngOnInit() {
    this.userActivatedSubscription = this.userService.activatedEmitter.subscribe((isActivated) => {
      this.userActivated = isActivated;
    });
  }
}
