import { Component, OnInit } from '@angular/core';
import { Categoria } from '../categoria.model';
import { PreguntasFrecuentesService } from '../preguntas-frecuentes.service';
import { Tarjeta } from '../tarjeta.model';

@Component({
  selector: 'app-preguntas',
  templateUrl: './preguntas.component.html',
  styleUrls: ['./preguntas.component.css']
})
export class PreguntasComponent {
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
//
private id_tarjeta:number;

constructor(private preguntasService: PreguntasFrecuentesService){
  this.categorias = [];
  this.Tarjetas = []; 
  this.txt_buscar = "";
  this.txt_lista = "";
  this.id_tarjeta=0;
}
//Método para inicializar las variables.
ngOnInit(): void {
  this.txt_lista="Seleccione las categorías";
  this.categorias = this.preguntasService.obtener_categorias();
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
getId_tarjeta(){
  return this.id_tarjeta;
}
setId_tarjeta(id_tarjeta:number){
  this.id_tarjeta=id_tarjeta;
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
//openModal()
/*
abrirModal(content:any,id:number){
  this.setId_tarjeta(id);
  this.modalService.open(content);
}*/
}
