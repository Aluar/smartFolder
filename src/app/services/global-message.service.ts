import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

export const Msgtypes = 
	{Normal:{icon:'mdi mdi-24px mdi-information', color:'primary'},
	Warning:{icon:'mdi mdi-24px mdi-alert-octagon', color:'accent'},
	Error:{icon:'mdi mdi-24px mdi-alert', color:'warn'}};

@Injectable()
export class GlobalMessageService {
  public Mostrar = false;
  private _mensajes = [];
  private _msgs = new BehaviorSubject<boolean>(false);
  newMSG = this._msgs.asObservable();
  
  constructor(public snackBar: MatSnackBar) { }

  
  Message(mensaje, descripcion, type:{icon:string, color:string})
  {
	this._mensajes.push({mensaje:mensaje, descripcion:descripcion,  ...type});
	
	this._msgs.next(true);
  }
  
  currentMsg()
  {
	if (this._mensajes.length > 0)
		return this._mensajes[0];
	
	return null;
  }
  
  showBar()
  {
	if (this._mensajes.length > 0)
	{
		this.snackBar.open(this._mensajes[0].descripcion, "", {duration: 5000});
		
		this._mensajes.slice(0, 1);
		
		this._msgs.next((this._mensajes.length > 0));
	}	
  }
}
