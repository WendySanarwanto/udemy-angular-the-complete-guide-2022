import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from '../auth/auth.service';
import { User } from '../auth/user.model';

import { DataStorageService } from '../shared/data-storage.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html'
})
export class HeaderComponent implements OnInit, OnDestroy {
  isAuthenticated: boolean = false;
  userSubscription!: Subscription;

  constructor(private dataStorageService: DataStorageService, private authService: AuthService) {
    // console.log(environment.API_KEY);
  }

  ngOnDestroy(): void {
    this.userSubscription?.unsubscribe();
  }

  ngOnInit(): void {
    this.userSubscription = this.authService.user.subscribe((user: User) =>{
      this.isAuthenticated = !! user;//!user ? false : true; 
    });
  }

  onSaveData() {
    this.dataStorageService.storeRecipes();
  }

  onFetchData() {
    this.dataStorageService.fetchRecipes().subscribe();
  }
}
