import { Component } from '@angular/core';
import { GuiaModel } from './guia-model';
import { GuiaService } from './guia.service';
import { TrucosService } from '../trucos/trucos.service';
import { TrucoModel } from '../trucos/truco-model';
import { response } from 'express';
import { PerfilService } from '../../perfil.service';

@Component({
  selector: 'app-guia',
  templateUrl: './guia.component.html',
  styleUrls: ['./guia.component.css']
})
export class GuiaComponent {

  constructor(private guideService: GuiaService, private trucoService: TrucosService, private perfilService: PerfilService) {}

  ngOnInit(): void {
    this.onGetTrucos(); 
    if (this.perfilService.isAuthenticated()) {
      this.getUserData();
    } else {
        alert("Debes de iniciar sesión")
      }
    }
  

  trucos: TrucoModel[] = [];

    id: number = 0;
    title: string = '';
    description: string = '';
    idUser: number = 0;
    idTrick: number = 0;
  dateCreate: Date = new Date;

  onSubmit () {
    const newGuide: GuiaModel = {
      id: this.id,
      title: this.title,
      description: this.description,
      dateCreate: this.dateCreate,
      idUser: this.idUser,
      idTrick: this.idTrick
    }

    this.guideService.createGuide(newGuide).subscribe(
      (response: GuiaModel) => {
        console.log('Guía creada exitosamente: ', response);
        alert('La guía se ha creado con éxito.');
        this.resetForm();
      },
      (error) => {
        console.log('Error al crear la guía', error);
        alert('Hubo un error al crear la guía');
      }
    );
  }

  onGetTrucos(): void {
    this.trucoService.getAllTricks().subscribe(
      (data: TrucoModel[]) => {
        this.trucos = data;
      }, 
      error => {
        console.log('No se logro obtener los trucos', error);
      }
    )
  }

  resetForm(): void {
    this.id = 0;
    this.title = '';
    this.description = '';
    this.dateCreate = new Date;
    this.idTrick = 0;
  }

  getUserData(): void {
    this.perfilService.getUserDetails().subscribe(
      (data: any) => {
        if (data && data.id) {
          this.idUser = data.id;
        } else {
          console.log('La respuesta no contiene un id válido:', data);
          alert('Error: La respuesta del servidor no contiene un id válido.');
        }
      },
      (error) => {
        console.log('Error al obtener los datos del usuario', error);
        alert('Error al obtener los datos del usuario');
      }
    );
  }
}
