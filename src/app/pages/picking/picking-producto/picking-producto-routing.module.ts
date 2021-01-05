import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PickingProductoPage } from './picking-producto.page';

const routes: Routes = [
  {
    path: '',
    component: PickingProductoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PickingProductoPageRoutingModule {}
