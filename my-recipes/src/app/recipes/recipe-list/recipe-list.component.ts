import { Component, OnInit } from '@angular/core';
import { Recipe } from '../recipe.model';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit {
  recipes: Recipe[] = [
    new Recipe('Recipe Test #1',
               'This is simply a test.',
               'https://awsimages.detik.net.id/community/media/visual/2019/09/13/bfb173c3-1e98-4cbf-9337-a7504399be26_11.jpeg'),
    new Recipe('Recipe Test #2',
               'This is simply a test.',
               'https://resepmembuat.com/wp-content/uploads/2015/01/resepmembuat.com-Nasi-Rawon.jpg')
  ];

  constructor() { }

  ngOnInit(): void {
  }

}
