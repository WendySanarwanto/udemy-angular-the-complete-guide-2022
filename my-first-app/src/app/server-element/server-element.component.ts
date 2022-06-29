import { Component, OnInit, Input, OnChanges, SimpleChanges, 
        DoCheck, AfterContentInit, AfterContentChecked, AfterViewInit,
        AfterViewChecked, OnDestroy, ContentChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-server-element',
  templateUrl: './server-element.component.html',
  styleUrls: ['./server-element.component.css']
})
export class ServerElementComponent implements OnInit, OnChanges, DoCheck, 
  AfterContentInit, AfterContentChecked, AfterViewInit, AfterViewChecked,
  OnDestroy {
  @Input('srvElement') 
  element: {
    type: string,
    name: string,
    content: string
  };

  @ContentChild('contentParagraph', {static: true}) paragraph: ElementRef;

  constructor() { 
    console.log('Constructor is called !')
  }

  ngOnDestroy(): void {
    console.log('OnDestroy is called !');
  }

  ngAfterViewChecked(): void {
    console.log('AfterViewChecked is called !')
  }
  
  ngAfterViewInit(): void {
    console.log('AfterViewInit is called !')
  }

  ngAfterContentChecked(): void {
    console.log('AfterContentChecked is called !');

  }
  
  ngAfterContentInit(): void {
    console.log('AfterContentInit is called !');
    console.log(`Text Content of paragraph: \n${this.paragraph?.nativeElement?.textContent}`);
  }

  ngDoCheck(): void {
    console.log('doCheck is called !')
  }

  ngOnChanges(changes: SimpleChanges) {
    console.log('OnChanges is called !');
    console.log(changes);
  }

  ngOnInit(): void {
    console.log('OnInit is called !');
    console.log(`Text Content of paragraph: \n${this.paragraph?.nativeElement?.textContent}`);
  }

}
