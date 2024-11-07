import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PerfilService } from '../perfil.service';
import { GuiaService } from '../formulario/guia/guia.service';
import { TrucosService } from '../formulario/trucos/trucos.service';
import { GuiaModel } from '../formulario/guia/guia-model';
import { TrucoModel } from '../formulario/trucos/truco-model';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css'] 
})
export class PerfilComponent implements OnInit {

  isTokenValid: boolean = false;
  userId: number = 2;  
  guias: GuiaModel[] = [];  
  trucos: TrucoModel[] = [];

  constructor(
    private perfilService: PerfilService,
    private guiaService: GuiaService,
    private trucosService: TrucosService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.isTokenValid = this.perfilService.isAuthenticated();
    if (this.perfilService.isAuthenticated()) {
      this.getUserData();  
      this.getUserGuides(); 
      this.getUserTricks();  
    }else {
      this.router.navigate(['/login']);  
    }
  }

  getUserData(): void {
    this.perfilService.getUserDetails().subscribe(
      (data: any) => {
        console.log('Datos del usuario:', data); 
        if (data && data.id) {
          this.userId = data.id;
          this.getUserGuides();
          this.getUserTricks();
        } else {
          console.error('No se pudo obtener el ID del usuario.');
        }
      },
      (error) => {
        console.log('Error al obtener los datos del usuario', error);
        alert('Error al obtener los datos del usuario');
      }
    );
  }
  

  getUserGuides(): void {
    this.guiaService.getAllGuidesByID(this.userId).subscribe(
      (data: GuiaModel[]) => {
        this.guias = data;
      },
      (error) => {
        console.log('Error al obtener las guías del usuario', error);
      }
    );
  }

  getUserTricks(): void {
    this.trucosService.getAllTricksByID(this.userId).subscribe(
      (data: TrucoModel[]) => {
        this.trucos = data;
      },
      (error) => {
        console.log('Error al obtener los trucos del usuario', error);
      }
    );
  }
}
