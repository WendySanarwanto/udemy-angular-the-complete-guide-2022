import { Component, OnInit, OnDestroy } from '@angular/core';
import { interval, Subscription, Observable } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {
  private intervalSubscription?: Subscription;

  constructor() { }

  ngOnDestroy(): void {
    this.intervalSubscription?.unsubscribe();
  }

  ngOnInit() {
    // this.intervalSubscription = 
    //   interval(1000).subscribe( (next) => {
    //     console.log(next);
    //   } );
    const customIntervalObservable = new Observable((subscriber) => {
      let count: number = 0;
      setInterval(() => {
        subscriber.next(count);
        if (count === 2) {
          subscriber.complete();
        }
        if (count > 3) {
          subscriber.error(new Error('Count is greater than 3 !'));
        }
        count++;
      },1000);
    });

    this.intervalSubscription = 
      customIntervalObservable.subscribe({
        next: data => console.log(data), 
        error: err=> console.log(err),
        complete: () => console.log('Complete')
      });
  }

}
