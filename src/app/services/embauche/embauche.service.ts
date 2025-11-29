import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Cv } from '../../models/cv.model';

@Injectable({ providedIn: 'root' })
export class EmbaucheService {
  private hired: Cv[] = [];

  hire(cv: Cv): Observable<boolean> {
    return new Observable<boolean>(subscriber => {
      const alreadyHired = this.hired.some(c => c.id === cv.id);
      if (!alreadyHired) {
        this.hired.push(cv);
        subscriber.next(true);
      } else {
        subscriber.next(false);
      }
      subscriber.complete();
    });
  }

  getHired(): Observable<Cv[]> {
    return new Observable<Cv[]>(subscriber => {
      subscriber.next(this.hired);
      subscriber.complete();
    });
  }
}
