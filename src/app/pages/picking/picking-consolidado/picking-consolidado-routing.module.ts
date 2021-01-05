import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PickingConsolidadoPage } from './picking-consolidado.page';

const routes: Routes = [
  {
    path: '',
    component: PickingConsolidadoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PickingConsolidadoPageRoutingModule {}
