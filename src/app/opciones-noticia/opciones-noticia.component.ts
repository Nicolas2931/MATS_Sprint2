import { AfterViewInit, Component, OnInit} from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { NoticiasService } from '../noticias.service';
import { Noticia } from '../noticia.model';
import { LoginService } from '../login.service';
@Component({
  selector: 'app-opciones-noticia',
  templateUrl: './opciones-noticia.component.html',
  styleUrls: ['./opciones-noticia.component.css']
})
export class OpcionesNoticiaComponent implements OnInit,AfterViewInit{
  //Variable que desactiva o activa la edición de la informaciónd de la noticia
  //dependiendo de si el usuario seleciono la opción de "ver" o de "editar".
  desactivar:boolean;
  //Variable que guarda la noticia que el usuario vaya a ver o editar.
  noticia:Noticia;
  //Variables del checbox tipo de usuario
  todos:boolean;
  estudiantes: boolean;
  profesores: boolean;
  constructor(private route: Router, private routerURL: ActivatedRoute, private servicioNoticia: NoticiasService, private loginService: LoginService){
    //Para borrar
    this.estudiantes=false;
    this.profesores=false;
    this.todos=false;
    //
    this.error = false;
  }
  //Varaible que guarda el ID de la noticia
  private id_noticia:number;
  //Variable que guarda ver o editar dependiendo de la opción seleccionada
  private opcion:string;
  //Varible que guarda error si los datos que se envían están incompletos
  error:boolean;
  //Variable que guarda el titulo y descripción de la noticia
  titulo:string;
  descripcion:string;
  fecha:string;
  //Para borrar
  noticias:Noticia[];
  pagina:string;
  ngOnInit(){
    this.routerURL.queryParams.subscribe(params => {
      this.opcion = params['opcion'];
      this.pagina= params['pagina'];
    });  
    this.id_noticia = parseInt(this.routerURL.snapshot.params['id']);
    if(this.opcion=="editar"){
      this.desactivar=false;
    }else if(this.opcion=="ver"){
      this.desactivar=true;
    }
    this.noticias=this.servicioNoticia.getNoticias(this.loginService.getTipoUsuario(),this.pagina);
    this.noticia=this.servicioNoticia.getNoticia(this.id_noticia);
    this.titulo=this.noticia.titulo;
    this.descripcion=this.noticia.descripcion;
    this.fecha=this.noticia.fecha;

  }
  volver(){
    if(this.pagina=="Publico"){
      this.route.navigate(['/']);
    }
    else if(this.pagina=="UD"){
      this.route.navigate(['/Noticias_UD']);
    }
    else if(this.pagina="Interes"){
      this.route.navigate(['/Noticias_Interes']);
    }  
  }
  getIdNoticia(){
    return this.id_noticia;
  }
  getOpcion(){
    return this.opcion;
  }
  //Método que guarda la información modificada
  guardar(){
    if(this.titulo.length > 0 && this.descripcion.length>0 && (this.todos!==false || this.estudiantes!==false || this.profesores!==false)){
      this.error=false;
      this.noticia.titulo=this.titulo;
      this.noticia.descripcion=this.descripcion;
      this.noticia.fecha=this.fecha;
      this.servicioNoticia.editarNoticia(this.noticia.id,this.noticia);
      this.volver();
    }
    else{
      this.error=true;
    }
  }
  //Método usado para activar todos los checkbox en caso de que se seleccione la opción de "Todos"
  activar_todos(){
    if(this.todos==false){
      this.estudiantes=true;
      this.profesores=true;
      this.todos=true;
    }
    else{
      this.estudiantes=false;
      this.profesores=false;
      this.todos=false;
    }
  }
  

  /*
  Método que ajusta el tamaño del textarea que 
  contiene la descripción de la noticia para que sea
  igual de grande a está.
  */
  ngAfterViewInit(): void {
    this.adjustTextareaHeight();
  }
  adjustTextareaHeight() {

    const textareatitulo = document.getElementById('titulo') as HTMLTextAreaElement;
    textareatitulo.style.height = 'auto';
    textareatitulo.style.height = `${textareatitulo.scrollHeight}px`;

    const textarea = document.getElementById('descripcion') as HTMLTextAreaElement;
    textarea.style.height = 'auto';
    textarea.style.height = `${textarea.scrollHeight}px`;
  }
 

}
