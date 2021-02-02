import { Component, OnInit } from '@angular/core';
import { finalize } from 'rxjs/operators';
import { WebServiceService } from 'src/app/services/web-service.service';
import { Storage } from '@ionic/storage';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-busqueda-producto',
  templateUrl: './busqueda-producto.page.html',
  styleUrls: ['./busqueda-producto.page.scss'],
})
export class BusquedaProductoPage implements OnInit {
  texto:string;
  producto:string;
  descripcion:string;
  ubicacion:string;
  id: string;
  constructor(private webService:WebServiceService,private storage:Storage,private route:ActivatedRoute) { }

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id');
    this.texto=this.id;
    this.onEnter();
  }

  onEnter(){

    this.webService.presentLoading().then(()=>{
      this.webService.validarProducto(this.texto).pipe(
        finalize(async () => {
            await this.webService.loading.dismiss();
        }))
      .subscribe((data=>{
        let datos:any=data
        if(datos.status=="Ok"){
          this.webService.presentToast(datos.mensaje).then(()=>{
            this.texto=datos.producto.producto
                  this.webService.presentLoading().then(()=>{
                    this.webService.busquedaProd(this.texto).pipe(
                      finalize(async () => {
                          await this.webService.loading.dismiss();
                      }))
                    .subscribe((data=>{
                      let datos:any=data
                      if(datos.status=="Ok"){
                          this.producto=datos.info.producto;
                          this.descripcion=datos.info.descripcion;
                          this.ubicacion=datos.info.coordenada;
                          
                      }else{
                        this.webService.presentToast(datos.mensaje).then(()=>{
                          this.producto="";
                          this.descripcion="";
                          this.ubicacion="";
                        })
                      }
                    }));
                  });
          });
        }else{
          
          this.webService.presentToast(datos.mensaje).then(()=>{
                          this.producto="";
                          this.descripcion="";
                          this.ubicacion="";
                          this.texto="";
          });
        }
      }));
    });
  }

}
