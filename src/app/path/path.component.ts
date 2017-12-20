import { Component, OnInit } from '@angular/core';

import { DirService } from '../services/dir.service';

@Component({
  selector: 'path',
  templateUrl: './path.component.html',
  styleUrls: ['./path.component.css']
})
export class PathComponent implements OnInit {

  constructor(public dir:DirService) { }

  ngOnInit()  { }
}
