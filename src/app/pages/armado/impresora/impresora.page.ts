import { Component, OnInit } from '@angular/core';
import { MenuController, NavController } from '@ionic/angular';
import { finalize } from 'rxjs/operators';
import { WsArmadoService } from 'src/app/services/ws-armado.service';
import { WebServiceService } from 'src/app/services/web-service.service';
import { Storage } from "@ionic/storage";
import { AlertController } from "@ionic/angular";

@Component({
  selector: 'app-impresora',
  templateUrl: './impresora.page.html',
  styleUrls: ['./impresora.page.scss'],
})
export class ImpresoraPage implements OnInit {
usuario:any;
impresorasSelect:string="";
impresoras=[];

  constructor(private route:NavController,private webServiceG:WebServiceService,private webService:WsArmadoService, private menu:MenuController, private storage:Storage, private alertController:AlertController) { 
    this.menu.enable(true, 'first');
  }

  ngOnInit() {
    this.storage.get('usuario').then((val)=>{
      this.usuario=val;
      this.webService.presentLoading().then(()=>{
        this.webService.impresoras(this.usuario.usuario.usuario,'1')
        .pipe(
          finalize(async () => {
            await this.webService.loading.dismiss();
          }))
        .subscribe((data=>{
          let datos:any=data
          if (datos.status=="Ok") {
           this.impresoras=datos.impresoras;
          }else{
            this.webService.presentToast(datos.mensaje).then(()=>{
              this.impresoras=[];
            })
          }
        }))
      })
    })
  }

 async onReimpresion(){
    if (this.impresorasSelect != "") {
      const alert = await this.alertController.create({
        cssClass: 'primary',
        header: 'Acceso!',
        inputs: [
          {
            name: 'clave',
            type: 'password',
            placeholder: 'Contraseña'
          }
        ],
        buttons: [
          {
            text: 'Cancelar',
            role: 'cancel',
            cssClass: 'primary',
            handler: () => {
              //console.log('Confirm Cancel');
            }
          }, 
          {
            text: 'Acceder',
            handler: (data) => {
              this.validaClave(data.clave)
            }
          }
        ]
      });
  
      await alert.present();
    }else{
      this.webService.presentToast('SELECCIONE UNA IMPRESORA');
    }
  }

validaClave(clave:string){
  this.webServiceG.claveEmpresa()
  .subscribe((data=>{
    let datos:any=data
    if (datos.status=="Ok") {
     if (datos.clave.clave_sistema==clave) {
       
      this.storage.set('impresora',this.impresorasSelect).then(()=>{
        this.route.navigateForward('/reimpresion');
      })
      
     }else{
      this.webService.presentToast('CLAVE INCORRECTA')
     }
    }else{
      this.webService.presentToast(datos.mensaje).then(()=>{
        this.impresoras=[];
      })
    }
  }))
}

onArmado(){
  if (this.impresorasSelect != "") {
    this.storage.set('impresora',this.impresorasSelect).then(()=>{
      this.route.navigateForward('/armado-pedidos');
    })  
  }else{
    this.webService.presentToast('SELECCIONE UNA IMPRESORA');
  }
  
}

}
