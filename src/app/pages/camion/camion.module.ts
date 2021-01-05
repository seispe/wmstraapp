import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CamionPageRoutingModule } from './camion-routing.module';

import { CamionPage } from './camion.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CamionPageRoutingModule
  ],
  declarations: [CamionPage]
})
export class CamionPageModule {}
