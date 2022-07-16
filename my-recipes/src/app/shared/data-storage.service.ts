import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RecipeService } from '../recipes/recipe.service';
import { lastValueFrom, map } from 'rxjs';
import { Recipe } from '../recipes/recipe.model';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DataStorageService {
  BACKEND_URL: string = environment['BACKEND_URL'];

  constructor(private http: HttpClient, private recipeService: RecipeService) { }

  async storeRecipes() {
    const recipes = this.recipeService.getRecipes();
    const apiUrl = `${this.BACKEND_URL}/recipes.json`;
    const putObservableResponse = this.http.put(apiUrl, recipes);
    const response = await lastValueFrom(putObservableResponse);
    console.log(response);
  }

  async fetchRecipes() {
    const apiUrl = `${this.BACKEND_URL}/recipes.json`;
    const getObservableResponse =
      this.http.get<Recipe[]>(apiUrl).pipe(map((recipes: Recipe[])=>{
        return recipes.map((recipe: Recipe) => {
          return {...recipe, ingredients: recipe.ingredients ? recipe.ingredients : []}
        });
      }));

    const response = await lastValueFrom(getObservableResponse);
    this.recipeService.setRecipes(response);
  }
}
