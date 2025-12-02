import { AsyncPipe } from '@angular/common';
import { Component, Input, signal } from '@angular/core';
import { interval, map, Observable } from 'rxjs';
import { DEFAULT_VALUES } from '../../config/default-values.config';

@Component({
  selector: 'app-image-slider',
  standalone: true,
  templateUrl: './image-slider.component.html',
  styleUrls: ['./image-slider.component.css'],
  imports: [AsyncPipe]
})
export class ImageSliderComponent {
  @Input() images: string[] = DEFAULT_VALUES.DEFAULT_ARRAY_IMAGES;
  @Input() width: number = 300;
  @Input() height: number = 200;
  @Input() intervalMs: number = 500;

  currentIndex = signal(0);

  currentImage: Observable<string> = interval(this.intervalMs).pipe(
    map(i => {
      const index = i % this.images.length;
      this.currentIndex.set(index);
      return this.images[index];
    })
  );
}
