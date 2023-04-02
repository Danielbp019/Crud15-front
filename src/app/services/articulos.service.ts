import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IArticulos } from '../articulos/articulos';

@Injectable({
  providedIn: 'root'
})
export class ArticulosService {

  private _url = 'http://localhost:8000/api/articulos';

  constructor(private http: HttpClient) { }

  list(): Observable<IArticulos[]> {
    return this.http.get<IArticulos[]>(this._url);
  }

  add(articulos: IArticulos): Observable<IArticulos> {
    return this.http.post<IArticulos>(this._url, articulos);
  }

  update(articulos: IArticulos): Observable<IArticulos> {
    return this.http.put<IArticulos>(`${this._url}/${articulos.id}`, articulos);
  }

  delete(articulos: IArticulos): Observable<boolean> {
    return this.http.delete<boolean>(`${this._url}/${articulos.id}`);
  }

}
