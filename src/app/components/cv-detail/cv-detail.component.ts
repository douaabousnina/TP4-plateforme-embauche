import { Component, inject, signal } from '@angular/core';
import { RouterModule, ActivatedRoute } from '@angular/router';
import { CvService } from '../../services/cv/cv.service';
import { EmbaucheService } from '../../services/embauche/embauche.service';
import { rxResource } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-cv-detail',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './cv-detail.component.html',
  styleUrls: ['./cv-detail.component.css']
})
export class CvDetailComponent {
  route = inject(ActivatedRoute);
  cvService = inject(CvService);
  embaucheService = inject(EmbaucheService);

  private getCvIdFromRoute(): number {
    const id = this.route.snapshot.paramMap.get('id');
    return Number(id) || 0;
  }

  cvId = signal(this.getCvIdFromRoute());

  cvResource = rxResource({
    params: () => ({ id: this.cvId() }),
    stream: () => this.cvService.getCvById(this.cvId())
  });

  hireCv() {
    const cv = this.cvResource.value();
    if (cv) this.embaucheService.hire(cv);
  }

  deleteCv() {
    const cv = this.cvResource.value();
    if (cv) this.cvService.deleteCv(cv.id);
  }

}
