import { Component, OnInit } from '@angular/core';
import { ShoppingListService } from '../shopping-list/shopping-list.service';
import { Recipe } from './recipe.model';
import { RecipeService } from './recipe.service';

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.css']
})
export class RecipesComponent implements OnInit {
  selectedRecipe: Recipe;

  constructor(private recipeService: RecipeService, private shoppingListService: ShoppingListService) { }

  ngOnInit(): void {
    this.recipeService.addIngredientsToShoppingList(this.selectedRecipe?.ingredients ?? []);
    this.recipeService.onRecipeSelected.subscribe((recipe: Recipe)=>{
      this.selectedRecipe = recipe;
      this.recipeService.addIngredientsToShoppingList(this.selectedRecipe?.ingredients);
    });
  }
}
