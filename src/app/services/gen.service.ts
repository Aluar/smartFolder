import { Injectable } from '@angular/core';

@Injectable()
export class GenService {
  sep = "|";

  constructor() { }

  Elemento(e:any){
  return <HTMLElement>document.getElementById(e);
  }

  Input(e:any){
  return <HTMLInputElement>document.getElementById(e);
  }

  valorElemento(e:any){
  let el = this.Input(e);

  if (el)
    return el.value;//(<HTMLInputElement>document.getElementById(e)).value;

  return "";
  }

  valorCheck(e:any){
  let el = this.Input(e);

  if (el)
    return el.checked;//(<HTMLInputElement>document.getElementById(e)).checked;

  return false;
  }

  getInnerHTML(e:any){
  let el = this.Elemento(e);

  if (el)
    return el.innerHTML;

  return "";
  }

  setInnerHTML(e:any, dato:any){
  let el = this.Elemento(e);

  if (el)
    el.innerHTML = dato;
  }

  booleanValor(val:any):boolean{
    if (typeof val === 'boolean')
  {
    return val;
  }
  if (typeof val === 'string')
  {
    if (val === 'true')
    return true;
  }
  return false;
  }

  getCookie(key:string):string{
      let a = document.cookie.split(";");
      for (let b of a){
		let c = b.split('=');
		if ((c.length > 0) && (this.cerospace(c[0])==key))
		  return c[1];
	  }

      return '';
  }

  setCookie(key:string, value:string){
    document.cookie = key + '=' + value;
  }

  clearCookies(){
    let cookies = document.cookie.split(';');
    for(let i in cookies){
        let vals = cookies[i].split('=');
        let name = vals[0];
        document.cookie = name+'=; max-age=0';
    }
  }

  clearCookie(key:string){
    document.cookie = key+'=; max-age=0';
  }

  cerospace(s:string):string{
	let i = 0;

	for (i; i < s.length; i++)
		if (s[i] != " ")
			break;

	return s.substr(i);
  }

  empty(s:string):boolean{
  if ((s == undefined) || (s == null) || (s == ""))
    return true;

  return false;
  }

  mod(x:any):number{
   return Math.floor((this.numero(x) - 10) / 2);
  }

  numero(v:any):number{
    if (v=="null")
      return 0;

    if (typeof(v)=="string"){
      let a = Number(v);
      if (isNaN(a))
        a = 0;
      return a;
    }

    if (typeof(v)=="number")
      return v;

    return 0;
  }

  editable(e:any){
    if (e)
      return null;//true
    return false;
  }

  divContenteditableText(id:any){
    let msg =  this.getInnerHTML(id);

    msg = msg.replace("<div>","");
    msg = msg.replace(new RegExp("</div>","g"),"\n");
    msg = msg.replace(new RegExp("<br>","g"),"\n");

    return msg;
  }

  elementContenteditableText(elemento:any){
    let msg =  elemento.innerHTML;

    msg = msg.replace("<div>","");
    msg = msg.replace(new RegExp("</div>","g"),"\n");
    msg = msg.replace(new RegExp("<br>","g"),"\n");

    return msg;
  }

  dice(sides:number, numbers:number):number[]{
  let dices:number[] = [];

  for (let n=0; n < numbers; n++){
    dices.push(Math.floor(Math.random()*sides)+1);
  }

    return dices;
  }

  arrayClone(array){
	let res = [];

	if (array)
		for(let i of array)
			res.push(i);

	return res;
  }
}