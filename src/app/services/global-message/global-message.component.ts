import { Component, OnInit } from '@angular/core';

import { GlobalMessageService } from '../global-message.service';

@Component({
  selector: 'global-message',
  templateUrl: './global-message.component.html',
  styleUrls: ['./global-message.component.css']
})
export class GlobalMessageComponent implements OnInit {
	
  constructor(public msg:GlobalMessageService) { }

  ngOnInit() { }
}
