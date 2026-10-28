import { required, schema } from '@angular/forms/signals';
import { Role } from '../models/dinner-review.model';
import { minWords } from './min-words.validator';

type RoledDescription = {
  role: Role;
  description: string;
};

export const reviewItemSchema = schema<RoledDescription>((path) => {
  required(path.description, {
    when: (ctx) => ctx.valueOf(path.role) === 'user',
    message: (ctx) => 'Description is required for users',
  });
  minWords(path.description, (ctx) => (ctx.valueOf(path.role) === 'user' ? 5 : 10));
});
