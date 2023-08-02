<<<<<<< HEAD
import { Component, ViewChild} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NoticiasService } from '../noticias.service';
import { PdfNoticiaComponent } from '../pdf-noticia/pdf-noticia.component';
=======
import { Component} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NoticiasService } from '../noticias.service';
>>>>>>> 1ad3f51743e0b61bafd513abca7a085611b038c0

@Component({
  selector: 'app-subir-noticia',
  templateUrl: './subir-noticia.component.html',
  styleUrls: ['./subir-noticia.component.scss']
})
<<<<<<< HEAD
export class SubirNoticiaComponent {
//Variables del checbox tipo de usuario
todos:boolean;
estudiantes: boolean;
profesores: boolean;

//Variable que guarda el titulo de la noticia
titulo:string;
descripcion:string;

//Variable que guarda
error:boolean;
pagina:string;
constructor(private router: Router,private servicioNoticia:NoticiasService, private routerURL: ActivatedRoute){
  this.estudiantes=false;
  this.profesores=false;
  this.todos=false;
  this.titulo="";
  this.descripcion="";
  this.error=false;
  this.routerURL.queryParams.subscribe(params => {
    this.pagina= params['pagina'];
  }); 
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

    const categorias:number[]=[];
    if(this.todos==true){
      categorias[0]=1;
      categorias[1]=2;
    }
    else if(this.estudiantes==true){
      categorias[0]=1;
    }
    else if(this.profesores==true){
      categorias[1]=2;
    }  

    this.servicioNoticia.subirNoticia(this.titulo,fecha,this.descripcion,categorias);

    //this.guardarPDF();
    this.volver();
  }
  else{
    this.error=true;
  }  
}
//Méotodo que enruta devuelta a noticias_generales
volver(){
  if(this.pagina=="Publico"){
    this.router.navigate(['/']);
  }
  else if(this.pagina=="UD"){
    this.router.navigate(['/Noticias_UD']);
  }
  else if(this.pagina="Interes"){
    this.router.navigate(['/Noticias_Interes']);
  }  
}

@ViewChild('pdfComponent') pdfComponent!: PdfNoticiaComponent; // Obtener referencia al componente hijo

guardarPDF() {
  // Verificar que el PDF esté cargado en el componente hijo antes de enviarlo al backend
  if (this.pdfComponent.selectedFile) {
    const pdfFile: File = this.pdfComponent.selectedFile;
    // Aquí puedes implementar la lógica para enviar el PDF al backend utilizando servicios o HTTP requests
    // Por ejemplo, puedes llamar a un método en el servicio que envíe el PDF al servidor
    // this.miServicio.enviarPDFAlBackend(pdfFile).subscribe(...);
  } else {
    // Manejo de error si el PDF no está cargado
    console.log('Error: No se ha seleccionado ningún archivo PDF.');
  }
}
=======
export class SubirNoticiaComponent{
  //Variables del checbox tipo de usuario
  todos:boolean;
  estudiantes: boolean;
  profesores: boolean;
  pagina:string;

  //Variable que guarda el titulo de la noticia
  titulo:string;
  descripcion:string;

  //Variable que guarda
  error:boolean;
  constructor(private router: Router,private servicioNoticia:NoticiasService, private routerURL: ActivatedRoute){
    this.estudiantes=false;
    this.profesores=false;
    this.todos=false;
    this.titulo="";
    this.descripcion="";
    this.error=false;
    this.routerURL.queryParams.subscribe(params => {
      this.pagina= params['pagina'];
    });
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
  
        const categorias:number[]=[];
        if(this.todos==true){
          categorias[0]=1;
          categorias[1]=2;
        }
        else if(this.estudiantes==true){
          categorias[0]=1;
        }
        else if(this.profesores==true){
          categorias[1]=2;
        }  
  
        this.servicioNoticia.subirNoticia(this.titulo,fecha,this.descripcion,categorias);
  
        //this.guardarPDF();
        this.volver();
      }
      else{
        this.error=true;
      }  
    }
  //Méotodo que enruta devuelta a noticias_generales
  volver(){
    if(this.pagina=="Publico"){
      this.router.navigate(['/']);
    }
    else if(this.pagina=="UD"){
      this.router.navigate(['/Noticias_UD']);
    }
    else if(this.pagina="Interes"){
      this.router.navigate(['/Noticias_Interes']);
    }
  }
  
>>>>>>> 1ad3f51743e0b61bafd513abca7a085611b038c0
}
