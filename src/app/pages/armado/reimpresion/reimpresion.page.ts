import { finalize } from 'rxjs/operators';
import { UsuarioPage } from './../../usuario/usuario.page';
import { Storage } from '@ionic/storage';
import { WsArmadoService } from 'src/app/services/ws-armado.service';
import { Component, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-reimpresion',
  templateUrl: './reimpresion.page.html',
  styleUrls: ['./reimpresion.page.scss'],
})
export class ReimpresionPage implements OnInit {
impresora:any;
usuario:any;
bulto:string="";
ruta:string="";
cliente:string="";
pedido:string="";
consolidado:string="";
obs:string="";
@ViewChild('bul',{static:true}) bul;
  constructor(private webService:WsArmadoService, private storage:Storage) { }

  ngOnInit() {
    this.storage.get('usuario').then((val)=>{
      this.storage.get('impresora').then((val1)=>{
        this.usuario=val;
        this.impresora=val1;
        this.bul.setFocus();
      })
    })
  }

  onBulto(){
    if (this.bulto!="") {
      this.webService.presentLoading().then(()=>{
        this.webService.getInfoArmado(this.bulto)
        .pipe(
          finalize(async () => {
            await this.webService.loading.dismiss();
          }))
          .subscribe((data=>{
            let datos:any=data
            if (datos.status=="Ok") {
              if (datos.armado.ruta != 0) {
                this.ruta=datos.armado.ruta;
                this.cliente=datos.armado.nom_cliente;
                this.pedido=datos.armado.documento;
                this.consolidado=datos.armado.numconsolidado;
                this.obs=datos.armado.numBultos;
              }else{
                this.webService.presentToast('BULTO NO EXISTE').then(()=>{
                  this.ruta="";
                  this.cliente="";
                  this.pedido="";
                  this.consolidado="";
                  this.obs="";
                  this.bulto="";
                  this.bul.setFocus();
                })
              }
            }else{
              this.webService.presentToast(datos.mensaje);
            }
          }))
      })
    }
  }

  onImpresion(){
    this.webService.presentLoading().then(()=>{
      this.webService.colaImpresion('1',this.bulto,this.usuario.usuario.usuario,'1','1',this.impresora,'pendiente','1','reimpresion')
      .pipe(
        finalize(async () => {
          await this.webService.loading.dismiss();
        }))
      .subscribe((data=>{
        let datos:any=data
        if (datos.status=="Ok") {
            this.webService.audImpresion(this.bulto,this.usuario.usuario.usuario,'REIMPRESION','1',this.obs)
            .pipe(
              finalize(async () => {
                await this.webService.loading.dismiss();
              }))
            .subscribe((data=>{
              let aud:any=data
              if (aud.status=="Ok") {
                this.webService.presentToast(datos.mensaje+datos.msj).then(()=>{
                  this.ruta="";
                  this.cliente="";
                  this.pedido="";
                  this.consolidado="";
                  this.obs="";
                  this.bulto="";
                  this.bul.setFocus(); 
                })
              }else{
                this.webService.presentToast(aud.mensaje).then(()=>{
                  this.ruta="";
                  this.cliente="";
                  this.pedido="";
                  this.consolidado="";
                  this.obs="";
                  this.bulto="";
                  this.bul.setFocus();
                })
              }
            }))
        }else{
          this.webService.presentToast(datos.mensaje).then(()=>{
            this.ruta="";
            this.cliente="";
            this.pedido="";
            this.consolidado="";
            this.obs="";
            this.bulto="";
            this.bul.setFocus();
          })
        }
      }))
    })
  }

  

}
