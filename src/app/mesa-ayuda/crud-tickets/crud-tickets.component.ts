import { ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MesaAyudaService } from '../mesa-ayuda.service';
import { Categoria } from '../modelo-categoriaMA';
import { Item } from '../modelo-item';
import { MensajesService } from 'src/app/mensajes.service';
import { Ticket } from '../modelo-ticket';
import { responsable } from '../modelo-responsable';
import { Estado } from '../modelo-estado';
import { Prioridad } from '../modelo-prioridad';
import { Comentario } from '../modelo-comentario';

@Component({
  selector: 'app-crud-tickets',
  templateUrl: './crud-tickets.component.html',
  styleUrls: ['./crud-tickets.component.scss']
})
export class CRUDTicketsComponent implements OnInit{
  //Variable del estado de las ventanas
  @Input() crear_ticket: boolean;
  @Input() ventana_VerTicket:boolean;
  @Input() ventana_editarTicket:boolean;
  //ID del ticket seleccionado, usado para ver, editar o eliminar
  @Input() idTicket: number;
  //Métodos que emiten que la ventana se cierra
  @Output() ventanaVerCerrada= new EventEmitter<void>();
  @Output() ventanaCrearCerrada = new EventEmitter<void>();
  @Output() ventanaEditCerrada = new EventEmitter<void>();
  ventanaResponsable:boolean;
  ventanaComentario:boolean;
  //Objeto de tipo Ticker para ver los detalles de este
  ticket:Ticket | null;
  //Variable que guarda las categorías registradas 
  private categorias:Categoria[] | null;
  private estados:Estado[];
  private prioridades:Prioridad[];
  //Activa o desactiva el resto del formulario si se selecciono una categoría
  mostrar_items: boolean;
  //Guarda los items de la categoría seleccionada
  private itemsPorCategoria: Item[] | null;
  //Variable que guarda el id de la categoría seleccionada
  id_categoriaSeleccionada:number | null;
  //Guarda el id del item seleccionado
  id_itemseleccionado:number | null;
  id_estadoseleccionado:number | null;
  id_prioridadseleccionada:number | null;
  //variables que guardan el Asunto y Descripción del Ticket
  asunto:string;
  descripcion:string;
  //Variable que indica si hubo error al crear el ticket
  private error_crear:boolean;
  private error_editar:boolean;
  error_comentario:boolean;
  //Datos de un Ticket
  fecha_solicitud:string;
  fecha_limite:string;
  txt_remitente:string;
  txt_categoria:string;
  txt_item:string;
  txt_estado:string;
  txt_prioridad:string | null;
  txt_responsable:string | null;

  txt_buscarResponsable:string;
  responsable:responsable | null;
  mostrar_responsable:boolean;
  comentario:string;
  comentariosPorTicket: Comentario[] | null;
  constructor(private servicio_MesaAyuda: MesaAyudaService,private servicio_mensajes:MensajesService,private changeDetectorRef: ChangeDetectorRef){
    this.ticket = null;
    this.categorias=null;
    this.mostrar_items=false;
    this.itemsPorCategoria=null;
    this.id_categoriaSeleccionada=null;
    this.id_itemseleccionado=null;
    this.asunto="";
    this.descripcion="";
    this.error_crear=false;
    this.error_editar=false;
    this.txt_remitente="";
    this.txt_categoria="";
    this.txt_item="";
    this.txt_estado="";
    this.fecha_solicitud="";
    this.fecha_limite="";
    this.txt_prioridad=null;
    this.txt_responsable=null;
    this.txt_buscarResponsable="";
    this.ventanaResponsable=false;
    this.responsable=null;
    this.mostrar_responsable=false;
    this.estados=[];
    this.prioridades=[];
    this.id_estadoseleccionado=null;
    this.id_prioridadseleccionada=null;
    this.comentario="";
    this.error_comentario=false;
    this.comentariosPorTicket=null;
  }
  ngOnInit(): void {
    //Inicialización de las variables como vacías
    this.ticket = null;
    this.categorias=null;
    this.mostrar_items=false;
    this.itemsPorCategoria=null;
    this.id_categoriaSeleccionada=null;
    this.id_itemseleccionado=null;
    this.asunto="";
    this.descripcion="";
    this.error_crear=false;
    this.txt_remitente="";
    this.txt_categoria="";
    this.txt_item="";
    this.txt_estado="";
    this.fecha_solicitud="";
    this.fecha_limite="";
    this.txt_prioridad=null;
    this.txt_responsable=null;
    this.error_editar=false;
    this.txt_buscarResponsable="";
    this.ventanaResponsable=false;
    this.ventanaComentario=false;
    this.mostrar_responsable=false;
    this.estados=this.servicio_MesaAyuda.getEstados();
    this.prioridades=this.servicio_MesaAyuda.getPrioridades();
    this.comentariosPorTicket=null;
    //Iniciar las categorías
    this.setCategorias(this.servicio_MesaAyuda.getCategorias());
  }
  //Asigna un valor a las categorías
  setCategorias(cat:Categoria[] | null):void{
    this.categorias=cat;
  }
  //Retorna las categorías
  getCategorias(): Categoria[] | null{
    return this.categorias;
  }

  //Método Get y Set para el error al crear un Ticket
  setErrorCrear(valor:boolean):void{
    this.error_crear=valor;
  }
  getErrorCrear():boolean{
    return this.error_crear;
  }
  //Método Get y Set para el error al editar un Ticket
  setErrorEditar(valor:boolean):void{
    this.error_editar=valor;
  }
  getErrorEditar():boolean{
    return this.error_editar;
  }
  //Método Get y Set para mostrar un ocultar los items de una categoría
  setMostrarItems(valor:boolean):void{
    this.mostrar_items=valor;
  }
  getMostrarItems():boolean{
    return this.mostrar_items;
  }
  //Métodos get y set de items por categoría
  setItemsPorCategoria(items:Item[] | null):void{
    this.itemsPorCategoria=items;
  }
  getItemsPorCategoria(): Item[] | null{
    return this.itemsPorCategoria;
  }

  //Metodo que captura el ID de la categoría seleccionada en una variable
  cargar_categoria(event: any): void {
    if(event.target.value!="null"){
      this.id_categoriaSeleccionada= event.target.value;
      this.cargarItems(this.id_categoriaSeleccionada);
    }
    else{
      this.setMostrarItems(false);
      this.id_categoriaSeleccionada= null;
    }
  }
  //Según el ID de la categoría seleccionado carga los items
  cargarItems(id_categoria: number | null): void {
    if (id_categoria !== null) {
      let itemsPorCategoria = this.servicio_MesaAyuda.getItemsPorCategoria(id_categoria);
      if (itemsPorCategoria != null) {
        this.setMostrarItems(true);
        this.setItemsPorCategoria(itemsPorCategoria);   
      }
      else{
        
        this.setMostrarItems(false);
        this.id_itemseleccionado=null;
        this.setItemsPorCategoria(itemsPorCategoria);  
        console.log("Mostrar"+this.getMostrarItems());
      }
    }
  }
  //Metodo que captura el ID de la categoría seleccionada en una variable
  cargar_item(event: any): void {
    if(event.target.value!="null"){
      this.id_itemseleccionado= event.target.value;
    }
    else{
      this.id_itemseleccionado= null;
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
  //Método que carga los valores del Ticket para mostrarlos o editarlos
  getTicket(id:number,mostrar:boolean) {
    this.idTicket=id;
    this.ticket = this.servicio_MesaAyuda.getTicket(this.idTicket);
    if (this.ticket) {
      this.ventana_editarTicket=mostrar;
      this.fecha_solicitud= this.servicio_MesaAyuda.formatoDateparaInput(this.ticket?.fecha_solicitud);
      if (this.ticket?.fecha_limite) {
        this.fecha_limite = this.servicio_MesaAyuda.formatoDateparaInput(this.ticket?.fecha_limite);
      } else {
        this.fecha_limite = "Sin asignar";
      }
      
      this.txt_remitente = this.servicio_MesaAyuda.getNombre_ID(this.ticket?.id_usuario);
      this.txt_categoria = this.servicio_MesaAyuda.getCategoria_ID(this.ticket?.id_categoria);
      this.txt_item = this.servicio_MesaAyuda.getItem_ID(this.ticket?.id_item);
      this.txt_estado = this.servicio_MesaAyuda.getEstado_ID(this.ticket?.id_estado);
      this.txt_prioridad = this.servicio_MesaAyuda.getPrioridad_ID(this.ticket?.id_prioridad);
      this.responsable = this.servicio_MesaAyuda.getResponsable_ID(this.ticket?.id_responsable);
      if(this.responsable != null){
        this.txt_responsable=this.responsable.name;
      }
      else{
        this.txt_responsable="Sin asignar";
      }
       
      if(this.ventana_editarTicket){
        this.id_categoriaSeleccionada=this.ticket?.id_categoria;
        let items=this.servicio_MesaAyuda.getItemsPorCategoria(this.id_categoriaSeleccionada);
        if(items){
          this.id_itemseleccionado=this.ticket?.id_item;
          this.setItemsPorCategoria(items);
          this.setMostrarItems(true);
        }
        else{
          this.id_itemseleccionado=null;
          this.setItemsPorCategoria(items);
          this.setMostrarItems(false);
        }
        this.id_estadoseleccionado=this.ticket?.id_estado;
        this.id_prioridadseleccionada=this.ticket?.id_prioridad;
        this.comentariosPorTicket=this.servicio_MesaAyuda.getComentarios(this.ticket?.token);
      }
    }
    else{
      this.cerrar_verTicket();
      this.cerrar_editarTicket();
      this.servicio_mensajes.msj_informar("No se encontro en Ticket con el ID:"+this.idTicket);  
    }
  }
  //Función para ediar un ticket
  async editar_Ticket(){
    if(this.id_categoriaSeleccionada!=null){
      /*&& ((this.mostrar_items!=false && this.id_itemseleccionado!=null) || (this.mostrar_items==false && this.id_itemseleccionado==null)) && ((this.id_estadoseleccionado==2 || this.id_estadoseleccionado==3 && this.txt_responsable!="Sin asignar") || (this.id_estadoseleccionado==1 && this.responsable!=null) )
    */if((this.getMostrarItems()==true && this.id_itemseleccionado!=null) || (this.getMostrarItems()==false && this.id_itemseleccionado==null)){
        if(this.id_estadoseleccionado!=null){
          if(((this.id_estadoseleccionado==2 || this.id_estadoseleccionado==3) && this.responsable!=null) || this.id_estadoseleccionado==1){
            if(((this.id_estadoseleccionado==2 || this.id_estadoseleccionado==3) && this.id_prioridadseleccionada!=null) || this.id_estadoseleccionado==1){
              if(await this.servicio_mensajes.msj_confirmar('¿Está seguro que desea guardar los cambios', 'Confirmar', 'Cancelar')){
                let id_responsable :number|null=null;
                if(this.responsable?.id_usuario!=undefined){
                  id_responsable=this.responsable?.id_usuario;
                }
                if(this.ticket!=null && this.servicio_MesaAyuda.editar_ticket(this.ticket?.token,this.ticket?.id_usuario,this.id_categoriaSeleccionada,this.id_itemseleccionado,this.ticket?.asunto,this.ticket?.descripcion,id_responsable, this.ticket?.fecha_solicitud,this.id_estadoseleccionado,this.id_prioridadseleccionada, this.comentariosPorTicket)){
                  this.cerrar_editarTicket();
                  this.servicio_mensajes.msj_exito("Se han guardado los cambios!");

                }
                else{
                  this.servicio_mensajes.msj_errorPersonalizado("No se han podido guardar los cambios");
                }
              }
            }
            else{
              this.setErrorEditar(true);
              this.servicio_mensajes.msj_errorPersonalizado("Si el estado del ticket está en proceso o completado, debe tener una prioridad asignada.");
            }
          }
          else{
            this.setErrorEditar(true);
            this.servicio_mensajes.msj_errorPersonalizado("Si el estado del ticket está en proceso o completado, debe haber un responsable a cargo de él.");
          }
        }
        else{
          this.setErrorEditar(true);
          this.servicio_mensajes.msj_errorPersonalizado("Debe agregar un estado al Ticket");
        }
        
      }
      else{
        this.setErrorEditar(true);
        this.servicio_mensajes.msj_errorPersonalizado("Debe agregar un item al Ticket");
      }
    }
    else{
      this.setErrorEditar(true);
      this.servicio_mensajes.msj_errorPersonalizado("Debe agregar una categoría al Ticket");
    }
  }

  //Método que retorna los datos de un responsable
  buscar_responsable(){
    this.responsable=this.servicio_MesaAyuda.buscar_responsable(this.txt_buscarResponsable);
    if(this.responsable!=null){
      this.mostrar_responsable=true;
    }
    else{
      this.servicio_mensajes.msj_errorPersonalizado("No se encontro al usuario con el correo: "+this.txt_buscarResponsable);
      this.txt_buscarResponsable="";
      this.mostrar_responsable=false;
    }
  }
  //Método que asigna un responsable al usuario
  async asignar_responsable(){
    if(await this.servicio_mensajes.msj_confirmar('¿Está seguro?', 'Confirmar', 'Cancelar')){
      if(this.responsable){
        this.txt_responsable=this.responsable.name;
        this.servicio_mensajes.msj_exito('Se ha añadido al responsable!');
        this.cerrar_responsable();
      }
    }

  }
  //Método que quita a un responsable en caso de que ya se tenga
  async quitar_responsable(){
    if(await this.servicio_mensajes.msj_confirmar('¿Está seguro?', 'Confirmar', 'Cancelar')){
      this.responsable=null;
      this.txt_responsable="Sin asignar"
      this.servicio_mensajes.msj_exito('Se ha quitado al responsable!');
    }  
    
  }
  //Método que restorna los tres estados de una solicitud
  getEstados(){
    return this.estados;
  }
  getPrioridades(){
    return this.prioridades;
  }
  //Metodo que captura el ID del estado seleccionado en una variable
  cargar_estado(event: any): void {
    if(event.target.value!="null"){
      this.id_estadoseleccionado= event.target.value;
    }
    else{
      this.id_estadoseleccionado= null;
    }
  }
  cargar_prioridad(event: any): void {
    if(event.target.value!="null"){
      this.id_prioridadseleccionada= event.target.value;
    }
    else{
      this.id_prioridadseleccionada= null;
    }
  }
  //Método que carga los datos de un Ticket que se desea visualizar
  verTicket() {
    this.ticket = this.servicio_MesaAyuda.getTicket(this.idTicket);
    if (this.ticket) {
      this.fecha_solicitud= this.servicio_MesaAyuda.formatoDateparaInput(this.ticket?.fecha_solicitud);
      if (this.ticket?.fecha_limite) {
        this.fecha_limite = this.servicio_MesaAyuda.formatoDateparaInput(this.ticket?.fecha_limite);
      } else {
        this.fecha_limite = "Sin asignar";
      }
      
      this.txt_remitente = this.servicio_MesaAyuda.getNombre_ID(this.ticket?.id_usuario);
      this.txt_categoria = this.servicio_MesaAyuda.getCategoria_ID(this.ticket?.id_categoria);
      this.txt_item = this.servicio_MesaAyuda.getItem_ID(this.ticket?.id_item);
      this.txt_estado = this.servicio_MesaAyuda.getEstado_ID(this.ticket?.id_estado);
      this.txt_prioridad = this.servicio_MesaAyuda.getPrioridad_ID(this.ticket?.id_prioridad);
      this.responsable = this.servicio_MesaAyuda.getResponsable_ID(this.ticket?.id_responsable);
      if(this.responsable != null){
        this.txt_responsable=this.responsable.name;
      }
      else{
        this.txt_responsable="Sin asignar";
      }
      this.comentariosPorTicket=this.servicio_MesaAyuda.getComentarios(this.ticket?.token);
      console.log("Los comentarios;"+this.comentariosPorTicket);
    }
    else{
      this.cerrar_verTicket();
      this.servicio_mensajes.msj_informar("No se encontro en Ticket con el ID:"+this.idTicket);  
    }
  }
  async agregar_comentario():Promise<void>{
    if(this.comentario.trim().length > 0){
      if(await this.servicio_mensajes.msj_confirmar('¿Está seguro que desea agregar el comentario?', 'Confirmar', 'Cancelar')){
        this.error_comentario=this.servicio_MesaAyuda.agregar_comentario(this.idTicket,this.comentario);
        if(this.error_comentario==false){
          this.cerrar_comentario();
          this.servicio_mensajes.msj_exito("Se ha añadido el comentario!");
        }
        else{
          this.servicio_mensajes.msj_errorPersonalizado("No se ha podido añadir el comentario");
        }
      }
    }
    else{
      this.servicio_mensajes.msj_datosErroneos();
      this.error_comentario=true;
    }
    
  }
  //Método para editar un comentario de un Ticket
  id_comentarioEditar:number;
  editar:boolean;
  agregar:boolean;
  editar_comentario(id_comentario:number,comentario:string){
    this.id_comentarioEditar=id_comentario;
    this.ventanaComentario=true;
    this.error_comentario=false;
    this.editar=true;
    this.agregar=false;
    this.comentario=comentario;
  }
  async editar_com(){
    if(this.comentario.trim().length > 0){
      if(await this.servicio_mensajes.msj_confirmar('¿Está seguro que desea guardar los cambios?', 'Confirmar', 'Cancelar')){
        this.error_comentario=this.servicio_MesaAyuda.editar_comentario(this.id_comentarioEditar,this.comentario);
        if(this.error_comentario==false){
          this.cerrar_comentario();
          this.servicio_mensajes.msj_exito("Se han guardado los cambios!");
        }
        else{
          this.servicio_mensajes.msj_errorPersonalizado("No se han podido guardar los cambios");
        }
      }   
    }
    else{
      this.servicio_mensajes.msj_datosErroneos();
      this.error_comentario=true;
    }
  }
  async eliminar_comentario(id_comentario:number){
    if(await this.servicio_mensajes.msj_confirmar('¿Está seguro que eliminar el comentario? Está acción es irreversible', 'Confirmar', 'Cancelar')){
      if(this.servicio_MesaAyuda.eliminar_comentario(id_comentario)){
        this.servicio_mensajes.msj_exito("Se ha eliminado el comentario!");
      }
      else{
        this.servicio_mensajes.msj_errorPersonalizado("No se ha podido eliminar el comentario");
      }
    }  
  }
  //Método para abrir o cerrar la ventana para añadir comentarios
  ventana_comentario():void{
    this.ventanaComentario=true;
    this.agregar=true;
  }
  cerrar_comentario():void{
    this.comentario="";
    this.ventanaComentario=false;
    this.agregar=false;
    this.editar=false;
    this.error_comentario=false;
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
  //Abre la ventana de responsable
  agregar_responsable(): void {
    this.ventanaResponsable=true;
  }
  //Cierra la ventana de agregar un responsable
  cerrar_responsable():void{
    this.txt_buscarResponsable="";
    this.ventanaResponsable=false;
    this.mostrar_responsable=false;
  }

  //método para cambiar el formato en que se muestra una fehca
  formatofecha(fecha:Date):string{
    return this.servicio_MesaAyuda.formatoDateparaInput(fecha);
  }
  
}
