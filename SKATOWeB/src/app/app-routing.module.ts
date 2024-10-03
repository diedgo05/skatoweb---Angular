import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormularioComponent } from './formulario/formulario.component';
import { HomePComponent } from './home/home-p/home-p.component';

const routes: Routes = [
  {
    path: 'add', component:FormularioComponent
  },
  {
    path: '', component:HomePComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
