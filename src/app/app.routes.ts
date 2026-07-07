import { Routes } from '@angular/router';
import { HomeComponent } from './components/home-component/home-component';
import { DashboardComponent } from './components/dashboard-component/dashboard-component';
import { PerfilComponent } from './components/perfil-component/perfil-component';
import { ReportesComponent } from './components/reportes-component/reportes-component';
import { PanelAdmin } from './pages/panel-admin/panel-admin';
import { EntradasComponent } from './components/entradas-component/entradas-component';
import { LoginComponent } from './components/login-component/login-component';
import { DetalleEventoComponent } from './components/detalle-evento-component/detalle-evento-component';
import { ResumenCompraComponent } from './components/resumen-compra-component/resumen-compra-component';
import { PagoExitoComponent } from './components/pago-exito-component/pago-exito-component';
import { PagoErrorComponent } from './components/pago-error-component/pago-error-component';
import { PagoPendienteComponent } from './components/pago-pendiente-component/pago-pendiente-component';
import { authGuard } from './guards/auth-guard';
import { adminGuard } from './guards/admin-guard';
import { EventosAdminComponent } from './components/eventos-admin-component/eventos-admin-component';


export const routes: Routes = [
  {
        path: '',
        component: HomeComponent
    },
    {
        path: 'Perfil',
        component: PerfilComponent
    },
    {
        path: 'login',
        component: LoginComponent
    },
    {
        path: 'registro',
        component: LoginComponent
    },
    {
        path: 'Perfil',
        component: PerfilComponent,
        canActivate: [authGuard]
    },
    {
        path: 'Entrada',
        component: EntradasComponent
    },
    {
        path: 'Entrada/:id',
        component: DetalleEventoComponent
    },
    {
        path:'resumen-compra/:id',
        component:ResumenCompraComponent
    },
    {
        path: 'pago/exito',
        component: PagoExitoComponent
    },
    {
        path: 'pago/error',
        component: PagoErrorComponent
    },
    {
        path: 'pago/pendiente',
        component: PagoPendienteComponent
    },
    
   {
        path: 'Admin',
        component: PanelAdmin,
        canActivate: [adminGuard],
        children: [
            { path: 'Dashboard', component: DashboardComponent },
            { path: 'Reportes', component: ReportesComponent },
            { path: 'Eventos', component: EventosAdminComponent },
            { path: '', redirectTo: 'Dashboard', pathMatch: 'full' }
        ]
    },
    {
        path: '**',
        redirectTo: ''
    }
];
