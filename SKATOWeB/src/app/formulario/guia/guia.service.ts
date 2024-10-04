import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { GuiaModel } from './guia-model';

@Injectable({
  providedIn: 'root'
})
export class GuiaService {

  private _baseURL = 'http://localhost:3000/guides';

  constructor(private _http: HttpClient) { }

  getAllGuides(): Observable<GuiaModel[]> {
    return this._http.get<GuiaModel[]>(`${this._baseURL}/`);
  }

  getAllGuidesByID(id: number): Observable<GuiaModel> {
    return this._http.get<GuiaModel>(`${this._baseURL}/${id}`);
  } 

  createGuide(guide: GuiaModel): Observable<GuiaModel> {
    console.log(guide)
    return this._http.post<GuiaModel>(`${this._baseURL}/add`, guide);
  }

  updateGuide(guide: GuiaModel): Observable<GuiaModel> {
    return this._http.put<GuiaModel>(`${this._baseURL}/up/${guide.id}`, guide);
  }

  deleteGuide(id: number): Observable<void> {
    return this._http.delete<void>(`${this._baseURL}/delete/${id}`);
  }
}
