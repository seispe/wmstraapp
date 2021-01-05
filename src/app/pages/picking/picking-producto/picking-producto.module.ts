import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PickingProductoPageRoutingModule } from './picking-producto-routing.module';

import { PickingProductoPage } from './picking-producto.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PickingProductoPageRoutingModule
  ],
  declarations: [PickingProductoPage]
})
export class PickingProductoPageModule {}
