import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AdminEventoService {

  private apiUrl = 'https://proybackendgrupog17.onrender.com/api/eventos';

  constructor(
    private http: HttpClient,
    private authService: AuthService
  ) {}

  private getHeaders(): HttpHeaders {
    return new HttpHeaders({
      Authorization: `Bearer ${this.authService.obtenerToken()}`
    });
  }

  obtenerEventos(): Observable<any> {
    return this.http.get(this.apiUrl);
  }

  obtenerEvento(id:number): Observable<any>{
    return this.http.get(`${this.apiUrl}/${id}`);
  }

  crearEvento(formData:FormData):Observable<any>{
    return this.http.post(
      this.apiUrl,
      formData,
      {
        headers:this.getHeaders()
      }
    );
  }

  actualizarEvento(id:number,formData:FormData):Observable<any>{

    return this.http.put(
      `${this.apiUrl}/${id}`,
      formData,
      {
        headers:this.getHeaders()
      }
    );

  }

  eliminarEvento(id:number):Observable<any>{

    return this.http.delete(
      `${this.apiUrl}/${id}`,
      {
        headers:this.getHeaders()
      }
    );

  }

}