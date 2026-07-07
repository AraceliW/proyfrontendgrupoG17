import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';
import { CompraService } from '../../services/compra.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ReclamoService } from '../../services/reclamo.service';


@Component({
  selector: 'app-perfil-component',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './perfil-component.html',
  styleUrl: './perfil-component.css',
})
export class PerfilComponent implements OnInit {
  usuario: any = null;
  compras: any[] = [];
  reclamos: any[] = [];
  formReclamo!: FormGroup;
  pestanaActiva: 'datos' | 'entradas' | 'compras' | 'reclamos' = 'datos';
  editandoPerfil = false;
  formPerfil!: FormGroup;


  constructor(
    private authService: AuthService,
    private compraService: CompraService,
    private fb: FormBuilder,
    private reclamoService: ReclamoService,
    private router: Router
  ) {
    this.formReclamo = this.fb.group({
      asunto: ['', Validators.required],
      descripcion: ['', Validators.required]
    });
    this.formPerfil = this.fb.group({
      nombre: ['', Validators.required],
      apellido: ['', Validators.required],
      dni: [''],
      telefono: ['']
    });
  }

  ngOnInit(): void {
    this.usuario = this.authService.obtenerUsuario();
    this.cargarReclamos();
    this.compraService.obtenerMisCompras().subscribe({
      next: (data) => {
        this.compras = data.compras || [];
      },
      error: (error) => {
        console.error('Error al obtener compras', error);
      }
    });
  }

  

  cambiarPestana(
    pestana: 'datos' | 'entradas' | 'compras' | 'reclamos'
  ) {
    this.pestanaActiva = pestana;
  }
  totalInvertido(): number {
    return this.compras
      .filter(c => c.estado === 'confirmada')
      .reduce((total, c) => total + Number(c.total), 0);
  }

  entradasCompradas(): number {
    return this.compras
      .filter(c => c.estado === 'confirmada')
      .reduce((total, c) => {
        const cantidad = c.detalles?.reduce((suma: number, d: any) => suma + d.cantidad, 0) || 0;
        return total + cantidad;
      }, 0);
  }

  cerrarSesion(): void {
    this.authService.cerrarSesion();
    this.router.navigate(['/']);
  }
  cargarReclamos(): void {
    this.reclamoService.misReclamos().subscribe({
      next: (data) => {
        this.reclamos = data.reclamos || [];
      },
      error: (error) => console.error('Error al obtener reclamos', error)
    });
  }

  crearReclamo(): void {
    if (this.formReclamo.invalid) {
      this.formReclamo.markAllAsTouched();
      return;
    }

    this.reclamoService.crearReclamo(this.formReclamo.value).subscribe({
      next: () => {
        this.formReclamo.reset();
        this.cargarReclamos();
      },
      error: (error) => console.error('Error al crear reclamo', error)
    });
  }

  abrirEditarPerfil(): void {
  this.editandoPerfil = true;

  this.formPerfil.patchValue({
    nombre: this.usuario?.nombre,
    apellido: this.usuario?.apellido,
    dni: this.usuario?.dni,
    telefono: this.usuario?.telefono
  });
}

cancelarEditarPerfil(): void {
  this.editandoPerfil = false;
}

guardarPerfil(): void {
  if (this.formPerfil.invalid) {
    this.formPerfil.markAllAsTouched();
    return;
  }

  this.authService.actualizarPerfil(this.formPerfil.value).subscribe({
    next: (res) => {
      this.usuario = res.usuario;

      const token = this.authService.obtenerToken();
      if (token) {
        this.authService.guardarSesion(token, res.usuario);
      }

      this.editandoPerfil = false;
    },
    error: (error) => console.error('Error al actualizar perfil', error)
  });
}
}