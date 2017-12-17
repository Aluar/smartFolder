import { Injectable, NgZone } from '@angular/core';
import { ElectronService } from 'ngx-electron';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Injectable()
export class ElectronMsgService {
	_winMsgBSub = {};
	_funcMsgBSub = {};

  constructor(private ES: ElectronService, private _ngZone: NgZone)
	{
		this.ES.ipcRenderer.on("msgfrom", (event:any, args:{sender:string, funct:string, args:any}) =>
		{
			this._ngZone.run(() =>
			{
				if (this._winMsgBSub.hasOwnProperty(args.sender))
				{
					this._winMsgBSub[args.sender].next(args);
				}
			});
		});
  }

  electronMsg(funcion: string, args:any = null)
  {
		this.ES.ipcRenderer.send(funcion, args);
  }

  getElectronMsg(funcion: string):Observable<any>
  {
		let _res = this.BSub(funcion, this._funcMsgBSub);

		this.ES.ipcRenderer.on(funcion, (event:any, args:any) =>
		{
			this._ngZone.run(() =>
			{
				_res.next(args);
			});
		});

		return _res.asObservable();
  }

  electronFunction(funcion: string, args:any = null):Promise<any>
  {
		this.ES.ipcRenderer.send(funcion, args);

		return this.getElectronMsgOnce(funcion);
  }

  getElectronMsgOnce(funcion: string):Promise<any>
  {
		return new Promise<any>((resolve, reject) =>
		{
			this.ES.ipcRenderer.once(funcion, (event:any, args:any) => {
				this._ngZone.run(() =>
				{
					resolve(args);
				});
			});
		});
  }

  windowsMsg(windowSender:string, winName:string, funcion: string, args: any = null)
  {
		this.ES.ipcRenderer.send("msgto", {reciver:winName, sender:windowSender, funct:funcion, args:args});
  }


  getWindowsMsg(windowSender:string):Observable<any>
  {
		return this.BSub(windowSender, this._winMsgBSub).asObservable();
  }

  private BSub(id:string, group):BehaviorSubject<any>
  {
		if (!group.hasOwnProperty(id))
			this._winMsgBSub[id] = new BehaviorSubject<any>(null);

		return this._winMsgBSub[id];
  }
}
