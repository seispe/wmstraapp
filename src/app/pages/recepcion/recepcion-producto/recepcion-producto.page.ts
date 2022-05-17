import { Component, OnInit, ViewChild } from '@angular/core';
import { WsRecepcionService } from './../../../services/ws-recepcion.service';
import { ActivatedRoute } from '@angular/router';
import { WebServiceService } from 'src/app/services/web-service.service';
import { NavController, AlertController, IonInput } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { finalize } from 'rxjs/operators';
@Component({
  selector: 'app-recepcion-producto',
  templateUrl: './recepcion-producto.page.html',
  styleUrls: ['./recepcion-producto.page.scss'],
})
export class RecepcionProductoPage implements OnInit {
  documento:string;
  producto:string;
  solicitado:number;
  cantidad_procesado:number;
  pendiente:number;
  isReadOnlyCantidad:boolean=true;
  isReadOnlyDestino:boolean=true;
  destino:string="";
  cantidad:number;
  usuario:any;
  pallet:number=0;
  @ViewChild('input_codigo', {  static: false })  cod: IonInput;
  @ViewChild('input_cantidad', {  static: false })  can: IonInput;
  @ViewChild('input_destino', {  static: false })  des: IonInput;
  constructor(private route:ActivatedRoute, private webService:WebServiceService,private webService_re:WsRecepcionService, private storage:Storage, private nav:NavController
    ,private alertController:AlertController) { }

  ngOnInit() {
    this.storage.get('usuario').then((val)=>{
      this.usuario=val;
      //this.ped =(this.route.snapshot.paramMap.get('ped')).split('-',3)[2];
      this.documento =this.route.snapshot.paramMap.get('doc');
      setTimeout(() => {
        this.cod.setFocus();
      }, 400);
    })
  }

  listarProductos(){
    this.nav.navigateForward('/lista-productos/'+this.documento);
  }

  producto_control(){

    if(this.producto!=""){
      this.webService.presentLoading().then(()=>{
        this.webService.validarProducto(this.producto).pipe(
          finalize(async () => {
            await this.webService.loading.dismiss();
          }))
        .subscribe((data=>{
          let valida:any=data
          if(valida.status=="Ok"){
              this.webService_re.presentLoading().then(()=>{
              this.webService_re.getArtDocumento('5',this.producto,this.documento)
              .pipe(
                finalize(async () => {
                    await this.webService_re.loading.dismiss();
                }))
              .subscribe((data=>{
                let prodar:any=data
                if (prodar.status=="Ok") {
                  this.producto=valida.producto.producto
                  this.webService_re.presentLoading().then(()=>{
                    this.webService_re.getArtDocumento('4',this.producto,this.documento)
                    .pipe(
                      finalize(async () => {
                          await this.webService_re.loading.dismiss();
                      }))
                    .subscribe((data=>{
                      let recepciondetalle:any=data
                      if(recepciondetalle.status=="Ok"){
                        this.solicitado = Number(recepciondetalle.articulo.cantidadsolicitada);
                        this.cantidad_procesado = Number(recepciondetalle.articulo.cantidadprocesada);
                        this.pendiente = Number(recepciondetalle.articulo.cantidadpendiente);
                        this.isReadOnlyCantidad=false;
                        setTimeout(() => {
                          this.can.setFocus();
                        }, 400);
                      }
                      else{
                        this.webService_re.presentLoading().then(()=>{
                          this.webService_re.getArtDocumento('5',this.producto,this.documento)
                          .pipe(
                            finalize(async () => {
                                await this.webService_re.loading.dismiss();
                            }))
                          .subscribe((data => {
                            let documentodetalle:any=data
                            if(documentodetalle.status=="Ok"){
                              this.solicitado = Number(documentodetalle.articulo.cantidadsolicitada);
                              this.cantidad_procesado = Number(documentodetalle.articulo.cantidadprocesada);
                              this.pendiente = Number(documentodetalle.articulo.cantidadpendiente);
                              this.isReadOnlyCantidad=false;
                              setTimeout(() => {
                                this.can.setFocus();
                              }, 400);
                            }else{
                              this.webService.presentToast("Error recuperando cantidades").then(()=>{
                                this.producto="";
                                setTimeout(() => {
                                  this.cod.setFocus();
                                }, 400);
                              });
                            }
                          }))
                        })
                      }
                    }))
                  })
                }else{
                  this.webService.presentToast("El código no pertenece a la orden").then(()=>{
                    this.producto="";
                    setTimeout(() => {
                      this.cod.setFocus();
                    }, 400);
                  });
                }
              }))
              });
          }else{
            this.webService.presentToast("El código no existe").then(()=>{
              this.producto="";
              setTimeout(() => {
                this.cod.setFocus();
              }, 400);
            });
          }
        }));
      });
    }else{
      this.webService.presentToast('El código no puede ser vacio').then(()=>{
        this.producto="";
        setTimeout(() => {
          this.cod.setFocus();
        }, 400);
      });
    }
  }

  async cantidad_control(){
    this.cantidad = Number(this.cantidad);
    if (this.cantidad >0) {
      if(Number(this.solicitado) < (Number(this.cantidad) + Number(this.cantidad_procesado))){
        const alert = await this.alertController.create({
          cssClass: 'primary',
          header: 'Advertencia!',
          message: '¿Desea recibir más de lo solicitado?',
          buttons: [
            {
              text: 'NO',
              role: 'cancel',
              cssClass: 'primary',
              handler: () => {
                this.cantidad = null;
                setTimeout(() => {
                  this.can.setFocus();
                }, 400);
              }
            },
            {
              text: 'SI',
              handler: () => {
                this.isReadOnlyDestino=false;
                setTimeout(() => {
                  this.des.setFocus();
                }, 400);
              }
            }
          ]
        });
        await alert.present();
      }else{
        this.isReadOnlyDestino=false;
                setTimeout(() => {
                  this.des.setFocus();
                }, 400);
      }


    }else{
      this.webService.presentToast('La cantidad debe ser mayor a cero').then(()=>{
        this.isReadOnlyCantidad=false;
        this.isReadOnlyDestino=true;
      });
    }
  }

  procesaRecepcion(){
    if(this.destino != ""){
      this.webService_re.presentLoading().then(()=>{
        this.webService_re.validaCoordenada(this.destino,'RECDESTINO')
        .pipe(
          finalize(async () => {
            await this.webService_re.loading.dismiss();
          }))
        .subscribe((data=>{
          let datos:any=data;
          if(datos.status=="Ok"){
            if(datos.existe.existe == 0){
              this.webService_re.presentToast('La coordenada no existe').then(()=>{
                this.destino = "";
                setTimeout(() => {
                  this.des.setFocus();
                }, 400);
              })
            }else{
              if (Number(this.cantidad) > 0){
                this.pallet = this.cantidad;
                this.pendiente = Number(this.solicitado) - (Number(this.cantidad_procesado)+ Number(this.cantidad));
                if(Number(this.cantidad_procesado) > 0){
                  this.msgCantidad();
                }else{
                  this.webService_re.presentLoading().then(()=>{
                    console.log(this.documento);
                    console.log(this.producto);
                    console.log(this.cantidad);
                    console.log(this.pendiente);
                    console.log(this.documento);
                    console.log(this.pallet);
                    console.log(this.destino);
                    console.log(this.usuario.usuario.usuario);

                    this.webService_re.insRecepcion(this.documento,this.producto,Number(this.cantidad),Number(this.pendiente),this.documento,this.pallet,this.destino,this.usuario.usuario.usuario)
                    .pipe(
                      finalize(async () => {
                        await this.webService_re.loading.dismiss();
                      }))
                    .subscribe((data => {
                      let recepcion:any=data;
                      if(recepcion.status=="Ok"){
                        if(recepcion.recepcion=="OK" || recepcion.recepcion=="COMPLETO"){
                          this.webService_re.presentToast('Insertado '+recepcion.recepcion).then(()=>{
                            this.producto = "";
                            this.solicitado = null;
                            this.cantidad_procesado = null;
                            this.pendiente = null;
                            this.cantidad = null;
                            this.destino = "";
                            setTimeout(() => {
                              this.cod.setFocus();
                            }, 400);
                          })
                          if(recepcion.recepcion=="COMPLETO"){
                            this.nav.navigateBack('/recepcion-documento');
                          }
                        }else{
                          this.webService_re.presentToast('Problemas insertando '+recepcion.recepcion);
                        }
                      }else{
                        this.webService_re.presentToast('Problemas insertando');
                      }
                    }))
                  })
                }
               
              }
            }
          }else{
            this.webService_re.presentToast('Error validando coordenada');
          }
        }))
      })
    }else{
      this.webService_re.presentToast('La coordenada destino no puede ser vacia').then(()=>{
        this.destino="";
      });
    }
  }

  async msgCantidad(){
    const alert = await this.alertController.create({
      cssClass: 'primary',
      header: 'Advertencia!',
      message: '¿Desea sumar a la cantidad recibida anteriormente?',
      buttons: [
        {
          text: 'NO',
          role: 'cancel',
          cssClass: 'primary',
          handler: () => {
            this.pendiente = Number(this.solicitado) - Number(this.cantidad);
            this.webService_re.presentLoading().then(()=>{
              console.log('CAN ' + this.cantidad + ' PEND ' + this.pendiente);
              this.webService_re.insRecepcion(this.documento,this.producto,Number(this.cantidad),Number(this.pendiente),this.documento,this.pallet,this.destino,this.usuario.usuario.usuario)
              .pipe(
                finalize(async () => {
                  await this.webService_re.loading.dismiss();
                }))
              .subscribe((data => {
                let recepcion:any=data;
                if(recepcion.status=="Ok"){
                  if(recepcion.recepcion=="OK" || recepcion.recepcion=="COMPLETO"){
                    this.webService_re.presentToast('Insertado '+recepcion.recepcion).then(()=>{
                      this.producto = "";
                      this.solicitado = null;
                      this.cantidad_procesado = null;
                      this.pendiente = null;
                      this.cantidad = null;
                      this.destino = "";
                      setTimeout(() => {
                        this.cod.setFocus();
                      }, 400);
                    })
                    if(recepcion.recepcion=="COMPLETO"){
                      this.nav.navigateBack('/recepcion-documento');
                    }
                  }else{
                    this.webService_re.presentToast('Problemas insertando '+recepcion.recepcion);
                  }
                }else{
                  this.webService_re.presentToast('Problemas insertando');
                }
              }))
            })
          }
        },
        {
          text: 'SI',
          handler: () => {
            let cant:number = Number(this.cantidad_procesado) + Number(this.cantidad);
            this.pendiente = Number(this.solicitado) - cant;
            this.cantidad = Number(this.cantidad_procesado) + Number(this.cantidad);
            this.webService_re.presentLoading().then(()=>{
              console.log('CAN ' + this.cantidad + ' PEND ' + this.pendiente);
              
              this.webService_re.insRecepcion(this.documento,this.producto,Number(this.cantidad),Number(this.pendiente),this.documento,this.pallet,this.destino,this.usuario.usuario.usuario)
              .pipe(
                finalize(async () => {
                  await this.webService_re.loading.dismiss();
                }))
              .subscribe((data => {
                let recepcion:any=data;
                if(recepcion.status=="Ok"){
                  if(recepcion.recepcion=="OK" || recepcion.recepcion=="COMPLETO"){
                    this.webService_re.presentToast('Insertado '+recepcion.recepcion).then(()=>{
                      this.producto = "";
                      this.solicitado = null;
                      this.cantidad_procesado = null;
                      this.pendiente = null;
                      this.cantidad = null;
                      this.destino = "";
                      setTimeout(() => {
                        this.cod.setFocus();
                      }, 400);
                    })
                    if(recepcion.recepcion=="COMPLETO"){
                      this.nav.navigateBack('/recepcion-documento');
                    }
                  }else{
                    this.webService_re.presentToast('Problemas insertando '+recepcion.recepcion);
                  }
                }else{
                  this.webService_re.presentToast('Problemas insertando');
                }
              }))
            })
          }
        }
      ]
    });
    await alert.present();
  }

}
