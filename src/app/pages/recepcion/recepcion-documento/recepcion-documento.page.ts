import { Component, OnInit } from '@angular/core';
import { MenuController, NavController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { finalize } from 'rxjs/operators';
import { WsRecepcionService } from './../../../services/ws-recepcion.service';
@Component({
  selector: 'app-recepcion-documento',
  templateUrl: './recepcion-documento.page.html',
  styleUrls: ['./recepcion-documento.page.scss'],
})
export class RecepcionDocumentoPage implements OnInit {
  usuario:any;
  filtro:string="";
  documentos=[];
  constructor(private menu:MenuController,private route:NavController, private webService:WsRecepcionService, private storage:Storage) { 
    this.menu.enable(true,'first');
  }

  ngOnInit() {
    this.storage.get('usuario').then((val)=>{
      this.usuario=val;
      this.onCargaDocumentos('10','');
    })
  }

  onCargaDocumentos(op,filtro){
    this.webService.presentLoading().then(()=>{
      this.webService.getDocumentos(op,filtro)
      .pipe(
        finalize(async () => {
          await this.webService.loading.dismiss();
        }))
      .subscribe((data=>{
        let datos:any=data
        if (datos.status=="Ok") {
         this.documentos=datos.documentos;
        }else{
          this.webService.presentToast('No hay documentos').then(()=>{
            this.documentos = [];
          });
        }
      }))
    })
  }

  onFiltro(){
    this.onCargaDocumentos('2',this.filtro);
    
  }

  onClick(doc){
    this.route.navigateForward('/recepcion-producto/'+doc.Documento);
    
  }

}
