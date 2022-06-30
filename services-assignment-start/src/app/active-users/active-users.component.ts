import { Component, EventEmitter, Input, Output } from '@angular/core';
import { UsersService } from '../shared/users.service';

@Component({
  selector: 'app-active-users',
  templateUrl: './active-users.component.html',
  styleUrls: ['./active-users.component.css']
})
export class ActiveUsersComponent {
  @Input() users: string[] = [];

  constructor(private userService: UsersService) {}

  onSetToInactive(id: number) {
    this.userService.setAsInactive(id);
  }
}
