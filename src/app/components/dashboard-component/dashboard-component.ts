import { Component } from '@angular/core';
import { Chart, registerables } from 'chart.js';
Chart.register(...registerables);

@Component({
  selector: 'app-dashboard-component',
  imports: [],
  templateUrl: './dashboard-component.html',
  styleUrl: './dashboard-component.css',

})
export class DashboardComponent {
  ngAfterViewInit(): void {
    this.renderBarChart();
    this.renderDonutChart();
  }

  renderBarChart() {
    const barCtx = document.getElementById('barChart') as HTMLCanvasElement;
    if (barCtx) {
      new Chart(barCtx, {
        type: 'bar',
        data: {
          labels: ['ARG-BRA', 'FRA-ESP', 'ALE-POR', 'ING-JPN', 'URU-MEX', 'MAR-SEN'],
          datasets: [{
            label: 'Entradas',
            data: [4200, 3800, 3500, 3100, 2900, 2600],
            backgroundColor: '#388e3c',
            borderRadius: 2,
            barPercentage: 0.7
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: { legend: { display: false } },
          scales: {
            y: {
              beginAtZero: true,
              max: 6000,
              ticks: { stepSize: 1500, color: '#94a3b8' },
              grid: { color: '#f1f5f9' },
              border: { display: false }
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
      new Chart(donutCtx, {
        type: 'doughnut',
        data: {
          labels: ['General', 'Platino', 'VIP', 'Palco'],
          datasets: [{
            data: [45, 25, 20, 10],
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
