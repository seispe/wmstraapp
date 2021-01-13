import { async } from '@angular/core/testing';
import { catchError, finalize } from 'rxjs/operators';
import { WebServiceService } from 'src/app/services/web-service.service';
import { Storage } from '@ionic/storage';
import { MenuController } from '@ionic/angular';
import { Component, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-bahias',
  templateUrl: './bahias.page.html',
  styleUrls: ['./bahias.page.scss'],
})
export class BahiasPage implements OnInit {
  usuario:any;
  idbulto:string="";
  bahia:string="";
  @ViewChild('bulto',{static:true}) bulto;
  @ViewChild('coordenada',{static:true}) coordenada;
  

  constructor(private webService:WebServiceService,private menu:MenuController, private storage:Storage) { 
    this.menu.enable(true,'first');

  }

  ngOnInit() {
    this.storage.get('usuario').then((val)=>{
      this.usuario=val;
      this.bulto.setFocus();
     });
  }
  onBulto(){
    if (this.idbulto!="") {
      this.coordenada.setFocus();
    }else {
      
    }
  }

  onBahia(){
    if (this.bahia!="") {
      this.webService.presentLoading().then(()=>{
        this.webService.bahiasxbultos(this.idbulto,this.bahia,this.usuario.usuario.usuario).pipe(
          catchError(async(error)=>{
            await this.webService.loading.dismiss();
            this.webService.presentToast("No existe conexion "+error.error.text);
          }),
          finalize(async()=>{
            await this.webService.loading.dismiss();
          }))
          .subscribe((data=>{
            let datos:any=data
            if (datos.status=="Ok") {
              this.webService.presentToast(datos.salida.SALIDA);
              this.idbulto="";
              this.bahia="";
              this.bulto.setFocus();
            }
          }))
      })
    }else{
      
    }

  }
  

}
