import { Directive, Input, TemplateRef, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[dv-tab-label]'
})
export class TabLabelDirective {
  public label:string = "";

  constructor(public templateRef: TemplateRef<any>, public viewContainerRef: ViewContainerRef) { }

  @Input("dv-tab-label") set etiqueta(l:string)
  {
    this.label = l? l: "";
  }
}
