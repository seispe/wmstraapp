import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RecepcionProductoPageRoutingModule } from './recepcion-producto-routing.module';

import { RecepcionProductoPage } from './recepcion-producto.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RecepcionProductoPageRoutingModule
  ],
  declarations: [RecepcionProductoPage]
})
export class RecepcionProductoPageModule {}
