import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { finalize } from 'rxjs/operators';
import { WsRecepcionService } from 'src/app/services/ws-recepcion.service';
import { Storage } from '@ionic/storage';
@Component({
  selector: 'app-lista-productos',
  templateUrl: './lista-productos.page.html',
  styleUrls: ['./lista-productos.page.scss'],
})
export class ListaProductosPage implements OnInit {
  documento: string;
  usuario:string;
  productos=[];
  constructor(private storage:Storage, private route:ActivatedRoute, private webService_re:WsRecepcionService) { }

  ngOnInit() {
    this.storage.get('usuario').then(usuario=>{
      this.usuario=usuario.usuario.usuario;
      this.documento = this.route.snapshot.paramMap.get('doc');
      this.cargarArticulos(this.documento);
    });
  }

  cargarArticulos(documento:string){
    this.webService_re.presentLoading().then(()=>{
      this.webService_re.getDocumentoDetalle(documento).pipe(
        finalize(async () => {
            await this.webService_re.loading.dismiss();
        }))
      .subscribe((data=>{
        let datos:any=data
        if(datos.status='OK'){
          this.productos=datos.detalle;
        }else{
          this.webService_re.presentToast('Error :'+datos.mensaje);
        }
      }));
    });
  }

}
