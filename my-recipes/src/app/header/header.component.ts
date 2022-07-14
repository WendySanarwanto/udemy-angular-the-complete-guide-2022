import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { DataStorageService } from '../shared/data-storage.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  // collapsed: boolean = false;
  // @Output() featureSelected: EventEmitter<string> = new EventEmitter();

  constructor(private dataStorageService: DataStorageService) { }

  ngOnInit(): void {
  }

  // onSelect(feature: string){
  //   this.featureSelected.emit(feature);
  // }

  async onSaveData() {
    try {
      await this.dataStorageService.storeRecipes();
    } catch(err){
      // TODO: Display the error to user 
      console.log(err);
      alert();
    }
  }

  onFetchData() {
    this.dataStorageService.fetchRecipes();
  }
}
