import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { PageEvent } from '@angular/material';

@Component({
  selector: 'lista',
  templateUrl: './lista.component.html',
  styleUrls: ['./lista.component.css']
})
export class ListaComponent implements OnInit {
  _post_icon;
  _items;
  __items = [];
  _pageEvent:PageEvent;
  _separacion = 5;

  @Input() Column = 5;
  @Input() Tags = [];
  @Input() Imagen = "value.image";
  @Input() Texto = "value.name";
  @Input() PageSize;
  @Output() ButtonClick = new EventEmitter();
  @Output() ItemClick = new EventEmitter();

  constructor() { }

  ngOnInit() { }

  @Input() set ButtonIcon(icon)
  {
    if (icon)
      this._post_icon = "mdi mdi-24px mdi-" + icon;
  }

  @Input() set Items(i)
  {
      if (i)
      {
        this.__items = i;
        this.filtrar({text:"", tags:[]});
      }
  }

  _post_clicl()
  {
    this.ButtonClick.next();
  }

  _imagen(item)
  {
    return "file:" + this._value(item, this.Imagen);
  }

  _texto(item)
  {
    return this._value(item, this.Texto);
  }

  _value(item, prop:string)
  {
    let props = prop.split(".");
    let i = item;

    for(let p of props)
    {
      i = i[p];
    }

    return i;
  }

  filtrar(f)
  {
    let res = this.__items.filter(function(item, index, array)
    {
      let text = item.value.name.toLowerCase().includes(f.text.toLowerCase());

      let tags = (f.tags.length > 0)? f.tags.every((element, i, a) => { return item.value.tags.includes(element); }) : true;

      return text && tags;
    });

    if (this.PageSize)
      res.slice((this.pageIndex * this.PageSize), this.PageSize);

    this._items = res;
  }

  _itemClick(item)
  {
    this.ItemClick.emit(item);
  }

  get pageIndex()
  {
    return this._pageEvent? this._pageEvent.pageIndex : 0;
  }
}
