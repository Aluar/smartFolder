import { Component, OnInit } from '@angular/core';

import { DirService } from './services/dir.service';
import { ElectronMsgService } from './services/electron-msg.service';
import { WaitingService } from './services/waiting.service';
import { SERVCLOUSE, SERVMINIMIZE } from '../environments/constant';

const wmain = {winname:"main"};

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'app';
  serv = {close:SERVCLOUSE, mini:SERVMINIMIZE};

  constructor(private dir:DirService, private es:ElectronMsgService, public w:WaitingService){ }

  ngOnInit()
  {
      this.dir.updateDrivers();
  }

  wbutton(serv)
  {
    this.es.electronMsg(serv, wmain);
  }
}
