import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Ingredient } from 'src/app/shared/ingredient.model';
import { ShoppingListService } from '../shopping-list.service';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit, OnDestroy {
  // @ViewChild('nameInput', {static: false}) nameInputRef: ElementRef;
  // @ViewChild('amountInput', {static: false}) amountInputRef: ElementRef;
  @ViewChild('f', {static: false}) shoppingListForm: NgForm;
  private startedEditingSubscription: Subscription;
  editMode = false;
  editedItemIndex: number; 
  editedIngredient: Ingredient;

  constructor(private shoppingListService: ShoppingListService) { }
  ngOnDestroy(): void {
    this.startedEditingSubscription.unsubscribe();
  }

  ngOnInit(): void {
    this.startedEditingSubscription = 
      this.shoppingListService.startedEditing.subscribe((editedItemIndex: number) => {
        this.editMode = true;
        this.editedItemIndex = editedItemIndex;
        this.editedIngredient = this.shoppingListService.getIngredient(this.editedItemIndex);
        this.shoppingListForm.setValue({
          'name': this.editedIngredient.name,
          'amount': this.editedIngredient.amount
        })
      });
  }

  onSubmit(form: NgForm) {
    const value = form.value;
    const newIngredient = new Ingredient(value.name, value.amount);
    if (this.editMode) {
      this.shoppingListService.updateIngredient(this.editedItemIndex, newIngredient);
    } else {
      this.shoppingListService.addIngredient(newIngredient);  
    }
    this.editMode = false;
    form.reset();
  }

  onDeleteItem() {
    // this.shoppingListService.removeIngredient(this.nameInputRef?.nativeElement.value);
    this.shoppingListService.removeIngredient(this.editedItemIndex);
    this.onClearItem();
  }

  onClearItem() {
    this.shoppingListForm.reset();
    this.editMode = false;
    // this.nameInputRef.nativeElement.value = '';
    // this.amountInputRef.nativeElement.value = '';

  }
}
