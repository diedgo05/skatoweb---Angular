import { Component } from '@angular/core';
import { EventEmitter } from '@angular/core';
import { Input,Output } from '@angular/core';
import { TrucoModel } from '../../formulario/trucos/truco-model';
@Component({
  selector: 'app-modal-delete',
  templateUrl: './modal-delete.component.html',
  styleUrl: './modal-delete.component.css'
})
export class ModalDeleteComponent {
  @Input() truco!: TrucoModel; 
  @Input() isOpen = false;
  @Output() confirmDelete = new EventEmitter<TrucoModel>(); 
  @Output() close = new EventEmitter<void>();


  onDelete() {
      this.confirmDelete.emit(this.truco);
  }

  onClose() {
    this.close.emit();
  }
}
