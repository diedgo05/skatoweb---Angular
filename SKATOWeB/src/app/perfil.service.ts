import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Perfil } from './perfil';
@Injectable({
  providedIn: 'root'
})
export class PerfilService {

  private apiUrl = 'http://localhost:3000/users'; // Asegúrate de que este URL sea el correcto

  constructor(private http: HttpClient) {}

  // Método para registrar un usuario
  register(userData: Perfil): Observable<Perfil> {
    return this.http.post<Perfil>(`${this.apiUrl}/add`, userData);
  }

  // Método para hacer login
  login(loginData: Perfil): Observable<Perfil> {
    return this.http.post<Perfil>(`${this.apiUrl}/login`, loginData);
  }

  // Método para obtener el token almacenado
  getToken(): string | null {
    return localStorage.getItem('authToken');
  }

  // Método para verificar si el usuario está autenticado
  isAuthenticated(): boolean {
    return !!localStorage.getItem('authToken');
    }

  getUserDetails(): Observable<Perfil> {
    const token = localStorage.getItem('authToken');
    if (token) {
      const headers = new HttpHeaders({
        'Authorization': `Bearer ${token}`
      });
      return this.http.get<Perfil>(`${this.apiUrl}/me`, { headers });
    } else {
      throw new Error('Token no disponible');
    }
  }
}

