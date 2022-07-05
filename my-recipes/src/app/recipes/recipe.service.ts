import { EventEmitter, Injectable } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list/shopping-list.service';
import { Recipe } from './recipe.model';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {
  onRecipeSelected: EventEmitter<Recipe> = new EventEmitter();
  private recipes: Recipe[] = [
    new Recipe('Soto Ayam Lamongan',
               'Soto Ayam khas Lamongan, Jawa Timur.',
               'https://awsimages.detik.net.id/community/media/visual/2019/09/13/bfb173c3-1e98-4cbf-9337-a7504399be26_11.jpeg',
               [
                new Ingredient('Tumeric', 1),
                new Ingredient('Egg', 1),
                new Ingredient('Chickent Meat', 1)
               ]),
    new Recipe('Nasi Rawon',
               'Nasi Rawon lezat khas Jawa Timur-an.',
               'https://resepmembuat.com/wp-content/uploads/2015/01/resepmembuat.com-Nasi-Rawon.jpg',
               [
                new Ingredient('Beef Meat', 1),
                new Ingredient('Egg', 1)
               ])
  ];

  constructor(private shoppingListService: ShoppingListService) { }

  getRecipes() {
    return [...this.recipes];
  }
  
  addIngredientsToShoppingList(ingredients: Ingredient[]) {
    this.shoppingListService.addIngredients(ingredients);
  }
}
