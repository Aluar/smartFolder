import { Component, OnInit } from '@angular/core';

import { DirService } from '../services/dir.service';

@Component({
  selector: 'folders',
  templateUrl: './folders.component.html',
  styleUrls: ['./folders.component.css']
})
export class FoldersComponent implements OnInit {

  constructor(public dir:DirService) { }

  ngOnInit()  { }
}
