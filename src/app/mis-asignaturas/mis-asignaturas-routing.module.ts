import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MisAsignaturasPage } from './mis-asignaturas.page';

const routes: Routes = [
  {
    path: '',
    component: MisAsignaturasPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MisAsignaturasPageRoutingModule {}
