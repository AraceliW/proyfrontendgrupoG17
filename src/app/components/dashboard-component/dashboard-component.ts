import { ChangeDetectorRef, Component } from '@angular/core';
import { Chart, registerables } from 'chart.js';
import { DashboardService } from '../../services/dashboard.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
Chart.register(...registerables);



@Component({
  selector: 'app-dashboard-component',
  imports: [CommonModule, FormsModule],
  templateUrl: './dashboard-component.html',
  styleUrl: './dashboard-component.css',

})
export class DashboardComponent {

  dashboard:any;
  barChart!: Chart;
  donutChart!: Chart;
  mesSeleccionado = new Date().getMonth() + 1;
  anioSeleccionado = new Date().getFullYear();

  meses = [
    { valor: 1, nombre: 'Enero' },
    { valor: 2, nombre: 'Febrero' },
    { valor: 3, nombre: 'Marzo' },
    { valor: 4, nombre: 'Abril' },
    { valor: 5, nombre: 'Mayo' },
    { valor: 6, nombre: 'Junio' },
    { valor: 7, nombre: 'Julio' },
    { valor: 8, nombre: 'Agosto' },
    { valor: 9, nombre: 'Septiembre' },
    { valor: 10, nombre: 'Octubre' },
    { valor: 11, nombre: 'Noviembre' },
    { valor: 12, nombre: 'Diciembre' }
  ];

  constructor(
    private dashboardService: DashboardService,
    private cdr: ChangeDetectorRef
  ){}
  ngOnInit() {
    this.cargarDashboard();
  }

  cargarDashboard() {
    this.dashboardService.obtenerDashboard(
      this.mesSeleccionado,
      this.anioSeleccionado
    ).subscribe({
      next: (resp) => {
        this.dashboard = resp;
        this.cdr.detectChanges();

        setTimeout(() => {
          this.renderBarChart();
          this.renderDonutChart();
        }, 0);
      },
      error: err => console.error(err)
    });
  }
  obtenerColor(categoria: string): string {
    switch (categoria) {
      case 'General': return '#2e7d32';
      case 'Popular': return '#1d4ed8';
      case 'VIP': return '#ea580c';
      case 'Platino': return '#2563eb';
      case 'Palco': return '#9333ea';
      default: return '#94a3b8';
    }
  }

  renderBarChart() {
    const barCtx = document.getElementById('barChart') as HTMLCanvasElement;
    if (barCtx) {
      if (this.barChart) {
        this.barChart.destroy();
      }
      this.barChart = new Chart(barCtx, {
        type: 'bar',
        data:{
            labels:this.dashboard.graficos.ventasPorEvento.map(
                (x:any)=>x.evento
            ),
            datasets:[{
                label:'Entradas',
                data:this.dashboard.graficos.ventasPorEvento.map(
                    (x:any)=>x.entradasVendidas
                ),
                backgroundColor:'#388e3c',
                borderRadius:4
            }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: { legend: { display: false } },
          scales: {
            y: {
              beginAtZero: true,
              ticks: {
                color: '#94a3b8'
              },
              grid: {
                color: '#f1f5f9'
              },
              border: {
                display: false
              }
            },
            x: {
              ticks: { color: '#64748b', font: { size: 11 } },
              grid: { display: false },
              border: { display: true }
            }
          }
        }
      });
    }
  }

  renderDonutChart() {
    const donutCtx = document.getElementById('donutChart') as HTMLCanvasElement;
    if (donutCtx) {
      if (this.donutChart) {
        this.donutChart.destroy();
      }
      this.donutChart = new Chart(donutCtx, {
        type: 'doughnut',
        data: {
          labels:this.dashboard.graficos.ventasPorCategoria.map(
              (x:any)=>x.categoria
          ),
          datasets: [{
            data:this.dashboard.graficos.ventasPorCategoria.map(
                (x:any)=>x.porcentaje
            ),
            backgroundColor: ['#2e7d32', '#1d4ed8', '#ea580c', '#7e22ce'],
            borderWidth: 4,
            hoverOffset: 4
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          cutout: '65%',
          plugins: { legend: { display: false } }
        }
      });
    }
  }
  
}
