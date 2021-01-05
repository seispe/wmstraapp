import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ArmadoBultoPageRoutingModule } from './armado-bulto-routing.module';

import { ArmadoBultoPage } from './armado-bulto.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ArmadoBultoPageRoutingModule
  ],
  declarations: [ArmadoBultoPage]
})
export class ArmadoBultoPageModule {}
