import { Component} from '@angular/core';
import { Categoria } from '../categoria.model';
import { PreguntasFrecuentesService } from '../preguntas-frecuentes.service';
import { Tarjeta } from '../tarjeta.model';
import { LoginService } from '../login.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-preguntas-frecuentes',
  templateUrl: './preguntas-frecuentes.component.html',
  styleUrls: ['./preguntas-frecuentes.component.scss']
})
export class PreguntasFrecuentesComponent {
  //Variable que almacena la busqueda que desea realizar el usuario
  txt_buscar:string;
  //Variable que guarda la cadena con el número de cheboxes activados
  txt_lista:string
  //Categorías guarda todas las categorías del sistema
  categorias:Categoria[];
  //Variable que guarda las tarjetas
  Tarjetas:Tarjeta[];
  //Ocultar o mostrar las opciones de la lista desplegable
  mostrarCheckboxes: boolean = false;
  //Ocualta o muestra la ventana emergente
  mostrarVentana:boolean;
  ventana_editar:boolean;
  //Usuario guarda el tipo de usuario que inicio sesión
  usuario:string;
  permiso_usuario:string;
  constructor(private preguntasService: PreguntasFrecuentesService, private loginService: LoginService){
    this.categorias = [];
    this.Tarjetas = []; 
    this.txt_buscar = "";
    this.txt_lista = "";
    this.mostrarVentana=false;
    this.ventana_editar=false;
    this.usuario=this.loginService.getTipoUsuario();
    this.permiso_usuario=this.loginService.getTipoUsuario();
  }
  //Método para inicializar las variables.
  ngOnInit(): void {
    this.txt_lista="Seleccione las categorías";
    this.categorias= this.preguntasService.obtener_categorias();
    this.Tarjetas=this.preguntasService.obtener_tarjetas();
  }
  //Método para buscar entre las tarjetas la que se adecue a lo ingresado por el usuario
  buscar(){
    const checkboxesActivos= this.categorias.filter(categoria => categoria.seleccionado);
    const totalCheckboxesActivos = checkboxesActivos.length;
    if(totalCheckboxesActivos>0){
      //Si hay algún checkbox activo se busca tambien por la categoría
      for(var i=0; i<totalCheckboxesActivos; i++){
        //Envíar el id de la categoría y la cadena 
        if(this.txt_buscar.trim().length>0){
          console.log(checkboxesActivos[i].id+this.txt_buscar);
        }
        else{
          //buscar solo las categorías
        }
      }

    }
    else if(this.txt_buscar.trim().length>0){
      //Buscar solo por cadena de texto
    }
  }
  //Cada vez que se activa un checkbox se ejecuta el filtro
  activar() {
    const checkboxesActivos = this.categorias.filter(categoria => categoria.seleccionado);
    const totalCheckboxesActivos = checkboxesActivos.length;
    if(totalCheckboxesActivos > 0) {
      this.txt_lista = `Categorías seleccionadas (${totalCheckboxesActivos})`;
    }
    else{
      this.txt_lista="Seleccione las categorías";
    }
  }
  //--------------------------Tarjetas------
  itemsPorPagina = 10; // Número de tarjetas a mostrar por página
  paginaActual = 1; // Página actual seleccionada

  // Método para obtener las tarjetas correspondientes a la página actual
  obtenerTarjetasPaginaActual():Tarjeta[] {
    const inicio = (this.paginaActual - 1) * this.itemsPorPagina;
    const fin = inicio + this.itemsPorPagina;
    return this.Tarjetas.slice(inicio, fin);
  }
  // Método para obtener el número total de páginas
  get totalPaginas(): number {
  return Math.ceil(this.Tarjetas.length / this.itemsPorPagina);
  }

  // Método para obtener el arreglo de números de página para la paginación
  get paginas(): number[] {
  const paginas: number[] = [];
  for (let i = 1; i <= this.totalPaginas; i++) {
    paginas.push(i);
  }
  return paginas;
  }

  //Función para mostrar todos los checkboxs
  showCheckboxes() {
    this.mostrarCheckboxes = !this.mostrarCheckboxes;
  }
  // Función para truncar el texto a las primeras 100 palabras
  truncarTexto(texto: string, palabrasMaximas: number): string {
    const palabras = texto.split(' ');
    if (palabras.length <= palabrasMaximas) {
      return texto;
    } else {
      return palabras.slice(0, palabrasMaximas).join(' ') + '...';
    }
  }
  //
  Tarjeta:Tarjeta | null;
  CategoriasPorTarjeta:Categoria[];
  verMas(tarjetaId: number) {
    this.CategoriasPorTarjeta=this.preguntasService.obtener_CategoriasPorTarjeta(tarjetaId);
    this.Tarjeta=this.preguntasService.ver_tarjeta(tarjetaId);
    this.mostrarVentana = true;
  }
  //---------------------------------------EDITAR TARJETA--------------------
  titulo:string;
  txt_editar:string;
  categoria_editar:Categoria[];
  descripcion:string;
  estudiantes:boolean=false;
  profesores:boolean=false;
  error_editar:boolean=false;
  editar(tarjetaId: number) {
    /*Primero verifica los usuarios a los que pertenece la tarjeta*/
    let id_tipo:number[]=[];
    id_tipo=this.preguntasService.getID_usuario_Tarjeta(tarjetaId);
    if(id_tipo[0]==2){
      this.profesores=true;
    }
    if(id_tipo[1]==3){
      this.estudiantes=true;
    }
    this.categoria_editar=this.preguntasService.obtener_categorias();
    const cat=this.preguntasService.obtener_CategoriasPorTarjeta(tarjetaId);
    for(var i=0;i<this.categoria_editar.length;i++){
      for(var j=0;j<cat.length;j++){
        if(this.categoria_editar[i].id==cat[j].id){
          this.categoria_editar[i].seleccionado=true;
          break;
        }
      }  
    }
    const checkboxesActivos = this.categoria_editar.filter(categoria => categoria.seleccionado);
    const totalCheckboxesActivos = checkboxesActivos.length;
    this.txt_editar = `Categorías seleccionadas (${totalCheckboxesActivos})`;

    this.Tarjeta = this.preguntasService.ver_tarjeta(tarjetaId);
    if (this.Tarjeta) {
      this.titulo = this.Tarjeta.titulo;
      this.descripcion = this.Tarjeta.descripcion;
    }

    this.ventana_editar = true;
  }
  activar_editar(){
    const checkboxesActivos = this.categoria_editar.filter(categoria => categoria.seleccionado);
    const totalCheckboxesActivos = checkboxesActivos.length;
    if(totalCheckboxesActivos > 0) {
      this.txt_editar = `Categorías seleccionadas (${totalCheckboxesActivos})`;
    }
    else{
      this.txt_editar="Seleccione las categorías";
    }
  }
  //Verifica y guarda los cambios de la tarjeta
  guardar(){
    let id_usuario:number[]=[];
    if(this.profesores){
      id_usuario[0] =2;
    }
    if(this.estudiantes){
      id_usuario[1]=3
    }
    if(this.titulo.trim().length > 0 && this.descripcion.trim().length > 0 && this.categoria_editar.length>0 && id_usuario.length>0) {
      this.error_editar=false;
      Swal.fire({
        title: '¿Está seguro que quiere guardar los cambios?',
        showDenyButton: true,
        showCancelButton: true,
        confirmButtonText: 'Guardar',
        denyButtonText: `No guardar`,
      }).then((result) => {
        /* Read more about isConfirmed, isDenied below */
        if (result.isConfirmed) {
          Swal.fire('Guardado!', '', 'success')
        } else if (result.isDenied) {
          Swal.fire('Los cambios no han sido guardados', '', 'info')
        }
      })
    }
    else{
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Por favor, verifique que la información ingresada sea la adecuada',
      })
      this.error_editar=true;
    }
  }

  calculateRows(texto: string): number {
    // Calcula el número de líneas dividiendo la longitud del texto por el ancho máximo de una línea
    const maxCharactersPerLine = 50; // Ajusta este valor según el ancho máximo deseado
    const numberOfLines = Math.ceil(texto.length / maxCharactersPerLine);

    // Devuelve el número de líneas como valor para el atributo rows del <textarea>
    return Math.max(3, numberOfLines-5); // Establece un mínimo de 3 líneas para evitar que sea muy pequeño
  }

  cerrarMas() {
    this.mostrarVentana= false;
  }
  cerrarEditar(){
    this.ventana_editar=false;

  }
}

