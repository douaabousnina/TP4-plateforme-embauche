import { Component, inject } from '@angular/core';
import { EmbaucheService } from '../../services/embauche/embauche.service';

@Component({
  selector: 'app-hired-list',
  standalone: true,
  templateUrl: './hired-list.component.html',
  styleUrls: ['./hired-list.component.css']
})
export class HiredListComponent {
  embaucheService = inject(EmbaucheService);
  
  get hired() {
    return this.embaucheService.getHired();
  }
}