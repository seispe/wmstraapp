import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RecepcionDocumentoPageRoutingModule } from './recepcion-documento-routing.module';

import { RecepcionDocumentoPage } from './recepcion-documento.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RecepcionDocumentoPageRoutingModule
  ],
  declarations: [RecepcionDocumentoPage]
})
export class RecepcionDocumentoPageModule {}
