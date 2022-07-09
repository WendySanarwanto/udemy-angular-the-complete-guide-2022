import { Component, OnDestroy, OnInit } from '@angular/core';

import { Subscription, Observable } from 'rxjs';
import { map, filter } from 'rxjs/operators';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {

  private firstObsSubscription?: Subscription;

  constructor() {
  }

  ngOnInit() {
    const customIntervalObservable = new Observable<number>(observer => {
      let count = 0;
      setInterval(() => {
        observer.next(count);
        if (count === 5) {
          observer.complete();
        }
        if (count > 3) {
          observer.error(new Error('Count is greater 3!'));
        }
        count++;
      }, 1000);
    });

    this.firstObsSubscription = customIntervalObservable.pipe(filter((data) => {
      return data > 1;
    }), 
      map((data) => {
        return `Round: ${data}`;
      })).subscribe({ 
        next: data => console.log(data),
        error: err => console.log(err),
        complete: () => console.log('Completed !')
      });
  }

  ngOnDestroy(): void {
    this.firstObsSubscription?.unsubscribe();
  }

}
