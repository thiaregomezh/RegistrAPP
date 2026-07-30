import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegistrarAsistenciaPage } from './registrar-asistencia.page';

const routes: Routes = [
  {
    path: '',
    component: RegistrarAsistenciaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RegistrarAsistenciaRoutingModule {}
