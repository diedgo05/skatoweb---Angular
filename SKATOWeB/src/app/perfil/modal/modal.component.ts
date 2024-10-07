import { Component, Input, Output, EventEmitter } from '@angular/core';
import { TrucosService } from '../../formulario/trucos/trucos.service';
import { TrucoModel } from '../../formulario/trucos/truco-model';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent {
  @Input() isOpen = false;
  @Output() close = new EventEmitter<void>();
  @Input() selectedTruco: TrucoModel | null = null;

constructor(private trucoService: TrucosService) {}

trucos: TrucoModel[] = [];

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

  closeModal() {
    this.isOpen = false;
    this.close.emit();
  }


}
