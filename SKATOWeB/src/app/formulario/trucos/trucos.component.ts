  import { Component } from '@angular/core';
  import { TrucoModel } from './truco-model';
  import { TrucosService } from './trucos.service';

  @Component({
    selector: 'app-trucos',
    templateUrl: './trucos.component.html',
    styleUrls: ['./trucos.component.css'] 
   })
  export class TrucosComponent {

    constructor(private trickService: TrucosService) {}

    id: number = 0;    
    title: string = '';
    description: string = '';
    idCategory: number = 0;
    idDifficulty: number = 0;
    idLevelTrick: number = 0;
    idUser: number = 1;

    levels = [
      { id: 1, name: 'Posser' },
      { id: 2, name: 'Intermedio' },
      { id: 3, name: 'Avanzado'},
      { id: 4, name: 'Maestro'}
    ]

    difficulties = [
      { id: 1, name: 'Fácil' },
      { id: 2, name: 'Medio' },
      { id: 3, name: 'Difícil'},
    ]

    categories = [
      { id: 1, name: 'street' },
      { id: 2, name: 'park' },
      { id: 3, name: 'vert'},
      { id: 4, name: 'freestyle'}
    ];

    onSubmit () {
      const newTrick: TrucoModel = {
        id: this.id, 
        title: this.title,
        description: this.description,
        idCategory: this.idCategory,
        idDifficulty: this.idDifficulty,
        idLevelTrick: this.idLevelTrick,
        idUser: this.idUser 
      }  

      this.trickService.createTrick(newTrick).subscribe(
        (response: TrucoModel) => {
          console.log('Truco creado exitosamente:', response);
          alert('El truco se ha creado con éxito.');  
          this.resetForm();
        },
        (error) => {
          console.error('Error al crear el truco:', error);
          alert('Hubo un error al crear el truco.');
        }
      );
    }
      resetForm(): void {
        this.id = 0;
        this.title = '';
        this.description = '';
        this.idCategory = 0;
        this.idDifficulty = 0;
        this.idLevelTrick = 0;
        this.idUser = 0;
      }
    }



    


