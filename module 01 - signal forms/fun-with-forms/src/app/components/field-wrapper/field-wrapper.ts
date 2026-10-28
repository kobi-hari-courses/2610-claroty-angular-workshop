import { Component, computed, contentChild, input } from '@angular/core';
import { FormField, REQUIRED } from '@angular/forms/signals';
import { MIN_WORDS } from '../../schema/min-words.validator';

@Component({
  imports: [],
  selector: 'app-field-wrapper',
  styleUrl: './field-wrapper.css',
  templateUrl: './field-wrapper.html',
  host: {
    '[class.field]': 'true',
  },
})
export class FieldWrapper<T> {
  readonly label = input.required<string>();
  readonly fieldDirective = contentChild.required(FormField<T>);

  readonly fieldState = computed(() => this.fieldDirective().state());

  readonly errors = computed(() => this.fieldState().errors());

  readonly required = computed(() => this.fieldState().required());

  readonly minWords = computed(() => this.fieldState().metadata(MIN_WORDS));

  readonly hasMinWords = computed(
    () => this.minWords() !== undefined && this.minWords()!() !== undefined,
  );

  readonly effectMinWords = computed(() => this.minWords()!()!);

  constructor() {
  }
}
