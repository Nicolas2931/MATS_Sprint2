import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MesaAyudaService } from '../mesa-ayuda.service';
import { Categoria } from '../modelo-categoriaMA';
import { Item } from '../modelo-item';
import { MensajesService } from 'src/app/mensajes.service';

@Component({
  selector: 'app-crud-tickets',
  templateUrl: './crud-tickets.component.html',
  styleUrls: ['./crud-tickets.component.scss']
})
export class CRUDTicketsComponent implements OnInit{
  @Input() crear_ticket: boolean;
  @Input() idTicket: number;
  @Input() ventana_editarTicket:boolean;
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
  constructor(private servicio_MesaAyuda: MesaAyudaService,private servicio_mensajes:MensajesService){
    this.itemsPorCategoria=null;
    this.id_itemseleccionado=null;
    this.mostrar_items=false;
    this.id_categoriaSeleccionada=null;
    this.categorias=[];
    this.error_crear=false;
  }
  ngOnInit(): void {
    let categorias=this.servicio_MesaAyuda.getCategorias();
    if(categorias!=null){
      this.categorias=categorias;
    }
    this.mostrar_items = false;
    this.id_categoriaSeleccionada=null;
    this.id_itemseleccionado=null; 
  }
  //Cierra la ventana de crear un Ticket  y reinicia los valore
  cerrar_crearTicket(): void {
    this.crear_ticket = false;
    this.ventanaCrearCerrada.emit();
    this.ngOnInit();
  }
  //Cierra la ventana de editar un Ticket y reinicia los valore
  cerrar_editarTicket(): void {
    this.ventana_editarTicket = false;
    this.ventanaEditCerrada.emit();
    this.ngOnInit();
  }
  //Metodo que captura el ID de la categoría seleccionada en una variable
  cargar_categoria(event: any): void {
    if(event.target.value!="null"){
      this.id_categoriaSeleccionada= event.target.value;
      console.log('Categoría seleccionada:', this.id_categoriaSeleccionada);
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
      let itemsPorCategoria = this.servicio_MesaAyuda.getItemsPorCategoria(id_categoria);
      if (itemsPorCategoria != null) {
        this.mostrar_items=true;
        this.itemsPorCategoria = itemsPorCategoria;   
      }
      else{
        this.mostrar_items=false;
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
  
  
  
}
