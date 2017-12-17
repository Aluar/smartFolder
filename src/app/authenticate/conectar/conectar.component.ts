import { Component, OnInit, Input } from '@angular/core';
import { MatDialogRef } from '@angular/material';

import { SINGINMAILPASS, SINGINGOOGLE, SINGINFACEBOOK, SINGINGITHUB } from '../../services/fire-base.service';

const STATES = {singin:{button: "Ingresar",title:"Ingresar", leftmsg:"Crear cuenta", rightmsg:"Cambiar clave", tosingup:true, showpass:true},
			singup:{button: "Crear",title:"Crear cuenta", leftmsg:"Ingresar", rightmsg:"Cambiar clave", tosingup:false, showpass:true},
			passchange:{button: "Cambiar",title:"Cambiar de clave", leftmsg:"Ingresar", rightmsg:"", tosingup:false, showpass:false}};


@Component({
  selector: 'app-conectar',
  templateUrl: './conectar.component.html',
  styleUrls: ['./conectar.component.css']
})
export class ConectarComponent implements OnInit {
  datos = {tipo:-1, mail:"", pass:""};
  mailpass = SINGINMAILPASS;
  google = SINGINGOOGLE;
  facebook = SINGINFACEBOOK;
  github = SINGINGITHUB;
  state = STATES.singin;
	@Input() showGoogle:boolean = false;
	@Input() showFacebook:boolean = false;
	@Input() showGithub:boolean = false;

  constructor(public dialogRef: MatDialogRef<ConectarComponent>) { }

  ngOnInit() { }

  conectar(tipo)
  {
	this.datos.tipo = tipo;
	this.dialogRef.close(this.datos);
  }

  get canMailPass()
  {
	if ((this.datos.mail == "") || ((this.datos.pass == "") && (this.state.showpass)))
		return true;
  }

  select(opt){
	this.datos.mail = "";
	this.datos.pass = "";

	if (opt == 0)
		this.state =  STATES.passchange;

	if (opt == 1)
	{
		if (this.state.tosingup)
			this.state =  STATES.singup;
		else
			this.state =  STATES.singin;
	}
  }
}
