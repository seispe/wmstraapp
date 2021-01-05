import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ConsultaProdPage } from './consulta-prod.page';

const routes: Routes = [
  {
    path: '',
    component: ConsultaProdPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ConsultaProdPageRoutingModule {}
