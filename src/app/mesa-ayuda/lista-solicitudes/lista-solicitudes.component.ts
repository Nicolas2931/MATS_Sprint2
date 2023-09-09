import { Component, OnInit, ViewChild } from '@angular/core';
import { Ticket } from '../modelo-ticket';
import { MesaAyudaService } from '../mesa-ayuda.service';
import { LoginService } from 'src/app/login.service';
import { MensajesService } from 'src/app/mensajes.service';
import { CRUDTicketsComponent } from '../crud-tickets/crud-tickets.component';
import {Router } from '@angular/router';
@Component({
  selector: 'app-lista-solicitudes',
  templateUrl: './lista-solicitudes.component.html',
  styleUrls: ['./lista-solicitudes.component.scss']
})
export class ListaSolicitudesComponent  implements OnInit{
  //Variable que permite acceder a los métodos del componente con el CRUD de los Tickets
  @ViewChild(CRUDTicketsComponent) crudTicketsComponent: CRUDTicketsComponent;
  //Total de Tickets cargados
  cantidad_tickets:number;
  //Arreglo que guarda todos los Tickets
  tickets:Ticket[] | null;
  //Variable que guarda el ID de un Ticket para ver, editar o eliminar.
  id_ticket:number;
  //Variables que abren o cierran las ventanas de ver o editar
  ventana_editarTicket:boolean=false;
  ventana_verTicket:boolean=false;
  //------Variables de los Tickets----
  categoriasID: string[] = [];
  estadosID: string[] = [];
  itemsID: string[] = [];
  remitentesID: string[] = [];
  prioridadesID: (string | null)[] = [];
  responsablesID: (string | null)[] = [];
  //Variable para tipo de usuario
  tipo_usuario:string;
  constructor(private servicio_MesaAyuda:MesaAyudaService,private loginservice:LoginService,private servicio_mensajes:MensajesService, private router:Router){
    this.cantidad_tickets=0;
    this.tickets=null;
    this.tipo_usuario="";
  }
  ngOnInit(): void {
    this.tipo_usuario=this.loginservice.getTipoUsuario();
    this.tickets=this.servicio_MesaAyuda.getTickets();
      if(this.tickets){
        this.cantidad_tickets=this.tickets.length;
        for(let i=0; i<this.tickets.length; i++){
          this.categoriasID.push(this.servicio_MesaAyuda.getCategoria_ID(this.tickets[i].id_categoria));
          this.estadosID.push(this.servicio_MesaAyuda.getEstado_ID(this.tickets[i].id_estado));
          this.itemsID.push(this.servicio_MesaAyuda.getItem_ID(this.tickets[i].id_item));
          this.remitentesID.push(this.servicio_MesaAyuda.getRemitente_ID(this.tickets[i].id_usuario).name);
          this.prioridadesID.push(this.servicio_MesaAyuda.getPrioridad_ID(this.tickets[i].id_prioridad));
          let res=this.servicio_MesaAyuda.getResponsable_ID(this.tickets[i].id_responsable);
          if(res!=null){
            this.responsablesID.push(res.name);
          }
          
        }  
      }  
      else{
        this.cantidad_tickets=0;
      }
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
  //Método que envía el ID del Ticket que se desea visualizar, y activa la ventana emergente
  ver_ticket(id_ticket:number):void {
    this.crudTicketsComponent.verTicket(id_ticket, true);
  }
  //Método que retorna un Ticket según el ID seleccionado
  async eliminar_ticket(id_ticket: number): Promise<void> {
    const confirmado = await this.servicio_mensajes.msj_confirmar(
      "¿Está seguro que desea eliminar el Ticket? Está acción es irreversible",
      "Confirmar",
      "Cancelar"
    );
    
    if (confirmado) {
      const eliminado = this.servicio_MesaAyuda.eliminar_ticket(id_ticket);
      if (eliminado) {
        //Invocar al método que recargue todos los Tickets
        this.servicio_mensajes.msj_exito("Se ha eliminado el Ticket!");
      } else {
        this.servicio_mensajes.msj_exito("No se ha podido eliminar el Ticket!");
      }
    }
  }
  //Métodos que abren o cierran la ventana de editar y envía el ID del ticket en específico
  editar_ticket(id_ticket:number):void {
    this.crudTicketsComponent.getTicket(id_ticket,true);
  }
  CierreVentanaEdit(): void {
    this.ventana_editarTicket = false;
  }
  //Método que cierra la ventana de Ver un Ticket
  CierreVentanaVer(): void {
    this.ventana_verTicket = false;
  }
  //Función que redirige al usuario a las opciones del módulo de mesa de ayuda
  volver_MA(){
    this.router.navigate(['/Mesa_Ayuda']);
  }


}
