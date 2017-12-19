import { Component, Input, Output, EventEmitter } from '@angular/core';

import { PATHSEP } from '../../environments/constant';

@Component({
  selector: 'folder',
  templateUrl: './folder.component.html',
  styleUrls: ['./folder.component.css']
})
export class FolderComponent {
  @Input() path:string = "";
  _icon;
  @Output() selected= new EventEmitter();

  constructor() { }

  get label()
  {
    let a = this.path.split(PATHSEP);
    if (a.length > 0)
      return a[a.length - 1];

    return '';
  }

  @Input() set icon(i:string)
  {
    if (i)
      this._icon = 'mdi-' + i;
  }
}
