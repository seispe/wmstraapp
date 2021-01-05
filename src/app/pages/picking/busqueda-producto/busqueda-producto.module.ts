import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BusquedaProductoPageRoutingModule } from './busqueda-producto-routing.module';

import { BusquedaProductoPage } from './busqueda-producto.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    BusquedaProductoPageRoutingModule
  ],
  declarations: [BusquedaProductoPage]
})
export class BusquedaProductoPageModule {}
