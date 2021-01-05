import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PickingConsolidadoPageRoutingModule } from './picking-consolidado-routing.module';

import { PickingConsolidadoPage } from './picking-consolidado.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PickingConsolidadoPageRoutingModule
  ],
  declarations: [PickingConsolidadoPage]
})
export class PickingConsolidadoPageModule {}
