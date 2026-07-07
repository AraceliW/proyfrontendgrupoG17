import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { UsuarioModel } from '../models/usuario.model';

interface LoginResponse {
  mensaje: string;
  token: string;
  usuario: UsuarioModel;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl = 'http://localhost:3000/api/auth';

  private usuarioSubject = new BehaviorSubject<UsuarioModel | null>(this.obtenerUsuario());
  usuarioActual$ = this.usuarioSubject.asObservable();

  constructor(private http: HttpClient) {}

  login(email: string, password: string): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${this.apiUrl}/login`, {
      email,
      password
    });
  }

  registrar(datos: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/registro`, datos);
  }

  guardarSesion(token: string, usuario: UsuarioModel): void {
    localStorage.setItem('token', token);
    localStorage.setItem('usuario', JSON.stringify(usuario));
    this.usuarioSubject.next(usuario);
  }

  obtenerUsuario(): UsuarioModel | null {
    const usuario = localStorage.getItem('usuario');
    return usuario ? JSON.parse(usuario) : null;
  }

  obtenerToken(): string | null {
    return localStorage.getItem('token');
  }

  estaLogueado(): boolean {
    return this.obtenerToken() !== null;
  }

  esAdmin(): boolean {
    return this.obtenerUsuario()?.rol === 'admin';
  }
  esCliente(): boolean {
    return this.obtenerUsuario()?.rol === 'cliente';
  }

  loginGoogle(credential: string): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${this.apiUrl}/google`, {
      credential
    });
  }
  actualizarPerfil(datos: any): Observable<any> {
    const token = this.obtenerToken();

    return this.http.put(`${this.apiUrl}/perfil`, datos, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
  }

  cerrarSesion(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('usuario');
    this.usuarioSubject.next(null);
  }
}
