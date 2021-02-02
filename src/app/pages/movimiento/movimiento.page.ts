import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { catchError, finalize } from 'rxjs/operators';
import { WebServiceService } from 'src/app/services/web-service.service';
import { Storage } from '@ionic/storage';
import { MenuController } from '@ionic/angular';

@Component({
  selector: 'app-movimiento',
  templateUrl: './movimiento.page.html',
  styleUrls: ['./movimiento.page.scss'],
})
export class MovimientoPage implements OnInit {
  coordenada:string="";
  codigo:string="";
  cantidad:number;
  ubicacion:string="";
  
  cantidad_mover:number;
  destino:string="";
  //isReadOnlyProduct:boolean=true;
  isReadOnlyCantidad:boolean=true;
  isReadOnlyDestino:boolean=true;
  usuario:any;
  @ViewChild('origen',{static:true}) origen;
  @ViewChild('producto',{static:true}) producto;
  @ViewChild('input_cantidad_mover',{static:true}) input_cantidad_mover;
  @ViewChild('input_destino',{static:true}) input_destino;

  constructor(private webService:WebServiceService,private storage:Storage,private menu:MenuController) {
    this.menu.enable(true,'first');
   }

  ngOnInit() {
     this.storage.get('usuario').then((val)=>{
      this.usuario=val;
      this.origen.setFocus();

     });
  }

  onEnter(){
    if(this.coordenada!=""){
      this.webService.presentLoading().then(()=>{
        this.webService.validarCoordenada(this.coordenada).pipe(
          catchError(async(error)=>{
            await this.webService.loading.dismiss();
            this.webService.presentToast("No existe conexion "+error.error.text);
          }),
  
          
          finalize(async () => {
              await this.webService.loading.dismiss();
          }))
        .subscribe((data=>{
          let datos:any=data
          if(datos.status=="Ok"){
            if(datos.mensaje=="1"){
              this.webService.presentToast("COORDENADA CORRECTA").then(()=>{
                //this.codigo="";
                this.cantidad=0;
                this.ubicacion="";
                this.cantidad_mover=null;
                this.destino="";
                //this.isReadOnlyProduct=false;
                this.isReadOnlyCantidad=true;
                this.isReadOnlyDestino=true;
                this.producto.setFocus();
  
              });
  
            }else if(datos.mensaje=="0"){
              this.origen.setFocus();
              this.webService.presentToast("ERROR EN LA COORDENADA").then(()=>{
                this.coordenada="";
                this.codigo="";
                this.cantidad=0;
                this.ubicacion="";
                this.cantidad_mover=null;
                this.destino="";
                //this.isReadOnlyProduct=true;
                this.isReadOnlyCantidad=true;
                this.isReadOnlyDestino=true;
                this.origen.setFocus();
              })
            }
          }else{
            this.webService.presentToast("ERROR").then(()=>{
              this.coordenada="";
                this.codigo="";
                this.cantidad=0;
                this.ubicacion="";
                this.cantidad_mover=null;
                this.destino="";
                //this.isReadOnlyProduct=true;
                this.isReadOnlyCantidad=true;
                this.isReadOnlyDestino=true;
                this.origen.setFocus();
            });
            
          }
        }));
      });
    }
   
  }

  onEnterProducto(){
    if(this.codigo!="" && this.coordenada!=""){
      this.webService.presentLoading().then(()=>{
        this.webService.validarProducto(this.codigo).pipe(
          finalize(async () => {
              await this.webService.loading.dismiss();
          }))
        .subscribe((data=>{
          let datos:any=data
          if(datos.status=="Ok"){
            this.producto.setFocus();
            this.webService.presentToast(datos.mensaje).then(()=>{
              this.codigo=datos.producto.producto
  
                this.webService.inforArtiCoor(this.codigo,this.coordenada).pipe(
                  finalize(async () => {
                      await this.webService.loading.dismiss();
                  }))
                .subscribe((data=>{
                  let datos:any=data
                  if(datos.status=="Ok"){
                    this.cantidad=datos.info.cantidad;
                    this.ubicacion=datos.info.coordenada
                    this.isReadOnlyCantidad=false;
                    this.input_cantidad_mover.setFocus();
                  }else{
                    this.webService.presentToast(datos.mensaje+" O no hay Stock").then(()=>{
                      this.codigo="";
                      this.cantidad=0;
                      this.ubicacion="";
                      this.cantidad_mover=null;
                      this.destino="";
                      //this.isReadOnlyProduct=false;
                      this.isReadOnlyCantidad=true;
                      this.isReadOnlyDestino=true;
                      this.producto.setFocus();
                    });
                  }
                }));
              
            });
            
          }else{
            this.webService.presentToast(datos.mensaje+" O no hay Stock").then(()=>{
              this.codigo="";
              this.cantidad=0;
              this.ubicacion="";
              this.cantidad_mover=null;
              this.destino="";
              //this.isReadOnlyProduct=false;
              this.isReadOnlyCantidad=true;
              this.isReadOnlyDestino=true;
              this.producto.setFocus();
            });
          }
        }));
      });
    }
  }

  onEnterDestino(){

    if(this.destino!=""){

      if(this.cantidad_mover>this.cantidad){
        this.webService.presentToast("La cantidad no puede ser mayor");
      }else{
  
        this.webService.presentLoading().then(()=>{
          this.webService.validarCoordenada(this.destino).pipe(
            finalize(async () => {
                await this.webService.loading.dismiss();
            }))
          .subscribe((data=>{
            let datos:any=data
            if(datos.status=="Ok"){
              if(datos.mensaje=="1"){
                this.webService.presentToast("COORDENADA CORRECTA");
                //REALIZAR MOVIMIENTO
                this.webService.presentLoading().then(()=>{
                  this.webService.movimientos(this.coordenada,this.destino,this.cantidad_mover,this.codigo,this.usuario.usuario.usuario,'MOVIMIENTO').pipe(
                    finalize(async () => {
                        await this.webService.loading.dismiss();
                    }))
                  .subscribe((data=>{
                    let datos:any=data
                    if(datos.status=="Ok"){
                      this.webService.presentToast(datos.mensaje);
                      this.coordenada="";
                      this.destino="";
                      this.cantidad_mover=null;
                      this.codigo="";
                      this.ubicacion="";
                      this.cantidad=0;
                      this.origen.setFocus();
                    }else{
                      this.webService.presentToast(datos.mensaje);
                    }
                  }));
                });
          
  
              }else if(datos.mensaje=="0"){
                this.input_destino.setFocus();
                this.webService.presentToast("ERROR EN LA COORDENADA").then(()=>{
                  this.destino="";
                  this.input_destino.setFocus();
                })
              }
            }else{
              this.webService.presentToast("ERROR");
            }
          }));
        });
      }
    } 
  }

  val_cantidad(){
    if(this.cantidad_mover>this.cantidad || this.cantidad_mover==0){
      this.webService.presentToast("La cantidad no puede ser mayor o 0").then(()=>{
        this.isReadOnlyDestino=true;
        this.cantidad_mover=null;
        this.input_cantidad_mover.setFocus();
      });
    }else{
      this.isReadOnlyDestino=false;
      this.input_destino.setFocus();
    }
  }

}
