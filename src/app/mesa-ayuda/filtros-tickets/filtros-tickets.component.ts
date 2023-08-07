import { Component } from '@angular/core';
import { MesaAyudaService } from '../mesa-ayuda.service';

@Component({
  selector: 'app-filtros-tickets',
  templateUrl: './filtros-tickets.component.html',
  styleUrls: ['./filtros-tickets.component.scss']
})
export class FiltrosTicketsComponent {
  prioridadSeleccionada: string = 'null';
  estadoSeleccionado: string = 'null';
  constructor(private servicio_MesaAyuda:MesaAyudaService){}
  filtrar(){

  }
}
