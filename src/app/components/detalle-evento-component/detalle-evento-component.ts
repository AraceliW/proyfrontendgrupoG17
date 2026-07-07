import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { HomeService } from '../../services/home.service';
import { CompraService } from '../../services/compra.service';
import { MercadoPagoService } from '../../services/mercado-pago.service';
import { ChangeDetectorRef } from '@angular/core';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-detalle-evento.component',
  imports: [CommonModule, FormsModule],
  templateUrl: './detalle-evento-component.html',
  styleUrl: './detalle-evento-component.css',
})
export class DetalleEventoComponent implements OnInit {
    evento: any = null;
    videoUrl: SafeResourceUrl | null = null;
    entradaSeleccionadaId: number | null = null;
    cantidad: number = 1;
    mapaUrl: SafeResourceUrl | null = null;
    

  constructor(
    private route: ActivatedRoute,
    private homeService: HomeService,
    private sanitizer: DomSanitizer,
    private compraService: CompraService,
    private mercadoPagoService: MercadoPagoService,
    private router: Router,
    private authService: AuthService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));

    this.homeService.obtenerDetalleEvento(id).subscribe({
      next: (data) => {
        this.evento = data;
        this.cdr.detectChanges();
        if (data.youtubeVideoId) {
          this.videoUrl = this.sanitizer.bypassSecurityTrustResourceUrl(
            `https://www.youtube.com/embed/${data.youtubeVideoId}`
          );
        }
        const direccionCompleta =
          `${data.direccion}, ${data.ciudad}, Argentina`;

          this.mapaUrl =
          this.sanitizer.bypassSecurityTrustResourceUrl(
          `https://www.google.com/maps/embed/v1/place?key=AIzaSyBiE1nXqbDu00zxd5ZHeJM78d6cGgnMM7E&q=${encodeURIComponent(direccionCompleta)}`
          );
        this.cdr.detectChanges();
        console.log('Detalle evento:', data);
      },
      error: (error) => {
        console.error('Error al obtener detalle', error);
      }
    });
  }
  obtenerEquipo1(nombre: string): string {
    return nombre.split(' vs ')[0] || nombre;
  }

  obtenerEquipo2(nombre: string): string {
    return nombre.split(' vs ')[1] || '';
  }
  seleccionarEntrada(id: number): void {
    this.entradaSeleccionadaId = id;
  }

  aumentarCantidad(): void {
  this.cantidad++;
  }

  disminuirCantidad(): void {
    if (this.cantidad > 1) {
      this.cantidad--;
    }
  }

  comprarEntradas(): void {

    if (!this.authService.estaLogueado()) {
      alert('Debés iniciar sesión para comprar entradas');
      this.router.navigate(['/login']);
      return;
    }
    if (!this.entradaSeleccionadaId) {
      alert('Seleccioná un tipo de entrada');
      return;
    }
    

    this.compraService.reservarCompra(this.entradaSeleccionadaId, this.cantidad)
      .subscribe({
        next: (reserva) => {
          this.router.navigate(['/resumen-compra', reserva.compra.id]);
        },
        error: (error) => {
          alert(error.error?.mensaje || 'Error al reservar compra');
        }
      });
  }
}
