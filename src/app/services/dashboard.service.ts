import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  private apiUrl = 'http://localhost:3000/api/dashboard';

  constructor(private http: HttpClient) {}

  private getHeaders() {

    const token = localStorage.getItem('token');

    console.log('TOKEN DASHBOARD:', token);

    return {
        headers: new HttpHeaders({
        Authorization: `Bearer ${token}`
        })
    };
   }

  obtenerDashboard(mes?: number, anio?: number) {
    let url = this.apiUrl;

    if (mes && anio) {
        url += `?mes=${mes}&anio=${anio}`;
    }

    return this.http.get(url, this.getHeaders());
  }

}