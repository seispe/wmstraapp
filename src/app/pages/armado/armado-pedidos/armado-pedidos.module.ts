import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ArmadoPedidosPageRoutingModule } from './armado-pedidos-routing.module';

import { ArmadoPedidosPage } from './armado-pedidos.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ArmadoPedidosPageRoutingModule
  ],
  declarations: [ArmadoPedidosPage]
})
export class ArmadoPedidosPageModule {}
