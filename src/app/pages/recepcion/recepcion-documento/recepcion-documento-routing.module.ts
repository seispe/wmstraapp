import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RecepcionDocumentoPage } from './recepcion-documento.page';

const routes: Routes = [
  {
    path: '',
    component: RecepcionDocumentoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RecepcionDocumentoPageRoutingModule {}
