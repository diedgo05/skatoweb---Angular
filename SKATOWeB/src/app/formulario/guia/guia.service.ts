import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { GuiaModel } from './guia-model';

@Injectable({
  providedIn: 'root'
})
export class GuiaService {

  private _baseURL = 'http://localhost:3000/guides';

  constructor(private _http: HttpClient) { }

  private getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('authToken');
    console.log('Token enviado de guia:', token); 
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`,
    });
  }

  getAllGuides(): Observable<GuiaModel[]> {
    
    return this._http.get<GuiaModel[]>(`${this._baseURL}/`, { headers: this.getAuthHeaders() });
  }

  getAllGuidesByID(userId: number): Observable<GuiaModel[]> {
    return this._http.get<GuiaModel[]>(`${this._baseURL}/${userId}`, {
      headers: this.getAuthHeaders()
    });
  }

  createGuide(guide: GuiaModel): Observable<GuiaModel> {
    console.log(guide)
    return this._http.post<GuiaModel>(`${this._baseURL}/add`, guide, { headers: this.getAuthHeaders() });
  }

  updateGuide(guide: GuiaModel): Observable<GuiaModel> {
    
    return this._http.put<GuiaModel>(`${this._baseURL}/up/${guide.id}`, guide, { headers: this.getAuthHeaders() });
  }

  deleteGuide(id: number): Observable<void> {
    
    return this._http.delete<void>(`${this._baseURL}/delete/${id}`, { headers: this.getAuthHeaders() });
  }
}
