import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Ticket } from '../modelo-ticket';
import { MesaAyudaService } from '../mesa-ayuda.service';
import { MensajesService } from 'src/app/mensajes.service';
import { LoginService } from 'src/app/login.service';
import { responsable } from '../modelo-responsable';
import { CRUDTicketsComponent } from '../crud-tickets/crud-tickets.component';

@Component({
  selector: 'app-lista-tickets',
  templateUrl: './lista-tickets.component.html',
  styleUrls: ['./lista-tickets.component.scss']
})
export class ListaTicketsComponent implements OnInit{
  @ViewChild(CRUDTicketsComponent) crudTicketsComponent: CRUDTicketsComponent;
  //Guarda los tickets del usuario
  tickets:Ticket[] | null;
  //Abre o cierra la ventana para ver un Ticket
  ventana_verTicket:boolean;
  //Guarda el ID del Ticket que se desee ver
  id_ticket:number;
  //------Variables de los Tickets----
  //Variables que cambiar el ID por su significado, para que el usuario pueda entender con 
  //mayor facilidad la información.
  categoriasID: string[] = [];
  estadosID: string[] = [];
  itemsID: string[] = [];
  responsablesID: (responsable | null)[] = [];
  //Variable que guarda el total de Tickets del usuario
  cantidad_tickets:number | null;
  constructor(private router: Router, private servicio_MesaAyuda:MesaAyudaService, private servicio_mensajes: MensajesService, private loginService:LoginService){
    this.tickets=null;
    this.ventana_verTicket=false;
    this.cantidad_tickets=null;
  }
  ngOnInit(): void {
    //Se cargan los Tickets del usuario según su ID
      this.servicio_MesaAyuda.getTickets_Usuario(this.loginService.getIdUsuario()).then(data => {
        this.tickets = data;
        if(this.tickets!=null){
          this.cantidad_tickets=this.tickets.length;
          //Se convierten los ID en su respectivo significado
          for(let i=0; i<this.tickets.length; i++){
            this.servicio_MesaAyuda.getCategoria_ID(this.tickets[i].id_categoria).then(async(data) => {
              this.categoriasID.push(data);
              //usar asincronismo a lo loco aqui
            });
            this.estadosID.push(this.servicio_MesaAyuda.getEstado_ID(this.tickets[i].id_estado));
            this.servicio_MesaAyuda.getItem_ID(this.tickets[i].id_item).then(data => {
              this.itemsID.push(data);
            });
            this.servicio_MesaAyuda.getResponsable_ID(this.tickets[i].email_responsable)?.then(data => {
              this.responsablesID.push(data);
            });
          }  
        }
        else{
          this.cantidad_tickets=null;
        }
      });
      

  }
   //Carga los tickets según los filtros
   aplicarFiltros(filtros: any): void {
    let tickets=this.servicio_MesaAyuda.filtrar(filtros)
    if(this.servicio_MesaAyuda.filtrar(filtros)!=null){
      this.tickets=tickets;
    }
    else{
      this.servicio_mensajes.msj_informar("No se han encontrado Tickets que cumplan con los filtros.");
    }
  }
  //Métodos que abren y cierran la ventana de VER UN TICKET
  ver_ticket(id_ticket:number):void {
    this.crudTicketsComponent.verTicket(id_ticket, true);
  }
  CierreVentanaVer(): void {
    this.ventana_verTicket = false;
  }
  //Método para volver.
  volver_MA(){
    this.router.navigate(['/Mesa_Ayuda']);
  }
}
