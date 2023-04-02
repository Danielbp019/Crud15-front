import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IArticulo } from '../articulos/articulos';

@Injectable({
  providedIn: 'root'
})
export class ArticulosService {

  private _url = 'http://localhost:8000/api/articulos';

  constructor(private http: HttpClient) { }

  list(): Observable<IArticulo[]> {
    return this.http.get<IArticulo[]>(this._url);
  }

  add(articulo: IArticulo): Observable<IArticulo> {
    return this.http.post<IArticulo>(this._url, articulo);
  }

  update(articulo: IArticulo): Observable<IArticulo> {
    return this.http.put<IArticulo>(`${this._url}/${articulo.id}`, articulo);
  }

  delete(articulo: IArticulo): Observable<boolean> {
    return this.http.delete<boolean>(`${this._url}/${articulo.id}`);
  }

}
