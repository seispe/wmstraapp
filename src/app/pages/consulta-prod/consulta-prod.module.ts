import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ConsultaProdPageRoutingModule } from './consulta-prod-routing.module';

import { ConsultaProdPage } from './consulta-prod.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ConsultaProdPageRoutingModule
  ],
  declarations: [ConsultaProdPage]
})
export class ConsultaProdPageModule {}
