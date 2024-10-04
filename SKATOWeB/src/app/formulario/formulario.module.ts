import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormularioComponent } from './formulario.component';
import { GuiaComponent } from './guia/guia.component';
import { TrucosComponent } from './trucos/trucos.component';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    FormularioComponent,
    GuiaComponent,
    TrucosComponent
  ],
  imports: [
    CommonModule,
    FormsModule
  ]
})
export class FormularioModule { }
