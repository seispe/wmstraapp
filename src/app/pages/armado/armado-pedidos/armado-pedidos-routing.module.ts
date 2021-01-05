import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ArmadoPedidosPage } from './armado-pedidos.page';

const routes: Routes = [
  {
    path: '',
    component: ArmadoPedidosPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ArmadoPedidosPageRoutingModule {}
