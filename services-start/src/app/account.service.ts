import { EventEmitter, Injectable } from '@angular/core';
import { LoggingService } from './logging.service';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  private accounts = [
    {
      name: 'Master Account',
      status: 'active'
    },
    {
      name: 'Testaccount',
      status: 'inactive'
    },
    {
      name: 'Hidden Account',
      status: 'unknown'
    }
  ];

  statusUpdated: EventEmitter<string> = new EventEmitter();

  constructor(private loggingService: LoggingService) { }

  addAccount(name: string, status: string) {
    const newAccount = {
      name, status
    };
    this.accounts.push(newAccount);
    this.loggingService.logStatusChange(status);
  }

  updateAccount(id: number, newStatus: string) {
    this.accounts[id].status = newStatus;
    this.loggingService.logStatusChange(newStatus);
  }  

  getAccount() {
    // clone accounts array
    return [...this.accounts];
  }
}
