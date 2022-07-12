import { EventEmitter, Injectable } from '@angular/core';
// import { Recipe } from '../recipes/recipe.model';
// import { RecipeService } from '../recipes/recipe.service';
import { Ingredient } from '../shared/ingredient.model';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ShoppingListService {
  // onIngredientsChanged: EventEmitter<Ingredient[]> = new EventEmitter();
  onIngredientsChanged: Subject<Ingredient[]> = new Subject();
  startedEditing: Subject<number> = new Subject() ;

  private ingredients: Ingredient[] = [];

  getIngredients() {
    return [...this.ingredients];
  }

  getIngredient(index: number) {
    return this.ingredients[index];
  }

  addIngredient(ingredient: Ingredient) {
    this.ingredients.push(ingredient);
    this.onIngredientsChanged.next([...this.ingredients]);
  }

  removeIngredient(ingredientName: string) {
    let targetIngredientIndex = this.ingredients.findIndex(item => item.name === ingredientName);
    if (targetIngredientIndex >= 0) {
      this.ingredients.splice(targetIngredientIndex, 1);
      this.onIngredientsChanged.next([...this.ingredients]);
    }
  }

  addIngredients(ingredients: Ingredient[]) {
    this.ingredients.push(...ingredients);
    this.onIngredientsChanged.next([...this.ingredients]);
  }
}
