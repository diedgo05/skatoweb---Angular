import { Component, OnInit } from '@angular/core';
import { GuiaService } from '../../formulario/guia/guia.service';
import { GuiaModel } from '../../formulario/guia/guia-model';
import { TrucosService } from '../../formulario/trucos/trucos.service';
import { TrucoModel } from '../../formulario/trucos/truco-model';
import { Router } from '@angular/router';
import { PerfilService } from '../../perfil.service';

@Component({
  selector: 'app-perfil-g',
  templateUrl: './perfil-g.component.html',
  styleUrls: ['./perfil-g.component.css']
})
export class PerfilGComponent implements OnInit {

  guias: GuiaModel[] = [];
  trucos: TrucoModel[] = [];
  selectedGuia: GuiaModel = {
    id: 0,
    title: '',
    description: '',
    idTrick: 0,
    idUser: 0,
    dateCreate: new Date()
  };

  isDeleteModalOpen: boolean = false;
  isModalOpen: boolean = false;
  isTokenValid: boolean = false;
  constructor(
    private guiaService: GuiaService,
    private trucoService: TrucosService,
    private router: Router,
    private perfilService: PerfilService 
  ) {}

  ngOnInit() {
    this.isTokenValid = this.perfilService.isAuthenticated();
    const authToken = this.perfilService.getToken(); 
    if (!authToken) {
      this.router.navigate(['/login']);
    } else {
      this.getUserDetails();  
      this.getGuias();
      this.onGetTruco();
    }
  }

  getUserDetails(): void {
    this.perfilService.getUserDetails().subscribe(
      (userData) => {
        console.log('Detalles del usuario:', userData);
      },
      (error) => {
        console.error('Error al obtener los detalles del usuario', error);
      }
    );
  }

  getGuias(): void {
    this.guiaService.getAllGuides().subscribe(
      (data: GuiaModel[]) => {
        this.guias = data;
      },
      (error) => {
        console.error('Error al cargar las guías', error);
      }
    );
  }

  onGetTruco(): void {
    this.trucoService.getAllTricks().subscribe(
      (data: TrucoModel[]) => {
        this.trucos = data;
      },
      error => {
        console.error('No se logró obtener los trucos', error);
      }
    );
  }

  openDeleteModal(guia: GuiaModel) {
    this.selectedGuia = guia;
    this.isDeleteModalOpen = true;
  }

  closeDeleteModal() {
    this.isDeleteModalOpen = false;
  }

  openModal(guia: GuiaModel) {
    this.isModalOpen = true;
    this.selectedGuia = guia;
  }

  closeModal() {
    this.isModalOpen = false;
  }

  deleteGuia(guia: GuiaModel) {
    if (guia) {
      this.guiaService.deleteGuide(guia.id).subscribe(response => {
        this.guias = this.guias.filter(g => g.id !== guia.id);
        this.closeDeleteModal();
      });
    }
  }

  updateGuide() {
    if (this.selectedGuia) {
      const updateGuia: GuiaModel = {
        id: this.selectedGuia.id,
        title: this.selectedGuia.title,
        description: this.selectedGuia.description,
        idTrick: this.selectedGuia.idTrick,
        idUser: 1,  
        dateCreate: this.selectedGuia.dateCreate
      };
      this.guiaService.updateGuide(updateGuia).subscribe(
        (response) => {
          console.log('Guía actualizada exitosamente', response);
          this.closeModal();
        },
        (error) => {
          console.error('Error al actualizar la guía', error);
        }
      );
    }
  }

  deleteGuide(guide: GuiaModel) {
    if (guide) {
      this.guiaService.deleteGuide(guide.id).subscribe(response => {
        this.guias = this.guias.filter(g => g.id !== guide.id);
        this.closeDeleteModal();
      });
    }
  }
}
