import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'barra',
  templateUrl: './barra.component.html',
  styleUrls: ['./barra.component.css']
})
export class BarraComponent implements OnInit {  
  _top = "0%";
  _bottom = "0%";
  _bottomtotal = "0%";
  _total = 100;
  //private _bottomcolor = "primary";
  _blue = true;
  @Input() Title:string;
  @Input() TopLabel:string;
  @Input() BottomLabel:string;
  @Input() percent:boolean = true;
  @Input() Botton100:boolean = false;    
  
  constructor() { }

  ngOnInit() {
  }

  @Input() set Total(t:number)
  {
	if (t && !this.percent)
		this._total = t;
  }
  
  @Input() set Top(t:number)
  {
	if (t)
	{
		this._top = this.rango(t);	
	}		
  }
  
  @Input() set Bottom(b:number)
  {
	if (b)
	{
		this._bottom = this.rango(b);
		this._bottomtotal = this.bottonrang(b) + "%";
		this._blue = (b <= this._total);
	}		
  }
  
  private rango(v:number)
  {
	let res = this.bottonrang(v);
	
	res = (res <= this._total)? res : this._total;
	
	return (res + "%");
  }
  
  private bottonrang(v:number)
  {
	  return (v >= 0)? v : 0;
  }
  
  get blue():boolean
  {
	return this._blue;
  }
  
  get red():boolean
  {
	return !this._blue;
  }
}
