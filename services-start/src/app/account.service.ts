import { Injectable } from '@angular/core';

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

  constructor() { }

  addAccount(name: string, status: string) {
    const newAccount = {
      name, status
    };
    this.accounts.push(newAccount);
  }

  updateAccount(id: number, newStatus: string) {
    this.accounts[id].status = newStatus;
  }  

  getAccount() {
    // clone accounts array
    return [...this.accounts];
  }
}
