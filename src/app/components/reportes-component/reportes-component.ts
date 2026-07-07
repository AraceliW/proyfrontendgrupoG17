import { Component, OnInit, ChangeDetectorRef, NgZone } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ReporteService } from '../../services/reporte.service';

import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-reportes-component',
  imports: [CommonModule, FormsModule],
  templateUrl: './reportes-component.html',
  styleUrl: './reportes-component.css',
})
export class ReportesComponent implements OnInit {

  ventas: any[] = [];
  ventasFiltradas: any[] = [];

  textoBusqueda = '';
  estadoFiltro = 'todos';

  constructor(
    private reporteService: ReporteService,
    private cdr: ChangeDetectorRef,
    private ngZone: NgZone
  ) {}

  ngOnInit(): void {
    this.cargarVentas();
  }

  cargarVentas(): void {
    this.reporteService.obtenerVentas().subscribe({
      next: (data) => {
        this.ngZone.run(() => {
          this.ventas = data.ventas || [];
          this.aplicarFiltros();
          this.cdr.detectChanges();
        });
      },
      error: (error) => console.error('Error al cargar reportes', error)
    });
  }

  aplicarFiltros(): void {
    const texto = this.textoBusqueda.toLowerCase();

    this.ventasFiltradas = this.ventas.filter((compra) => {
      const cliente = `${compra.usuario?.nombre || ''} ${compra.usuario?.apellido || ''}`.toLowerCase();
      const codigo = compra.codigoCompra?.toLowerCase() || '';
      const evento = compra.detalles?.[0]?.tipoEntrada?.evento?.nombre?.toLowerCase() || '';

      const coincideTexto =
        cliente.includes(texto) ||
        codigo.includes(texto) ||
        evento.includes(texto);

      const coincideEstado =
        this.estadoFiltro === 'todos' || compra.estado === this.estadoFiltro;

      return coincideTexto && coincideEstado;
    });

    this.cdr.detectChanges();
  }

  exportarPDF(): void {
    const doc = new jsPDF();

    doc.setFontSize(16);
    doc.text('Reporte de Entradas Vendidas', 14, 15);

    doc.setFontSize(10);
    doc.text(`Total de registros: ${this.ventasFiltradas.length}`, 14, 23);

    const filas = this.ventasFiltradas.map(compra => [
      compra.codigoCompra,
      `${compra.usuario?.nombre || ''} ${compra.usuario?.apellido || ''}`,
      compra.detalles?.[0]?.tipoEntrada?.evento?.nombre || '',
      compra.detalles?.[0]?.tipoEntrada?.nombre || '',
      `$${Number(compra.total).toLocaleString()}`,
      new Date(compra.fechaConfirmacion).toLocaleDateString(),
      compra.estado
    ]);

    autoTable(doc, {
      startY: 30,
      head: [['Código', 'Comprador', 'Evento', 'Categoría', 'Precio', 'Fecha', 'Estado']],
      body: filas
    });

    doc.save('reporte-ventas.pdf');
  }

  exportarExcel(): void {
    const datos = this.ventasFiltradas.map(compra => ({
      Código: compra.codigoCompra,
      Comprador: `${compra.usuario?.nombre || ''} ${compra.usuario?.apellido || ''}`,
      Evento: compra.detalles?.[0]?.tipoEntrada?.evento?.nombre || '',
      Categoría: compra.detalles?.[0]?.tipoEntrada?.nombre || '',
      Precio: Number(compra.total),
      Fecha: new Date(compra.fechaConfirmacion).toLocaleDateString(),
      Estado: compra.estado
    }));

    const hoja = XLSX.utils.json_to_sheet(datos);
    const libro = XLSX.utils.book_new();

    XLSX.utils.book_append_sheet(libro, hoja, 'Ventas');
    XLSX.writeFile(libro, 'reporte-ventas.xlsx');
  }
}