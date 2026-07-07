import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CompraService } from '../../services/compra.service';
import { MercadoPagoService } from '../../services/mercado-pago.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-resumen-compra.component',
  imports: [CommonModule],
  templateUrl: './resumen-compra-component.html',
  styleUrl: './resumen-compra-component.css',
})
export class ResumenCompraComponent implements OnInit {
  compra: any = null;
  tiempoRestante = '';

  constructor(
    private route: ActivatedRoute,
    private compraService: CompraService,
    private mercadoPagoService: MercadoPagoService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    const compraId = Number(this.route.snapshot.paramMap.get('id'));

    this.compraService.obtenerMisCompras().subscribe({
      next: (data) => {
        this.compra = data.compras.find((c: any) => c.id === compraId);
        this.iniciarContador();
        this.cdr.detectChanges();
      },
      error: () => {
        alert('Error al obtener la compra');
      }
    });
  }

  iniciarContador(): void {
  setInterval(() => {
    if (!this.compra?.fechaVencimiento) return;

    const ahora = new Date().getTime();
    const vencimiento = new Date(this.compra.fechaVencimiento).getTime();
    const diferencia = vencimiento - ahora;

    if (diferencia <= 0) {
      this.tiempoRestante = 'Reserva expirada';
      this.cdr.detectChanges();
      return;
    }

    const minutos = Math.floor(diferencia / 60000);
    const segundos = Math.floor((diferencia % 60000) / 1000);

    this.tiempoRestante =
      `${minutos.toString().padStart(2, '0')}:${segundos.toString().padStart(2, '0')}`;

    this.cdr.detectChanges();
  }, 1000);
}

  confirmarPago(): void {
    this.mercadoPagoService.crearPreferencia(this.compra.id).subscribe({
      next: (preferencia) => {
        window.location.href = preferencia.sandboxInitPoint || preferencia.initPoint;
      },
      error: () => {
        alert('Error al iniciar pago');
      }
    });
  }
}
