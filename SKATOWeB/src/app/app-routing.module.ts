import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormularioComponent } from './formulario/formulario.component';
import { HomePComponent } from './home/home-p/home-p.component';
import { PerfilComponent } from './perfil/perfil.component';
import { RegisterLoginComponent } from './perfil/register-login/register-login.component';
const routes: Routes = [
  {
    path: 'add', component:FormularioComponent
  },
  {
    path: '', component:HomePComponent
  },
  {
    path:'login', component:RegisterLoginComponent
  },
  {
    path:'perfil', component:PerfilComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
