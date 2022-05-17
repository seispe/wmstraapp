import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RecepcionProductoPage } from './recepcion-producto.page';

const routes: Routes = [
  {
    path: '',
    component: RecepcionProductoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RecepcionProductoPageRoutingModule {}
