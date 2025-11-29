import { Component, inject, signal } from '@angular/core';
import { RouterModule, ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CvService } from '../../services/cv/cv.service';
import { EmbaucheService } from '../../services/embauche/embauche.service';
import { rxResource } from '@angular/core/rxjs-interop';
import { map } from 'rxjs';

@Component({
  selector: 'app-cv-detail',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './cv-detail.component.html',
  styleUrls: ['./cv-detail.component.css']
})
export class CvDetailComponent {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private cvService = inject(CvService);
  private embaucheService = inject(EmbaucheService);
  private toastr = inject(ToastrService);

  private cvId = signal<number>(Number(this.route.snapshot.paramMap.get('id')));

  // RxResource to fetch the CV by ID
  public cvResource = rxResource({
    params: () => ({ id: this.cvId() }),
    stream: () =>
      this.cvService.getCvs().pipe(
        map(cvs => cvs.find(c => c.id === this.cvId()))
      )
  });

  hireCv() {
    const cv = this.cvResource.value();
    if (!cv) {
      this.toastr.error('CV introuvable !');
      return;
    }

    this.embaucheService.hire(cv);
    this.toastr.success(`${cv.firstname} ${cv.name} embauché !`);
    this.router.navigate(['/embauches']);
  }

  deleteCv() {
    const cv = this.cvResource.value();
    if (!cv) {
      this.toastr.error('CV introuvable !');
      return;
    }

    this.cvService.deleteCv(cv.id).subscribe(() => {
      this.toastr.success('CV supprimé !');
      this.router.navigate(['/cvs']);
    });
  }
}
