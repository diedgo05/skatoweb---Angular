import { Component } from '@angular/core';
import { GuiaModel } from './guia-model';
import { GuiaService } from './guia.service';
import { TrucosService } from '../trucos/trucos.service';
import { TrucoModel } from '../trucos/truco-model';
import { response } from 'express';

@Component({
  selector: 'app-guia',
  templateUrl: './guia.component.html',
  styleUrl: './guia.component.css'
})
export class GuiaComponent {

  constructor(private guideService: GuiaService, private trucoService: TrucosService) {}

  ngOnInit(): void {
    this.onGetTrucos(); 
  }

  trucos: TrucoModel[] = [];

    id: number = 0;
    title: string = '';
    description: string = '';
    idUser: number = 1;
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
}
