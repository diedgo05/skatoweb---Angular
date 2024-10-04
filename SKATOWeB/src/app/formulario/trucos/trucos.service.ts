import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TrucoModel } from './truco-model';

@Injectable({
  providedIn: 'root'
})
export class TrucosService {

  private _baseURL = 'http://localhost:3000/tricks';

  constructor(private _http: HttpClient) { }

  getAllTricks(): Observable<TrucoModel[]> {
    return this._http.get<TrucoModel[]>(`${this._baseURL}/`);
  } 

  getAllTricksByID(id: number): Observable<TrucoModel> {
    return this._http.get<TrucoModel>(`${this._baseURL}/${id}`);
  } 

  createTrick(trick: TrucoModel): Observable<TrucoModel> {
    console.log(trick)
    return this._http.post<TrucoModel>(`${this._baseURL}/add`, trick);
  }

  updateTrick(trick: TrucoModel): Observable<TrucoModel> {
    return this._http.put<TrucoModel>(`${this._baseURL}/up/${trick.id}`, trick);
  }

  deleteTrick(id: number): Observable<void> {
    return this._http.delete<void>(`${this._baseURL}/delete/${id}`);
  }
}
