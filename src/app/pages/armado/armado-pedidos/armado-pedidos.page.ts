import { WsArmadoService } from 'src/app/services/ws-armado.service';
import { Storage } from '@ionic/storage';
import { Component, OnInit } from '@angular/core';
import { finalize } from 'rxjs/operators';
import { NavController } from "@ionic/angular";

@Component({
  selector: 'app-armado-pedidos',
  templateUrl: './armado-pedidos.page.html',
  styleUrls: ['./armado-pedidos.page.scss'],
})
export class ArmadoPedidosPage implements OnInit {
usuario:any;
impresora:string;
filtro:string="";
area:string="00";
pedidos:[];
  constructor(private route:NavController, private webService:WsArmadoService, private storage:Storage) { }

  ngOnInit() {
    this.storage.get('usuario').then((val)=>{
      this.storage.get('impresora').then((val1)=>{
        this.usuario=val;
        this.impresora=val1;
        this.onCargaPedidos('','00','0');
      })
    })
  }

  onCargaPedidos(filtro,area,op){
    this.webService.presentLoading().then(()=>{
      this.webService.getPedidos(filtro,area,op)
      .pipe(
        finalize(async () => {
          await this.webService.loading.dismiss();
        }))
      .subscribe((data=>{
        let datos:any=data
        if (datos.status=="Ok") {
         this.pedidos=datos.pedidos;
        }else{
          this.webService.presentToast('No hay pedidos').then(()=>{
            this.pedidos = [];
          });
        }
      }))
    })
  }

  onFiltro(){
    this.onCargaPedidos(this.filtro,'00','0');
    
  }

  onClick(ped){
    this.route.navigateForward('/armado-bulto/'+ped.pedido+'/'+ped.ciudad+'/'+this.area);
    
  }

}
