import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CounterService {
  private numbersOfActiveToInactive: number = 0;
  private numbersOfInactiveToActive: number = 0;

  constructor() { }

  setActiveToInactive() {
    this.numbersOfActiveToInactive++;
  }

  setInactiveToActive() {
    this.numbersOfInactiveToActive++;
  }
}
