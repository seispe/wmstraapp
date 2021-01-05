import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ImpresoraPage } from './impresora.page';

const routes: Routes = [
  {
    path: '',
    component: ImpresoraPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ImpresoraPageRoutingModule {}
