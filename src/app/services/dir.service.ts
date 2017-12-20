import { Injectable, Pipe, PipeTransform } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { ENTER } from '@angular/cdk/keycodes';

import { ElectronMsgService } from './electron-msg.service';
import { WaitingService } from './waiting.service';
import { SERVWF, SERVRF, SERVDL, SERVDI, PATHSEP } from '../../environments/constant';

const ENT = String.fromCharCode(13);
const CERO = String.fromCharCode(0);
const INIStruct =
	{
		Prop2:{key:"title", label:"Title", value:""},
		Prop3:{key:"subject", label:"Subject", value:""},
		Prop4:{key:"author", label:"Author", value:""},
		Prop5:{key:"tags", label:"Tags", value:[]},
		Prop6:{key:"comment", label:"Comment", value:""}		
	}
	
export interface ini{
  path:string,
  data:any
}

@Injectable()
export class DirService {
  private _path:BehaviorSubject<string> = new BehaviorSubject<string>("");
  public path:Observable<string> = this._path.asObservable();
  private _folders:BehaviorSubject<any> = new BehaviorSubject<any>([]);
  public folders:Observable<any> = this._folders.asObservable();
  private _desktopIni:BehaviorSubject<ini> = new BehaviorSubject<ini>({path:"", data:{}});
  public desktopIni:Observable<ini> = this._desktopIni.asObservable();
  private drivers = [];

  constructor(private es:ElectronMsgService, private w:WaitingService) { }

  public changePath(path:string)
  {
    this.w.Show();

  	if (path && (path != ""))
  	{
  		let p = (path.length == 2)? path+PATHSEP : path;

  		this.es.electronFunction(SERVDL, {path:p}).then((arg) =>
  		{
  		  if (arg)
  		  {
    			if(!arg.hasOwnProperty("error"))
    			{
            this._path.next(path);
            this._folders.next(arg.files.filter((file, index, array) => { return file.isDirectory; }));
    				//this.setFolderMD(arg.files.filter((file, index, array) => { return ((file.name == "desktop") && (file.fileExt == "ini")); }));
            this.getDesktopIni(path);
    			}

          this.w.Hide();
  		  }
  		});
  	}else
  	{
      this._path.next("");
      this._folders.next(this.drivers);

      this.w.Hide();
  	}
  }

  public updateDrivers()
  {
    this.w.Show();

    this.es.electronFunction(SERVDI).then((arg:{drives:any}) =>
    {
      if (arg)
      {
        this.drivers.length = 0;

        this.drivers = Object.keys(arg.drives).map((item, array, index) => { return {fullFileName:item+":"}});

        this.w.Hide();

        this.changePath("");
      }
    });
  }

  getDesktopIni(path)
  {
    if (path && (path != ""))
      this.es.electronFunction(SERVRF, {file:path+"\\desktop.ini"}).then((arg) =>
      {
		if (arg && !arg.hasOwnProperty("error"))
		{
			let a = String.fromCharCode.apply(null, arg.data.filter((item) => (item != 0)));

			let b = a.split(ENT).filter((item) => 
				{
					return item.includes('Prop');
				}).map((item) =>
				{
					let x = INIStruct[item.slice(1,6)];

					let z = item.split(",")[1];
					
					x.value = (x.key == "tags")? z.split(";") : z;				
					
					return x;
				});
				
			this._desktopIni.next({path:path, data:b});
		}
      });
    else
      this._desktopIni.next({path:"", data:{}});

  }

  public setDesktopIni(path, data)
  {

  }
}

@Pipe({
  name: 'pathA'
})
export class PathArray implements PipeTransform {

  transform(value: any, args?: any): any
  {
    let output = value
      .split(PATHSEP)
      .filter((item, index, array) =>
        {
          return (item && (item != ""))
        })
      .map((item, index, array) =>
        {
          return array.slice(0, index + 1).join(PATHSEP)
        });

    return output;
  }
}
