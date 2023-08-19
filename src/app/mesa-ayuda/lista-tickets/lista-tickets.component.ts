import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Ticket } from '../modelo-ticket';
import { MesaAyudaService } from '../mesa-ayuda.service';
import { MensajesService } from 'src/app/mensajes.service';
import { LoginService } from 'src/app/login.service';

@Component({
  selector: 'app-lista-tickets',
  templateUrl: './lista-tickets.component.html',
  styleUrls: ['./lista-tickets.component.scss']
})
export class ListaTicketsComponent implements OnInit{
  tickets:Ticket[] | null;
  ventana_verTicket:boolean;
  id_ticket:number;
  //------Variables de los Tickets----
  categoriasID: string[] = [];
  estadosID: string[] = [];
  itemsID: string[] = [];
  responsablesID: (string | null)[] = [];
  cantidad_tickets:number | null;
  constructor(private router: Router, private servicio_MesaAyuda:MesaAyudaService, private servicio_mensajes: MensajesService, private loginService:LoginService){
    this.tickets=null;
    this.ventana_verTicket=false;
    this.cantidad_tickets=null;
  }
  ngOnInit(): void {
    //Se cargan los Tickets del usuario
      this.tickets=this.servicio_MesaAyuda.getTickets_Usuario(this.loginService.getIdUsuario());
      if(this.tickets!=null){
        this.cantidad_tickets=this.tickets.length;
        for(let i=0; i<this.tickets.length; i++){
          this.categoriasID.push(this.servicio_MesaAyuda.getCategoria_ID(this.tickets[i].id_categoria));
          this.estadosID.push(this.servicio_MesaAyuda.getEstado_ID(this.tickets[i].id_estado));
          this.itemsID.push(this.servicio_MesaAyuda.getItem_ID(this.tickets[i].id_item));
          let responsable=this.servicio_MesaAyuda.getResponsable_ID(this.tickets[i].id_responsable);
          if(responsable!=null){
            this.responsablesID.push(responsable.name);
          }
          else{
            this.responsablesID.push("Sin asignar");
          }       
        }  
      }
      else{
        this.cantidad_tickets=null;
      }

  }
   //Carga los tickets según los filtros
   aplicarFiltros(filtros: any): void {
    let tickets=this.servicio_MesaAyuda.filtrar(filtros)
    if(this.servicio_MesaAyuda.filtrar(filtros)!=null){
      this.tickets=tickets;
    }
    else{
      this.servicio_mensajes.msj_informar('No ha seleccionado ningún filtro')
    }
  }
  ver_ticket(id_ticket:number):void {
    this.id_ticket=id_ticket;
    this.ventana_verTicket=true;
  }
  CierreVentanaVer(): void {
    this.ventana_verTicket = false;
  }
  //Método para volver.
  volver_MA(){
    this.router.navigate(['/Mesa_Ayuda']);
  }
}
