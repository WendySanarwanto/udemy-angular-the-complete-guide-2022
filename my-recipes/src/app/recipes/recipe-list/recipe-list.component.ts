import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit, OnDestroy {
  recipes: Recipe[];
  recipesChangedSubscription: Subscription;
  constructor(public recipeService: RecipeService) { }

  ngOnInit(): void {
    this.recipesChangedSubscription = 
      this.recipeService.recipesChanged.subscribe((recipes: Recipe[])=>{
        this.recipes = recipes;
      });
    this.recipes = this.recipeService.getRecipes();
  }

  ngOnDestroy(): void {
    this.recipesChangedSubscription.unsubscribe();
  }  
}
