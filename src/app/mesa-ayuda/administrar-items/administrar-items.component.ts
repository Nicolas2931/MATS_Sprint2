import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { MesaAyudaService } from '../mesa-ayuda.service';
import { MensajesService } from 'src/app/mensajes.service';
import { Item } from '../modelo-item';
import { Categoria } from '../modelo-categoriaMA';

@Component({
  selector: 'app-administrar-items',
  templateUrl: './administrar-items.component.html',
  styleUrls: ['./administrar-items.component.scss']
})
export class AdministrarItemsComponent implements OnChanges {
  
  @Input() ver_items:boolean;
  @Output() cerrar_items= new EventEmitter<void>();
  //Variable que guarda las categorías de las solicitudes
  items:Item[] | null;
  editar_item:boolean;
  //Categoria para editar
  item:Item | null;
  txt_item:string;
  id_categoria:number | null;
  //Variable que guarda las categorías de las solicitudes
  categorias:Categoria[] | null;
  mostrar_agregar: boolean;
  constructor(private servicio_MA:MesaAyudaService,private servicio_mensajes:MensajesService){
    this.items=null;
    this.editar_item=false;
    this.item=null;
    this.txt_item="";
    this.categorias=null;
    this.mostrar_agregar=false;
  }
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['items'] && changes['categorias'] && changes['ver_items']) {
      this.items=this.servicio_MA.getItems();
      this.categorias=this.servicio_MA.getCategorias();
    }  
  }
  ngOnInit(): void {
    this.limpiar_variables();
    this.items=this.servicio_MA.getItems();
    this.categorias=this.servicio_MA.getCategorias();
  }
  limpiar_variables():void{
    this.items=null;
    this.editar_item=false;
    this.item=null;
    this.txt_item="";
    this.categorias=null;
    this.mostrar_agregar=false;
    this.items=this.servicio_MA.getItems();
    this.categorias=this.servicio_MA.getCategorias();
  }
  cerrar(): void {
    this.ver_items=false;
    this.cerrar_items.emit();
    this.limpiar_variables();
  }
  mostrar_editar(item:Item):void{
    if(item!=null){
      this.item=item;
      this.editar_item=true;
      this.txt_item=this.item.nombre;
      this.id_categoria=this.item.id_categoria;
    }  
    else{
      this.servicio_mensajes.msj_errorPersonalizado("No se ha encontrado el ítem");
    }
    
  }
  async editar(){
    if(this.txt_item.trim().length > 0 && this.id_categoria!=null){
      if(await this.servicio_mensajes.msj_confirmar("¿Guardar cambios?", "Confirmar", "Cancelar")){
        if(this.servicio_MA.editarItem(this.txt_item, this.id_categoria)){
          this.cerrar_editar();
          this.servicio_mensajes.msj_exito("Cambios guardados");
        }
        else{
          this.servicio_mensajes.msj_errorPersonalizado("No se han guardado los cambios");
        }
      }
    }  
    else{
      this.servicio_mensajes.msj_datosErroneos();
    }
  }
  async eliminar(item:Item){
    this.item=item;
    if(this.item){
      if(await this.servicio_mensajes.msj_confirmar("¿Está seguro de eliminar el ítem?", "Confirmar", "Cancelar")){
        if(this.servicio_MA.eliminarItem(this.item.id_item)){
          this.servicio_mensajes.msj_exito("Se ha eliminado el ítem");
        }
        else{
          this.servicio_mensajes.msj_errorPersonalizado("Ha ocurrido un error al eliminar el ítem.")
        }
      }
    }
    else{
      this.servicio_mensajes.msj_errorPersonalizado("Ha ocurrido un error al buscar el ítem.")
    }
    
  }
  txt_categoria(id_categoria: number):string {
    return this.servicio_MA.getCategoria_ID(id_categoria);
  }
  //Metodo que captura el ID de la categoría seleccionada en una variable
  cargar_categoria(event: any): void {
    if(event.target.value!="null"){
      this.id_categoria= event.target.value;
    }
    else{
      this.id_categoria= null;
    }
  }
  cerrar_editar():void{
    this.editar_item=false;
  }  
  mostrarAgregar():void{
    this.mostrar_agregar=true;
  }
  cerrarAgregar():void{
    this.mostrar_agregar=false;
  }  
  async agregar(nombre:string){
    if(nombre.trim().length>0 && this.id_categoria!=null){
      if(await this.servicio_mensajes.msj_confirmar("¿Está seguro de añadir el ítem?","Confirmar","Cancelar")){
        if(this.servicio_MA.agregarItem(nombre, this.id_categoria)){
          this.cerrarAgregar();
          this.servicio_mensajes.msj_exito("Se ha añadido la categoría");
        }
        else{
          this.servicio_mensajes.msj_errorPersonalizado("Ha ocurrido un error al agregar la categoría.")
        }
      }
    }
    else{
      this.servicio_mensajes.msj_datosErroneos();
    }
  }
}
