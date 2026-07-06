import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { EventoModel } from '../models/evento.model';

@Injectable({
  providedIn: 'root'
})
export class HomeService {

  private apiUrl = 'http://localhost:3000/api/home';

  constructor(private http: HttpClient) {}

    listarEventos(): Observable<any> {
        return this.http.get<any>(`${this.apiUrl}/eventos`);
    }

    obtenerDetalleEvento(id: number): Observable<any> {
        return this.http.get<any>(`${this.apiUrl}/eventos/${id}`);
    }
}
