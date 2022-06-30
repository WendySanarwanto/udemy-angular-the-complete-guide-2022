import { EventEmitter, Injectable } from '@angular/core';
import { Recipe } from './recipe.model';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {
  onRecipeSelected: EventEmitter<Recipe> = new EventEmitter();
  private recipes: Recipe[] = [
    new Recipe('Recipe Test #1',
               'This is simply a test of Recipe #1.',
               'https://awsimages.detik.net.id/community/media/visual/2019/09/13/bfb173c3-1e98-4cbf-9337-a7504399be26_11.jpeg'),
    new Recipe('Recipe Test #2',
               'This is simply a test of Recipe #2.',
               'https://resepmembuat.com/wp-content/uploads/2015/01/resepmembuat.com-Nasi-Rawon.jpg')
  ];

  constructor() { }

  getRecipes() {
    return [...this.recipes];
  }
}
