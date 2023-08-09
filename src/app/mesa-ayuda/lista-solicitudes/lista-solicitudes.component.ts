import { Component, OnInit } from '@angular/core';
import { Ticket } from '../modelo-ticket';
import { MesaAyudaService } from '../mesa-ayuda.service';
import { LoginService } from 'src/app/login.service';
import { MensajesService } from 'src/app/mensajes.service';
@Component({
  selector: 'app-lista-solicitudes',
  templateUrl: './lista-solicitudes.component.html',
  styleUrls: ['./lista-solicitudes.component.scss']
})
export class ListaSolicitudesComponent  implements OnInit{
  crear_ticket:boolean = false;
  cantidad_tickets:number | null;
  tickets:Ticket[] | null;
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
  constructor(private servicio_MesaAyuda:MesaAyudaService,private loginservice:LoginService,private servicio_mensajes:MensajesService){
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
          let prioridad=this.servicio_MesaAyuda.getPrioridad_ID(this.tickets[i].id_prioridad)
          if(prioridad!=null){
            this.prioridadesID.push(prioridad);
          }
          else{
            this.prioridadesID.push("");
          }
          let responsable=this.servicio_MesaAyuda.getResponsable_ID(this.tickets[i].id_responsable);
          if(responsable!=null){
            this.responsablesID.push(responsable);
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
  id_ticket:number;
  ventana_editarTicket:boolean=false;
  editar_ticket(id_ticket:number):void {
    this.id_ticket=id_ticket;
    this.ventana_editarTicket=true;
  }
  CierreVentanaEdit(): void {
    this.ventana_editarTicket = false;
  }
  CierreVentanaCrear(): void {
    this.crear_ticket = false;
  }
  //Método que abre la ventana para crear un ticket
  crear(){
    this.crear_ticket=true;
  }
}
