import { Component, OnInit, ViewChild } from '@angular/core';
import { Storage } from '@ionic/storage';
import { WsPickingService } from 'src/app/services/ws-picking.service';
import { finalize } from 'rxjs/operators';
import { IonInput, NavController } from '@ionic/angular';
import { WebServiceService } from 'src/app/services/web-service.service';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-picking-producto',
  templateUrl: './picking-producto.page.html',
  styleUrls: ['./picking-producto.page.scss'],
})

export class PickingProductoPage implements OnInit {
 
  consolidado:string;
  origen_sugerido:string;
  origen:string;
  producto_sugerido:string;
  producto:string;
  solicitado:number;
  disponible:number;
  cantidad_procesado:number;
  pendiente:number;
  cantidad:number;
  destino:string;
  min=0;
  max:number;
  proceso=0;
  productos=[];
  area:string="00";
  ori:string;
   @ViewChild('input_origen', {  static: false })  input_origen: IonInput;
  @ViewChild('input_producto',{static:true}) input_producto;
  @ViewChild('input_cantidad',{static:true}) input_cantidad;
  @ViewChild('input_destino',{static:true}) input_destino;
  isReadOnlyProduct:boolean=true;
  isReadOnlyCantidad:boolean=true;
  isReadOnlyDestino:boolean=true;

  constructor(private storage:Storage,private webService_pk:WsPickingService,private router:NavController,
    private webService:WebServiceService ,private route:ActivatedRoute, private nav:NavController ) {
      
   }
//    ngAfterViewInit() {
  
// }

ngOnInit(){
  this.storage.get('usuario').then((usuario)=>{
    this.storage.get('consolidado').then((data)=>{
      
      this.consolidado=data.numconsolidado;
      this.area =this.route.snapshot.paramMap.get('area');
      this.webService_pk.presentLoading().then(()=>{
        this.webService_pk.obtenerProductosConsolidado(this.consolidado,usuario.usuario.usuario,this.area).pipe(
          finalize(async () => {
              await this.webService_pk.loading.dismiss();
          }))
        .subscribe((data=>{
          let datos:any=data
          if(datos.status=="Ok"){
            if(datos.productos.length>0){
              this.productos=datos.productos;
              this.max=datos.productos.length-1;
              this.origen_sugerido=datos.productos[0]['coordenada'];
              this.producto_sugerido=datos.productos[0]['producto'];
              this.producto=this.producto_sugerido;
              setTimeout(() => {
                this.input_origen.setFocus();
           }, 400);
            }
          }else{
            this.webService_pk.presentToast(datos.mensaje);
          }
        }));
  
      });
    
    });



    });
  
}

    productoAnterior(){
      this.proceso=this.proceso-1;
      this.origen_sugerido=this.productos[this.proceso]['coordenada'];
      this.producto_sugerido=this.productos[this.proceso]['producto'];
      this.origen="";
      this.producto=this.producto_sugerido;
      this.cantidad=null;
      ////this.destino="";
      this.solicitado=0;
      this.disponible=0;
      this.cantidad_procesado=0;
      this.pendiente=0;
      this.isReadOnlyProduct=true;
      this.isReadOnlyCantidad=true;
      this.isReadOnlyDestino=true;
      this.input_origen.setFocus();
    }

    productoSiguiente(){
      this.proceso=this.proceso+1;
      this.origen_sugerido=this.productos[this.proceso]['coordenada'];
      this.producto_sugerido=this.productos[this.proceso]['producto'];
      this.origen="";
      this.producto=this.producto_sugerido;
      this.cantidad=null;
      //this.destino="";
      this.solicitado=0;
      this.disponible=0;
      this.cantidad_procesado=0;
      this.pendiente=0;
      this.isReadOnlyProduct=true;
      this.isReadOnlyCantidad=true;
      this.isReadOnlyDestino=true;
      this.input_origen.setFocus();
    }

    proesaPicking(){
      if(this.productos.length>=1){
        this.webService_pk.presentLoading().then(()=>{
          this.webService_pk.validarCoordenadaPicking(this.destino).pipe(
            finalize(async () => {
                await this.webService_pk.loading.dismiss();
            }))
          .subscribe((data=>{
            let datos:any=data
            if(datos.status=="Ok"){
              if(datos.existe.existe=="1"){

                this.webService_pk.presentLoading().then(()=>{
                  this.webService_pk.validarCantidad(this.consolidado,this.producto,this.cantidad.toString()).pipe(
                    finalize(async () => {
                        await this.webService_pk.loading.dismiss();
                    }))
                  .subscribe((data=>{
                    let datos:any=data
                    if(datos.status=="Ok"){
                      if(datos.info=="OK"){

                        //INSERTAR EN LA BASE DE DATOS EL PICKING

                        this.storage.get('usuario').then((usuario)=>{
                          this.webService_pk.presentLoading().then(()=>{

                            let a:string=this.cantidad.toString();
                            let b:string=this.cantidad_procesado.toString();
                            let c:string=this.solicitado.toString();

                            let canpro:number=parseInt(a)+parseInt(b);
                            let pend:number=parseInt(c)-canpro;
                          
                            this.webService_pk.guardarPicking(this.consolidado,  this.producto,  this.origen,  this.solicitado.toString(),  a.toString(),   pend.toString(),  this.destino,  usuario.usuario.usuario).pipe(
                              finalize(async () => {
                                  await this.webService_pk.loading.dismiss();
                              }))
                            .subscribe((data=>{
                              let datos:any=data
                              this.webService.presentToast(datos.info);
                              if(datos.status=="Ok"){
                                if(datos.info=="OK" || pend==0){
                                  if(this.productos.length>1){
                                    if(parseInt(this.cantidad.toString())==parseInt(this.pendiente.toString())){
                                      this.productos.splice(this.proceso,1);
                                    }
                                    this.max=this.productos.length-1;
                                    this.proceso=0;
                                    this.origen_sugerido=this.productos[0]['coordenada'];
                                    this.producto_sugerido=this.productos[0]['producto'];
                                    this.origen="";
                                    this.producto=this.producto_sugerido;
                                    this.cantidad=null;
                                    this.solicitado=0;
                                    this.disponible=0;
                                    this.cantidad_procesado=0;
                                    this.pendiente=0;
                                    this.isReadOnlyProduct=true;
                                    this.isReadOnlyCantidad=true;
                                    this.isReadOnlyDestino=true;
                                    this.input_origen.setFocus();
                                  }else{

                                    this.router.navigateBack('/home');

                                  }

                                }else if( datos.info=="Todavia tiene productos") {
                                  this.origen="";
                                  this.producto=this.producto_sugerido;
                                  this.cantidad=null;
                                  //this.destino="";
                                  this.solicitado=0;
                                  this.disponible=0;
                                  this.cantidad_procesado=0;
                                  this.pendiente=0;
                                  this.isReadOnlyProduct=true;
                                  this.isReadOnlyCantidad=true;
                                  this.isReadOnlyDestino=true;
                                  this.input_origen.setFocus();
                                }
                              }else{
                                this.webService_pk.presentToast(datos.mensaje);
                              }
                            }));
                          });
                         });
                      }else{
                        this.webService.presentToast("Error revise los datos").then(()=>{
                          //this.destino="";
                          this.input_destino.setFocus();
                        });
                      }
                    }else{
                      this.webService_pk.presentToast(datos.mensaje);
                    }
                  }));
                });
              }else{
                this.webService.presentToast("ERROR DE COORDENADA").then(()=>{
                  //this.destino="";
                  this.input_destino.setFocus();
                });
              }
            }else{
              this.webService_pk.presentToast(datos.mensaje);
            }
          }));
        });
      }else{
        this.router.navigateBack('/home');
      }
    }

    origen_control(){
      if (this.origen != "") {
        if(this.origen!="" && this.origen==this.origen_sugerido){
          this.producto=this.producto_sugerido;
          this.cantidad=null;
          //this.destino="";
          this.isReadOnlyProduct=false;
          this.isReadOnlyCantidad=true;
          this.isReadOnlyDestino=true;
          this.input_producto.setFocus();
          //this.input_producto.select();
    
      }else{
          this.webService.presentToast('La coordenada de origen no es correcta').then(()=>{
            this.origen="";
            this.producto="";
            this.cantidad=null;
            //this.destino="";
            this.isReadOnlyProduct=true;
            this.isReadOnlyCantidad=true;
            this.isReadOnlyDestino=true;
            this.input_origen.setFocus();
          });
        }
      }
    }

    producto_control(){
      if(this.producto!=""){
        this.webService.presentLoading().then(()=>{
          this.webService.validarProducto(this.producto).pipe(
            finalize(async () => {
                await this.webService.loading.dismiss();
            }))
          .subscribe((data=>{
            let datos:any=data
            if(datos.status=="Ok"){
              this.input_producto.setFocus();
              this.webService.presentToast(datos.mensaje).then(()=>{
                this.producto=datos.producto.producto
                if(this.producto==this.producto_sugerido){

                  this.storage.get('usuario').then((usuario)=>{
                    this.webService_pk.presentLoading().then(()=>{
                      this.webService_pk.cantidadPicking(this.consolidado,this.producto,usuario.usuario.usuario,this.area,this.origen).pipe(
                        finalize(async () => {
                            await this.webService_pk.loading.dismiss();
                        }))
                      .subscribe((data=>{
                        let datos:any=data
                        if(datos.status=="Ok"){

                          if(datos.cantidades.can_solicitada=='.00'){
                            this.solicitado=0.00;
                          }else{
                            this.solicitado=datos.cantidades.can_solicitada;
                          }

                          if(datos.cantidades.cant_coordenada=='.00'){
                            this.disponible=0.00;
                          }else{
                            this.disponible=datos.cantidades.cant_coordenada;
                          }
                     
                          this.webService_pk.presentLoading().then(()=>{
                            this.webService_pk.cantidadPickingPendiente(this.consolidado,this.producto,usuario.usuario.usuario,this.origen).pipe(
                              finalize(async () => {
                                  await this.webService_pk.loading.dismiss();
                              }))
                            .subscribe((data=>{
                              let datos:any=data
                              if(datos.status=="Ok"){
                                if (datos.cantidades.can_procesada=='.00'){
                                    this.cantidad_procesado=0.00;
                                }else{
                                   this.cantidad_procesado=datos.cantidades.can_procesada;
                                }

                                if(datos.cantidades.can_pendiente=='.00'){
                                  this.pendiente=0.00;
                                }else{
                                  this.pendiente=datos.cantidades.can_pendiente;
                                }
                               
                                    this.cantidad=null;
                                    //this.destino="";
                                    this.isReadOnlyProduct=false;
                                    this.isReadOnlyCantidad=false;
                                    this.isReadOnlyDestino=true;
                                    this.input_cantidad.setFocus();
                              }else{
                                 this.webService.presentToast('Error recuperando cantidad pendiente').then(()=>{
                                    this.producto="";
                                    this.cantidad=null;
                                    //this.destino="";
                                    this.isReadOnlyProduct=false;
                                    this.isReadOnlyCantidad=true;
                                    this.isReadOnlyDestino=true;
                                    this.input_producto.setFocus();
                                  });
                              }
                            }));
                          }); 
                        }else{
                           this.webService.presentToast('Error recuperando cantidad de picking').then(()=>{
                              this.producto="";
                              this.cantidad=null;
                              //this.destino="";
                              this.isReadOnlyProduct=false;
                              this.isReadOnlyCantidad=true;
                              this.isReadOnlyDestino=true;
                              this.input_producto.setFocus();
                            });
                        }
                      }));
                    });
                  });
                }else{
                  this.webService.presentToast('El codigo no es igual al sugerido').then(()=>{
                    this.producto="";
                    this.cantidad=null;
                    //this.destino="";
                    this.isReadOnlyProduct=false;
                    this.isReadOnlyCantidad=true;
                    this.isReadOnlyDestino=true;
                    this.input_producto.setFocus();
                  });
                }
              });
            }else{
              this.webService.presentToast("El código no existe").then(()=>{
                this.producto="";
                this.cantidad=null;
                //this.destino="";
                this.isReadOnlyProduct=false;
                this.isReadOnlyCantidad=true;
                this.isReadOnlyDestino=true;
                this.input_producto.setFocus();
              });
            }
          }));
        });
      }else{
        this.webService.presentToast('El codigo no puede ser vacio').then(()=>{
       
          this.producto="";
          this.cantidad=null;
          //this.destino="";
          this.isReadOnlyProduct=false;
          this.isReadOnlyCantidad=true;
          this.isReadOnlyDestino=true;
          this.input_producto.setFocus();
        });
      }
      
    }
  
    cantidad_control(){
      this.cantidad = Number(this.cantidad);
      if(this.cantidad>0 && this.cantidad <= this.pendiente){
          //this.destino="";
          this.isReadOnlyProduct=false;
          this.isReadOnlyCantidad=false;
          this.isReadOnlyDestino=false;
          this.input_destino.setFocus();
      }else{
        this.webService.presentToast('La cantidad debe ser mayor a cero y menor o igual a la pendiente').then(()=>{
          this.cantidad=null;
          //this.destino="";
          this.isReadOnlyProduct=false;
          this.isReadOnlyCantidad=false;
          this.isReadOnlyDestino=true;
          this.input_cantidad.setFocus();
        });
      }
    }

    atras(){
     
        this.nav.navigateBack('/home');
     
    }


}
