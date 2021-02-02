import { Component, OnInit } from '@angular/core';
import { finalize } from 'rxjs/operators';
import { WebServiceService } from 'src/app/services/web-service.service';
import { Storage } from '@ionic/storage';
import { MenuController } from '@ionic/angular';
 
@Component({
  selector: 'app-consulta-prod',
  templateUrl: './consulta-prod.page.html',
  styleUrls: ['./consulta-prod.page.scss'],
})
export class ConsultaProdPage implements OnInit {
  texto:string;
  producto:string;
  descripcion:string;
  ubicacion:string;
  
  constructor(private webService:WebServiceService,private storage:Storage,private menu:MenuController) { 
    this.menu.enable(true,'first');
  }

  ngOnInit() {
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
