import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-game-control',
  templateUrl: './game-control.component.html',
  styleUrls: ['./game-control.component.css']
})
export class GameControlComponent implements OnInit {
  isStarted: boolean = false;
  private ticks: number = 0;
  @Output() 
  onTick: EventEmitter<{ currentTicks: number }> = new EventEmitter();
  @Output()
  onTimerStarted: EventEmitter<any> = new EventEmitter();
  private intervalRef: any;

  constructor() { }

  ngOnInit(): void {
  }

  onStartClicked() {
    this.ticks = 0;
    this.intervalRef = setInterval(() => {
      this.ticks++;
      this.onTick.emit({currentTicks: this.ticks});
    }, 1000);
    this.isStarted = true;
    this.onTimerStarted.emit();
  }

  onStopClicked() {
    clearInterval(this.intervalRef);
    this.isStarted = false;
  }
}
