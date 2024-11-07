import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PerfilComponent } from './perfil.component';
import { ModalComponent } from './modal/modal.component';
import { PerfilPComponent } from './perfil-p/perfil-p.component';
import { ModalDeleteComponent } from './modal-delete/modal-delete.component';
import { PerfilGComponent } from './perfil-g/perfil-g.component';
import { ModalGComponent } from './modal-g/modal-g.component';
import { ModalDeleteGComponent } from './modal-delete-g/modal-delete-g.component';
import { FormsModule } from '@angular/forms';
import { RegisterLoginComponent } from './register-login/register-login.component';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    PerfilComponent,
    ModalComponent,
    PerfilPComponent,
    ModalDeleteComponent,
    PerfilGComponent,
    ModalGComponent,
    ModalDeleteGComponent,
    RegisterLoginComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class PerfilModule { }
