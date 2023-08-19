import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { MensajesService } from 'src/app/mensajes.service';
import { MesaAyudaService } from '../mesa-ayuda.service';
import { queja } from '../modelo-queja';
@Component({
  selector: 'app-reclamos',
  templateUrl: './reclamos.component.html',
  styleUrls: ['./reclamos.component.scss']
})
export class ReclamosComponent implements OnChanges {
  //Variables que contrarlan la apertura o cierre de la ventana para crear quejas.
  @Input() abrir_realizarReclamo: boolean;
  @Output() cerrar_realizarReclamo = new EventEmitter<void>();
  //Variables que contrarlan la apertura o cierre de la ventana de lista de quejas
  @Input() lista_reclamos: boolean;
  @Output() cerrar_listaReclamos = new EventEmitter<void>();
  //Variable que controla la apertura o cierre de la ventana con los detalles del reclamo
  detalles_reclamo:boolean;
  //Guardan el asunto y descripción de los reclamos
  asunto: string;
  descripcion: string;
  //Varaible usada para aplicar estilo de borde rojo en caso de que haya error
  error_crearReclamo: boolean;
  //Variable que guarda si alguna operación con el servicio fue realizada de forma correcta
  operacion_existosa: boolean;
  //Variable que guarda las quejas realizadas por los usuarios
  quejas: queja[] | null;
  //Guarda la cantidad de quejas registradas.
  cantidad_quejas:number;
  //Guarda los valores de una queja
  reclamo:queja | null;
  //Guarda si una queja fue vista o no
  estado_reclamo:boolean;
  constructor(private mensajes:MensajesService, private Servicio_MA:MesaAyudaService){
    this.quejas=null;
    this.cantidad_quejas=0;
    this.reclamo=null;
  }
  //Método que verifica si hay cambios recargar las quejas cargadas
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['lista_reclamos'] && changes['lista_reclamos'].currentValue === true) {
      this.quejas=this.Servicio_MA.getQuejas();
      if(this.quejas!=null){
        this.cantidad_quejas=this.quejas.length;
      } 
      else{
        this.cantidad_quejas=0;
      } 
    }
  }
  ngOnInit(): void {
      this.asunto="";
      this.descripcion="";
      this.error_crearReclamo=false;
      this.operacion_existosa=false;
      this.detalles_reclamo=false;
      this.quejas=this.Servicio_MA.getQuejas();
      if(this.quejas!=null){
        this.cantidad_quejas=this.quejas.length;
      } 
      else{
        this.cantidad_quejas=0;
      } 
  }
  async reclamar(){
    if(this.asunto.trim().length > 0 && this.descripcion.trim().length > 0){
      this.error_crearReclamo=false;
      if(await this.mensajes.msj_confirmar("¿Está seguro que desea registrar la queja?", "Confirmar", "Cancelar")){
        this.operacion_existosa=this.Servicio_MA.reclamar(this.asunto,this.descripcion);
        if(this.operacion_existosa==true){
          this.mensajes.msj_exito("Se ha registrado el reclamo");
          this.cerrar_crearReclamo();
        }
        else{
          this.mensajes.msj_errorPersonalizado("No se ha registrado el reclamo, error en el servido.");
        }
      }
    }
    else{
      this.error_crearReclamo=true;
      this.mensajes.msj_errorPersonalizado("Debe ingresar un asunto y una descripción para crear la queja");
    }
  }
  cerrar_crearReclamo(): void {
    this.abrir_realizarReclamo = false;
    this.asunto="";
    this.descripcion="";
    this.error_crearReclamo=false;
    this.operacion_existosa=false;
    this.cerrar_realizarReclamo.emit();
  }
  cerrar_listaQuejas(): void {
    this.quejas=null;
    this.cerrar_listaReclamos.emit();
  }
  ver_queja(id_queja:number){
    this.reclamo=this.Servicio_MA.getReclamo(id_queja);
    if(this.reclamo!=null){
      this.detalles_reclamo=true;
      this.estado_reclamo=this.reclamo.visto;
    }
    else{
      this.mensajes.msj_informar("No se encontrado la queja en los registros.");
    }
  }
  async guardar(){
    if(this.reclamo!=null){
      if(await this.mensajes.msj_confirmar("¿Guardar cambios?", "Sí, guardar", "Cancelar")){
        if(this.Servicio_MA.cambiar_estadoReclamo(this.reclamo.id_queja,this.estado_reclamo)){
          this.cerrar_verQueja();
          this.mensajes.msj_exito("Se han guardado los cambios");
          
        }
        else{
          this.mensajes.msj_informar("No se han guardado los cambios");
        }
      }
      
    }
  }
  cerrar_verQueja(){
    this.detalles_reclamo=false;
    this.reclamo=null;
  }
  marcar_visto(event:any) {
    this.estado_reclamo=event.target.value;
  }
}
