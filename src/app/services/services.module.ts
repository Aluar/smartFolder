import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MaterialModule } from '../material/material.module';

import { ConfigService } from './config.service';
import { FireBaseService } from './fire-base.service';
import { GenService } from './gen.service';
import { GlobalMessageService } from './global-message.service';
import { RouterService } from './router.service';
import { WaitingService } from './waiting.service';
import { LocaldbService } from './localdb.service';
import { ElectronMsgService } from './electron-msg.service';

import { GlobalMessageComponent } from './global-message/global-message.component';
import { WaitingComponent } from './waiting/waiting.component';

@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
  ],
  declarations: [
  	GlobalMessageComponent,
  	WaitingComponent
  ],
  providers: [
  	ConfigService,
  	FireBaseService,
  	GenService,
  	GlobalMessageService,
  	RouterService,
  	WaitingService,
    LocaldbService,
    ElectronMsgService,
  ],
  exports: [
  	GlobalMessageComponent,
  	WaitingComponent
  ]
})
export class ServicesModule { }
