import { Component, inject, signal } from '@angular/core';
import { RouterModule, ActivatedRoute, RouterLink, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CvService } from '../../services/cv/cv.service';
import { rxResource } from '@angular/core/rxjs-interop';
import { map } from 'rxjs';
import { EmbaucheService } from '../../services/embauche/embauche.service';

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

  public cvResource = rxResource({
    params: () => ({ id: this.cvId() }),
    stream: () => this.cvService.getCvs().pipe(
      map(cvs => cvs.find(c => c.id === this.cvId()))
    )
  });

  deleteCv(id: number) {
    this.cvService.deleteCv(id).subscribe(() => {
      this.toastr.success('CV supprimé !');
      this.router.navigate(['/cvs']);
    });
  }

  hireCv(id: number) {
    this.cvService.getCvById(id).subscribe(cv => {
      if (cv) {
        this.embaucheService.hire(cv);
        this.toastr.success(`${cv?.firstname} ${cv?.name} embauché !`);
        this.router.navigate(['/embauches']);
      } else {
        this.toastr.error('CV introuvable, impossible de l\'embaucher !');
      }
    });
  }
}
