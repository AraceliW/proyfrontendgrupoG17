export interface UsuarioModel {
  id: number;
  nombre: string;
  apellido: string;
  email: string;
  rol: 'cliente' | 'admin';
}
