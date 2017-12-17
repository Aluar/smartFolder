import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ServicesModule } from '../services/services.module';

import { UsuarioService } from './usuario.service';

@NgModule({
  imports: [
    CommonModule,
	   ServicesModule,
  ],
  declarations: [],
  providers: [
	   UsuarioService,
  ]
})
export class DataServicesModule { }
