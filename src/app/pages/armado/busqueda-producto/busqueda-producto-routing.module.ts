import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BusquedaProductoPage } from './busqueda-producto.page';

const routes: Routes = [
  {
    path: '',
    component: BusquedaProductoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BusquedaProductoPageRoutingModule {}
