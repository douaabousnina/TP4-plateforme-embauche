import { inject, Injectable } from '@angular/core';
import { EMPTY, Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
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
    { id: 1, name: 'John', firstname: 'Doe', age: 25, job: 'Developer', cin: '12345678', path: 'cvs/cv1.pdf' },
    { id: 2, name: 'John', firstname: 'Doe', age: 28, job: 'Designer', cin: '87654321', path: 'cvs/cv2.pdf' },
    { id: 3, name: 'John', firstname: 'Doe', age: 30, job: 'Manager', cin: '11223344', path: 'cvs/cv3.pdf' }
  ];

  getCvs(): Observable<Cv[]> {
    return this.http.get<Cv[]>(API_URLS.PERSONNES).pipe(
      catchError(() => {
        this.toastr.error('Erreur API, affichage des CVs factices');
        return of(this.fakeCvs); // fakesCvs dans un observable
      })
    );
  }

  getCvById(id: number): Observable<Cv> {
    if (!id) {
      this.toastr.error('ID invalide');
      this.router.navigate(['/cvs']);
      return EMPTY; // rien, just completes
    }

    return this.http.get<Cv>(API_URLS.PERSONNE_BY_ID(id)).pipe(
      catchError(() => {
        this.toastr.error('Erreur API');
        this.router.navigate(['/cvs']);
        return EMPTY;
      })
    );
  }

  deleteCv(cvId: number) {
    this.http.delete(API_URLS.PERSONNE_BY_ID(cvId)).pipe(
      catchError(() => {
        this.toastr.error('Erreur lors de la suppression');
        this.router.navigate(['/cvs']);
        return EMPTY; // rien, just completes
      })
    ).subscribe(() => {
      this.toastr.success('CV supprimé !');
      this.router.navigate(['/cvs']);
    });
  }
}