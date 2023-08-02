import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
//Módulo usado para realizar solicitudes HTTP al Backend
//import { HttpClient } from '@angular/common/http';
<<<<<<< HEAD
=======
import { Observable } from 'rxjs';
import { ServicioBackService } from './servicio-back.service';
>>>>>>> 1ad3f51743e0b61bafd513abca7a085611b038c0
@Injectable({
  providedIn: 'root'
})
export class LoginService {
  //Corresponde al Token generado por la base de datos
  private token:string;
  //Corresponde al tipo de usuario: Estudiante, Profesor, Administrador
  //Variable usada para la obtención de noticias
<<<<<<< HEAD
  private tipo_usuario:string;
  //Permisos de el usuario: Variable usada para saber si el usuario podrá
  //subir,editar y eliminar noticias.
  private permiso_usuario:string;

  constructor(/*private http: HttpClient,*/private route:Router, private cookies:CookieService, private cookie_usuario:CookieService, private cookie_permiso:CookieService) {
    this.token="";
    this.tipo_usuario="";
    this.permiso_usuario="";
  }
  //Variable que tiene la URL del Backend
  //***private apiUrl = environment.apiUrl;
  login(usuario:string, password:string)/*:Observable<any>*/{
    //***const data = { usuario, password };
    //***return this.http.post(`${this.apiUrl}/login`, data);
    //consulta en la base de datos
    //generar Token
    /*
    1.Se verifica si es de la tabla administrador
    if(!==""){
      this.token=
      this.permiso_usuario="Administrativo";
      this.tipo_usuario="Administrador";
    } //Se mira si es un profesor o un estudiante
    else if(){

    }
    */
    if(usuario=='20202578024' && password=="20202578024"){
      //solo si encuentra el usuario le genero token
      this.token = usuario;
      this.tipo_usuario="Estudiante";
      this.permiso_usuario="2";
      
    }
    if(usuario=='20202578025' && password=="20202578025"){
      //solo si encuentra el usuario le genero token
      this.token = usuario;
      this.tipo_usuario="Profesor";
      this.permiso_usuario="1";
      
    }
    if(usuario=='20202578026' && password=="20202578026"){
      //solo si encuentra el usuario le genero token
      this.token = usuario;
      this.tipo_usuario="Administrador";
      this.permiso_usuario="1";
      
    } //En el caso de que no se encuentre el usuario este será de tipo público.
    this.cookies.set("token", this.token);
    this.cookie_usuario.set("tipo_usuario",this.tipo_usuario);
    this.cookie_permiso.set("permiso_usuario",this.permiso_usuario);
=======
  private tipo_usuario:any;
  //Permisos de el usuario: Variable usada para saber si el usuario podrá
  //subir,editar y eliminar noticias.
  private permiso_usuario: number;

  private data: any;
  private id: number;

  constructor(private route:Router, private cookies:CookieService, private cookie_usuario:CookieService, private cookie_permiso:CookieService, private servicioBackService: ServicioBackService, private cookie_id:CookieService) {
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
        console.log('pailas mi loco');
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

>>>>>>> 1ad3f51743e0b61bafd513abca7a085611b038c0
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
<<<<<<< HEAD
  getToken(){
    return this.cookies.get("token");
  }
=======

  getToken(){
    return this.cookies.get("token");
  }
  
>>>>>>> 1ad3f51743e0b61bafd513abca7a085611b038c0
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
<<<<<<< HEAD
    this.permiso_usuario="";
    this.cookies.set("token",this.token);
    this.cookie_usuario.set("tipo_usuario",this.tipo_usuario);
    this.cookie_permiso.set("permiso_usuario",this.permiso_usuario);
    this.route.navigate(['/']);
    location.reload();
  }
}
=======
    this.permiso_usuario=0;
    this.cookies.set("token",this.token);
    this.cookie_usuario.set("tipo_usuario",this.tipo_usuario);
    this.cookie_permiso.set("permiso_usuario", "");
    this.route.navigate(['/']);
    location.reload();
  }
}
>>>>>>> 1ad3f51743e0b61bafd513abca7a085611b038c0
