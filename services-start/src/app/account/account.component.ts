import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent {
  @Input() account: {name: string, status: string};
  @Input() id: number;
  @Output() statusChanged = new EventEmitter<{id: number, newStatus: string}>();

  constructor() {
    this.account = { name: '', status: ''};
    this.id = -1;
  }

  onSetTo(status: string) {
    this.statusChanged.emit({id: this.id, newStatus: status});
  }
}
