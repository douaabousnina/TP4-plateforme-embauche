import { Component, inject } from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';
import { ToastrService } from 'ngx-toastr';
import { RouterModule, RouterLink, Router } from '@angular/router';
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
  private cvService = inject(CvService);
  private embaucheService = inject(EmbaucheService);
  private toastr = inject(ToastrService);
  private router = inject(Router);

  public cvResource = rxResource({
    params: () => ({}),
    stream: () => this.cvService.getCvs()
  });

  hireCv(cv: Cv) {
    this.embaucheService.hire(cv).subscribe(success => {
      if (success) {
        this.toastr.success(`${cv.firstname} ${cv.name} embauché !`);
        this.router.navigate(['/embauches']);
      } else {
        this.toastr.warning(`${cv.firstname} ${cv.name} est déjà embauché !`);
      }
    });

  }
}
