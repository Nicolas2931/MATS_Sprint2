import { Injectable } from '@angular/core';
import { Categoria } from './categoria.model';
import { Tarjeta } from './tarjeta.model';
import { ServicioBackService } from './servicio-back.service';

@Injectable({
  providedIn: 'root'
})
export class PreguntasFrecuentesService {
  private categorias: Categoria[];
  private tarjetas: Tarjeta[];
  private error_CRUD:boolean;
  constructor(private servicioBackService: ServicioBackService) {
    this.categorias = [];
    this.tarjetas = [];
    this.error_CRUD = false;
  }
  //Método que obtiene todas las categorías
  async obtener_categorias(){
    //Para borrar - Datos de prueba
    await this.servicioBackService.getCategorias().subscribe(categorias => {
      for(const categoria of categorias.data){
        this.categorias.push(new Categoria(categoria.id, categoria.nombre));
      }
      console.log(categorias);
    });
    
    
    
    /* this.categorias = [
      new Categoria(1, 'Matemáticas'),
      new Categoria(2, 'Física'),
      new Categoria(3, 'Química'),
      new Categoria(4, 'Biología'),
      new Categoria(5, 'Historia'),
      new Categoria(6, 'Literatura'),
      new Categoria(7, 'Geografía'),
      new Categoria(8, 'Inglés'),
      new Categoria(9, 'Informática'),
      new Categoria(10, 'Arte')
    ]; */
    return this.categorias;
  }
  //Trae todas las tarjetas de preguntas frecuentes
  obtener_tarjetas(){
    this.tarjetas = [
      new Tarjeta(1, 'Un dato totalmente innecesario xxx', 'Bootstrap no aplica bordes directamente a las filas (row). Las filas de Bootstrap son contenedores que ayudan a organizar y distribuir el contenido en columnas. Por defecto, las filas no tienen bordes visibles.Si estás viendo un borde en una fila, es probable que esté siendo causado por algún otro estilo personalizado o regla CSS en tu código. Puedes inspeccionar el elemento en tu navegador web para identificar qué regla CSS está aplicando el borde.Para quitar un borde que esté afectando la fila, puedes hacer lo siguienteVerifica si tienes alguna clase personalizada o regla CSS aplicada a la fila que esté causando el borde no deseado. Si encuentras alguna, puedes ajustar o eliminar esa regla para eliminar el borde.')
    ];
    return new Promise<any>((resolve) => {
      this.servicioBackService.getPreguntas("", "").subscribe(preguntas => {
        resolve(preguntas);
      });
    }).then(preguntas => new Promise<any>((resolve) => {
      console.log(preguntas);
      for(const pregunta of preguntas){
        this.tarjetas.push(new Tarjeta(pregunta.id, pregunta.titulo, pregunta.descripcion));
      }
      resolve(this.tarjetas);
    }));
    //return this.tarjetas;
  }
  //Método que trae las categorías por cada tarjeta
  obtener_CategoriasPorTarjeta(id_tarjeta:number):Categoria[]{
    let categorias:Categoria[] = [];
    /*
      Aquí se invocaría una consulta la cual traiga las categorías por cada tarjeta
    */
    if(id_tarjeta==1){
      categorias = [
        new Categoria(1, 'Matemáticas'),
        new Categoria(5, 'Historia'),
        new Categoria(10, 'Arte')
      ];
    }
    else{
      categorias = [
        new Categoria(5, 'Historia'),
        new Categoria(6, 'Literatura'),
        new Categoria(7, 'Geografía'),
        new Categoria(8, 'Inglés'),
        new Categoria(9, 'Informática'),
        new Categoria(10, 'Arte')
      ];

    }
    return categorias;
  }
  //Método que obtiene los id de los tipo de usuario que podran ver la tarjeta
  getID_usuario_Tarjeta(id_tarjeta:number):number[]{
    const id_tipo:number[]=[];
    if(id_tarjeta==1){
      id_tipo[0]=2;
      id_tipo[1]=3;
    }
    else{
      id_tipo[0]=2;
    }
    return id_tipo;
  }
  //Función que retorna una tarjeta según su ID
  ver_tarjeta(id_tarjeta: number): Tarjeta | null {
    let tarjeta: Tarjeta | null = null;
    for (let i = 0; i < this.tarjetas.length; i++) {
      if (id_tarjeta === this.tarjetas[i].id_tarjeta) {
        tarjeta = this.tarjetas[i];
        break;
      }
    }
    return tarjeta;
  }
  //Metodos que retornan si hubo un error al realizar alguna función CRUD
  setError(error:boolean):void{
    this.error_CRUD=error;
  }
  getError():boolean{
    return this.error_CRUD;
  }
  
  subir_tarjeta(titulo:string,descripcion:string,id_usuario:number[], categorias:Categoria[]):boolean{
    //Se filtra para saber cuales categorias fueron seleccionadas
    const categorias_ID = categorias.filter(categoria => categoria.seleccionado);
    console.log("Titulo",titulo);
    console.log("Descripción",descripcion);
    console.log("Id_usuario",id_usuario);
    console.log("Categoria",categorias_ID);
    this.setError(false);
    return this.getError();
  }
  //Edita una tarjeta según los datos recibidos
  //Enviar un error igual a TRUE en caso de que ocurra algo inesperado.
  editar_tarjeta(id_tarjeta:number,titulo:string,descripcion:string,id_usuario:number[], categorias:Categoria[]):boolean{
    //Se filtra para saber cuales categorias fueron seleccionadas
    const categorias_ID = categorias.filter(categoria => categoria.seleccionado);
    console.log("id_tarjeta",id_tarjeta);
    console.log("Titulo",titulo);
    console.log("Descripción",descripcion);
    console.log("Id_usuario",id_usuario);
    console.log("Categoria",categorias_ID);
    this.setError(false);
    return this.getError();
  }
  //Eliminar tarjeta según el ID seleccionado
  eliminar_tarjeta(id_tarjeta:number):boolean {
    console.log("Id de la tarjeta a eliminar: " + id_tarjeta);
    for(var i = 0; i < this.tarjetas.length; i++) {
      if(this.tarjetas[i].id_tarjeta==id_tarjeta){
        this.tarjetas.splice(i, 1);
        this.setError(false);
        break;
      }
      else{
        this.setError(true);
      }
    }  
    return this.getError();
  }  
  //Subir categoria
  subir_categoria(nombre:string):boolean {
    console.log("El nombre de la categoria es:" + nombre);
    this.servicioBackService.createCategoria(nombre).subscribe(data => {
      //alert(data.mensaje);
      //window.location.reload();
    });
    this.setError(false);
    return this.getError();
  }
  //Editar categoria
  editar_categoria(id_categoria:number,nombre:string):boolean{
    console.log("Id de la categoría"+id_categoria)
    console.log("Nombre"+nombre);
    this.setError(false);
    return this.getError();
  }
  //Eliminar categoria
  eliminar_categoria(id_categoria:number):boolean {
    console.log("Id de la categoría"+id_categoria)
    for(var i = 0; i < this.categorias.length; i++) {
      if(this.categorias[i].id==id_categoria){
        this.categorias.splice(i, 1);
        this.setError(false);
        break;
      }
      else{
        this.setError(true);
      }
    }  
    return this.getError();
  }
  //Buscar solo por categorias
  buscar_categoria(id_categoria:number):Tarjeta[]{
    return this.tarjetas;
  }
  //Buscar solo por texto
  buscar_texto(txt_buscar:string):Tarjeta[]{
    return this.tarjetas;
  }
  //Buscar por texto y categorías
  buscar(id_categoria:number,txt_buscar:string):Tarjeta[]{
    return this.tarjetas;
  }

}