import { EventEmitter, Injectable } from '@angular/core';
import { Recipe } from '../recipes/recipe.model';
import { RecipeService } from '../recipes/recipe.service';
import { Ingredient } from '../shared/ingredient.model';

@Injectable({
  providedIn: 'root'
})
export class ShoppingListService {
  onIngredientsChanged: EventEmitter<Ingredient[]> = new EventEmitter();
  private ingredients: Ingredient[] = [];

  getIngredients() {
    return [...this.ingredients];
  }

  addIngredient(ingredient: Ingredient) {
    this.ingredients.push(ingredient);
    this.onIngredientsChanged.emit([...this.ingredients]);
  }

  removeIngredient(ingredientName: string) {
    let targetIngredientIndex = this.ingredients.findIndex(item => item.name === ingredientName);
    if (targetIngredientIndex >= 0) {
      this.ingredients.splice(targetIngredientIndex, 1);
      this.onIngredientsChanged.emit([...this.ingredients]);
    }
  }

  addIngredients(ingredients: Ingredient[]) {
    this.ingredients.push(...ingredients);
    this.onIngredientsChanged.emit([...this.ingredients]);
  }
}
