import { Component,Input,Output,EventEmitter } from '@angular/core';
import { GuiaService } from '../../formulario/guia/guia.service';
import { GuiaModel } from '../../formulario/guia/guia-model';

@Component({
  selector: 'app-modal-g',
  templateUrl: './modal-g.component.html',
  styleUrl: './modal-g.component.css'
})


export class ModalGComponent {

  constructor(private guiaService: GuiaService) {}

@Input() isOpen = false;
@Output() close = new EventEmitter<void>();
@Input() selectedGuia: GuiaModel | null = null;

guias: GuiaModel[] = [];

closeModal() {
  this.isOpen = false;
  this.close.emit();
}
}
