import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EtiquetadoPageRoutingModule } from './etiquetado-routing.module';

import { EtiquetadoPage } from './etiquetado.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EtiquetadoPageRoutingModule
  ],
  declarations: [EtiquetadoPage]
})
export class EtiquetadoPageModule {}
