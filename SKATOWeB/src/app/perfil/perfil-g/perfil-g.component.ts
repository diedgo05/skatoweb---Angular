import { Component } from '@angular/core';
import { GuiaService } from '../../formulario/guia/guia.service';
import { GuiaModel } from '../../formulario/guia/guia-model';
import { response } from 'express';
import { TrucosService } from '../../formulario/trucos/trucos.service';
import { TrucoModel } from '../../formulario/trucos/truco-model';

@Component({
  selector: 'app-perfil-g',
  templateUrl: './perfil-g.component.html',
  styleUrl: './perfil-g.component.css'
})
export class PerfilGComponent {

  constructor(private guiaService: GuiaService, private trucoService: TrucosService) {}

  ngOnInit() {
    this.getGuias()
  }

  guias: GuiaModel[] = [];
  trucos: TrucoModel[] = [];
  selectedGuia: GuiaModel = {
    id: 0,
    title: '',
    description: '',
    idTrick: 0,
    idUser: 0,
    dateCreate: new Date
  };

  isDeleteModalOpen: boolean = false;

  openDeleteModal(guia: GuiaModel) {
    this.selectedGuia = guia;
    this.isDeleteModalOpen = true;
  }

  closeDeleteModal() {
    this.isDeleteModalOpen = false;
  }

  isModalOpen = false;

  openModal(guia: GuiaModel) {
    this.isModalOpen = true;
    this.selectedGuia = guia;
  }

  closeModal() {
    this.isModalOpen = false;
  }

  getGuias(): void {
    this.guiaService.getAllGuides().subscribe(
      (data: GuiaModel[]) => {
        this.guias = data;
      },
      (error) => {
        console.error('Error al cargar las guias', error);
      }
    );
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
    if(this.selectedGuia) {
      console.log(this.selectedGuia); 
      const updateGuia: GuiaModel ={
        id: this.selectedGuia.id,
        title: this.selectedGuia.title,
        description: this.selectedGuia.description,
        idTrick: this.selectedGuia.idTrick,
        idUser: 1,
        dateCreate: this.selectedGuia.dateCreate
      };
      this.guiaService.updateGuide(updateGuia).subscribe(
        (response) => {
          console.log('Guia actualizada exitomsamente', response);
          this.closeModal();
        },
        (error) => {
          console.error('Error al actualizar la guía', error);
        }
      )
    }
  }

  onGetTruco(): void {
    this.trucoService.getAllTricks().subscribe(
      (data: TrucoModel[]) => {
        this.trucos = data;
      },
      error => {
        console.log('No se logro obtener las guías', error)
      }
    )
  }
}
