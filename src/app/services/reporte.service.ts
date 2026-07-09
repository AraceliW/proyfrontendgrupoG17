import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ReporteService {
  private apiUrl = 'https://proybackendgrupog17.onrender.com/api/reportes';

  constructor(private http: HttpClient) {}

  private getHeaders() {
    const token = localStorage.getItem('token');

    return {
      headers: new HttpHeaders({
        Authorization: `Bearer ${token}`
      })
    };
  }

  obtenerVentas() {
    return this.http.get<any>(`${this.apiUrl}/ventas`, this.getHeaders());
  }
}