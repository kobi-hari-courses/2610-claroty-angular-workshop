import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DinnerReview } from './models/dinner-review.model';
import { apply, disabled, form, FormField, FormRoot, max, min, required } from '@angular/forms/signals';
import { minWords } from './schema/min-words.validator';
import { reviewItemSchema } from './schema/review-item.schema';
import { StarRating } from './components/star-rating/star-rating';
import { FieldWrapper } from './components/field-wrapper/field-wrapper';

@Component({
  selector: 'app-root',
  imports: [CommonModule, FormField, FormRoot, StarRating, FieldWrapper],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  readonly model = signal<DinnerReview>({
    username: '',
    role: 'user',
    email: '',
    description: '',
    rating: 1,
  });

  readonly reviewForm = form(this.model, path => {
    required(path.username, {
      message: (ctx) => 'Username is required'
    });
    required(path.email, {
      message: (ctx) => `Email is required for ${ctx.valueOf(path.username)}`
    });
    apply(path, reviewItemSchema);
    min(path.rating, 1);
    max(path.rating, 8);
    disabled(path, {
      when: ctx => ctx.state.submitting()
    });
  }, {
    submission: {
      action: async (frm) => {
        await new Promise(resolve => setTimeout(resolve, 5000)); // Simulate async action
        return [
          {
            kind: 'wow-basa', 
            message: 'This is a wow-basa message', 
            fieldTree: frm.description
          }
        ]
      }, 
      onInvalid: frm => {
        const firstError = frm().errorSummary()[0];
        firstError?.fieldTree().focusBoundControl();
      }

    }
  });

  constructor() {
  }

}
