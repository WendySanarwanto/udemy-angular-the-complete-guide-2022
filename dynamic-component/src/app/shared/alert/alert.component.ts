import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.css']
})
export class AlertComponent implements OnInit {
  @Input() message!: string | null;
  @Output() closed: EventEmitter<void> = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }

  onClose() {
    this.closed.emit();
  }

}

