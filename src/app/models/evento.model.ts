export interface TipoEntrada {
  id?: number;
  nombre: string;
  descripcion?: string;
  precio: number;
  stock: number;
}

export interface EventoModel {
  id?: number;
  nombre: string;
  descripcion: string;
  categoriaDeporte: string;
  fecha: string;
  hora: string;
  estadio: string;
  ciudad: string;
  direccion: string;
  precioDesde?: number;
  youtubeVideoId?: string;
  estado?: string;
  imagenBanner?: string;
  tiposEntrada?: TipoEntrada[];
}