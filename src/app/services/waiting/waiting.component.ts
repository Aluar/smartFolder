import { Component, OnInit } from '@angular/core';

import { WaitingService } from '../waiting.service';

@Component({
  selector: 'waitingBar',
  templateUrl: './waiting.component.html',
  styleUrls: ['./waiting.component.css']
})
export class WaitingComponent implements OnInit {

  constructor(public w:WaitingService) { }

  ngOnInit() {
  }

}
