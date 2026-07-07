import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { EventoModel } from '../models/evento.model';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class EventoAdminService {

  private api = 'http://localhost:3000/api/eventos';

  constructor(
    private http: HttpClient,
    private auth: AuthService
  ) {}

  obtenerEventos(): Observable<EventoModel[]> {

    return this.http.get<EventoModel[]>(this.api);

  }

  obtenerEvento(id:number){

    return this.http.get<EventoModel>(`${this.api}/${id}`);

  }

  crearEvento(formData:FormData){

    return this.http.post(this.api,formData,{
      headers:{
        Authorization:`Bearer ${this.auth.obtenerToken()}`
      }
    });

  }

  actualizarEvento(id:number,formData:FormData){

    return this.http.put(`${this.api}/${id}`,formData,{
      headers:{
        Authorization:`Bearer ${this.auth.obtenerToken()}`
      }
    });

  }

  eliminarEvento(id:number){

    return this.http.delete(`${this.api}/${id}`,{
      headers:{
        Authorization:`Bearer ${this.auth.obtenerToken()}`
      }
    });

  }

}