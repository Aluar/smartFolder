import { Component } from '@angular/core';
import { ENTER } from '@angular/cdk/keycodes';

import { LocaldbService } from './services/localdb.service';
import { WaitingService } from './services/waiting.service';
import { ElectronMsgService } from './services/electron-msg.service';
import { GlobalMessageService } from './services/global-message.service';
import { SERVRF, SERVDL, SERVDI, COMMA, PATHSEP, SERVCLOUSE, SERVMINIMIZE } from '../environments/constant';

const wmain = {winname:"main"};

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';
  datos = {titulo:'', tags:[]};
  tags;
  folders;
  folderMD;
  currentPath:string = "";
  separatorKeysCodes = [ENTER, COMMA];
  serv = {close:SERVCLOUSE, mini:SERVMINIMIZE};
  idrives = [];
  waiting = false;

  constructor(private db:LocaldbService, private w:WaitingService, private gm:GlobalMessageService, private es:ElectronMsgService)
  {
	this.w.Show();
	this.waiting = true;
    this.es.electronFunction(SERVDI).then((arg:{drives:any}) =>
    {
      if (arg)
      {
        this.idrives.length = 0;

        this.idrives = Object.keys(arg.drives).map((item, array, index) => { return {fullFileName:item+":"}});

        this.w.Hide();
		this.waiting = false;

        this.changepath(null);
      }
    });
  }

  wbutton(serv)
  {
    this.es.electronMsg(serv, wmain);
  }

  pushTag(event)
  {

  }

  get pathFolders()
  {    
    let res = [];

	if (this.currentPath && (this.currentPath != ""))
	{
		let a = this.currentPath.split(PATHSEP);
		
		for(let i=0; i < a.length; i++)
		{ 
			let b = a[0];
			for (let j=1; j <= i; j++)
			{
			  b = b +PATHSEP+ a[j];
			}
			res.push(b);
		}		
	}else
	{
		this.currentPath = "";
	}
	
    return res;
  }

  changepath(path)
  {
    this.w.Show();
	this.waiting = true;
	
	if (path)
	{
		let p = (path.length == 2)? path+PATHSEP : path;
		
		this.es.electronFunction(SERVDL, {path:p}).then((arg) =>
		{
		  if (arg)
		  {
			this.w.Hide();
			this.waiting = false;
			if(!arg.hasOwnProperty("error"))
			{
console.log(path);
				this.currentPath = path;
				this.folders = arg.files.filter((file, index, array) => { return file.isDirectory; });
				
				this.setFolderMD(arg.files.filter((file, index, array) => { return ((file.name == "desktop") && (file.fileExt == "ini")); }));
			}			
		  }
		});
	}else
	{
		this.currentPath = path;
		this.w.Hide();
		this.waiting = false;
		this.folders = this.idrives;
		
		this.setFolderMD(null);
	}	
  }
  
  setFolderMD(fmd)
  {
	if (fmd)
		this.es.electronFunction(SERVRF, {file:fmd.fullFileName}).then((arg) =>
		{
console.log(arg);		
		  if (arg && !arg.hasOwnProperty("error"))
		  {
console.log(arg.data);		  
		  }
		});
	else
	{
		//clear meta data form
	}
/*
[{F29F85E0-4FF9-1068-AB91-08002B27B3D9}]
Prop2=31,Title
Prop3=31,Subject
Prop4=31,Author
Prop5=31,Salsa;Guaco
Prop6=31,Comment
*/
  }
}
