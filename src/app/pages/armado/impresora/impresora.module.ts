import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ImpresoraPageRoutingModule } from './impresora-routing.module';

import { ImpresoraPage } from './impresora.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ImpresoraPageRoutingModule
  ],
  declarations: [ImpresoraPage]
})
export class ImpresoraPageModule {}
