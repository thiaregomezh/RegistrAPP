import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';  // Importamos ReactiveFormsModule
import { IonicModule } from '@ionic/angular';

import { CambiarClavePageRoutingModule } from './cambiar-clave-routing.module';

import { CambiarClavePage } from './cambiar-clave.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,  // Agregamos ReactiveFormsModule aquí
    IonicModule,
    CambiarClavePageRoutingModule
  ],
  declarations: [CambiarClavePage]
})
export class CambiarClavePageModule {}
