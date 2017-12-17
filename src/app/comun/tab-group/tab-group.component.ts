import { Component, OnInit, AfterViewInit, ContentChildren, QueryList, ViewChild, ViewContainerRef, Renderer2 } from '@angular/core';

import { TabComponent } from '../tab/tab.component';
import { TabLabelDirective } from '../tab-label.directive';

@Component({
  selector: 'dv-tab-group',
  templateUrl: './tab-group.component.html',
  styleUrls: ['./tab-group.component.css']
})
export class TabGroupComponent implements OnInit, AfterViewInit {
  @ContentChildren(TabLabelDirective) contenidos: QueryList<TabLabelDirective>;
  @ViewChild("contenido", {read: ViewContainerRef}) contenido:ViewContainerRef;
  @ViewChild("tabsContiner") tabsContiner;

  private current = {label:"", index:-1};
  tabs;

  constructor(private renderer: Renderer2) { }


  ngOnInit()
  {
    this.renderer.listen(this.tabsContiner.nativeElement, 'overflow', (evt) => {
      console.log('overflow', evt);
    });
    this.renderer.listen(this.tabsContiner.nativeElement, 'underflow', (evt) => {
      console.log('underflow', evt);
    });
  }

  ngAfterViewInit()
  {
    this.tabs = this.contenidos.toArray().map((item, array, index) =>  { return {label:item.label, selected:false, viewRef:item.viewContainerRef, templateRef:item.templateRef} });
  }

  setTab(tab, index)
  {
    this.contenido.clear();

    if (this.current.index != -1)
      this.tabs[this.current.index].selected = false;

    let view = tab.viewRef.createEmbeddedView(tab.templateRef);

    this.current.index = index;
    this.current.label = tab.label;
    this.tabs[this.current.index].selected = true;

    this.contenido.insert(view);
  }
}
