import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { UsuarioModel } from '../../../models/usuario.model';
import { AuthService } from '../../../services/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-header',
  imports: [CommonModule, RouterLink, RouterLinkActive],
  templateUrl: './header.html',
  styleUrl: './header.css',
})
export class Header {
  usuario: UsuarioModel | null = null;

  constructor(public authService: AuthService) {}

  ngOnInit() {
    this.usuario = this.authService.obtenerUsuario();
  }

  cerrarSesion() {
    this.authService.cerrarSesion();
    location.reload();
  }

}
