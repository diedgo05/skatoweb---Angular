import { Component } from '@angular/core';
import { TrucosService } from '../../formulario/trucos/trucos.service';
import { TrucoModel } from '../../formulario/trucos/truco-model';
import { FormsModule, ReactiveFormsModule  } from '@angular/forms';

@Component({
  selector: 'app-perfil-p',
  templateUrl: './perfil-p.component.html',
  styleUrl: './perfil-p.component.css'
})
export class PerfilPComponent {

  constructor(private trucoService: TrucosService) {}


ngOnInit() {
  this.getTricks()
}

trucos: TrucoModel[] = [];

selectedTruco: TrucoModel= {
  id: 0,
  title: '',
  description: '',
  idLevelTrick: 0,
  idDifficulty: 0,
  idCategory: 0,
  idUser: 0
};

    isDeleteModalOpen: boolean = false;
    
    
    openDeleteModal(truco: TrucoModel) {
      this.selectedTruco = truco;
      this.isDeleteModalOpen = true;
    }

    
    closeDeleteModal() {
      this.isDeleteModalOpen = false;

    }

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

  isModalOpen = false;

   openModal(truco: TrucoModel) {
    this.isModalOpen = true;
    this.selectedTruco = truco;
  }

  closeModal() {
    this.isModalOpen = false;
  }
  
  getTricks(): void {
    this.trucoService.getAllTricks().subscribe(
      (data: TrucoModel[]) => {
        this.trucos = data;
      }, 
      (error) => {
        console.error('Error al cargar los trucos', error);
      }
    );
  }
  
  deleteTruco(truco: TrucoModel) {
    if (truco) {
      this.trucoService.deleteTrick(truco.id).subscribe(response => {
        this.trucos = this.trucos.filter(t => t.id !== truco.id);
        this.closeDeleteModal();
      });
    }
  }

  updateTrick() {
    if (this.selectedTruco) {
      console.log(this.selectedTruco);
      const updatedTrick: TrucoModel = {
        id: this.selectedTruco.id,
        title: this.selectedTruco.title,
        description: this.selectedTruco.description,
        idLevelTrick: this.selectedTruco.idLevelTrick,
        idDifficulty: this.selectedTruco.idDifficulty,
        idCategory: this.selectedTruco.idCategory,
        idUser: 1
      };
      this.trucoService.updateTrick(updatedTrick).subscribe(
        (response) => {
          console.log('Truco actualizado con éxito', response);
          this.closeModal();
        },
        (error) => {
          console.error('Error al actualizar el truco', error);
        }
      );
    }
  }
  
}
