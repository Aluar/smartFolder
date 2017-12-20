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

    this.dir.desktopIni.subscribe((data) =>
    {
console.log("MetaData desktopIni");
console.log(data);
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

    // Reset the input value
    if (input) {
      input.value = '';
    }
  }
}
