import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { NgxElectronModule } from 'ngx-electron';
import { AngularFireModule } from 'angularfire2';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import 'hammerjs';

import { environment } from '../environments/environment';

import { MaterialModule } from './material/material.module';
import { FireBaseModule } from './fire-base/fire-base.module';
import { ComunModule } from './comun/comun.module';
import { ServicesModule } from './services/services.module';
import { DataServicesModule } from './data-services/data-services.module';
import { AuthenticateModule } from './authenticate/authenticate.module';

import { AppComponent } from './app.component';
import { FolderComponent } from './folder/folder.component';
import { PathComponent } from './path/path.component';
import { FoldersComponent } from './folders/folders.component';
import { MetaDataComponent } from './meta-data/meta-data.component';


@NgModule({
  declarations: [
    AppComponent,
    FolderComponent,
    PathComponent,
    FoldersComponent,
    MetaDataComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    NgxElectronModule,
    BrowserAnimationsModule,
  	MaterialModule,
  	FireBaseModule,
  	ComunModule,
  	ServicesModule,
  	DataServicesModule,
  	AuthenticateModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
