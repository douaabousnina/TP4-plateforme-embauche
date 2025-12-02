import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Cv } from '../../models/cv.model';

@Injectable({ providedIn: 'root' })
export class EmbaucheService {
  private toastr = inject(ToastrService);
  private router = inject(Router);
  private hired: Cv[] = [];

  hire(cv: Cv) {
    if (this.hired.some(c => c.id === cv.id)) {
      this.toastr.warning(`${cv.firstname} ${cv.name} est déjà embauché !`);
      return;
    }
    this.hired.push(cv);
    this.toastr.success(`${cv.firstname} ${cv.name} embauché !`);
    this.router.navigate(['/embauches']);
  }

  getHired() {
    return [...this.hired];
  }
}