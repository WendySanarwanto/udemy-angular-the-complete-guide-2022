import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subject, Subscription } from 'rxjs';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from './shopping-list.service';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit, OnDestroy {
  ingredients: Ingredient[];
  private onIngredientChangedSubscription?: Subscription;

  constructor(private shoppingListService: ShoppingListService) { 
    this.onIngredientChangedSubscription =
      this.shoppingListService.onIngredientsChanged.subscribe((ingredients: Ingredient[]) => {
        this.ingredients = ingredients;
      });
  }

  ngOnDestroy(): void {
    this.onIngredientChangedSubscription?.unsubscribe();
  }

  ngOnInit(): void {
    this.ingredients = this.shoppingListService.getIngredients();
  }

  onEditIngredient(itemIndex: number) {
    this.shoppingListService.startedEditing.next(itemIndex);
  }
}
