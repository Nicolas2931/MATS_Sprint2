import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MesaAyudaService } from '../mesa-ayuda.service';
import { Categoria } from '../modelo-categoriaMA';
import { Item } from '../modelo-item';
import { MensajesService } from 'src/app/mensajes.service';
import { Ticket } from '../modelo-ticket';

@Component({
  selector: 'app-crud-tickets',
  templateUrl: './crud-tickets.component.html',
  styleUrls: ['./crud-tickets.component.scss']
})
export class CRUDTicketsComponent implements OnInit{
  
  @Input() crear_ticket: boolean;
  @Input() idTicket: number;
  @Input() ventana_editarTicket:boolean;
  @Input() ventana_VerTicket:boolean;
  @Output() ventanaVerCerrada= new EventEmitter<void>();
  @Output() ventanaCrearCerrada = new EventEmitter<void>();
  @Output() ventanaEditCerrada = new EventEmitter<void>();
  //Variable que guarda el id de la categoría seleccionada
  id_categoriaSeleccionada:number | null;
  //Variable que guarda las categorías registradas 
  categorias:Categoria[] | null;
  //Activa o desactiva el resto del formulario si se selecciono una categoría
  mostrar_items: boolean;
  //Guarda los items de la categoría seleccionada
  itemsPorCategoria: Item[] | null;
  //Guarda el id del item seleccionado
  id_itemseleccionado:number | null;
  //variables que guardan el Asunto y Descripción del Ticket
  asunto:string;
  descripcion:string;
  //Variable que indica si hubo error al crear el ticket
  error_crear:boolean;
  //Objeto de tipo Ticker para ver los detalles de este
  ticket:Ticket | null;
  constructor(private servicio_MesaAyuda: MesaAyudaService,private servicio_mensajes:MensajesService){
    this.itemsPorCategoria=null;
    this.id_itemseleccionado=null;
    this.mostrar_items=false;
    this.id_categoriaSeleccionada=null;
    this.categorias=[];
    this.error_crear=false;
    this.ticket=null;
  }
  ngOnInit(): void {
    this.mostrar_items = false;
    this.id_categoriaSeleccionada=null;
    this.id_itemseleccionado=null; 
    this.ticket=null;
    this.asunto="";
    this.descripcion="";
    let categorias=this.servicio_MesaAyuda.getCategorias();
    if(categorias!=null){
      this.categorias=categorias;
    }
  }
  //Cierra la ventana de crear un Ticket  y reinicia los valore
  cerrar_crearTicket(): void {
    this.crear_ticket = false;
    this.ventanaCrearCerrada.emit();
    this.ngOnInit();
  }
  //Cierra la ventana de editar un Ticket y reinicia los valore
  cerrar_verTicket(): void {
    this.ventana_VerTicket = false;
    this.ventanaVerCerrada.emit();
    this.ngOnInit();
  }
  //Cierra la ventana de editar un Ticket y reinicia los valore
  cerrar_editarTicket(): void {
    this.ventana_editarTicket = false;
    this.ventanaEditCerrada.emit();
    this.ticket=null;
    this.categorias=null;
    this.ngOnInit();
  }
  //Metodo que captura el ID de la categoría seleccionada en una variable
  cargar_categoria(event: any): void {
    if(event.target.value!="null"){
      this.id_categoriaSeleccionada= event.target.value;
      this.cargarItems(this.id_categoriaSeleccionada);
    }
    else{
      this.mostrar_items=false;
      this.id_categoriaSeleccionada= null;
    }
  }
  //Metodo que captura el ID de la categoría seleccionada en una variable
  cargar_item(event: any): void {
    if(event.target.value!="null"){
      this.id_itemseleccionado= event.target.value;
      console.log('El item seleccionado es:', this.id_itemseleccionado);
    }
    else{
      this.id_itemseleccionado= null;
    }
  }
  //Retorna las categorías
  getCategorias(): Categoria[] | null{
    return this.categorias;
  }
  //Según el ID de la categoría seleccionado carga los items
  cargarItems(id_categoria: number | null): void {
    if (id_categoria !== null) {
      console.log('Categoría seleccionada:',id_categoria);
      let itemsPorCategoria = this.servicio_MesaAyuda.getItemsPorCategoria(id_categoria);
      console.log("retorna:"+itemsPorCategoria);
      if (itemsPorCategoria != null) {
        this.mostrar_items=true;
        this.itemsPorCategoria = itemsPorCategoria;   
      }
      else{
        this.mostrar_items=false;
        console.log('mostrar',this.mostrar_items);
        this.itemsPorCategoria = null;
      }
    }
  }
  
  //Método para crear el ticket
  async crear():Promise<void>{
    if(this.id_categoriaSeleccionada!==null && ((this.mostrar_items==true && this.id_itemseleccionado!=null) || this.mostrar_items==false && this.id_itemseleccionado==null) && this.asunto.trim().length>0 && this.descripcion.trim().length>0){
      if(await this.servicio_mensajes.msj_confirmar('¿Está seguro que desea registrar el nuevo Ticket?','Confirmar','Cancelar')){
        this.servicio_MesaAyuda.crear_ticket(this.id_categoriaSeleccionada,this.id_itemseleccionado,this.asunto,this.descripcion);
        this.cerrar_crearTicket();
        this.servicio_mensajes.msj_exito('Se ha creado el Ticket!');
        this.error_crear=false;
      }
    }
    else{
      this.servicio_mensajes.msj_datosErroneos();
      this.error_crear=true;
    }  
  }

  //-------------------------SECCIÓN DE VER DETALLES--------------------
  //Datos de un Ticket
  item:string;
  estado:string;
  nombre:string;
  categoria:string;
  prioridad:string | null;
  responsable:string | null;
  fecha:string;
  fecha_limite:string;
  
  getTicket() {
    this.ticket = this.servicio_MesaAyuda.getTicket(this.idTicket);
    if (this.ticket) {
      this.fecha = this.servicio_MesaAyuda.formatDateparaInput(this.ticket?.fecha_solicitud);
      if (this.ticket?.fecha_limite) {
        this.fecha_limite = this.servicio_MesaAyuda.formatDateparaInput(this.ticket?.fecha_limite);
      } else {
        this.fecha_limite = "Sin asignar";
      }
      
      this.item = this.servicio_MesaAyuda.getItem_ID(this.ticket?.id_item);
      this.estado = this.servicio_MesaAyuda.getEstado_ID(this.ticket?.id_estado);
      this.nombre = this.servicio_MesaAyuda.getNombre_ID(this.ticket?.id_usuario);
      this.categoria = this.servicio_MesaAyuda.getCategoria_ID(this.ticket?.id_categoria);
      this.prioridad = this.servicio_MesaAyuda.getPrioridad_ID(this.ticket?.id_prioridad);
      this.responsable = this.servicio_MesaAyuda.getResponsable_ID(this.ticket?.id_responsable);
  
      // Actualizar las variables relacionadas con las categorías y los items
      this.itemsPorCategoria = null;
      this.mostrar_items = false;
      this.id_categoriaSeleccionada = this.ticket.id_categoria || null;
    }
  }

    //-------------------------SECCIÓN DE EDITAR--------------------

   
}
