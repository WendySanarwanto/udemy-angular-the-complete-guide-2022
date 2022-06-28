import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-cockpit',
  templateUrl: './cockpit.component.html',
  styleUrls: ['./cockpit.component.css']
})
export class CockpitComponent implements OnInit {
  @Output() 
  serverCreated = new EventEmitter<{serverName: string, serverContent: string}>();
  @Output()
  blueprintCreated = new EventEmitter<{blueprintName: string, blueprintContent: string}>();
  // newServerName: string = '';
  newServerContent: string = '';

  constructor() { }

  ngOnInit(): void {
  }

  onAddServer(nameInput: HTMLInputElement) {
    // console.log(nameInput);
    // console.log(nameInput.value);
    this.serverCreated.emit({
      // serverName: this.newServerName,
      serverName: nameInput.value,
      serverContent: this.newServerContent
    });
  }

  onAddBlueprint(nameInput: HTMLInputElement) {
    this.blueprintCreated.emit({
      // blueprintName: this.newServerName,
      blueprintName: nameInput.value,
      blueprintContent: this.newServerContent
    });
  }  

}
