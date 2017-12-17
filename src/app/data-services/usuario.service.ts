import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

import { FireBaseService } from '../services/fire-base.service';

const USERPUBLIC = "userpublic";
const USERPRIVATE = "user";
const USERCONFIG = "usercfg";

@Injectable()
export class UsuarioService {
  private _publico = new BehaviorSubject<any>(null);
  publico = this._publico.asObservable();
  private _privado = new BehaviorSubject<any>(null);
  privado = this._privado.asObservable();
  private _config = new BehaviorSubject<any>(null);
  config = this._config.asObservable();
  
  constructor(private fb:FireBaseService) { 
	fb.AuthState.subscribe((fbuser) =>
	{
		if(fbuser)
		{
			this.fb.doc(USERPUBLIC, fbuser.uid).valueChanges().subscribe((u) => { this._publico.next(u); });
			this.fb.doc(USERPRIVATE, fbuser.uid).valueChanges().subscribe((u) => { this._privado.next(u); });
			this.fb.doc(USERCONFIG, fbuser.uid).valueChanges().subscribe((u) => { this._config.next(u); });	
		}else
		{
			this._publico.next(null);
			this._privado.next(null);
			this._config.next(null);
		}
	});	
  }
}