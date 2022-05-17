import { Component } from '@angular/core';

import { Platform, NavController } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
  
  public appPages = [
    {
      title: 'Recepción',
      url: '/recepcion-documento',
      icon: 'apps',
      id: 'recepcion-documento'
    },
    {
      title: 'Movimientos',
      url: '/movimiento',
      icon: 'home',
      id: 'movimiento',
    },
    {
      title: 'Picking',
      url: '/picking-consolidado',
      icon: 'options',
      id: 'picking-consolidado'
    },
    {
      title: 'Armado',
      url: '/impresora',
      icon: 'cube',
      id: 'armado'
    },
    {
      title: 'Buscar artículo',
      url: '/consulta-prod',
      icon: 'search',
      id: 'consulta-prod',
    },
    {
      title: 'Bahías',
      url: '/bahias',
      icon: 'cart',
      id: 'bahias',
    }, 
    {
      title: 'Logística',
      url: '/logistica',
      icon: 'people',
      id: 'logistica'
    },
    {
      title: 'Camión',
      url: '/camion',
      icon: 'bus',
      id: 'camion'
    }
    
  ];

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private storage:Storage,
    private router:NavController
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.backgroundColorByHexString('#06ff83');
      this.splashScreen.hide();
    });
  }

  salir(){
    this.storage.remove('usuario').then(()=>{
      this.router.navigateRoot('/login');
    })
  }

  

}
