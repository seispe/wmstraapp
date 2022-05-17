import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { LoadingController, ToastController } from '@ionic/angular';
@Injectable({
  providedIn: 'root'
})
export class WsRecepcionService {
  loading: any;
  constructor(public toastController: ToastController,private http: HttpClient,private loadingController:LoadingController) { }

  getDocumentos(op:string,filtro:string){
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type','application/json; charset=utf-8');
    headers = headers.set('Accept','application/json; charset=utf-8');
    return this.http.post('http://192.168.0.214:81/wswms/ajax/recepcion.php/?op=getDocumentos',JSON.stringify({
      "op":op,
      "filtro":filtro,
    }),{headers:headers});
  }
  
  getArtDocumento(op:string,filtro:string,documento:string){
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type','application/json; charset=utf-8');
    headers = headers.set('Accept','application/json; charset=utf-8');
    return this.http.post('http://192.168.0.214:81/wswms/ajax/recepcion.php/?op=getArtDocumento',JSON.stringify({
      "op":op,
      "filtro":filtro,
      "documento":documento,
    }),{headers:headers});
  }

  validaCoordenada(coordenada:string, tipo:string){
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type','application/json; charset=utf-8');
    headers = headers.set('Accept','application/json; charset=utf-8');
    return this.http.post('http://192.168.0.214:81/wswms/ajax/recepcion.php/?op=validarCoordenadaRec',JSON.stringify({
      "coordenada":coordenada,
      "tipo":tipo
    }),{headers:headers});
  }

  insRecepcion(documento:string, producto:string, procesada:number, pendiente:number, origen:string,pallet:number, destino:string, usuario:string){
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type','application/json; charset=utf-8');
    headers = headers.set('Accept','application/json; charset=utf-8');
    return this.http.post('http://192.168.0.214:81/wswms/ajax/recepcion.php/?op=insRecepcion',JSON.stringify({
      "documento":documento,
      "producto":producto,
      "procesada":procesada,
      "pendiente":pendiente,
      "origen":origen,
      "pallet":pallet,
      "destino":destino,
      "usuario":usuario
    }),{headers:headers});
  }

  getDocumentoDetalle(documento:string){
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type','application/json; charset=utf-8');
    headers = headers.set('Accept','application/json; charset=utf-8');
    return this.http.post('http://192.168.0.214:81/wswms/ajax/recepcion.php/?op=getDocumentoDetalle',JSON.stringify({
      "documento":documento,
    }),{headers:headers});
  }

  async presentToast(mensaje:string) {
    const toast = await this.toastController.create({
      message: mensaje,
      duration: 2000
    });
    toast.present();
  }

  async presentLoading() {
    this.loading = await this.loadingController.create({
        message: 'Loading...'
    });
  await this.loading.present();
  }

}
