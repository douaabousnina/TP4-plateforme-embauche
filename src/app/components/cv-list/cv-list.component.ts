import { Component, inject } from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';
import { RouterModule } from '@angular/router';
import { CvService } from '../../services/cv/cv.service';
import { EmbaucheService } from '../../services/embauche/embauche.service';
import { Cv } from '../../models/cv.model';

@Component({
  selector: 'app-cv-list',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './cv-list.component.html',
  styleUrls: ['./cv-list.component.css']
})
export class CvListComponent {
  cvService = inject(CvService);
  embaucheService = inject(EmbaucheService);

  cvResource = rxResource({
    stream: () => this.cvService.getCvs()
  });

  hireCv(cv: Cv) {
    this.embaucheService.hire(cv);
  }
}