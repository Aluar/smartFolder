import { Component } from '@angular/core';
import { ENTER } from '@angular/cdk/keycodes';

import { LocaldbService } from './services/localdb.service';
import { WaitingService } from './services/waiting.service';
import { ElectronMsgService } from './services/electron-msg.service';
import { GlobalMessageService } from './services/global-message.service';
import { SERVDL, SERVDI, COMMA, SEP, SERVCLOUSE, SERVMINIMIZE } from '../environments/constant';

const wmain = {winname:"main"};

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';
  datos = {titulo:``, tags:[]};
  tags;
  folders;
  currentPath:string = "";
  separatorKeysCodes = [ENTER, COMMA];
  serv = {close:SERVCLOUSE, mini:SERVMINIMIZE};
  idrives = [];

  constructor(private db:LocaldbService, private w:WaitingService, private gm:GlobalMessageService, private es:ElectronMsgService)
  {
    this.es.electronFunction(SERVDI).then((arg:{drives:any}) =>
    {
      if (arg)
      {
        this.idrives.length = 0;

        this.idrives = Object.keys(arg.drives);

        this.w.Hide();

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
    let a = this.currentPath.split(SEP);
    let res = [];

    for(let i=0; i < a.length; i++)
    {
      if (i == 0)
      {
          res.push(a[i][0]);
      }else
      {
        let b = a[0];
        for (let j=1; j <= i; j++)
        {
          b = b +SEP+ a[j];
        }
        res.push(b);
      }
    }
console.log(res);
    return res;
  }

  changepath(path)
  {
console.log(path);
    if (path)
    {
      this.currentPath = path;
      this.getDir(path);
    }else
    {
      this.currentPath = '';
      this.folders = this.idrives;
    }

    //get meta data
  }

  private getDir(path)
  {
    this.w.Show();
    this.es.electronFunction(SERVDL).then((arg) =>
    {
      if (arg)
      {
console.log(arg)
        this.w.Hide();
      }
    });
  }
}
