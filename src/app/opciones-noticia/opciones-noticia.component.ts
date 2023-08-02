import { AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { NoticiasService } from '../noticias.service';
import { Noticia } from '../noticia.model';
<<<<<<< HEAD
import { LoginService } from '../login.service';
import { PdfNoticiaComponent } from '../pdf-noticia/pdf-noticia.component';
=======
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { LoginService } from '../login.service';
import { PDFNoticiaComponent } from '../pdf-noticia/pdf-noticia.component';
>>>>>>> 1ad3f51743e0b61bafd513abca7a085611b038c0
@Component({
  selector: 'app-opciones-noticia',
  templateUrl: './opciones-noticia.component.html',
  styleUrls: ['./opciones-noticia.component.scss']
})
<<<<<<< HEAD
export class OpcionesNoticiaComponent implements OnInit,AfterViewInit {
//Variable que desactiva o activa la edición de la informaciónd de la noticia
=======
export class OpcionesNoticiaComponent implements OnInit,AfterViewInit{
  //Variable que desactiva o activa la edición de la informaciónd de la noticia
>>>>>>> 1ad3f51743e0b61bafd513abca7a085611b038c0
  //dependiendo de si el usuario seleciono la opción de "ver" o de "editar".
  desactivar:boolean;
  //Variable que guarda la noticia que el usuario vaya a ver o editar.
  noticia:Noticia;
  //Variables del checbox tipo de usuario
  todos:boolean;
  estudiantes: boolean;
  profesores: boolean;
<<<<<<< HEAD
  opcion:string;
  constructor(private route: Router, private routerURL: ActivatedRoute, private servicioNoticia: NoticiasService, private loginService: LoginService){
=======
  noticias:Noticia[];
  pagina:string;

  public pdfUrl: string = `http://localhost:8000/api/v1/archivo/`;

  constructor(private route: Router, private routerURL: ActivatedRoute, private servicioNoticia: NoticiasService, private sanitizer: DomSanitizer, private loginService: LoginService){
>>>>>>> 1ad3f51743e0b61bafd513abca7a085611b038c0
    //Para borrar
    this.estudiantes=false;
    this.profesores=false;
    this.todos=false;
    //
    this.error = false;
  }
  //Varaible que guarda el ID de la noticia
<<<<<<< HEAD
  private id_noticia:number;
  //Variable que guarda ver o editar dependiendo de la opción seleccionada
=======
  id_noticia:number;
  //Variable que guarda ver o editar dependiendo de la opción seleccionada
  private opcion:string;
>>>>>>> 1ad3f51743e0b61bafd513abca7a085611b038c0
  //Varible que guarda error si los datos que se envían están incompletos
  error:boolean;
  //Variable que guarda el titulo y descripción de la noticia
  titulo:string;
  descripcion:string;
  fecha:string;
<<<<<<< HEAD
  //Para borrar
  noticias:Noticia[];
  pagina:string;
=======
  
>>>>>>> 1ad3f51743e0b61bafd513abca7a085611b038c0
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
<<<<<<< HEAD
    this.noticias=this.servicioNoticia.getNoticias(this.loginService.getTipoUsuario(),this.pagina);
    this.noticia=this.servicioNoticia.getNoticia(this.id_noticia);
    //Para cargar los checkboxs
    const categorias=this.servicioNoticia.getNoticia_Tipo(this.id_noticia);
    if(this.opcion=="editar" && categorias.length>0){
      for(var i=0;i<categorias.length;i++){
        if(categorias[i]==1){
          this.todos=true;
          break;
        }
        if(categorias[i]==3){
          this.estudiantes=true;
        }
        else if(categorias[i]==2){
          this.profesores=true;
        }
      }
    }  
    this.titulo=this.noticia.titulo;
    this.descripcion=this.noticia.descripcion;
    this.fecha=this.noticia.fecha;

  }
=======
    this.servicioNoticia.getNoticias(this.loginService.getTipoUsuario(),this.pagina, this.loginService.getTipoUsuario()).then((data) => {
      this.noticias = data;

      this.noticia=this.servicioNoticia.getNoticia(this.id_noticia);
      console.log(this.noticia);
      //Para cargar los checkboxs
      const categorias=this.servicioNoticia.getNoticia_Tipo(this.id_noticia);
      if(this.opcion=="editar" && categorias.length>0){
        for(var i=0;i<categorias.length;i++){
          if(categorias[i]==1){
            this.todos=true;
            break;
          }
          if(categorias[i]==3){
            this.estudiantes=true;
          }
          else if(categorias[i]==2){
            this.profesores=true;
          }
        }
      }
      
      
      this.titulo=this.noticia.titulo;
      this.descripcion=this.noticia.descripcion;
      this.fecha=this.noticia.fecha;
    });
  }

  getPDF(id: number): SafeResourceUrl {
    return this.sanitizer.bypassSecurityTrustResourceUrl(this.pdfUrl + id);
  }

>>>>>>> 1ad3f51743e0b61bafd513abca7a085611b038c0
  volver(){
    if(this.pagina=="Publico"){
      this.route.navigate(['/']);
    }
    else if(this.pagina=="UD"){
      this.route.navigate(['/Noticias_UD']);
    }
    else if(this.pagina="Interes"){
      this.route.navigate(['/Noticias_Interes']);
<<<<<<< HEAD
    }  
=======
    }
>>>>>>> 1ad3f51743e0b61bafd513abca7a085611b038c0
  }
  getIdNoticia(){
    return this.id_noticia;
  }
  getOpcion(){
    return this.opcion;
  }
  //Método que guarda la información modificada
  guardar(){
    if(this.titulo.trim().length > 0 && this.descripcion.trim().length>0 && (this.todos!==false || this.estudiantes!==false || this.profesores!==false)){
      this.error=false;
      this.noticia.titulo=this.titulo;
      this.noticia.descripcion=this.descripcion;
      this.noticia.fecha=this.fecha;

      //Cambiar luego
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
      this.servicioNoticia.editarNoticia(this.noticia.id,this.noticia,categorias);
<<<<<<< HEAD
      //this.guardarPDF();
=======
      this.guardarPDF();
>>>>>>> 1ad3f51743e0b61bafd513abca7a085611b038c0
      this.volver();
    }
    else{
      this.error=true;
<<<<<<< HEAD
    }
  }
=======
    }
  }
>>>>>>> 1ad3f51743e0b61bafd513abca7a085611b038c0
  //Método usado para activar todos los checkbox en caso de que se seleccione la opción de "Todos"
  activar_todos(){
    if(this.todos==false){
      this.estudiantes=true;
      this.profesores=true;
      this.todos=true;
    }
    else{
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
<<<<<<< HEAD
  @ViewChild('pdfComponent') pdfComponent!: PdfNoticiaComponent; // Obtener referencia al componente hijo
=======

  @ViewChild('pdfComponent') pdfComponent!: PDFNoticiaComponent; // Obtener referencia al componente hijo
>>>>>>> 1ad3f51743e0b61bafd513abca7a085611b038c0

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
<<<<<<< HEAD
    }
  }

}
=======
    }
  }

}

>>>>>>> 1ad3f51743e0b61bafd513abca7a085611b038c0
