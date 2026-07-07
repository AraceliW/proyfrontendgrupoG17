import { Component, OnInit } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { UsuarioModel } from '../../../models/usuario.model';
import { AuthService } from '../../../services/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-header',
  imports: [CommonModule, RouterLinkActive, RouterLink],
  templateUrl: './header.html',
  styleUrl: './header.css',
})
export class Header implements OnInit {
  usuario: UsuarioModel | null = null;

  constructor(
    public authService: AuthService,
    private router: Router
  ) {}

  ngOnInit() {
    this.authService.usuarioActual$.subscribe(usuario => {
      this.usuario = usuario;
    });
  }

  cerrarSesion() {
    this.authService.cerrarSesion();
    this.usuario = null;
    this.router.navigate(['/']);
  }
}