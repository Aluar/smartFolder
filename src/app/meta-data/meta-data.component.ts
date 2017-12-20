import { Component, OnInit } from '@angular/core';
import { ENTER } from '@angular/cdk/keycodes';

import { DirService } from '../services/dir.service';
import { LocaldbService } from '../services/localdb.service';
import { COMMA, TAGS } from '../../environments/constant';

@Component({
  selector: 'meta-data',
  templateUrl: './meta-data.component.html',
  styleUrls: ['./meta-data.component.css']
})
export class MetaDataComponent implements OnInit {
  datos = {titulo:"", tags:[]};
  tags;
  separatorKeysCodes = [ENTER, COMMA];

  constructor(public dir:DirService, public db:LocaldbService) { }

  ngOnInit()
  {
    this.tags = this.db.observe(TAGS);

    this.dir.desktopIni.subscribe((desktopIni) =>
    {
console.log("MetaData desktopIni");
console.log(desktopIni);
		for (let item of desktopIni.data)
		{
			switch(item.key)
			{
				case "title":
					this.datos.titulo = item.value;
					break;
				case "tags":
					this.datos.tags = item.value;
					break;
			}
		}
    });
  }

  setTag(tag, expanded)
  {
    if (expanded)
  	{
  		let i = this.datos.tags.indexOf(tag);

  		if (i >= 0)
  			this.datos.tags.splice(i, 1);
  		else
  			this.datos.tags.push(tag);
  	}
  }

  pushTag(event)
  {
    let input = event.input;
    let value = event.value;

    if ((value || '').trim())
		  this.db.push(TAGS, value.trim());

    if (input)
      input.value = '';
  }
}
