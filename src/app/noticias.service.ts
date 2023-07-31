import { Injectable } from '@angular/core';
import { Noticia } from './noticia.model';
import { LoginService } from './login.service';
//import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class NoticiasService {
  private noticias:Noticia[];
  //Variable que guarda si las noticias ya fueron cargadas en la pestaña o no.
  private noticiasCargadas:boolean;
  //Variable que guarda la pestaña actual del usuario
  private identificador:string;
  //Variable que guarda el id_noticia
  private id_noticia:number;
  constructor(private loginService:LoginService/*private http: HttpClient*/) {
    this.noticiasCargadas=false;
    this.identificador='';
    this.noticias=[];
    this.id_noticia=0;
  }
  noticia1:Noticia =
  new Noticia(1,"Investigadores de la Universidad XYZ descubren posible cura para el cáncer"
  ,"2023-02-01",
  "Un equipo de científicos de la Universidad XYZ ha realizado un avance significativo en la búsqueda de una cura para el cáncer. Sus estudios preliminares han revelado una terapia innovadora que muestra resultados prometedores en pruebas de laboratorio.",
  300,'');
  noticia2:Noticia=new Noticia(2,"Estudiante de la Universidad ABC gana prestigioso premio de matemáticas",
  "2023-07-02",
  "Juan Pérez, estudiante de último año de la Universidad ABC, ha sido galardonado con el Premio Nacional de Matemáticas por su destacado trabajo en el campo de la teoría de números. Este premio reconoce su talento y dedicación a la excelencia académica.",250,'Apoyado');
  noticia3:Noticia=new Noticia(3,"Nueva conferencia sobre inteligencia artificial en la Universidad XYZ",
  "2023-02-03",
  "La Universidad XYZ organizará una conferencia de dos días sobre los avances más recientes en inteligencia artificial. El evento contará con destacados expertos en el campo y brindará una plataforma para el intercambio de conocimientos y la discusión de ideas innovadoras.",250,'Apoyado');
  noticia4:Noticia=new Noticia(4,"Investigadores de la Universidad ABC descubren nueva especie de mariposa",
  "2023-02-04",
  "Un equipo de biólogos de la Universidad ABC ha identificado una nueva especie de mariposa en una remota región de la selva amazónica. Este descubrimiento destaca la importancia de la conservación de los ecosistemas y la biodiversidad."
  ,250,'Apoyado');
  noticia5:Noticia=new Noticia(5,"Concurso de diseño sostenible en la Facultad de Arquitectura",
  "2023-02-05",
  "La Facultad de Arquitectura de la Universidad XYZ organizará un concurso para fomentar la innovación en el diseño sostenible. Los estudiantes tendrán la oportunidad de presentar sus propuestas y contribuir a la creación de entornos más ecológicos y respetuosos con el medio ambiente."
  ,250,'Apoyado');
  noticia6:Noticia=new Noticia(6,"Investigadores de la Universidad ABC publican estudio sobre cambio climático",
  "2023-02-06",
  "Un equipo de científicos de la Universidad ABC ha publicado un estudio integral sobre los efectos del cambio climático en los ecosistemas costeros. Sus hallazgos destacan la urgencia de abordar este problema global y proponen posibles soluciones basadas en la conservación y la mitigación.",250,'');
  noticia7:Noticia=new Noticia(7,"Jornada de voluntariado en la Universidad XYZ",
  "2023-02-07",
  "La Universidad XYZ organizará una jornada de voluntariado para promover el servicio comunitario entre los estudiantes. Los participantes colaborarán en proyectos sociales y brindarán apoyo a organizaciones locales, fortaleciendo así el compromiso cívico y la responsabilidad social.",250,'');
  noticia8:Noticia=new Noticia(8,"Nueva exposición de arte en el campus de la Universidad ABC",
  "2023-02-08",
  "El Departamento de Bellas Artes de la Universidad ABC inaugurará una emocionante exposición de arte contemporáneo en el campus. La muestra contará con obras de reconocidos artistas locales e internacionales, brindando a la comunidad académica una experiencia cultural enriquecedora.",250,'Apoyado');
  noticia9:Noticia=new Noticia(9,"Conferencia sobre medicina personalizada en la Universidad XYZ",
  "2023-02-09",
  "La Universidad XYZ acogerá una conferencia especializada en medicina personalizada, explorando los avances y desafíos en este campo de rápido crecimiento. Los asistentes tendrán la oportunidad de aprender de expertos líderes en la industria y descubrir nuevas perspectivas en el cuidado de la salud.",250,'Apoyado');
  noticia10:Noticia=new Noticia(10,"Estudiantes de la Universidad ABC obtienen becas para estudiar en el extranjero",
  "2023-02-10",
  "Varios estudiantes destacados de la Universidad ABC han sido seleccionados para recibir becas que les permitirán realizar estudios en el extranjero durante el próximo año académico. Esta oportunidad les brindará una experiencia educativa internacional y les abrirá nuevas puertas en sus carreras.",250,'Apoyado');
  noticia11:Noticia=new Noticia(11,"Estudiantes de la Universidad Santo Tomas obtienen becas para estudiar en el extranjero",
  "2023-02-11",
  "Atención, varios estudiantes destacados de la Universidad ABC han sido seleccionados para recibir becas que les permitirán realizar estudios en el extranjero durante el próximo año académico. Esta oportunidad les brindará una experiencia educativa internacional y les abrirá nuevas puertas en sus carreras.",250,'');
  /*
    Modificar de acuerdo a las noticias
    que se obtendran.
  */
  getNoticiasGenerales(){
    //Pasar 1
    let noticiasGenerales:Noticia[] = [];
    return noticiasGenerales;
  }
  getNoticiasUD(tipo_usuario:string){
    //Paso 2 o 3
    let noticiasUD:Noticia[] = [];
    return noticiasUD;
  }
  getNoticiasInteres(tipo_usuario:string){
    let noticiasInteres:Noticia[] = [];
    return noticiasInteres;
  }
  getIdentificador(){
    return this.identificador;
  }
  setIdentificador(identificador:string){
    this.identificador = identificador;
  }
  //Método que obtiene las noticias según la pestaña en la cual se encuentrá el usuario
  getNoticias(usuario:string, identificador:string){
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
        /*
          this.noticias=this.getNoticiasGenerales();
        */
        this.noticias.push(this.noticia1);
        this.noticias.push(this.noticia2);
      }
      if(this.loginService.getTipoUsuario() =="Estudiante" /*|| this.loginService.getTipoUsuario()=="Profesor"*/ && this.loginService.getPermisoUsuario()!=="Administrativo"){
        /*
          Dependiendo de la pestaña traera unas noticias distintas al usuario
        */
        if(identificador=="UD"){
          //En UD se traen las noticias para ese tipo de usuario
          /*
            this.noticias=this.getNoticiasUD(ID_tipo_usuario);
          */
          this.noticias.push(this.noticia3);
          this.noticias.push(this.noticia4);
          this.noticias.push(this.noticia5);
        }
        else if(identificador=="Interes"){
          //En UD se traen las noticias para ese tipo de usuario
          /*
            this.noticias=this.getNoticiasInteres(ID_tipo_usuario);
          */
          this.noticias.push(this.noticia6);
        }  
      }
      /*
      else if(this.loginService.getPermisoUsuario()=="Administrativo"){
          this.noticias=getNoticiasAdmin();
      }
      */
      else if(usuario =="Profesor"){
        if(identificador=="UD"){
          this.noticias.push(this.noticia7);
          this.noticias.push(this.noticia8);
          this.noticias.push(this.noticia9);
        }
        else if(identificador=="Interes"){
          this.noticias.push(this.noticia10);
        }
      }
      else if(usuario =="Administrador"){
        if(identificador=="UD"){
          this.noticias.push(this.noticia1);
          this.noticias.push(this.noticia2);
          this.noticias.push(this.noticia3);
          this.noticias.push(this.noticia4);
          this.noticias.push(this.noticia5);
          this.noticias.push(this.noticia6);
        }
        else if(identificador=="Interes"){
          this.noticias.push(this.noticia7);
          this.noticias.push(this.noticia8);
          this.noticias.push(this.noticia9);
          this.noticias.push(this.noticia10);
          this.noticias.push(this.noticia11);
        }
      }
  }
    return this.noticias;
  }

  //Método que retorna una notica, es utilizado cuando se quiere ver o editar una noticia
  getNoticia(id_noticia: number) {
    console.log("Entro con el ID"+id_noticia);
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
  //Método set y get del id_noticia
  getId_noticia(){
    return this.id_noticia;
  }
  setId_noticia(id_noticia:number){
    this.id_noticia = id_noticia;
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

  subirNoticia(titulo:string,fecha:string,descripcion:string){
    let id_random:number;
    id_random= Math.floor(Math.random()*(20-10+1))+10;
    let noticia:Noticia = new Noticia(id_random,titulo,fecha,descripcion,0,'');
    this.noticias.push(noticia);    
  }
  editarNoticia(id_noticia:number, noticia:Noticia){
    for (let i = 0; i < this.noticias.length; i++) {
      if (id_noticia === this.noticias[i].id) {
        this.noticias[i] = noticia;
        break; // Una vez que se encuentra la noticia, se sale del bucle.
      }
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

