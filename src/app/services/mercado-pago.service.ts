import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class MercadoPagoService {

  private apiUrl = 'https://proybackendgrupog17.onrender.com/api/mercadopago';

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