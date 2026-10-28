import { Component, computed, input, model } from '@angular/core';
import { FormValueControl } from '@angular/forms/signals';

@Component({
  imports: [],
  selector: 'app-star-rating',
  styleUrl: './star-rating.css',
  templateUrl: './star-rating.html',
})
export class StarRating implements FormValueControl<number> {
  readonly value = model.required<number>();

  readonly max = input<number | undefined>(undefined);

  readonly stars = computed(() => Array.from({ length: this.max() ?? 5 }, (_, i) => i + 1));

}
