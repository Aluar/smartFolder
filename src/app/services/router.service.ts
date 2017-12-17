import { Injectable } from '@angular/core';

import { GenService } from './gen.service';

@Injectable()
export class RouterService {
  rutas = [];
  sep = '|';

  constructor(private g:GenService) {
    this.rutas = this.loadRoutes;
  }

  Jump(r:string){
    this.rutas.splice(0);
    this.rutas.push(r.toLowerCase());

    this.saveRoutes(this.rutas);
  }

  Forward(r:string){
    this.rutas.push(r);

    this.saveRoutes(this.rutas);
  }

  Backward(){
    this.rutas.splice(this.rutas.length - 1);

    this.saveRoutes(this.rutas);
  }

  Show(r:string):boolean{
    let a = this.current;
    let i = a.indexOf(r.toLowerCase());
    if ((i == 0) && ((a.length == r.length) || (a[r.length] =='/')))
      return true;

    return false;
  }

  get loadRoutes():string[]{
	let a = this.g.getCookie('ruta');
    let res = a.split(this.sep);

    return res;
  }

  saveRoutes(rutas:string[]){
    let a = "";

    for (let r of rutas)
      a = a + r + this.sep;

	if (a.length > 0)
		a = a.slice(0, a.length - 1);
    this.g.setCookie('ruta', a);
  }

  get current(){
	if (this.rutas.length == 0)
		return "";
    return this.rutas[this.rutas.length - 1];
  }
}
