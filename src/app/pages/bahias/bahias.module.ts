import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BahiasPageRoutingModule } from './bahias-routing.module';

import { BahiasPage } from './bahias.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    BahiasPageRoutingModule
  ],
  declarations: [BahiasPage]
})
export class BahiasPageModule {}
