import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BahiasPage } from './bahias.page';

const routes: Routes = [
  {
    path: '',
    component: BahiasPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BahiasPageRoutingModule {}
