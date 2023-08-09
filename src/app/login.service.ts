import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { ServicioBackService } from './servicio-back.service';
import { MensajesService } from './mensajes.service';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  //Corresponde al Token generado por la base de datos
  private token:string;
  //Corresponde al tipo de usuario: Estudiante, Profesor, Administrador
  //Variable usada para la obtención de noticias
  private tipo_usuario:any;
  //Permisos de el usuario: Variable usada para saber si el usuario podrá
  //subir,editar y eliminar noticias.
  private permiso_usuario: number;

  private data: any;
  private id: number;

  constructor(private route:Router, private cookies:CookieService, private cookie_usuario:CookieService, private cookie_permiso:CookieService, private servicioBackService: ServicioBackService, private cookie_id:CookieService, private mensajes_servicio:MensajesService) {
    this.token="";
    this.tipo_usuario={};
    this.permiso_usuario=0;
  }
  //Variable que tiene la URL del Backend
  //***private apiUrl = environment.apiUrl;

  recolectar(usuario:string, password:string){
    return new Promise<void>((resolve, reject) => {
      this.servicioBackService.getUsuario(usuario, password).subscribe((data) => {
        this.data = data;
        resolve();
      }, error => {
        this.mensajes_servicio.msj_datosErroneos();
        console.log(error.status);
      });
    }).then(() => {
      console.log(this.data);

      if(this.data.message == "ok"){
        this.cookie_id.set('id_usuario', usuario);
        console.log(this.getIdUsuario());
        this.token = this.data.token;
        this.tipo_usuario = this.data.tipo_usuario;
        this.permiso_usuario = this.data.permiso;
      }else{
        this.mensajes_servicio.msj_informar('pailas mi loco');
        this.token = '';
      }

      this.cookies.set("token", this.token);
      this.cookie_usuario.set("tipo_usuario",this.tipo_usuario.perfil);
      this.cookie_permiso.set("permiso_usuario", this.permiso_usuario.toString());
    })
  }

  getIdUsuario(){
    return this.cookie_id.get('id_usuario');
  }

  async login(usuario:string, password:string){

    const promesa = await this.recolectar(usuario, password);

    return this.cookies.get("token");
  }
  //Esto debería volver la cookie
  getTipoUsuario(){
    return this.cookie_usuario.get("tipo_usuario");
  }
  //Usado para saber si el usuario puede acceder a lo servicios de la comunidad 
  estaLogueado(){
    return this.cookies.get("token");
  }

  getToken(){
    return this.cookies.get("token");
  }
  
  //Retorna el tipo de permiso del usuario
  getPermisoUsuario(){
    return this.cookie_permiso.get("permiso_usuario");
  }
  //Métodos que modifican el valor de las cookies
  setTipoUsuario(tipo_usuario:string){
    this.cookie_usuario.set("tipo_usuario",tipo_usuario);
  }
  setPermisoUsuario(permiso_usuario:string){
    this.cookie_permiso.set("permiso_usuario",permiso_usuario);
  }
  //Al finalizar sesión se borran las cookies y se redirige al Home de la página
  logout(){
    this.token="";
    this.tipo_usuario="";
    this.permiso_usuario=0;
    this.cookies.set("token",this.token);
    this.cookie_usuario.set("tipo_usuario",this.tipo_usuario);
    this.cookie_permiso.set("permiso_usuario", "");
    this.route.navigate(['/']);
    location.reload();
  }
}
