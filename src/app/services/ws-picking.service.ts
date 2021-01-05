import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ToastController, LoadingController, AlertController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class WsPickingService {
  loading: any;

  constructor(public toastController: ToastController,private http: HttpClient,private loadingController:LoadingController) { }


  consolidados(usuario:string){
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json; charset=utf-8');
    headers = headers.set('Accept', 'application/json; charset=utf-8');
    return this.http.post('http://192.168.0.214:81/wswms/ajax/picking.php/?op=consolidados',JSON.stringify({
    "usuario":usuario
  }),{headers:headers});
  }

  consolidadosArea(area:string,op:string){
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json; charset=utf-8');
    headers = headers.set('Accept', 'application/json; charset=utf-8');
    return this.http.post('http://192.168.0.214:81/wswms/ajax/picking.php/?op=consolidadosArea',JSON.stringify({
    "area":area,
    "op":op,
  }),{headers:headers});
  }

  obtenerProductosConsolidado(consolidado:string,usuario:string,area:string){
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json; charset=utf-8');
    headers = headers.set('Accept', 'application/json; charset=utf-8');
    return this.http.post('http://192.168.0.214:81/wswms/ajax/picking.php/?op=obtenerProductosConsolidado',JSON.stringify({
    "consolidado":consolidado,
    "usuario":usuario,
    "area":area
  }),{headers:headers});
  }

  cantidadPicking(consolidado:string,producto:string,usuario:string,area:string,origen:string){
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json; charset=utf-8');
    headers = headers.set('Accept', 'application/json; charset=utf-8');
    return this.http.post('http://192.168.0.214:81/wswms/ajax/picking.php/?op=cantidadPicking',JSON.stringify({
    "consolidado":consolidado,
    "producto":producto,
    "usuario":usuario,
    "area":area,
    "origen":origen
  }),{headers:headers});
  }

  cantidadPickingPendiente(consolidado:string,producto:string,usuario:string,origen:string){
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json; charset=utf-8');
    headers = headers.set('Accept', 'application/json; charset=utf-8');
    return this.http.post('http://192.168.0.214:81/wswms/ajax/picking.php/?op=cantidadPickingPendiente',JSON.stringify({
    "consolidado":consolidado,
    "producto":producto,
    "usuario":usuario,
    "origen":origen
  }),{headers:headers});
  }

  validarCoordenadaPicking(coordenada:string){
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json; charset=utf-8');
    headers = headers.set('Accept', 'application/json; charset=utf-8');
    return this.http.post('http://192.168.0.214:81/wswms/ajax/picking.php/?op=validarCoordenadaPicking',JSON.stringify({
    "coordenada":coordenada
  }),{headers:headers});
  }

  validarCantidad( consolidado:string,producto:string,cantidad:string){
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json; charset=utf-8');
    headers = headers.set('Accept', 'application/json; charset=utf-8');
    return this.http.post('http://192.168.0.214:81/wswms/ajax/picking.php/?op=validarCantidad',JSON.stringify({
      "consolidado":consolidado,
      "producto":producto,
      "cantidad":cantidad
  }),{headers:headers});
  }

  guardarPicking(consolidado:string, producto:string,  origen:string,  solicitada:string, procesada:string,  pendiente:string, destino:string,  usuario:string){
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json; charset=utf-8');
    headers = headers.set('Accept', 'application/json; charset=utf-8');
    return this.http.post('http://192.168.0.214:81/wswms/ajax/picking.php/?op=guardarPicking',JSON.stringify({
      "consolidado":consolidado,
      "producto":producto,
      "origen":origen,
      "solicitada":solicitada,
      "procesada":procesada,
      "pendiente":pendiente,
      "destino":destino,
      "usuario":usuario
  }),{headers:headers});
  }

  product_consolidados(consolidado:string,usuario:string,area:string){
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json; charset=utf-8');
    headers = headers.set('Accept', 'application/json; charset=utf-8');
    return this.http.post('http://192.168.0.214:81/wswms/ajax/picking.php?op=product_consolidados',JSON.stringify({
    "consolidado":consolidado,
    "usuario":usuario,
    "area":area
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
