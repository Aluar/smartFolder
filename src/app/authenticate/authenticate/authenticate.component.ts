import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';

import { FireBaseService } from '../../services/fire-base.service';
import { RouterService } from '../../services/router.service';
import { UsuarioService } from '../../data-services/usuario.service';

import { ConectarComponent } from '../conectar/conectar.component';

const CONECTAR = "Ingresar";
const UPDATENAME = "Actualiza tu nombe";

@Component({
  selector: 'authenticate',
  templateUrl: './authenticate.component.html',
  styleUrls: ['./authenticate.component.css']
})
export class AuthenticateComponent implements OnInit {	
  state = {connecting:false, msg:CONECTAR};
  
  constructor(private dialog:MatDialog, private fb:FireBaseService, private user:UsuarioService, private r:RouterService) { }

  ngOnInit() { 
	this.fb.AuthState.subscribe((user) =>
	{
		if (user)
		{
			this.user.publico.subscribe((user) =>
			{
				if (user)
					this.state = {connecting:false, msg:user.name};			
				else		
					this.state = {connecting:false, msg:UPDATENAME};
			});
		}
		else
			this.state = {connecting:false, msg:CONECTAR};
	});
  }
  
  authButtonClick()
  {
	if(this.state.msg == CONECTAR)
	{
		this.state.connecting = true;
		
		this.dialog.open(ConectarComponent, {}).afterClosed().subscribe(singin =>
		{
			if (singin)				
				this.fb.sigIn(singin.tipo, singin.mail, singin.pass);
			else
				this.state.connecting = false;
		});
	}else
		this.r.Jump("perfil");
  }
}