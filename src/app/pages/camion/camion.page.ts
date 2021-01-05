import { finalize } from 'rxjs/operators';
import { UsuarioPage } from './../usuario/usuario.page';
import { MenuController } from '@ionic/angular';
import { WebServiceService } from 'src/app/services/web-service.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Storage } from "@ionic/storage";

@Component({
  selector: 'app-camion',
  templateUrl: './camion.page.html',
  styleUrls: ['./camion.page.scss'],
})
export class CamionPage implements OnInit {
  usuario:any;
  pedido:string="";
  ciudad:string="";
  bultos:string="";
  cliente:string="";
  camion:string="";
  transportista:string="";
  transportes=[];
  transportesSelect:string;
  @ViewChild('ped',{static:true}) ped;
  constructor(private webService:WebServiceService, private menu:MenuController, private storage:Storage) { 
    this.menu.enable(true, 'first');
  }

  ngOnInit() {
    this.storage.get('usuario').then((val)=>{
      this.usuario=val;
      this.ped.setFocus();
      
    })
  }

  onPedido(){
    if (this.pedido!="") {
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
           this.webService.presentLoading().then(()=>{
            this.webService.getTrans(this.pedido,'1').pipe(
              finalize(async () => {
                  await this.webService.loading.dismiss();
              }))
            .subscribe((data=>{
              let datos:any=data
              if(datos.status=="Ok"){
                this.transportes=datos.transporte;
              }else{
                this.webService.presentToast(datos.mensaje);
              }
            }))
          })
          }else{
            this.webService.presentToast(datos.mensaje).then(()=>{
              this.pedido="";
              this.bultos="";
              this.cliente="";
              this.ciudad="";
              this.transportes=[];
            })
          }
        }))
      })
    }
    
  }

  onCargar(){
    this.webService.presentLoading().then(()=>{
      this.webService.cargaCamion(this.pedido,this.transportesSelect.split('|',2)[0],this.transportesSelect.split('|',2)[1], this.usuario.usuario.usuario)
      .pipe(
        finalize(async () => {
          await this.webService.loading.dismiss();
        }))
      .subscribe((data=>{
        let datos:any=data
        if (datos.status=="Ok") {
         this.webService.presentToast(datos.camion.SALIDA).then(()=>{
          this.pedido="";
         this.ciudad="";
         this.bultos="";
         this.cliente="";
         this.transportes=[];
         this.transportesSelect="";
         this.ped.setFocus();
         })
        }else{
          this.webService.presentToast(datos.mensaje).then(()=>{
            this.pedido="";
            this.transportes=[];
            this.ped.setFocus();
          })
        }
      }))
    })
  }


}
