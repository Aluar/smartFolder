import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { MaterialModule } from '../material/material.module';

import { AuthenticateComponent } from './authenticate/authenticate.component';
import { ConectarComponent } from './conectar/conectar.component';

@NgModule({
  imports: [
    CommonModule,
	FormsModule,
	MaterialModule,
  ],
  declarations: [
	AuthenticateComponent, 
	ConectarComponent,
  ],
  exports: [
	AuthenticateComponent,
  ],
  entryComponents: [
	ConectarComponent
  ],
})
export class AuthenticateModule { }
