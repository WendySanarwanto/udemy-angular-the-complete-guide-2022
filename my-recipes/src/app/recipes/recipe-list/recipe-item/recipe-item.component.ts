import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Recipe } from '../../recipe.model';

@Component({
  selector: 'app-recipe-item',
  templateUrl: './recipe-item.component.html',
  styleUrls: ['./recipe-item.component.css']
})
export class RecipeItemComponent implements OnInit {
  @Input() recipe: Recipe;
  @Output() onRecipeSelected: EventEmitter<Recipe> = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }

  onClicked() {
    this.onRecipeSelected.emit();
  }
}
