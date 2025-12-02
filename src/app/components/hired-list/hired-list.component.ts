import { Component, inject } from '@angular/core';
import { EmbaucheService } from '../../services/embauche/embauche.service';
import { Cv } from '../../models/cv.model';

@Component({
  selector: 'app-hired-list',
  standalone: true,
  templateUrl: './hired-list.component.html',
  styleUrls: ['./hired-list.component.css']
})
export class HiredListComponent {
  embaucheService = inject(EmbaucheService);

  hired: Cv[] = this.embaucheService.getHired(); 
}