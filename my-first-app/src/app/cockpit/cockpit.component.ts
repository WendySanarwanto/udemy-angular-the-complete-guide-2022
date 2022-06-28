import { Component, ElementRef, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';

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
  // newServerContent: string = '';
  @ViewChild('serverContentInput', {static: true}) 
  serverContentInput: ElementRef;

  constructor() { }

  ngOnInit(): void {
  }

  onAddServer(nameInput: HTMLInputElement) {
    // console.log(nameInput);
    // console.log(nameInput.value);
    this.serverCreated.emit({
      // serverName: this.newServerName,
      // serverContent: this.newServerContent
      serverName: nameInput.value,
      serverContent: this.serverContentInput.nativeElement?.value
    });
  }

  onAddBlueprint(nameInput: HTMLInputElement) {
    console.log(this.serverContentInput);
    this.blueprintCreated.emit({
      // blueprintName: this.newServerName,
      // blueprintContent: this.newServerContent
      blueprintName: nameInput.value,
      blueprintContent: this.serverContentInput.nativeElement?.value
    });
  }  

}
