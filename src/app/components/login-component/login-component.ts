import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { Router, RouterLink, ActivatedRoute } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login-component',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './login-component.html',
  styleUrl: './login-component.css',
})
export class LoginComponent implements OnInit {

  modo: 'login' | 'registro' = 'login';
  errorMensaje = '';

  formLogin;
  formRegistro;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.formLogin = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });

    this.formRegistro = this.fb.group({
      nombre: ['', Validators.required],
      apellido: ['', Validators.required],
      dni: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      telefono: [''],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmarPassword: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    if (this.router.url.includes('registro')) {
      this.modo = 'registro';
    }
  }

  cambiarModo(modo: 'login' | 'registro') {
    this.modo = modo;
    this.errorMensaje = '';
  }

  login() {
    if (this.formLogin.invalid) {
      this.formLogin.markAllAsTouched();
      return;
    }

    const { email, password } = this.formLogin.value;

    this.authService.login(email!, password!).subscribe({
      next: (res) => {
        this.authService.guardarSesion(res.token, res.usuario);
        this.router.navigate(['/']);
      },
      error: (error) => {
        this.errorMensaje = error.error?.mensaje || 'Error al iniciar sesión';
      }
    });
  }

  registrar() {
    console.log('Click en registrar');
    console.log(this.formRegistro.value);
    console.log('Formulario válido:', this.formRegistro.valid);

    if (this.formRegistro.invalid) {
      this.formRegistro.markAllAsTouched();
      this.errorMensaje = 'Completá todos los campos obligatorios correctamente';
      return;
    }

    const datos = this.formRegistro.value;

    if (datos.password !== datos.confirmarPassword) {
      this.errorMensaje = 'Las contraseñas no coinciden';
      return;
    }

    const body = {
      nombre: datos.nombre,
      apellido: datos.apellido,
      dni: datos.dni,
      email: datos.email,
      telefono: datos.telefono,
      password: datos.password
    };

    this.authService.registrar(body).subscribe({
      next: (res) => {
        this.authService.guardarSesion(res.token, res.usuario);
        this.router.navigate(['/']);
      },
      error: (error) => {
        this.errorMensaje = error.error?.mensaje || 'Error al registrar usuario';
      }
    });
  }
}