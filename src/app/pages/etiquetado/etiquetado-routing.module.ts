import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EtiquetadoPage } from './etiquetado.page';

const routes: Routes = [
  {
    path: '',
    component: EtiquetadoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EtiquetadoPageRoutingModule {}
