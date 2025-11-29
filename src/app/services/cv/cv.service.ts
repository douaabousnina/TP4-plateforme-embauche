// src/app/services/cv.service.ts
import { inject, Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';
import { Cv } from '../../models/cv.model';
import { API_URLS } from '../../config/api.config';
import { HttpClient } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class CvService {
  private toastr = inject(ToastrService);
  private http = inject(HttpClient);

  private fakeCvs: Cv[] = [
    { id: 1, name: 'Selma', firstname: 'Ben', age: 25, job: 'Developer', cin: '12345678', path: '/path/to/cv1.pdf' },
    { id: 2, name: 'Aymen', firstname: 'Sellaouti', age: 28, job: 'Designer', cin: '87654321', path: '/path/to/cv2.pdf' },
    { id: 3, name: 'Nadia', firstname: 'Khelifi', age: 30, job: 'Manager', cin: '11223344', path: '/path/to/cv3.pdf' }
  ];

  getCvs(): Observable<Cv[]> {
    return this.http.get<Cv[]>(API_URLS.PERSONNES).pipe(
      catchError(err => {
        this.toastr.error('Erreur API, affichage des CVs factices');
        return new Observable<Cv[]>(subscriber => {
          subscriber.next(this.fakeCvs);
          subscriber.complete();
        });
      })
    );
  }

  getCvById(id: number): Observable<Cv | undefined> {
    return this.getCvs().pipe(
      map(cvs => cvs.find(cv => cv.id === id))
    );
  }

  deleteCv(cvId: number): Observable<void> {
    this.fakeCvs = this.fakeCvs.filter(cv => cv.id !== cvId);
    return new Observable<void>(subscriber => {
      subscriber.next();
      subscriber.complete();
    });
  }

  addCv(cv: Cv): Observable<Cv> {
    this.fakeCvs.push(cv);
    return new Observable<Cv>(subscriber => {
      subscriber.next(cv);
      subscriber.complete();
    });
  }
}
