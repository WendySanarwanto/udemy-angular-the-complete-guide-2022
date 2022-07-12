import { EventEmitter, Injectable } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list/shopping-list.service';
import { Recipe } from './recipe.model';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {
  // onRecipeSelected: Subject<Recipe> = new Subject();
  recipesChanged = new Subject<Recipe[]>(); 
  private recipes: Recipe[] = [
    new Recipe( 1,
               'Soto Ayam Lamongan',
               'Soto Ayam khas Lamongan, Jawa Timur.',
               'https://awsimages.detik.net.id/community/media/visual/2019/09/13/bfb173c3-1e98-4cbf-9337-a7504399be26_11.jpeg',
               [
                new Ingredient('Tumeric', 1),
                new Ingredient('Egg', 1),
                new Ingredient('Chickent Meat', 1)
               ]),
    new Recipe( 2,
               'Nasi Rawon',
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

  getRecipeById(id: number) : Recipe | undefined {
    const recipe: Recipe = this.recipes.find( recipe => recipe.id === id );
    return recipe;
  }

  addIngredientsToShoppingList(ingredients: Ingredient[]) {
    this.shoppingListService.addIngredients(ingredients);
  }

  addRecipe(recipe: Recipe){
    this.recipes.push(recipe);
    this.recipesChanged.next([...this.recipes]);
  }

  updateRecipe(index: number, newRecipe: Recipe) {
    this.recipes[index] = newRecipe;
    this.recipesChanged.next([...this.recipes]);
  }

  getNextId() {
    if (this.recipes.length > 0) {
      this.recipes.sort((left, right) => left.id - right.id);
      return this.recipes[this.recipes.length-1].id + 1;
    }
    return 1;
  }
}
