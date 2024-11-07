import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TrucoModel } from './truco-model';

@Injectable({
  providedIn: 'root'
})
export class TrucosService {

  private _baseURL = 'http://localhost:3000/tricks';

  constructor(private _http: HttpClient) { }

  private getAuthHeaders() {
    const token = localStorage.getItem('authToken');
    console.log('Token enviado de trucos:', token); 
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
  }

  getAllTricks(): Observable<TrucoModel[]> {
    return this._http.get<TrucoModel[]>(`${this._baseURL}/`, { headers: this.getAuthHeaders() });
  } 

  getAllTricksByID(userId: number): Observable<TrucoModel[]> {
    return this._http.get<TrucoModel[]>(`${this._baseURL}/${userId}`, {
      headers: this.getAuthHeaders()
    });
  }

  createTrick(trick: TrucoModel): Observable<TrucoModel> {
    console.log(trick)
    return this._http.post<TrucoModel>(`${this._baseURL}/add`, trick, { headers: this.getAuthHeaders() });
  }

  updateTrick(trick: TrucoModel): Observable<TrucoModel> {
    return this._http.put<TrucoModel>(`${this._baseURL}/up/${trick.id}`, trick, { headers: this.getAuthHeaders() });
  }

  deleteTrick(id: number): Observable<void> {
    return this._http.delete<void>(`${this._baseURL}/delete/${id}`, { headers: this.getAuthHeaders() });
  }
}
