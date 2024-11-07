import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home-p',
  templateUrl: './home-p.component.html',
  styleUrls: ['./home-p.component.css']
})
export class HomePComponent implements OnInit {
  
  isTokenValid: boolean = false;

  constructor() {}

  ngOnInit(): void {
    const authToken = localStorage.getItem('authToken'); // Obtener el token desde localStorage
    if (authToken) {
      this.isTokenValid = true; // Si existe el token, lo consideramos válido
    }
  }
}
