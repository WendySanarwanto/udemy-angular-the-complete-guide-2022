import { Component, OnInit } from '@angular/core';
import { RecipeService } from '../recipe.service';

@Component({
  selector: 'app-recipe-start',
  templateUrl: './recipe-start.component.html',
  styleUrls: ['./recipe-start.component.css']
})
export class RecipeStartComponent implements OnInit {
  recipesExist: boolean = false;

  constructor(private recipesService: RecipeService) { }

  ngOnInit(): void {
    this.recipesService.recipesChanged.subscribe((recipes)=>{
      this.recipesExist = recipes && recipes.length > 0;
    });
  }

}
