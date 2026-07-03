import { Routes } from '@angular/router';
import { HomeComponent } from './components/home-component/home-component';
import { DashboardComponent } from './components/dashboard-component/dashboard-component';
import { PerfilComponent } from './components/perfil-component/perfil-component';
import { ReportesComponent } from './components/reportes-component/reportes-component';
import { PartidosComponent } from './components/partidos-component/partidos-component';
import { PanelAdmin } from './pages/panel-admin/panel-admin';
import { RegistroComponent } from './components/registro-component/registro-component';
import { EntradasComponent } from './components/entradas-component/entradas-component';


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
        path: 'Registro',
        component: RegistroComponent
    },
     {
        path: 'Entrada',
        component: EntradasComponent
    },
    
    {
        path: 'Admin',
        component: PanelAdmin,
        children: [
            { path: 'Dashboard', component: DashboardComponent },
            { path: 'Reportes', component: ReportesComponent },
            { path: 'Partidos', component: PartidosComponent },
            { path: '', redirectTo: 'Dashboard', pathMatch: 'full' }
        ]
    },
    {
        path: '**',
        redirectTo: ''
    }
];
