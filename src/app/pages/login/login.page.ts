import { MenuController, NavController } from '@ionic/angular';
import { WebServiceService } from './../../services/web-service.service';
import { Component, OnInit } from '@angular/core';
import { catchError, finalize } from 'rxjs/operators';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  ping:any;
  Usuario:string;
  Password:string;
  Datos:any=[]

  constructor(private webService:WebServiceService,private menu:MenuController,private storage:Storage,private router:NavController) {
    this.menu.enable(false,'first');
      this.webService.presentLoading().then(()=>{
        this.webService.ping().pipe(
          catchError(async(error)=>{
            await this.webService.loading.dismiss();
            this.webService.presentToast("No existe conexion "+error.error.text);
          }),
  
          finalize(async () => {
              await this.webService.loading.dismiss();
          }))
          .subscribe((data=>{
            this.ping=data;
            if(this.ping.status=='Ok'){
              this.webService.presentToast(this.ping.mensaje);
            }else{
              this.webService.presentToast('No existe conexion al servidor');
            }
          }));
      })
   }

  ngOnInit() {
  }

  doRefresh(event) {
    this.webService.ping()
        .subscribe((data=>{
          this.ping=data;
          if(this.ping.status=='Ok'){
            this.webService.presentToast(this.ping.mensaje);
            event.target.complete();
          }else{
            this.webService.presentToast('No existe conexion al servidor');
            event.target.complete();
          }
        }));
  }

loginUser(){
  if(this.Password=="" || this.Usuario==""){
    this.webService.presentToast('Ingrese todos los campos solicitados');
  }else{
          this.webService.presentLoading().then(()=>{
              this.webService.login(this.Usuario,this.Password).pipe(
                finalize(async () => {
                    await this.webService.loading.dismiss();
                }))
              .subscribe((data=>{
                let datos:any=data

                //console.log(datos);
                

                if(datos.status=="Ok"){
                  this.Datos=
                    {
                      'usuario': datos.usuario
                  }
                    this.storage.set('usuario',this.Datos).then(()=>{
                      for(var i=0;i<=datos.ventanas.length-1;i++){
                        if(datos.ventanas[i].activo=="1" && datos.ventanas[i].aplicativo=="0"){
                          let isVentana=datos.ventanas[i].ventana;
                          document.getElementById(isVentana).hidden = false;
                        }else{
                            
                          if(datos.ventanas[i].aplicativo=="0"){
                            let isVentana=datos.ventanas[i].ventana;
                            document.getElementById(isVentana).hidden = true;
                          }
                          
                        }
                      }
                      this.router.navigateRoot('/home').then(()=>{
                        document.getElementById('nusuario').innerHTML=datos.usuario.usuario;
                      });
                    });
                  this.webService.presentToast(datos.mensaje);
                }else{
                  this.webService.presentToast(datos.mensaje);
                }
              }));
        })
}
  }

  contrasenia(){
    this.webService.presentToast('Comunicarse con sistemas');
  }
}
