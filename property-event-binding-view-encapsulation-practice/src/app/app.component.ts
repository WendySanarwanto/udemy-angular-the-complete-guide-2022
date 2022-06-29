import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'propery-event-binding-view-encapsulation-practice';
  currentTicks: number[] = [];

  onTick(e: {currentTicks: number}) {
    this.currentTicks.push(e?.currentTicks);
  }

  onTimerStarted() {
    this.currentTicks = [];
  }
}
