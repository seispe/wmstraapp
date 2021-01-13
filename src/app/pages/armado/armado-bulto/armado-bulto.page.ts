import { LoginPage } from './../../login/login.page';
import { async } from '@angular/core/testing';
import { WebServiceService } from 'src/app/services/web-service.service';
import { Storage } from '@ionic/storage';
import { WsArmadoService } from 'src/app/services/ws-armado.service';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit, ViewChild } from '@angular/core';
import { finalize } from 'rxjs/operators';
import { NavController, AlertController, IonInput } from '@ionic/angular';
import { stringify } from 'querystring';

@Component({
  selector: 'app-armado-bulto',
  templateUrl: './armado-bulto.page.html',
  styleUrls: ['./armado-bulto.page.scss'],
})
export class ArmadoBultoPage implements OnInit {
pedido:string;
area:string="00";
ciudad:string;
usuario:any;
impresora:string;
origen:string;
producto:string;
codbulto:string;
bulto:number;
solicitado:number;
armado:number;
pendiente:number;
cantidad:number;
unidad:string;
isReadOnlyCantidad:boolean=true;
isReadOnlyCodigo:boolean=true;
isReadOnlyObs:boolean=true;
isReadOnlyDestino:boolean=true;
observacion:string;
destino:string="";
index:number=0;
arrows:boolean=false;
bander:boolean=true;
@ViewChild('input_ori',{static:true}) ori;
@ViewChild('input_codigo', {  static: false })  cod: IonInput;
@ViewChild('input_cant', {  static: false })  can: IonInput;
@ViewChild('input_des',{static: true}) des;
@ViewChild('input_obs',{static: true}) obs;
  constructor(private route:ActivatedRoute, private webService:WebServiceService,private webService_ar:WsArmadoService, private storage:Storage, private nav:NavController
    ,private alertController:AlertController
    ) { }

  ngOnInit() {
    this.storage.get('usuario').then((val)=>{
      this.storage.get('impresora').then((val1)=>{
        this.usuario=val;
        this.impresora=val1;
        //this.ped =(this.route.snapshot.paramMap.get('ped')).split('-',3)[2];
        this.pedido =this.route.snapshot.paramMap.get('ped');
        this.ciudad =this.route.snapshot.paramMap.get('ciu');
        this.area =this.route.snapshot.paramMap.get('area');
        this.ori.setFocus();
      })
    })
  }

  listarProductos(){
    this.nav.navigateForward('/lista-productos/'+this.pedido+'/'+this.area);
  }

  validaOrigen(){
    this.webService_ar.presentLoading().then(()=>{
      this.webService_ar.validaCoordenada(this.origen,'ARMORIGEN')
      .pipe(
        finalize(async () => {
          await this.webService_ar.loading.dismiss();
        }))
      .subscribe((data=>{
        let datos:any=data
        if (datos.status=="Ok") {
         if (datos.existe.existe == 0) {
          this.webService_ar.presentToast('La coordenada no existe.').then(()=>{
            this.origen="";
            this.ori.setFocus();
          }); 
         }else{
           this.isReadOnlyCodigo=false;
           setTimeout(() => {
                  this.cod.setFocus();
            }, 400);
         }
        }else{
          this.webService_ar.presentToast(datos.mensaje);
        }
      }))
    })
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

              this.producto=valida.producto.producto
              this.webService_ar.presentLoading().then(()=>{
              this.webService_ar.pedDetProceso(this.pedido,this.producto,'2','','')
              .pipe(
                finalize(async () => {
                    await this.webService_ar.loading.dismiss();
                }))
              .subscribe((data=>{
                let prodar:any=data
                if (prodar.status=="Ok") {
                  if (prodar.existe.existe > 0) {
                    this.webService_ar.presentLoading().then(()=>{
                    this.webService_ar.getBultos(this.usuario.usuario.usuario,'0')
                    .pipe(
                      finalize(async () => {
                        await this.webService_ar.loading.dismiss();
                      }))
                    .subscribe((data=>{
                      let getbul:any=data
                      if (getbul.status=="Ok") {
                      
                        this.codbulto=getbul.bulto.codigo;
                        this.bulto=getbul.bulto.id;
                        this.cargaArticulos();
                        this.unidad=valida.producto.unidad;
                      }else{
                      
                        this.webService_ar.presentLoading().then(()=>{
                        this.webService_ar.insBultos('0',this.usuario.usuario.usuario)
                        .pipe(
                          finalize(async () => {
                            await this.webService_ar.loading.dismiss();
                          // await this.webService.loading.dismiss();
                          }))
                        .subscribe((data=>{
                          let insbul:any=data
                         
                          if (insbul.status=="Ok") {
                            
                            
                            if (insbul.bulto.bulto != 'ERROR') {
                              this.codbulto=insbul.bulto.codigo;
                              this.bulto=insbul.bulto.bulto;
                              this.cargaArticulos();
                            }else{
                              this.webService_ar.presentToast('Error creación bulto').then(()=>{
                                this.producto="";
                                this.codbulto="";
                                this.bulto=0;
                                setTimeout(() => {
                                  this.cod.setFocus();
                                }, 400);
                              })
                            }
                          }else{
                            this.webService_ar.presentToast(insbul.mensaje).then(()=>{
                              this.producto="";
                              this.codbulto="";
                              this.bulto=0;
                              setTimeout(() => {
                                this.cod.setFocus();
                              }, 400);
                            })
                          }
                        }))
                      })
                      }
                    }))
                  })
                    
                  } else {
                    this.webService_ar.presentToast("Verifique el código").then(()=>{
                      this.producto="";
                      this.codbulto="";
                      setTimeout(() => {
                        this.cod.setFocus();
                      }, 400);
                    });
                  }
                }
              }))
              })
              
            
          }else{
            this.webService.presentToast("El código no existe").then(()=>{
              this.producto="";
              this.codbulto="";
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
        this.codbulto="";
        setTimeout(() => {
          this.cod.setFocus();
        }, 400);
      });
    }
    
  }



  cargaArticulos(){
    if (this.producto != "") {
        this.webService_ar.getDetArmado(this.producto,this.pedido,this.area,'1')
        .pipe(
          finalize(async () => {
            await this.webService_ar.loading.dismiss();
          }))
        .subscribe((data=>{
          let datos:any=data;
          if (datos.status=="Ok") {
            this.solicitado=datos.armado.cant_procesada;
            this.armado=datos.armado.cant_armada;
            this.pendiente=this.solicitado - this.armado;
            if (this.pendiente==0) {
              this.webService_ar.presentToast('Error: el artículo ya fue armado').then(()=>{
                this.solicitado = null;
                this.armado = null;
                this.pendiente = null;
                this.producto="";
                this.codbulto="";
                this.bulto=null;
                setTimeout(() => {
                  this.cod.setFocus();
                }, 400);
              })
            }else{
              this.isReadOnlyCantidad=false;
            }
          }else{
            this.webService_ar.presentToast(datos.mensaje)
          }
        }))
   
      
    }
  }
  
 cantidad_control(){
  this.cantidad = Number(this.cantidad);
  
  if (this.cantidad >0 && this.cantidad <= this.pendiente) {
    this.obs.setFocus();  
    this.isReadOnlyObs=false;
    this.isReadOnlyDestino=false;
    
  }else{
    this.webService.presentToast('La cantidad debe ser mayor a cero y menor o igual a la pendiente').then(()=>{
      this.isReadOnlyCantidad=false;
      this.isReadOnlyObs=true;
      this.isReadOnlyDestino=true;
    });
  }
}


obs_enter(){
  this.des.setFocus();
}

guardaArmado(){
  if (this.destino != "") {
    this.webService_ar.presentLoading().then(()=>{
      this.webService_ar.validaCoordenada(this.destino,'ARMDESTINO')
      .pipe(
        finalize(async () => {
          await this.webService_ar.loading.dismiss();
        }))
      .subscribe((data=>{
        let datos:any=data
        if (datos.status=="Ok") {
         if (datos.existe.existe == 0) {
          this.webService_ar.presentToast('La coordenada no existe.').then(()=>{
            this.destino="";
            this.des.setFocus();
          }); 
         }else{
           
              this.webService_ar.presentLoading().then(()=>{
                this.webService_ar.validaBulto(0,this.bulto,this.pedido,this.usuario.usuario.usuario)
                .pipe(
                  finalize(async () => {
                    await this.webService_ar.loading.dismiss();
                  }))
                .subscribe((data=>{
                  let datos:any=data;
                  if (datos.status == "Ok") {
                    let globalbulto:number = datos.bulto;
                    this.pendiente = this.pendiente - this.cantidad;
                    this.webService_ar.presentLoading().then(()=>{
                      this.webService_ar.insArmado(this.pedido,this.producto,this.origen,this.destino,this.armado,this.cantidad
                        ,this.pendiente,'',this.observacion,this.usuario.usuario.usuario,globalbulto)
                      .pipe(
                        finalize(async () => {
                          await this.webService_ar.loading.dismiss();
                        }))
                      .subscribe((data => {
                        let datos:any=data;
                        if (datos.status == "Ok") {
                          this.webService_ar.presentLoading().then(()=>{
                            this.webService_ar.detProcPed(this.pedido,this.usuario.usuario.usuario,this.area)
                            .pipe(
                              finalize(async () => {
                                await this.webService_ar.loading.dismiss();
                              }))
                            .subscribe((data => {
                              let datos:any=data;
                              if (datos.status == "Ok") {
                                if (datos.existe.Procesados == 1) {
                                  this.webService_ar.presentLoading().then(()=>{
                                    this.webService_ar.insBultos("2",this.usuario.usuario.usuario)
                                    .pipe(
                                      finalize(async () => {
                                        await this.webService_ar.loading.dismiss();
                                      
                                      }))
                                    .subscribe((data => {
                                      let datos:any=data;
                                      if (datos.status == "Ok") {
                                        this.webService_ar.presentLoading().then(()=>{
                                          this.webService_ar.colaImpresion('1',this.bulto.toString(),this.usuario.usuario.usuario,'1','1',this.impresora,"pendiente",'1',"armado")
                                          .pipe(
                                            finalize(async () => {
                                              await this.webService_ar.loading.dismiss();
                                            
                                            }))
                                          .subscribe((data => {
                                            let datos:any=data;
                                            if (datos.status == "Ok") {
                                              
                                                this.webService_ar.presentLoading().then(()=>{
                                                  this.webService_ar.cierreArmado(this.pedido,this.area)
                                                  .pipe(
                                                    finalize(async () => {
                                                      await this.webService_ar.loading.dismiss();
                                                    
                                                    }))
                                                  .subscribe((data =>{
                                                    let datos:any=data;
                                                    if (datos.status == "Ok") {
                                                      if (datos.cierre == "OK") {
                                                        this.webService_ar.presentToast('Insertado ' + datos.cierre).then(()=>{
                                                          this.producto = "";
                                                          this.solicitado = null;
                                                          this.armado = null;
                                                          this.pendiente = null;
                                                          this.cantidad = null;
                                                          this.observacion = "";
                                                          setTimeout(() => {
                                                            this.cod.setFocus();
                                                          }, 400);
                                                          
                                                        });
                                                      }else{
                                                        this.nav.navigateBack('/impresora');
                                                        
                                                      }
                                                    }else{
                                                      this.webService_ar.presentToast('Error al intentar el cierre de armado')
                                                    }
                                                  }))
                                                })
                                            
                                            }else{
                                              this.webService_ar.presentToast('Problemas de impresión. Bulto:' + this.bulto)
                                            }
                                          }))
                                        })
                                      }else{
                                        this.webService_ar.presentToast('Error cerrando el bulto');
                                      }
                                    }))
                                  })
                                }else{
                                  this.webService_ar.presentLoading().then(()=>{
                                    this.webService_ar.cierreArmado(this.pedido, this.area)
                                    .pipe(
                                      finalize(async () => {
                                        await this.webService_ar.loading.dismiss();
                                      
                                      }))
                                    .subscribe((data =>{
                                      let datos:any=data;
                                      if (datos.status == "Ok") {
                                        if (datos.cierre == "OK") {
                                          this.webService_ar.presentToast('Insertado ' + datos.cierre).then(()=>{
                                            this.producto = "";
                                            this.solicitado = null;
                                            this.armado = null;
                                            this.pendiente = null;
                                            this.cantidad = null;
                                            this.observacion = "";
                                            setTimeout(() => {
                                              this.cod.setFocus();
                                            }, 400);
                                            
                                          });
                                        }else{
                                          this.webService_ar.presentLoading().then(()=>{
                                            this.webService_ar.insBultos('2', this.usuario.usuario.usuario)
                                            .pipe(
                                              finalize(async () => {
                                                await this.webService_ar.loading.dismiss();
                                              
                                              }))
                                            .subscribe((data =>{
                                              let datos:any=data;
                                              if (datos.status == "Ok") {
                                                this.webService_ar.presentLoading().then(()=>{
                                                  this.webService_ar.colaImpresion('1',this.bulto.toString(),this.usuario.usuario.usuario,'1','1',this.impresora,"pendiente",'1',"armado")
                                                  .pipe(
                                                    finalize(async () => {
                                                      await this.webService_ar.loading.dismiss();
                                                    
                                                    }))
                                                  .subscribe((data => {
                                                    let datos:any=data;
                                                    if (datos.status == "Ok") {
                                                    
                                                      this.nav.navigateBack('/impresora');
                                                     
                                                    }else{
                                                      this.webService_ar.presentToast('Problemas de impresión. Bulto:' + this.bulto)  
                                                    }
                                                  }))
                                                })
                                              }else{
                                                this.webService_ar.presentToast('Error cerrando el bulto')
                                              }
                                            }))
                                          })
                                        }
                                      }else{
                                        this.webService_ar.presentToast('Error al intentar el cierre de armado')
                                      }
                                    }))
                                  })
                                }
                              }else{
                                this.webService_ar.presentToast('ERROR, detprocped ' + datos.mensaje);
                              }
                            }))
                          })
                          
                        }else{
                          this.webService_ar.presentToast('Problemas al insertar' + datos.mensaje);
                        }
                      }))
                    })
                    
                  }else{
                    this.webService_ar.presentToast('ERROR, validabulto' + datos.mensaje);
                  }
                }))
              })
            
           
          }
        }else{
          this.webService_ar.presentToast('ERROR, validacoor' + datos.mensaje);
        }
      }))
    })
  }else{
    this.webService.presentToast('La coordenada destino no puede estar vacia');
  }
}

async msgBulto(op){
  if (this.codbulto ==null && op == 2) {
    this.nav.navigateBack('/armado-pedidos');
  }else{
    if (this.codbulto != null){
     const alert = await this.alertController.create({
        cssClass: 'primary',
        header: 'Advertencia!',
        message: '¿Desea cerrar el bulto?, se creará uno nuevo',
        buttons: [
          {
            text: 'NO',
            role: 'cancel',
            cssClass: 'primary',
            handler: () => {
              if (op == 2) {
                this.nav.navigateBack('/armado-pedidos');
              }
            }
          },
          {
            text: 'SI',
            handler: () => {
              this.cerrarBulto(op);
            }
          }
        ]
      });
      await alert.present();
    }else{
      this.webService_ar.presentToast('No hay ningún bulto creado');
    }
  }
    
  
}

cerrarBulto(op){
  this.webService_ar.presentLoading().then(()=>{
    this.webService_ar.insBultos("2", this.usuario.usuario.usuario)
    .pipe(
      finalize(async () => {
        await this.webService_ar.loading.dismiss();
      }))
    .subscribe((data =>{
      let datos:any=data;
      if (datos.status == "Ok") {
        this.webService_ar.presentToast('Bulto Cerrado. ' +'Siguiente bulto '+ datos.bulto.codigo).then(()=>{
          this.webService_ar.presentLoading().then(()=>{
            this.webService_ar.colaImpresion('1',this.bulto.toString(),this.usuario.usuario.usuario,'1','1',this.impresora,"pendiente",'1',"armado")
            .pipe(
              finalize(async () => {
                await this.webService_ar.loading.dismiss();
              }))
            .subscribe((data => {
              let datos:any=data;
              if (datos.status == "Ok") {
               
                  this.webService_ar.presentToast('Enviado a la cola. Bulto: ' + this.bulto).then(()=>{
                    this.webService_ar.presentLoading().then(()=>{
                      this.webService_ar.getBultos(this.usuario.usuario.usuario, '0')
                      .pipe(
                        finalize(async () => {
                          await this.webService_ar.loading.dismiss();
                        }))
                      .subscribe((data => {
                        let datos:any=data;
                        if (datos.status == "Ok") {
                          if (op == 1) {
                          this.codbulto=datos.bulto.codigo;
                          this.bulto=datos.bulto.id;
                          }else{
                            this.nav.navigateBack('/armado-pedidos');
                          }
                        }else{
                          this.webService_ar.presentToast('Error creando el bulto');
                        }
                      }))
                    })
                  });
               
              }else{
                this.webService_ar.presentToast('Problemas de impresión. Bulto: ' + this.bulto);
              }
            }))
          }) 
            
        })
      }else{
        this.webService_ar.presentToast('Error cerrando el bulto');
      }
    }))
  })
}



}
