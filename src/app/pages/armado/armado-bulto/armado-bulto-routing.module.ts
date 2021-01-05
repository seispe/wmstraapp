import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ArmadoBultoPage } from './armado-bulto.page';

const routes: Routes = [
  {
    path: '',
    component: ArmadoBultoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ArmadoBultoPageRoutingModule {}
