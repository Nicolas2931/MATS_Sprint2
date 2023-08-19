import { Component, OnInit, ViewChild } from '@angular/core';
import { MesaAyudaService } from '../mesa-ayuda.service';
import { LoginService } from 'src/app/login.service';
import { MensajesService } from 'src/app/mensajes.service';
import { Router } from '@angular/router';
import { Ticket } from '../modelo-ticket';
import { CRUDTicketsComponent } from '../crud-tickets/crud-tickets.component';

@Component({
  selector: 'app-solicitudes-asignadas',
  templateUrl: './solicitudes-asignadas.component.html',
  styleUrls: ['./solicitudes-asignadas.component.scss']
})
export class SolicitudesAsignadasComponent  implements OnInit{
  //Cambiar casi todo
  @ViewChild(CRUDTicketsComponent) crudTicketsComponent: CRUDTicketsComponent;
  cantidad_tickets:number | null;
  tickets:Ticket[] | null;
  id_ticket:number;
  ventana_editarTicket:boolean=false;
  ventana_verTicket:boolean=false;
  //------Variables de los Tickets----
  categoriasID: string[] = [];
  estadosID: string[] = [];
  itemsID: string[] = [];
  usuariosID: string[] = [];
  prioridadesID: (string | null)[] = [];
  responsablesID: (string | null)[] = [];
  //Variable para tipo de usuario o permisos
  tipo_usuario:string;
  permiso_usuario:string;
  constructor(private servicio_MesaAyuda:MesaAyudaService,private loginservice:LoginService,private servicio_mensajes:MensajesService, private router:Router){
    this.cantidad_tickets=0;
    this.tickets=null;
    this.tipo_usuario="";
    this.permiso_usuario="";
  }
  ngOnInit(): void {
    this.tipo_usuario=this.loginservice.getTipoUsuario();
    this.permiso_usuario=this.loginservice.getPermisoUsuario();
      this.tickets=this.servicio_MesaAyuda.getTickets();
      
      if(this.tickets){
        this.cantidad_tickets=this.tickets.length;
        for(let i=0; i<this.tickets.length; i++){
          this.categoriasID.push(this.servicio_MesaAyuda.getCategoria_ID(this.tickets[i].id_categoria));
          this.estadosID.push(this.servicio_MesaAyuda.getEstado_ID(this.tickets[i].id_estado));
          this.itemsID.push(this.servicio_MesaAyuda.getItem_ID(this.tickets[i].id_item));
          this.usuariosID.push(this.servicio_MesaAyuda.getNombre_ID(this.tickets[i].id_usuario));
          this.prioridadesID.push(this.servicio_MesaAyuda.getPrioridad_ID(this.tickets[i].id_prioridad));
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
      this.servicio_mensajes.msj_informar('No ha seleccionado ningún filtro')
    }
  }
  ver_ticket(id_ticket:number):void {
    this.id_ticket=id_ticket;
    this.ventana_verTicket=true;
  }
  async eliminar_ticket(id_ticket: number): Promise<void> {
    const confirmado = await this.servicio_mensajes.msj_confirmar(
      "¿Está seguro que desea eliminar el Ticket? Está acción es irreversible",
      "Confirmar",
      "Cancelar"
    );
    
    if (confirmado) {
      const eliminado = this.servicio_MesaAyuda.eliminar_ticket(id_ticket);
      if (eliminado) {
        this.servicio_mensajes.msj_exito("Se ha eliminado el Ticket!");
      } else {
        this.servicio_mensajes.msj_exito("No se ha podido eliminar el Ticket!");
      }
    }
  }
  
  editar_ticket(id_ticket:number):void {
    this.crudTicketsComponent.getTicket(id_ticket,true);
  }
  CierreVentanaEdit(): void {
    this.ventana_editarTicket = false;
  }

  CierreVentanaVer(): void {
    this.ventana_verTicket = false;
  }
  volver_MA(){
    this.router.navigate(['/Mesa_Ayuda']);
  }


}
