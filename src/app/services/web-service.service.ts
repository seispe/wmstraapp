import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, JsonpInterceptor } from '@angular/common/http';
import { ToastController, LoadingController, AlertController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class WebServiceService {
  loading: any;

  constructor(public toastController: ToastController,private http: HttpClient,private loadingController:LoadingController,private alertController:AlertController) { }
  
  
  ping(){
    let headers = new HttpHeaders();
    headers = headers.set('Accept', 'application/json; charset=utf-8');
    return this.http.get('http://192.168.0.214:81/wswms/ajax/usuario.php?op=ping', {headers: headers});
  }

  login(usuario:string,password:string){
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json; charset=utf-8');
    headers = headers.set('Accept', 'application/json; charset=utf-8');

    return this.http.post('http://192.168.0.214:81/wswms/ajax/usuario.php?op=login',JSON.stringify({
    "usuario":usuario,
    "clave":password}),{headers:headers});
  }

  validarCoordenada(coordenada:string){
    coordenada="0"+coordenada;
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json; charset=utf-8');
    headers = headers.set('Accept', 'application/json; charset=utf-8');
    return this.http.post('http://192.168.0.214:81/wswms/ajax/usuario.php?op=validarCoordenada',JSON.stringify({
    "coordenada":coordenada}),{headers:headers});
  }

  validarProducto(codigo:string){
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json; charset=utf-8');
    headers = headers.set('Accept', 'application/json; charset=utf-8');
    return this.http.post('http://192.168.0.214:81/wswms/ajax/usuario.php?op=validarProducto',JSON.stringify({
    "codigo":codigo}),{headers:headers});
  }

  inforArtiCoor(codigo:string,coordenada:string){
    coordenada="0"+coordenada;
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json; charset=utf-8');
    headers = headers.set('Accept', 'application/json; charset=utf-8');
    return this.http.post('http://192.168.0.214:81/wswms/ajax/usuario.php?op=inforArtiCoor',JSON.stringify({
    "codigo":codigo,
    "coordenada":coordenada,
  }),{headers:headers});
  }

  movimientos( coorInicio:string, coorFin:string,  cantidad:number,  producto:string, usuario:string, tipo:string){
    coorInicio="0"+coorInicio;
    coorFin="0"+coorFin;
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json; charset=utf-8');
    headers = headers.set('Accept', 'application/json; charset=utf-8');
    return this.http.post('http://192.168.0.214:81/wswms/ajax/usuario.php?op=movimientos',JSON.stringify({
    "coorInicio":coorInicio,
    "coorFin":coorFin,
    "cantidad":cantidad,
    "producto":producto,
    "usuario":usuario,
    "tipo":tipo
  }),{headers:headers});
  }

  busquedaProd(producto:string){
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json; charset=utf-8');
    headers = headers.set('Accept', 'application/json; charset=utf-8');
    return this.http.post('http://192.168.0.214:81/wswms/ajax/usuario.php?op=busquedaProd',JSON.stringify({
    "producto":producto
  }),{headers:headers});
  }

  bahiasxbultos(bulto:string, bahia:string, usuario:string){
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json; charset=utf-8');
    headers = headers.set('Accept', 'application/json; charset=utf-8');
    return this.http.post('http://192.168.0.214:81/wswms/ajax/bahias.php?op=bahiasxbultos',JSON.stringify({
      "bulto":bulto,
      "bahia":bahia,
      "usuario":usuario
    }),{headers:headers});
  }

  getPedido(pedido:string){
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json; charset=utf-8');
    headers = headers.set('Accept', 'application/json; charset=utf-8');
    return this.http.post('http://192.168.0.214:81/wswms/ajax/logistica.php?op=getPedido',JSON.stringify({
      "pedido":pedido
    }),{headers:headers});
  }

  insLogistica(pedido:string, usuario:string){
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json; charset=utf-8');
    headers = headers.set('Accept', 'application/json; charset=utf-8');
    return this.http.post('http://192.168.0.214:81/wswms/ajax/logistica.php?op=insLogistica',JSON.stringify({
      "pedido":pedido,
      "usuario":usuario
    }),{headers:headers});
  }
  cargaCamion(pedido:string, camion:string, transportista:string, usuario:string){
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json; charset=utf-8');
    headers = headers.set('Accept', 'application/json; charset=utf-8');
    return this.http.post('http://192.168.0.214:81/wswms/ajax/logistica.php?op=cargaCamion',JSON.stringify({
      "pedido":pedido,
      "camion":camion,
      "transportista":transportista,
      "usuario":usuario
    }),{headers:headers});
  }
  getTrans(pedido:string, opcion:string){
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json; charset=utf-8');
    headers = headers.set('Accept', 'application/json; charset=utf-8');
    return this.http.post('http://192.168.0.214:81/wswms/ajax/logistica.php?op=getTrans',JSON.stringify({
      "pedido":pedido,
      "opcion":opcion
    }),{headers:headers});
  }

  claveEmpresa(){
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json; charset=utf-8');
    headers = headers.set('Accept', 'application/json; charset=utf-8');
    return this.http.post('http://192.168.0.214:81/wswms/ajax/usuario.php?op=claveEmpresa',{headers:headers});
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

 async presentAlertConfirm() {
    

}


}
