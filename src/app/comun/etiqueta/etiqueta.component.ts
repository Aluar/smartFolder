import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'etiqueta',
  templateUrl: './etiqueta.component.html',
  styleUrls: ['./etiqueta.component.css']
})
export class EtiquetaComponent implements OnInit {
  _texto = "";

  @Input() size = 10;
  constructor() { }

  ngOnInit() {
  }

  @Input() set texto(t)
  {
    if (t)
      this._texto = t;

console.log(this._texto);
  }

  get fs()
  {
    return this.size + 'px';
  }

}
