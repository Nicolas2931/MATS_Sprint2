import { Injectable } from '@angular/core';
import { Noticia } from './noticia.model';
import { LoginService } from './login.service';
import { ServicioBackService } from './servicio-back.service';
//import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})

//rubio puto

export class NoticiasService {
  private noticias:Noticia[];
  //Variable que guarda si las noticias ya fueron cargadas en la pestaña o no.
  private noticiasCargadas:boolean;
  //Variable que guarda la pestaña actual del usuario
  private identificador:string;
  private noticia_tipo: number[];

  constructor(private loginService:LoginService/*private http: HttpClient*/, private servicioBackService: ServicioBackService) {
    this.noticiasCargadas=false;
    this.identificador='';
    this.noticias=[];
    this.noticia_tipo = [];
  }
  /*
    Modificar de acuerdo a las noticias
    que se obtendran.
  */
  getNoticiasGenerales(){
    //Pasar 1
    return new Promise<any>((resolve, reject) => {
      this.servicioBackService.getNoticiasGenerales().subscribe((data) => {
        resolve(data);
      })
    }).then((data) =>{
      /* for(const noticia of data.data.noticias){
        this.noticias.push(new Noticia(noticia.id, noticia.titulo, noticia.fecha, noticia.descripcion, noticia.archivo, noticia.likes, ''));
      } */
      this.noticias = data.data.noticias;
    });
  }
  getNoticiasUD(token:string){
    //Paso 2 o 3
    return new Promise<any>((resolve, reject) => {
      this.servicioBackService.getNoticiasUD(token).subscribe((data) => {
        resolve(data.data.noticias);
      });
    }).then((data) => {
      this.noticias = data;
    });    
  }
  getNoticiasInteres(token:string){
    return new Promise<any>((resolve, reject) => {
      this.servicioBackService.getNoticiasInteres(token).subscribe((data) => {
        resolve(data.data.noticias);
      });
    }).then((data) => {
      this.noticias = data;
    });
  }

  getAllNoticiasUD(){
    return new Promise<any>((resolve, reject) => {
      this.servicioBackService.getAllNoticiasUD().subscribe((data) => {
        resolve(data.data);
      });
    }).then((data) => {
      this.noticias = data;
    });
  }
  getAllNoticiasInteres(){
    return new Promise<any>((resolve, reject) => {
      this.servicioBackService.getAllNoticiasInteres().subscribe((data) => {
        resolve(data.data);
      });
    }).then((data) => {
      this.noticias = data;
    });
  }
  getIdentificador(){
    return this.identificador;
  }
  setIdentificador(identificador:string){
    this.identificador = identificador;
  }
  //Método que obtiene las noticias según la pestaña en la cual se encuentrá el usuario
  async getNoticias(usuario:string, identificador:string, permiso:string){
    /*
      if(identificador=="generales"){
        this.noticias=this.getNoticiasGenerales();
      }
      else if(identificador=="ud"){
        this.noticias=this.getNoticiasUD(usuario);
      }
      else if(identificador=="interes"{
        this.noticias=this.getNoticiasInteres(usuario);
      }
    */
    if(!this.noticiasCargadas){
      this.noticiasCargadas=true;
      if(identificador=="Publico"){
        //En publico se traen las noticias de tipo publico
        
        await this.getNoticiasGenerales();
        
       
        /* this.noticias.push(this.noticia1);
        this.noticias.push(this.noticia2); */
      }
      
        /*
          Dependiendo de la pestaña traera unas noticias distintas al usuario
        */
      else if(identificador=="UD" && usuario != 'administrador'){
        await this.getNoticiasUD(this.loginService.getToken());
      }
      else if(identificador=="Interes" && usuario != 'administrador'){
        await this.getNoticiasInteres(this.loginService.getToken());
      }
      else if(identificador=="UD" && (usuario == 'administrador' || permiso == '1')){
        await this.getAllNoticiasUD();
      } 
      else if(identificador=="Interes" && (usuario == 'administrador' || permiso == '1')){
        await this.getAllNoticiasInteres();
      }
    }
    return this.noticias;
  }

  getNoticia_Tipo(id_noticia: number): number[] {
    this.noticia_tipo=[];
    if (id_noticia == 1) {
      this.noticia_tipo[0] = 1;
      this.noticia_tipo[1] = 2;
    }
    return this.noticia_tipo;
  }

  //Método que retorna una notica, es utilizado cuando se quiere ver o editar una noticia
  getNoticia(id_noticia: number) {
    let noticia: Noticia | undefined; // Usamos el tipo 'Noticia | undefined' para permitir que la variable sea undefined en caso de no encontrar la noticia.
    for (let i = 0; i < this.noticias.length; i++) {
      if (id_noticia === this.noticias[i].id) {
        noticia = this.noticias[i];
        break; // Una vez que se encuentra la noticia, se sale del bucle.
      }
    }
    if (noticia === undefined) {
      // Si no se encontró la noticia, puedes manejar el caso de error aquí, ya sea lanzando una excepción o devolviendo un valor predeterminado.
      throw new Error('La noticia con el ID proporcionado no fue encontrada');
      // O, en lugar de lanzar una excepción, podrías devolver un valor predeterminado:
      // return null; // Si es seguro que 'Noticia' no puede ser null, puedes crear una noticia vacía con un constructor o utilizar 'undefined'.
    }
    return noticia;
  }
  
  //Pasar el archivo PDF al Backend
  /*enviarArchivo(archivo: File) {
    const formData = new FormData();
    formData.append('archivo', archivo);

    return this.http.post('URL_DEL_ENDPOINT', formData);
  }*/
  getNoticiasCargadas(){
    return this.noticiasCargadas;
  }
  setNoticiasCargadas(carga:boolean){
    this.noticiasCargadas=carga;
  }

  //Método para subir una noticia
  /*
    Tengo que verificar que la noticia se suba 
    al grupo de noticias correcto.
  */

  subirNoticia(titulo:string,fecha:string,descripcion:string,noticia_tipo:number[]){
    let id_random:number;
    id_random= Math.floor(Math.random()*(20-10+1))+10;
    let noticia:Noticia = new Noticia(id_random,titulo,fecha,descripcion,'',0,false);
    this.noticias.push(noticia);    
    let id_noticia=1; //Conseguir el id de la noticia para subir sus categorias
    for(let i=0; i<noticia_tipo.length;i++){
      console.log(noticia_tipo[i]+"-"+id_noticia);
    }
  }
  editarNoticia(id_noticia:number, noticia:Noticia, noticia_tipo:number[]){
    for (let i = 0; i < this.noticias.length; i++) {
      if (id_noticia === this.noticias[i].id) {
        this.noticias[i] = noticia;
        break; // Una vez que se encuentra la noticia, se sale del bucle.
      }
    }
    //For para insertar el tipo de noticia a la tabla de noticia
    for(let i=0; i<noticia_tipo.length;i++){
      console.log(noticia_tipo[i]+"-"+id_noticia);
    }
  }
  eliminarNoticia(id_noticia:number){
    for (let i = 0; i < this.noticias.length; i++) {
      if (id_noticia === this.noticias[i].id) {
        this.noticias.splice(i, 1);
        break; // Una vez que se encuentra la noticia, se sale del bucle.
      }
    }
  }

}

