// src/app/services/cv.service.ts
import { inject, Injectable } from '@angular/core';
import { EMPTY, Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';
import { Cv } from '../../models/cv.model';
import { API_URLS } from '../../config/api.config';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class CvService {
  private toastr = inject(ToastrService);
  private http = inject(HttpClient);
  private router = inject(Router);

  private fakeCvs: Cv[] = [
    { id: 1, name: 'Selma', firstname: 'Ben', age: 25, job: 'Developer', cin: '12345678', path: '/path/to/cv1.pdf' },
    { id: 2, name: 'Aymen', firstname: 'Sellaouti', age: 28, job: 'Designer', cin: '87654321', path: '/path/to/cv2.pdf' },
    { id: 3, name: 'Nadia', firstname: 'Khelifi', age: 30, job: 'Manager', cin: '11223344', path: '/path/to/cv3.pdf' }
  ];

  getCvs(): Observable<Cv[]> {
    return this.http.get<Cv[]>(API_URLS.PERSONNES).pipe(
      catchError(err => {
        this.toastr.error('Erreur API, affichage des CVs factices');
        return of(this.fakeCvs); // emits the array as a single value and completes automatically
      })
    );
  }

  getCvById(id: number): Observable<Cv | undefined> {
    return this.getCvs().pipe(
      map(cvs => cvs.find(cv => cv.id === id)), catchError(
        (err) => {
            this.toastr.error('API failed.');
            this.router.navigate(['/cvs']);
            return EMPTY; // doesn’t emit any value at all ==> just completes
        }
      )
    );
  }

  deleteCv(cvId: number) {
    return this.http.delete(API_URLS.PERSONNE_BY_ID(cvId)).pipe(
      catchError(
        (err) => {
          this.toastr.error('API failed');
          this.router.navigate(['/cvs']);
          return EMPTY; // doesn’t emit any value at all, just completes
        }
      )
    );
  }
}
