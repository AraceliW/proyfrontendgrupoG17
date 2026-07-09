import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class CompraService {

  private apiUrl = 'https://proybackendgrupog17.onrender.com/api/compras';

  constructor(
    private http: HttpClient,
    private authService: AuthService
  ) {}

  reservarCompra(tipoEntradaId: number, cantidad: number): Observable<any> {
    const token = this.authService.obtenerToken();

    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    });

    return this.http.post(`${this.apiUrl}/reservar`, {
      tipoEntradaId,
      cantidad
    }, { headers });
  }
  obtenerMisCompras(): Observable<any> {
    const token = this.authService.obtenerToken();

    const headers = new HttpHeaders({
        Authorization: `Bearer ${token}`
    });

    return this.http.get(`${this.apiUrl}/mis-compras`, { headers });
  }
}