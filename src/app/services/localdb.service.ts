import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

import { ElectronMsgService } from './electron-msg.service';

const servDBPUSH = 'push';
const servDBGET = 'get';
const servDBSET = 'set';
const servDBREMOVE = 'remove';
const servDBOBSERVER = 'observe';

@Injectable()
export class LocaldbService {
  private BSub = [];

  constructor(private es:ElectronMsgService) {
  	es.getElectronMsg(servDBOBSERVER).subscribe((args:{key, id, value}) =>
  	{
  		if (args && (args.id >= 0) && (args.id < this.BSub.length))
  			this.BSub[args.id].next({key:args.key, ...args.value});
  	});
  }

  push(key, value)
  {
	   this.es.electronMsg(servDBPUSH, {key:key, value:value});
  }

  set(key, value)
  {
	   this.es.electronMsg(servDBSET, {key:key, value:value});
  }

  get(key):Promise<any>
  {
	   return this.es.electronFunction(servDBGET, {key:key});
  }

  remove(key)
  {
	   this.es.electronMsg(servDBREMOVE, {key:key});
  }

  observe(key)
  {

  	let i = this.BSub.push(new BehaviorSubject<any>(null)) - 1;

  	this.es.electronMsg(servDBOBSERVER, {key:key, id:i});

  	return this.BSub[i].asObservable();
  }
}
