import { Injectable, NgZone } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Injectable()
export class ConfigService {
  private _configuracion = {};
  private _observables = [];
 
  setConfiguracion(field, value)
  {
	this._configuracion[field] = value;
  }
  
  getConfiguracion(field):any
  {
	return this._configuracion[field];
  }  
  
  configuracion():any
  {
	return this._configuracion;
  }  
  
  newObs(name:string)
  {
	this._observables.push({name:name, bsubj:new BehaviorSubject<any>(null)});
  }
  
  getObs(name:string)
  {
	let res = this.getBSubj(name);
	
	if (res)		
		return res.asObservable();

	return null;
  }
  
  getObsValue(name:string)
  {
	let res = this.getBSubj(name);
	
	if (res)		
		return res.getValue();
	
	return null;
  }
  
  setObsValue(name:string, value:any)
  {
	let res = this.getBSubj(name);
	
	if (res)		
		return res.next(value);
  }
  
  private getBSubj(name:string)
  {
	for (let item of this._observables)
	{
		if (item.name == name)
			return item.bsubj;
	}
	
	return null;
  }
}
