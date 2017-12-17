import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'filter',
  templateUrl: './filtro.component.html',
  styleUrls: ['./filtro.component.css']
})
export class FiltroComponent implements OnInit {
  @Input() allTags:string[];
  @Output() onFilter = new EventEmitter();
  @Output() nameChange = new EventEmitter();
  @Output() tagsChange = new EventEmitter();  

  filtros = {text:"", tags:[]};  
  
  constructor() { }

  ngOnInit() { }
    
  get texto():string
  {
	return this.filtros.text;  
  }

  set texto(t:string)
  {
	this.filtros.text = t;
	this.onFilter.emit({text:this.filtros.text, tags:this.filtros.tags});
	this.nameChange.emit(this.filtros.text);
  }
  
  setTag(tag:string, expanded:string)
  {
	if (expanded)
	{
		let i:number = this.filtros.tags.indexOf(tag);
	
		if (i >= 0)
			this.filtros.tags.splice(i, 1);
		else
			this.filtros.tags.push(tag);
		
		this.onFilter.emit({text:this.filtros.text, tags:this.filtros.tags});
		this.tagsChange.emit(this.filtros.tags);
	}
  }
}