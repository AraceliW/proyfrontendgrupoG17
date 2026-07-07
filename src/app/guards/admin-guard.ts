import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

export const adminGuard: CanActivateFn = () => {

  const authService = inject(AuthService);
  const router = inject(Router);

  // Debe estar logueado
  if (!authService.estaLogueado()) {
    router.navigate(['/login']);
    return false;
  }

  // Debe ser administrador
  if (!authService.esAdmin()) {
    router.navigate(['/']);
    return false;
  }

  return true;
};