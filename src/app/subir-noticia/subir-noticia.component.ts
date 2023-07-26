import { Component} from '@angular/core';
import { Router } from '@angular/router';
import { NoticiasService } from '../noticias.service';

@Component({
  selector: 'app-subir-noticia',
  templateUrl: './subir-noticia.component.html',
  styleUrls: ['./subir-noticia.component.css']
})
export class SubirNoticiaComponent{
  //Variables del checbox tipo de usuario
  todos:boolean;
  estudiantes: boolean;
  profesores: boolean;

  //Variable que guarda el titulo de la noticia
  titulo:string;
  descripcion:string;

  //Variable que guarda
  error:boolean;
  constructor(private router: Router,private servicioNoticia:NoticiasService){
    this.estudiantes=false;
    this.profesores=false;
    this.todos=false;
    this.titulo="";
    this.descripcion="";
    this.error=false;
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
  getFecha(){
    const fecha = new Date();
    return fecha.toISOString().substr(0, 10); // Convertir la fecha en un formato válido para el input de tipo "date"
  }
  /*
    Invocar el método de subir noticia por cada tipo de usuario
  */
  subir_noticia(){
    if(this.titulo.length > 0 && this.descripcion.length>0 && (this.todos!==false || this.estudiantes!==false || this.profesores!==false)){
      this.error=false;
      let fecha:string;
      fecha=this.getFecha();
      this.servicioNoticia.subirNoticia(this.titulo,fecha,this.descripcion);
      this.volver();
    }
    else{
      this.error=true;
    }  
  }
  //Méotodo que enruta devuelta a noticias_generales
  volver(){
    let identificador=this.servicioNoticia.getIdentificador();
    if(identificador=="Publico"){
      this.router.navigate(['/']);
    }
    else if(identificador=="UD"){
      this.router.navigate(['/Noticias_UD']);
    }
    else if(identificador=="Interes"){
      this.router.navigate(['/Noticias_Interes']);
    }  
  }
  
}
