import { Component, EventEmitter, Output } from '@angular/core';
import { MesaAyudaService } from '../mesa-ayuda.service';

@Component({
  selector: 'app-filtros-tickets',
  templateUrl: './filtros-tickets.component.html',
  styleUrls: ['./filtros-tickets.component.scss']
})
export class FiltrosTicketsComponent {
  @Output() filtrosAplicados= new EventEmitter<any>();
  prioridadSeleccionada: string = 'null';
  estadoSeleccionado: string = 'null';

  constructor() {}

  filtrar(): void {
    const filtros = {
      prioridad: this.prioridadSeleccionada,
      estado: this.estadoSeleccionado
    };

    this.filtrosAplicados.emit(filtros);
  }
}