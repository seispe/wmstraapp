import { Component, OnInit } from '@angular/core';
import { finalize } from 'rxjs/operators';
import { Storage } from '@ionic/storage';
import { WsPickingService } from 'src/app/services/ws-picking.service';
import { NavController } from '@ionic/angular';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-picking-consolidado',
  templateUrl: './picking-consolidado.page.html',
  styleUrls: ['./picking-consolidado.page.scss'],
})
export class PickingConsolidadoPage implements OnInit {

  consolidados=[];
  consolidadoSelect:string;
  usuario:any;
  toggle:boolean;
  area:string="00";
 
  constructor(private webService:WsPickingService,private route:NavController,private storage:Storage ) { }

  ngOnInit() {
    this.storage.get('usuario').then((usuario)=>{
      this.usuario=usuario;
      this.webService.presentLoading().then(()=>{
          this.webService.consolidados(this.usuario.usuario.usuario).pipe(
            finalize(async () => {
                await this.webService.loading.dismiss();
            }))
          .subscribe((data=>{
            let datos:any=data
            if(datos.status=="Ok"){
              this.consolidados=datos.consolidados;
            }else{
              this.webService.presentToast(datos.mensaje);
            }
          }));
        });
   });
  
  }

  picking(){
    
        var index:number = this.consolidados.indexOf(this.consolidados.find(x => x.Consolidado == this.consolidadoSelect));
        this.storage.set('consolidado',this.consolidados[index]).then(()=>{
          this.route.navigateForward('/picking-producto/'+this.area);
        });
 
  }

  onArea(){
   
      switch (this.toggle) {
        case true:
          this.area="09";
    
            this.webService.presentLoading().then(()=>{
              this.webService.consolidadosArea(this.area, '2').pipe(
                finalize(async () => {
                    await this.webService.loading.dismiss();
                }))
              .subscribe((data=>{
                let datos:any=data
                if(datos.status=="Ok"){
                  this.consolidados=datos.consolidados;
                }else{
                  this.webService.presentToast(datos.mensaje);
                }
              }));
            });
        
          break;
        case false:
          this.area="00";
      
            this.webService.presentLoading().then(()=>{
              this.webService.consolidados(this.usuario.usuario.usuario).pipe(
                finalize(async () => {
                    await this.webService.loading.dismiss();
                }))
              .subscribe((data=>{
                let datos:any=data
                if(datos.status=="Ok"){
                  this.consolidados=datos.consolidados;
                }else{
                  this.webService.presentToast(datos.mensaje);
                }
              }));
            });
    
          break;
        default:
          this.area="00";
        
            this.webService.presentLoading().then(()=>{
              this.webService.consolidados(this.usuario.usuario.usuario).pipe(
                finalize(async () => {
                    await this.webService.loading.dismiss();
                }))
              .subscribe((data=>{
                let datos:any=data
                if(datos.status=="Ok"){
                  this.consolidados=datos.consolidados;
                }else{
                  this.webService.presentToast(datos.mensaje);
                }
              }));
            });
      
          break;
    }
    
    
    
  }  

}
