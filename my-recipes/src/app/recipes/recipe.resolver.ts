import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot,
  ActivatedRoute
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { DataStorageService } from '../shared/data-storage.service';
import { Recipe } from './recipe.model';
import { RecipeService } from './recipe.service';

@Injectable({
  providedIn: 'root'
})
export class RecipeResolver implements Resolve<Recipe> {

  constructor(private recipeService: RecipeService, 
              private dataStorageService: DataStorageService,
              private router: Router,
              private activatedRoute: ActivatedRoute) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Recipe> | Promise<Recipe> | Recipe {
    const recipeId = +route.params['id'];
    console.log(`recipeId: ${recipeId}`);
    const recipes = this.recipeService.getRecipes();
    if (recipes && recipes.length === 0) {
      this.dataStorageService.fetchRecipes();
    } 
    
    const recipe = this.recipeService.getRecipeById(recipeId);
    if (recipe) {
      return of(recipe);
    }

    this.router.navigate(['../'], { relativeTo: this.activatedRoute })
    return null;
  }
}
