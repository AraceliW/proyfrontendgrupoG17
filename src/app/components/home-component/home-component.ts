import { Component } from '@angular/core';
import { PanelPerfil } from '../../pages/panel-perfil/panel-perfil';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-home-component',
  imports: [PanelPerfil, RouterLink],
  templateUrl: './home-component.html',
  styleUrl: './home-component.css',
})
export class HomeComponent {
  
}
