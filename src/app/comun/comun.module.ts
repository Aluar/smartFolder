import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { MaterialModule } from '../material/material.module';

import { BannerComponent } from './banner/banner.component';
import { BarraComponent } from './barra/barra.component';
import { FiltroComponent } from './filtro/filtro.component';
import { NtfilterPipe } from './ntfilter.pipe';
import { OtoaPipe } from './otoa.pipe';
import { ListaComponent } from './lista/lista.component';
import { EtiquetaComponent } from './etiqueta/etiqueta.component';
import { WindowsButtonsComponent } from './windows-buttons/windows-buttons.component';
import { TagComponent } from './tag/tag.component';
import { TabLabelDirective } from './tab-label.directive';
import { TabGroupComponent } from './tab-group/tab-group.component';
import { TabComponent } from './tab/tab.component';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    MaterialModule,
  ],
  declarations: [
    BannerComponent,
    BarraComponent,
    FiltroComponent,
    NtfilterPipe,
    OtoaPipe,
    ListaComponent,
    EtiquetaComponent,
    WindowsButtonsComponent,
    TagComponent,
    TabLabelDirective,
    TabGroupComponent,
    TabComponent,
  ],
  exports: [
    BannerComponent,
    BarraComponent,
    FiltroComponent,
    NtfilterPipe,
    OtoaPipe,
    ListaComponent,
    EtiquetaComponent,
    WindowsButtonsComponent,
    TagComponent,
    TabLabelDirective,
    TabGroupComponent,
    TabComponent,
  ]
})
export class ComunModule { }
