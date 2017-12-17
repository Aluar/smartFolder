import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'dv-tag',
  templateUrl: './tag.component.html',
  styleUrls: ['./tag.component.css']
})
export class TagComponent {
  @Input() label:string;
  @Input() showRemove:boolean = false;
  @Output() remove= new EventEmitter();

  constructor() { }
}
