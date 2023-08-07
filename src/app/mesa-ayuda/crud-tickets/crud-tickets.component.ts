import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-crud-tickets',
  templateUrl: './crud-tickets.component.html',
  styleUrls: ['./crud-tickets.component.scss']
})
export class CRUDTicketsComponent {
  @Input() crear_ticket: boolean;
  cerrar(): void {
    this.crear_ticket = false;
  }  
}
