import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TabPage } from './tab.page';

const routes: Routes = [
  {
    path: '',
    component: TabPage,
    children: [
      {
        path: 'home',
        loadChildren: () =>
          import('./../../pages/home/home.module').then(
            (m) => m.HomePageModule
          ),
      },
      {
        path: 'perfil-user',
        loadChildren: () =>
          import('./../../pages/perfil-user/perfil-user.module').then(
            (m) => m.PerfilUserPageModule
          ),
      },
      {
        path: 'ramos',
        loadChildren: () =>
          import('./../../pages/ramos/ramos.module').then(
            (m) => m.RamosPageModule
          ),
      },
      {
        path: 'asistencia',
        loadChildren: () =>
          import('./../../pages/asistencia/asistencia.module').then(
            (m) => m.AsistenciaPageModule
          ),
      },
      {
        path: '',
        redirectTo: 'pages/home',
        pathMatch: 'full',
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TabPageRoutingModule {}
