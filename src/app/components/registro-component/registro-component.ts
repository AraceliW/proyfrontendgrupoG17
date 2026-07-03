import { Component } from '@angular/core';

@Component({
  selector: 'app-registro-component',
  imports: [],
  templateUrl: './registro-component.html',
  styleUrl: './registro-component.css',
})
export class RegistroComponent {
  tabActivo: 'login' | 'register' = 'login';
  switchTab(tab: 'login' | 'register') {
    this.tabActivo = tab;
  }
}
