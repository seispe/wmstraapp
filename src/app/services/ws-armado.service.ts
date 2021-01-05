import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoadingController, ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class WsArmadoService {
loading: any;
  constructor(public toastController: ToastController,private http: HttpClient,private loadingController:LoadingController) { }

  impresoras(usuario:string,tipo:string){
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type','application/json; charset=utf-8');
    headers = headers.set('Accept','application/json; charset=utf-8');
    return this.http.post('http://192.168.0.247:81/wswms/ajax/armado.php/?op=getImpresoras',JSON.stringify({
      "usuario":usuario,
      "tipo":tipo
    }),{headers:headers});
  }

  getInfoArmado(bulto:string){
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type','application/json; charset=utf-8');
    headers = headers.set('Accept','application/json; charset=utf-8');
    return this.http.post('http://192.168.0.247:81/wswms/ajax/armado.php/?op=getInfoArmado',JSON.stringify({
      "bulto":bulto
    }),{headers:headers});
  }

  colaImpresion(op:string,bulto:string,usuario:string,tipo:string,numero:string,impresora:string,estado:string,activo:string,modulo:string){
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type','application/json; charset=utf-8');
    headers = headers.set('Accept','application/json; charset=utf-8');
    return this.http.post('http://192.168.0.247:81/wswms/ajax/armado.php/?op=colaImpresion',JSON.stringify({
      "op":op,
      "bulto":bulto,
      "usuario":usuario,
      "tipo":tipo,
      "numero":numero,
      "impresora":impresora,
      "estado":estado,
      "activo":activo,
      "modulo":modulo,
    }),{headers:headers});
  }

  audImpresion(pedidos:string,usuario:string,modulo:string,op:string,obs:string){
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type','application/json; charset=utf-8');
    headers = headers.set('Accept','application/json; charset=utf-8');
    return this.http.post('http://192.168.0.247:81/wswms/ajax/armado.php/?op=audImpresion',JSON.stringify({
      "pedidos":pedidos,
      "usuario":usuario,
      "modulo":modulo,
      "op":op,
      "obs":obs,
    }),{headers:headers});
  }

  getPedidos(filtro:string, area:string, op:string){
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type','application/json; charset=utf-8');
    headers = headers.set('Accept','application/json; charset=utf-8');
    return this.http.post('http://192.168.0.247:81/wswms/ajax/armado.php/?op=getPedidos',JSON.stringify({
      "filtro":filtro,
      "area":area,
      "op":op,
    }),{headers:headers});
  }

  validaCoordenada(coordenada:string, tipo:string){
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type','application/json; charset=utf-8');
    headers = headers.set('Accept','application/json; charset=utf-8');
    return this.http.post('http://192.168.0.247:81/wswms/ajax/armado.php/?op=validarCoordenadaArmado',JSON.stringify({
      "coordenada":coordenada,
      "tipo":tipo
    }),{headers:headers});
  }

  pedDetProceso(pedido:string,producto:string,op:string,usuario:string,area:string){
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type','application/json; charset=utf-8');
    headers = headers.set('Accept','application/json; charset=utf-8');
    return this.http.post('http://192.168.0.247:81/wswms/ajax/armado.php/?op=pedDetProceso',JSON.stringify({
      "pedido":pedido,
      "producto":producto,
      "op":op,
      "usuario":usuario,
      "area":area,
    }),{headers:headers});
  }
  
  detProcPed(pedido:string,usuario:string,area:string){
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type','application/json; charset=utf-8');
    headers = headers.set('Accept','application/json; charset=utf-8');
    return this.http.post('http://192.168.0.247:81/wswms/ajax/armado.php/?op=detProcPed',JSON.stringify({
      "pedido":pedido,
      "usuario":usuario,
      "area":area,
    }),{headers:headers});
  }

  getBultos(usuario:string,op:string){
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type','application/json; charset=utf-8');
    headers = headers.set('Accept','application/json; charset=utf-8');
    return this.http.post('http://192.168.0.247:81/wswms/ajax/armado.php/?op=getBultos',JSON.stringify({
      "usuario":usuario,
      "op":op,
    }),{headers:headers});
  }

  insBultos(estado:string,usuario:string){
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type','application/json; charset=utf-8');
    headers = headers.set('Accept','application/json; charset=utf-8');
    return this.http.post('http://192.168.0.247:81/wswms/ajax/armado.php/?op=insBultos',JSON.stringify({
      "estado":estado,
      "usuario":usuario,
    }),{headers:headers});
  }

  validaVoid(codigo:string,op:string){
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type','application/json; charset=utf-8');
    headers = headers.set('Accept','application/json; charset=utf-8');
    return this.http.post('http://192.168.0.247:81/wswms/ajax/armado.php/?op=validarVoid',JSON.stringify({
      "codigo":codigo,
      "op":op,
    }),{headers:headers});
  }

  getDetArmado(codigo:string,pedido:string,area:string,op:string){
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type','application/json; charset=utf-8');
    headers = headers.set('Accept','application/json; charset=utf-8');
    return this.http.post('http://192.168.0.247:81/wswms/ajax/armado.php/?op=getDetArmado',JSON.stringify({
      "codigo":codigo,
      "pedido":pedido,
      "area":area,
      "op":op,
    }),{headers:headers});
  }

  validaBulto(op:number,idbulto:number,pedido:string,usuario:string){
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type','application/json; charset=utf-8');
    headers = headers.set('Accept','application/json; charset=utf-8');
    return this.http.post('http://192.168.0.247:81/wswms/ajax/armado.php/?op=validaBulto',JSON.stringify({
      "op":op,
      "idbulto":idbulto,
      "pedido":pedido,
      "usuario":usuario,
    }),{headers:headers});
  }

  insArmado(pedido:string, producto:string, coor_origen:string, coor_destino:string, can_armada:number, can_armar:number, can_pend_armar:number, codigo_void:string, observacion:string, usuario:string, idbulto:number){
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type','application/json; charset=utf-8');
    headers = headers.set('Accept','application/json; charset=utf-8');
    return this.http.post('http://192.168.0.247:81/wswms/ajax/armado.php/?op=insArmado',JSON.stringify({
      "pedido":pedido,
      "producto":producto,
      "coor_origen":coor_origen,
      "coor_destino":coor_destino,
      "can_armada":can_armada,
      "can_armar":can_armar,
      "can_pend_armar":can_pend_armar,
      "codigo_void":codigo_void,
      "observacion":observacion,
      "usuario":usuario,
      "idbulto":idbulto,
    }),{headers:headers});
  }

  cierreArmado(pedido:string, area:string){
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type','application/json; charset=utf-8');
    headers = headers.set('Accept','application/json; charset=utf-8');
    return this.http.post('http://192.168.0.247:81/wswms/ajax/armado.php/?op=cierreArmado',JSON.stringify({
      "pedido":pedido,
      "area":area,
    }),{headers:headers});
  }

  artDetArm(pedido:string,op:string,area:string){
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type','application/json; charset=utf-8');
    headers = headers.set('Accept','application/json; charset=utf-8');
    return this.http.post('http://192.168.0.247:81/wswms/ajax/armado.php/?op=artDetArm',JSON.stringify({
      "pedido":pedido,
      "op":op,
      "area":area,
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
