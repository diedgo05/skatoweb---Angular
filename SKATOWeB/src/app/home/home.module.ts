import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VistaComponent } from './vista/vista.component';
import { HomePComponent } from './home-p/home-p.component';



@NgModule({
  declarations: [
    VistaComponent,
    HomePComponent
  ],
  imports: [
    CommonModule
  ]
})
export class HomeModule { }
