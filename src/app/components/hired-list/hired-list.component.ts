import { Component, inject } from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';
import { EmbaucheService } from '../../services/embauche/embauche.service';

@Component({
  selector: 'app-hired-list',
  standalone: true,
  templateUrl: './hired-list.component.html',
  styleUrls: ['./hired-list.component.css']
})
export class HiredListComponent {
  private embaucheService = inject(EmbaucheService);

  public hiredResource = rxResource({
    params: () => ({}),
    stream: () => this.embaucheService.getHired()
  });
}
