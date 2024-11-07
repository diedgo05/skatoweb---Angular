import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'; 
import { GuiaModel } from '../../formulario/guia/guia-model';
import { TrucosService } from '../../formulario/trucos/trucos.service'; 
import { GuiaService } from '../../formulario/guia/guia.service'; 
import { TrucoModel } from '../../formulario/trucos/truco-model'; 

@Component({
  selector: 'app-vista',
  templateUrl: './vista.component.html',
  styleUrls: ['./vista.component.css']
})
export class VistaComponent implements OnInit {
  guias: GuiaModel[] = [];
  trucos: TrucoModel[] = []; 

  levels = [
    { id: 1, name: 'Posser' },
    { id: 2, name: 'Intermedio' },
    { id: 3, name: 'Avanzado' },
    { id: 4, name: 'Maestro' }
  ];

  categories = [
    { id: 1, name: 'street' },
    { id: 2, name: 'park' },
    { id: 3, name: 'vert' },
    { id: 4, name: 'freestyle' }
  ];

  isTokenValid: boolean = false; 

  constructor(
    private guideService: GuiaService, 
    private trucoService: TrucosService, 
    private router: Router 
  ) {}

  ngOnInit(): void {
    const authToken = localStorage.getItem('authToken'); 
    if (authToken) {
      this.isTokenValid = true; 
      this.getGuides(); 
      this.getTricks(); 
    } else {
      this.isTokenValid = false;
      this.router.navigate(['/login']); 
    }
  }

  getGuides(): void {
    this.guideService.getAllGuides().subscribe(
      (data: GuiaModel[]) => {
        this.guias = data;
      }, 
      (error) => {
        console.error('Error al cargar las guías', error);
      }
    );
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

  getTrickTitle(idTrick: number): string {
    const trick = this.trucos.find(t => t.id === idTrick);
    return trick ? trick.title : 'Truco no encontrado';
  }

  getLevelName(idTrick: number): string {
    const trick = this.trucos.find(t => t.id === idTrick);
    return trick ? this.levels.find(l => l.id === trick.idLevelTrick)?.name || 'Nivel no encontrado' : 'Truco no encontrado';
  }

  getCategoryName(idTrick: number): string {
    const trick = this.trucos.find(t => t.id === idTrick);
    return trick ? this.categories.find(c => c.id === trick.idCategory)?.name || 'Categoría no encontrada' : 'Truco no encontrado';
  }
}
