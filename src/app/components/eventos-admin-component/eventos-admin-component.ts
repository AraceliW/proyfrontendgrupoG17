import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';

import { EventoAdminService } from '../../services/evento-admin.service';
import { EventoModel } from '../../models/evento.model';


@Component({
  selector: 'app-eventos-admin-component',
  imports: [
    CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './eventos-admin-component.html',
  styleUrl: './eventos-admin-component.css',
})
export class EventosAdminComponent implements OnInit {

  eventos: EventoModel[] = [];
  eventosFiltrados: EventoModel[] = [];

  formulario!: FormGroup;

  editando = false;
  eventoSeleccionado!: EventoModel | null;

  imagenBanner: File | null = null;

  textoBusqueda = '';

  cargando = false;

  constructor(
    private fb: FormBuilder,
    private eventoService: EventoAdminService
  ) {}

  ngOnInit(): void {
    this.crearFormulario();
    this.cargarEventos();
  }
  crearFormulario() {
    this.formulario = this.fb.group({
      nombre: ['', Validators.required],
      descripcion: ['', Validators.required],
      categoriaDeporte: ['', Validators.required],
      fecha: ['', Validators.required],
      hora: ['', Validators.required],
      estadio: ['', Validators.required],
      ciudad: ['', Validators.required],
      direccion: ['', Validators.required],
      youtubeVideoId: [''],

      generalPrecio: [0, Validators.required],
      generalStock: [0, Validators.required],

      popularPrecio: [0, Validators.required],
      popularStock: [0, Validators.required],

      plateaPrecio: [0, Validators.required],
      plateaStock: [0, Validators.required],

      vipPrecio: [0, Validators.required],
      vipStock: [0, Validators.required],

      palcoPrecio: [0, Validators.required],
      palcoStock: [0, Validators.required]
    });
  }
  cargarEventos() {
    this.cargando = true;
    this.eventoService.obtenerEventos().subscribe({
      next: (eventos) => {
        this.eventos = eventos;
        this.eventosFiltrados = eventos;
        this.cargando = false;
      },
      error: (err) => {
        console.error(err);
        this.cargando = false;
      }
    });
  }

  seleccionarBanner(event: any) {
    if (event.target.files.length > 0) {
      this.imagenBanner = event.target.files[0];
    }
  }
  guardarEvento() {
    if (this.formulario.invalid) {
      this.formulario.markAllAsTouched();
      return;
    }
    const formData = new FormData();
    Object.keys(this.formulario.value).forEach(campo => {
      formData.append(campo, this.formulario.value[campo]);
    });
    if (this.imagenBanner) {
      formData.append('imagenBanner', this.imagenBanner);
    }
    if (!this.editando) {
      this.eventoService.crearEvento(formData).subscribe({
        next: () => {
          alert('Evento creado correctamente');
          this.limpiarFormulario();
          this.cargarEventos();
        },
        error: err => console.error(err)
      });
    } else {
      this.eventoService.actualizarEvento(
        this.eventoSeleccionado!.id!,
        formData
      ).subscribe({
        next: () => {
          alert('Evento actualizado');
          this.cancelarEdicion();
          this.cargarEventos();
        },
        error: err => console.error(err)
      });
    }
  }
  editarEvento(evento: EventoModel) {
    this.editando = true;
    this.eventoSeleccionado = evento;
    this.formulario.patchValue({
      nombre: evento.nombre,
      descripcion: evento.descripcion,
      categoriaDeporte: evento.categoriaDeporte,
      fecha: evento.fecha,
      hora: evento.hora,
      estadio: evento.estadio,
      ciudad: evento.ciudad,
      direccion: evento.direccion,
      youtubeVideoId: evento.youtubeVideoId
    });
    if (evento.tiposEntrada) {
      evento.tiposEntrada.forEach(tipo => {
        switch (tipo.nombre) {
          case 'General':
            this.formulario.patchValue({
              generalPrecio: tipo.precio,
              generalStock: tipo.stock
            });
            break;
          case 'Popular':
            this.formulario.patchValue({
              popularPrecio: tipo.precio,
              popularStock: tipo.stock
            });
            break;
          case 'Platea':
            this.formulario.patchValue({
              plateaPrecio: tipo.precio,
              plateaStock: tipo.stock
            });
            break;
          case 'VIP':
            this.formulario.patchValue({
              vipPrecio: tipo.precio,
              vipStock: tipo.stock
            });
            break;
          case 'Palco':
            this.formulario.patchValue({
              palcoPrecio: tipo.precio,
              palcoStock: tipo.stock
            });
            break;
        }
      });
    }
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }

  cancelarEdicion() {
    this.editando = false;
    this.eventoSeleccionado = null;
    this.limpiarFormulario();
  }

  eliminarEvento(id: number) {

    if (!confirm('¿Eliminar este evento?')) return;
    this.eventoService.eliminarEvento(id).subscribe({
      next: () => this.cargarEventos(),
      error: err => console.error(err)
    });
  }

  limpiarFormulario() {
    this.formulario.reset();
    this.imagenBanner = null;
    this.editando = false;
  }

  buscar() {
    const texto = this.textoBusqueda.toLowerCase();
    this.eventosFiltrados = this.eventos.filter(e =>
      e.nombre.toLowerCase().includes(texto)
    );
  }
}