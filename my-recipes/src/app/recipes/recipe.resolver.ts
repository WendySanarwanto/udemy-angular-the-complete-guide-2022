import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { Recipe } from './recipe.model';
import { RecipeService } from './recipe.service';

@Injectable({
  providedIn: 'root'
})
export class RecipeResolver implements Resolve<Recipe> {

  constructor(private recipeService: RecipeService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Recipe> | Promise<Recipe> | Recipe {
    const recipeId = +route.params['id'];
    console.log(`recipeId: ${recipeId}`);
    const recipe = this.recipeService.getRecipeById(recipeId);
    return of(recipe);
  }
}
