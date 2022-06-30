import { Injectable } from '@angular/core';
import { CounterService } from './counter.service';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  private activeUsers = ['Max', 'Anna'];
  private inactiveUsers = ['Chris', 'Manu'];

  constructor(private counterService: CounterService) { }
  
  /**
   * Gets the cloned of active users
   * @returns  
   */
  getActiveUsers() {
    return [...this.activeUsers];
  }

  /**
   * Gets clone inactive users
   * @returns  
   */
  getInactiveUsers() {
    return [...this.inactiveUsers];
  }
  
  /**
   * Sets a User as active by specified user's id
   * @param id 
   */
  setAsActive(id: number) {
    this.activeUsers.push(this.inactiveUsers[id]);
    this.inactiveUsers.splice(id, 1);
    this.counterService.setInactiveToActive();
  }
  
  /**
   * Sets a User as inactive by specified user's id
   * @param id 
   */
  setAsInactive(id: number) {
    this.inactiveUsers.push(this.activeUsers[id]);
    this.activeUsers.splice(id, 1);
    this.counterService.setActiveToInactive();
  }
}
