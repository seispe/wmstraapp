import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then(m => m.HomePageModule)
  },
  {
    path: 'list',
    loadChildren: () => import('./list/list.module').then(m => m.ListPageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'movimiento',
    loadChildren: () => import('./pages/movimiento/movimiento.module').then( m => m.MovimientoPageModule)
  },
  {
    path: 'consulta-prod',
    loadChildren: () => import('./pages/consulta-prod/consulta-prod.module').then( m => m.ConsultaProdPageModule)
  },
  {
    path: 'picking-consolidado',
    loadChildren: () => import('./pages/picking/picking-consolidado/picking-consolidado.module').then( m => m.PickingConsolidadoPageModule)
  },
  {
    path: 'picking-producto/:area',
    loadChildren: () => import('./pages/picking/picking-producto/picking-producto.module').then( m => m.PickingProductoPageModule)
  },
  
  {
    path: 'busqueda-producto/:id',
    loadChildren: () => import('./pages/picking/busqueda-producto/busqueda-producto.module').then( m => m.BusquedaProductoPageModule)
  },
  {
    path: 'list-productos/:id/:area',
    loadChildren: () => import('./pages/picking/list-productos/list-productos.module').then( m => m.ListProductosPageModule)
  },
  {
    path: 'recepcion',
    loadChildren: () => import('./pages/recepcion/recepcion.module').then( m => m.RecepcionPageModule)
  },
  {
    path: 'logistica',
    loadChildren: () => import('./pages/logistica/logistica.module').then( m => m.LogisticaPageModule)
  },
  {
    path: 'devolucion',
    loadChildren: () => import('./pages/devolucion/devolucion.module').then( m => m.DevolucionPageModule)
  },
  {
    path: 'usuario',
    loadChildren: () => import('./pages/usuario/usuario.module').then( m => m.UsuarioPageModule)
  },
  {
    path: 'bahias',
    loadChildren: () => import('./pages/bahias/bahias.module').then( m => m.BahiasPageModule)
  },
  {
    path: 'etiquetado',
    loadChildren: () => import('./pages/etiquetado/etiquetado.module').then( m => m.EtiquetadoPageModule)
  },
  {
    path: 'camion',
    loadChildren: () => import('./pages/camion/camion.module').then( m => m.CamionPageModule)
  },
  {
    path: 'impresora',
    loadChildren: () => import('./pages/armado/impresora/impresora.module').then( m => m.ImpresoraPageModule)
  },
  {
    path: 'reimpresion',
    loadChildren: () => import('./pages/armado/reimpresion/reimpresion.module').then( m => m.ReimpresionPageModule)
  },
  {
    path: 'armado-pedidos',
    loadChildren: () => import('./pages/armado/armado-pedidos/armado-pedidos.module').then( m => m.ArmadoPedidosPageModule)
  },
  {
    path: 'armado-bulto/:ped/:ciu/:area',
    loadChildren: () => import('./pages/armado/armado-bulto/armado-bulto.module').then( m => m.ArmadoBultoPageModule)
  },
  {
    path: 'busqueda-producto',
    loadChildren: () => import('./pages/armado/busqueda-producto/busqueda-producto.module').then( m => m.BusquedaProductoPageModule)
  },
  {
    path: 'lista-productos/:ped/:area',
    loadChildren: () => import('./pages/armado/lista-productos/lista-productos.module').then( m => m.ListaProductosPageModule)
  }







];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
