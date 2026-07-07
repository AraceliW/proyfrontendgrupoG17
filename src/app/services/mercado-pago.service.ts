import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class MercadoPagoService {

  private apiUrl = 'http://localhost:3000/api/mercadopago';

  constructor(
    private http: HttpClient,
    private authService: AuthService
  ) {}

  crearPreferencia(compraId: number): Observable<any> {
    const token = this.authService.obtenerToken();

    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    });

    return this.http.post(`${this.apiUrl}/crear-preferencia/${compraId}`, {}, { headers });
  }
}