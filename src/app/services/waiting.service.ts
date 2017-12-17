import { Injectable } from '@angular/core';

@Injectable()
export class WaitingService {
  State:boolean = false;
  
  constructor() { }

  Show()
  {
	this.State = true;  
  }
  
  Hide()
  {
	this.State = false;
  }
  
  Toggle()
  {
	this.State = !this.State;
  }
}
