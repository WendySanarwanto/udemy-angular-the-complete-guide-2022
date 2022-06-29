import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'directives-deep-dive';
  onlyOdd: boolean = false;
  numbers: number[] = [1,2,3,4,5]
  oddNumbers: number[] = this.numbers.filter(num => num % 2 !== 0);
  evenNumbers: number[] = this.numbers.filter(num => num % 2 === 0);
}
