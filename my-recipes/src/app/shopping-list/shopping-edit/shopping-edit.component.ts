import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Ingredient } from 'src/app/shared/ingredient.model';
import { ShoppingListService } from '../shopping-list.service';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit {
  // @ViewChild('nameInput', {static: false}) nameInputRef: ElementRef;
  // @ViewChild('amountInput', {static: false}) amountInputRef: ElementRef;

  constructor(private shoppingListService: ShoppingListService) { }

  ngOnInit(): void {
  }

  onAddItem(form: NgForm) {
    const value = form.value;
    this.shoppingListService.addIngredient(new Ingredient(
      value.name,
      value.amount
      // this.nameInputRef?.nativeElement.value,
      // this.amountInputRef?.nativeElement.value
    ));
  }

  onDeleteItem(form: NgForm) {
    // this.shoppingListService.removeIngredient(this.nameInputRef?.nativeElement.value);
    this.shoppingListService.removeIngredient(form.value.name);
  }

  onClearItem(form: NgForm) {
    form.setValue({
      'name': '',
      'amount': ''
    });

    // this.nameInputRef.nativeElement.value = '';
    // this.amountInputRef.nativeElement.value = '';

  }
}
