import { Component, OnInit } from '@angular/core';
import { WsArmadoService } from 'src/app/services/ws-armado.service';
import { ActivatedRoute } from '@angular/router';
import { Storage } from '@ionic/storage';
import { finalize } from 'rxjs/operators';
@Component({
  selector: 'app-lista-productos',
  templateUrl: './lista-productos.page.html',
  styleUrls: ['./lista-productos.page.scss'],
})
export class ListaProductosPage implements OnInit {
  articulos:[];
  pedido:string="";
  area:string="";
  usuario:string="";
  constructor(private webService:WsArmadoService, private storage:Storage, private route:ActivatedRoute) { }

  ngOnInit() {
    this.storage.get('usuario').then((val) =>{
      this.usuario = val;
      this.pedido =this.route.snapshot.paramMap.get('ped');
      this.area =this.route.snapshot.paramMap.get('area');
      this.cargaArticulos(this.pedido,'1',this.area);
    })
  }
  cargaArticulos(pedido, op, area){
    this.webService.presentLoading().then(()=>{
      this.webService.artDetArm(pedido, op, area)
      .pipe(
        finalize(async () => {
          await this.webService.loading.dismiss();
        }))
      .subscribe((data =>{
        let datos:any=data;
        if (datos.status == "Ok") {
          this.articulos=datos.articulos;
        }else{
          this.webService.presentToast(datos.mensaje);
        }
      }))
    })
  }

}
