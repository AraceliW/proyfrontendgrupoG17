import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HomeService } from '../../services/home.service';
import { EventoModel } from '../../models/evento.model';
import { ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-home-component',
  imports: [CommonModule, RouterLink],
  templateUrl: './home-component.html',
  styleUrl: './home-component.css',
})
export class HomeComponent implements OnInit {

  eventos: EventoModel[] = [];

  constructor(private homeService: HomeService, private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.homeService.listarEventos().subscribe({
      next: (data) => {
        console.log('Eventos recibidos:', data);
        this.eventos = data.eventos;
        this.cdr.detectChanges();
      },
      error: (error) => {
        console.error('Error al cargar eventos', error);
      }
    });
  }

  obtenerEquipo1(nombre: string): string {
    return nombre.split(' vs ')[0] || nombre;
  }

  obtenerEquipo2(nombre: string): string {
    return nombre.split(' vs ')[1] || '';
  }

  obtenerTipoEntrada(evento: EventoModel): string {
    return evento.tiposEntrada?.[0]?.nombre || 'Entrada';
  }
}
