import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { Categoria } from '../modelo-categoriaMA';
import { MesaAyudaService } from '../mesa-ayuda.service';
import { MensajesService } from 'src/app/mensajes.service';

@Component({
  selector: 'app-administrar-categorias',
  templateUrl: './administrar-categorias.component.html',
  styleUrls: ['./administrar-categorias.component.scss']
})
export class AdministrarCategoriasComponent implements OnChanges {
  
  @Input() ver_categorias:boolean;
  @Output() cerrar_categorias= new EventEmitter<void>();
  //Variable que guarda las categorías de las solicitudes
  categorias_MA:Categoria[] | null;
  editar_categoria:boolean;
  //Categoria para editar
  categoria:Categoria | null;
  txt_nombreCat:string;
  mostrar_agregar:boolean;
  constructor(private servicio_MA:MesaAyudaService,private servicio_mensajes:MensajesService){
    this.categorias_MA = null;
    this.categoria=null;
    this.txt_nombreCat="";
    this.mostrar_agregar=false;
  }
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['categorias_MA']) {
      this.categorias_MA=this.servicio_MA.getCategorias();
    }  
  }
  ngOnInit(): void {
    this.limpiar_variables();
    this.categorias_MA=this.servicio_MA.getCategorias();
  }
  limpiar_variables():void{
    this.categorias_MA = null;
    this.editar_categoria=false;
    this.categoria=null;
    this.txt_nombreCat="";
    this.categorias_MA=this.servicio_MA.getCategorias();
  }
  cerrar(): void {
    this.ver_categorias=false;
    this.cerrar_categorias.emit();
    this.limpiar_variables();
  }
  mostrar_editar(cat:Categoria):void{
    if(cat!=null){
      this.categoria=cat;
      this.editar_categoria=true;
      this.txt_nombreCat=this.categoria.nombre;
    }  
    else{
      this.servicio_mensajes.msj_errorPersonalizado("No se ha encontrado la categoría");
    }
    
  }
  async editar(){
    if(this.txt_nombreCat.trim().length > 0){
      if(await this.servicio_mensajes.msj_confirmar("¿Guardar cambios?", "Confirmar", "Cancelar")){
        if(this.servicio_MA.editarCategoria(this.txt_nombreCat)){
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
  async eliminar(categoria:Categoria){
    this.categoria=categoria;
    if(this.categoria){
      if(await this.servicio_mensajes.msj_confirmar("¿Está seguro de eliminar la categoría?", "Confirmar", "Cancelar")){
        if(this.servicio_MA.eliminarCategoria(this.categoria.id_categoria)){
          this.servicio_mensajes.msj_exito("Se ha eliminado la categoría");
        }
        else{
          this.servicio_mensajes.msj_errorPersonalizado("Ha ocurrido un error al eliminar la categoría.")
        }
      }
    }
    else{
      this.servicio_mensajes.msj_errorPersonalizado("Ha ocurrido un error al buscar la categoría.")
    }
    
  }
  cerrar_editar():void{
    this.editar_categoria=false;
  }  
  mostrarAgregar():void{
    this.mostrar_agregar=true;
  }
  cerrarAgregar():void{
    this.mostrar_agregar=false;
  }  
  async agregar(nombre:string){
    if(nombre.trim().length>0){
      if(await this.servicio_mensajes.msj_confirmar("¿Está seguro de añadir la categoría?","Confirmar","Cancelar")){
        if(this.servicio_MA.agregarCategoria(nombre)){
          this.cerrarAgregar();
          this.servicio_mensajes.msj_exito("Se ha añadido la categoría");
        }
      }
    }
    else{
      this.servicio_mensajes.msj_datosErroneos();
    }
  }
}
