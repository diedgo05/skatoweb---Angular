import { Component } from '@angular/core';
import { EventEmitter } from '@angular/core';
import { Input, Output } from '@angular/core';
import { GuiaModel } from '../../formulario/guia/guia-model';

@Component({
  selector: 'app-modal-delete-g',
  templateUrl: './modal-delete-g.component.html',
  styleUrl: './modal-delete-g.component.css'
})
export class ModalDeleteGComponent {
  @Input() guia: GuiaModel | null = null;
  @Input() isOpen = false;
  @Output() confirmDelete = new EventEmitter<GuiaModel>();
  @Output() close = new EventEmitter<void>();

  onDelete() {
    if (this.guia) {
      this.confirmDelete.emit(this.guia)
    }
  }

  onClose() {
    this.close.emit(); 
  }

}
