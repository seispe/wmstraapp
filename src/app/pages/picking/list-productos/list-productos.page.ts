import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Storage } from '@ionic/storage';
import { finalize } from 'rxjs/operators';
import { WsPickingService } from 'src/app/services/ws-picking.service';
import { ScreenOrientation } from '@ionic-native/screen-orientation/ngx';
@Component({
  selector: 'app-list-productos',
  templateUrl: './list-productos.page.html',
  styleUrls: ['./list-productos.page.scss'],
})
export class ListProductosPage implements OnInit {
  id: string;
  usuario:string;
  productos=[];
  area:string = "00";

  constructor(private route:ActivatedRoute,private webService:WsPickingService,private storage:Storage,private screenOrientation: ScreenOrientation) {
    //this.screenOrientation.lock(this.screenOrientation.ORIENTATIONS.LANDSCAPE);
   }


  ngOnInit() {
    this.storage.get('usuario').then(usuario=>{
      this.usuario=usuario.usuario.usuario;
      this.id = this.route.snapshot.paramMap.get('id');
      this.area = this.route.snapshot.paramMap.get('area');
      this.cargarArticulos(this.id,this.usuario,this.area);
    });
  }

  cargarArticulos(consolidado:string,usuario:string,area:string){
    this.webService.presentLoading().then(()=>{
      this.webService.product_consolidados(consolidado,usuario,area).pipe(
        finalize(async () => {
            await this.webService.loading.dismiss();
        }))
      .subscribe((data=>{
        let datos:any=data
        if(datos.status='OK'){
          this.productos=datos.productos;
        }else{
          this.webService.presentToast('Error :'+datos.mensaje);
        }
      }));
    });
  }


}
