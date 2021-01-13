import { async } from '@angular/core/testing';
import { finalize } from 'rxjs/operators';
import { WebServiceService } from './../../services/web-service.service';
import { MenuController } from '@ionic/angular';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Storage } from "@ionic/storage";

@Component({
  selector: 'app-logistica',
  templateUrl: './logistica.page.html',
  styleUrls: ['./logistica.page.scss'],
})
export class LogisticaPage implements OnInit {
  usuario:any;
  pedido:string="";
  ciudad:string="";
  bultos:string="";
  cliente:string="";
  @ViewChild('ped',{static:true}) ped;
  constructor(private webService:WebServiceService,private menu:MenuController, private storage:Storage) { 
    this.menu.enable(true,'first');
  }

  ngOnInit() {
    this.storage.get('usuario').then((val)=>{
      this.usuario=val;
      this.ped.setFocus();
    });
  }
  onPedido(){
    this.webService.presentLoading().then(()=>{
      this.webService.getPedido(this.pedido)
      .pipe(
        finalize(async () => {
          await this.webService.loading.dismiss();
        }))
      .subscribe((data=>{
        let datos:any=data
        if (datos.status=="Ok") {
         this.cliente=datos.pedidos.soc_cliente;
         this.ciudad=datos.pedidos.ciudad;
         this.bultos=datos.pedidos.numBulto;
        }else{
          this.webService.presentToast(datos.mensaje).then(()=>{
            this.pedido="";
          })
        }
      }))
    })
  }

  onRecibir(){
    this.webService.presentLoading().then(()=>{
      this.webService.insLogistica(this.pedido, this.usuario.usuario.usuario)
      .pipe(
        finalize(async () => {
          await this.webService.loading.dismiss();
        }))
      .subscribe((data=>{
        let datos:any=data
        if (datos.status=="Ok") {
         this.webService.presentToast(datos.logistica.SALIDA);
         this.pedido="";
         this.ciudad="";
         this.bultos="";
         this.cliente="";
         this.ped.setFocus();
        }else{
          this.webService.presentToast(datos.mensaje).then(()=>{
            this.pedido="";
            this.ped.setFocus();
          })
        }
      }))
    })
  }

}
