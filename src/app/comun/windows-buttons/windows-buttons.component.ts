import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'winButtons',
  templateUrl: './windows-buttons.component.html',
  styleUrls: ['./windows-buttons.component.css']
})
export class WindowsButtonsComponent {
  @Input() showClose:boolean = true;
  @Input() showMinimize:boolean = true;
  @Output() close = new EventEmitter();
  @Output() minimize = new EventEmitter();

  constructor() { }
}
