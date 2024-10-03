import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TrucosComponent } from './trucos/trucos.component';
import { FormularioComponent } from './formulario.component';
import { GuiaComponent } from './guia/guia.component';



@NgModule({
  declarations: [
    TrucosComponent,
    FormularioComponent,
    GuiaComponent
  ],
  imports: [
    CommonModule
  ]
})
export class FormularioModule { }
