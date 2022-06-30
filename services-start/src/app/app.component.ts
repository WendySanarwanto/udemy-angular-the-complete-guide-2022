import { Component } from '@angular/core';
import { AccountService } from './account.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(public accountService: AccountService){ }

  onStatusChanged(updateInfo: {id: number, newStatus: string}) {
    this.accountService.updateAccount(updateInfo.id, updateInfo.newStatus);
  }
}
