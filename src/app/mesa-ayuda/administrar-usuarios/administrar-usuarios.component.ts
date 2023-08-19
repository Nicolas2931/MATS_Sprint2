import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { MesaAyudaService } from '../mesa-ayuda.service';
import { MensajesService } from 'src/app/mensajes.service';
import { usuario } from '../modelo-usuario';

@Component({
  selector: 'app-administrar-usuarios',
  templateUrl: './administrar-usuarios.component.html',
  styleUrls: ['./administrar-usuarios.component.scss']
})
export class AdministrarUsuariosComponent implements OnInit{
  @Input() ventana_administrar:boolean;
  @Output() ventanaAdministrarCerrada= new EventEmitter<void>();
  //Variable que abre o cierra la ventana para crear un usuario
  ventana_crearUsuario:boolean;
  ventana_crear:boolean;
  //Variable que guarda si un usuario fue encontrado o no
  encontrado:boolean;
  //Guarda la información del usuario
  usuario: usuario  | null;
  //Variables que guardan la información del usuario
  txt_nombre:string;
  txt_correo:string;
  txt_nuevapassword:string;
  id_tipo:number | null;
  //Cambia botones
  bloquear:boolean;
  constructor(private router: Router, private servicio_MA:MesaAyudaService, private servicio_mensajes:MensajesService){

  }
  ngOnInit(): void {
      this.limpiar_variables();
  }
  //Metodo que limpiar los campos y reinicializa las variables
  limpiar_variables(){
    this.ventana_crearUsuario=false;
    this.ventana_crear=false;
    this.encontrado=false;
    this.usuario=null;
    this.encontrado=false;
    this.txt_nombre="";
    this.txt_correo="";
    this.txt_nuevapassword=""
    this.id_tipo=null;
    //Inicia siendo true para que el disabled este activo
    this.bloquear=true;
  }
  crear_usuario(){
    this.ventana_crear=true;
  }
  cerrar_crear(){
    this.ventana_crear=false;
  }
  cerrar(): void {
    this.ventana_administrar=false;
    this.ventanaAdministrarCerrada.emit();
    this.limpiar_variables();
  }

  
  buscar(txt_buscar:string):void {
    this.usuario=this.servicio_MA.buscar_usuario(txt_buscar);
    if(this.usuario!=null){
      this.encontrado=true;
      this.txt_nombre=this.usuario.nombre;
      this.txt_correo=this.usuario.correo;
      this.txt_nuevapassword="";
      this.id_tipo=this.usuario.id_tipo;
      console.log("ID tipo"+this.id_tipo);
    }
    else{
      this.encontrado=false;
      this.servicio_mensajes.msj_informar("No se ha encontrado el correo del usuario ingresado");
    }
  }
  //Funcion que cambia los botones en caso de que se vaya a editar
  editar(){
    this.bloquear=false;
  }
}
