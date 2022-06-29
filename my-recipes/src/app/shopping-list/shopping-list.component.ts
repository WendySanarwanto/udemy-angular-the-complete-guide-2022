import { Component, OnInit } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit {
  ingredients: Ingredient[] = [
    new Ingredient('Egg', 2),
    new Ingredient('Tumeric', 1)
  ];

  constructor() { }

  ngOnInit(): void {
  }

  onIngredientAdded(ingredient: Ingredient) {
    this.ingredients.push(ingredient);
  }

  onIngredientDeleted(ingredient: Ingredient) {
    let targetIngredientIndex = this.ingredients.findIndex(item => item.name === ingredient.name);
    if (targetIngredientIndex >= 0) {
      this.ingredients.splice(targetIngredientIndex, 1);
    }
  }
}
