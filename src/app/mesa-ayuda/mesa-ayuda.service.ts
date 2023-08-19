import { Injectable } from '@angular/core';
import { LoginService } from '../login.service';
import { Ticket } from './modelo-ticket';
import { Categoria } from './modelo-categoriaMA';
import { Item } from './modelo-item';
import { Estado } from './modelo-estado';
import { responsable } from './modelo-responsable';
import { Prioridad } from './modelo-prioridad';
import { Comentario } from './modelo-comentario';
import { queja } from './modelo-queja';
import { usuario } from './modelo-usuario';
@Injectable({
  providedIn: 'root'
})
export class MesaAyudaService {
  //Variable que guarda los tickets
  tickets:Ticket[] | null;
  //variable que guarda la categoría
  categorias:Categoria[] | null;
  //Variable que guarda los items de las categorías
  items:Item[] | null;
  //Variable que almacena los comentarios de un ticket
  comentarios:Comentario[] | null;
  //Variable que almacena las quejas realizadas por los usuarios
  quejas:queja[] | null;
  constructor(private loginservice:LoginService) {
    this.tickets=null;
    this.categorias=null;
    this.items=null;
    this.comentarios=null;
    this.quejas=null;

  }
  //Método que retorna la fecha actual del sistemas
  getFechaActual():Date{
    return new Date();
  }
  //Función que trae todos los tickets del usuario
  getTickets_Usuario(correo:string):Ticket[]|null{
    let usuario=this.loginservice.getToken();
    console.log("El correo del usuario al cual se le buscara sus Ticket es:"+correo);
    this. tickets=  [
      new Ticket(10, 111, 3, 7, 'Certificado Estudiantil', 'Estimados responsables del departamento de Gestión Académica \nEspero que se encuentren bien.\n Me permito la presente para solicitar de manera formal la emisión de un certificado estudiantil. Mi nombre es Sara y soy estudiante del programa de  Sistematización en la facultad Tecnológica.El motivo de mi solicitud es obtener un certificado que respalde mi condición de estudiante en esta institución. El certificado es necesario para  presentar una postulación para una beca.\nAgradecería mucho su colaboración en este proceso y cualquier información adicional que requieran de mi parte. \nQuedo a disposición para proporcionar cualquier dato o documentación que sea necesaria para agilizar el proceso de emisión del certificado.\nQuedo atenta a su respuesta y agradezco de antemano su atención y apoyo en esta solicitud.\nSaludos cordiales\nSara Miler\nsmiller@udistital.edu.co\n745-XXX-XXX', null, new Date('2023-08-15'), null, 1,null),
      new Ticket(11, 111, 4, null,'Error en la página web', 'El sitio web muestra un error al cargar', 203, new Date('2023-08-05'), new Date('2023-08-12'), 2, 1),
      new Ticket(12, 111, 1, 2, 'Solicitud de hardware', 'Necesito una nueva computadora', null, new Date('2023-08-03'), null, 1,null),
    ];
    return this.tickets;
  }
  //Función que trae todos los tickets del usuario
  getTickets():Ticket[]|null{
    let usuario=this.loginservice.getToken();
    this. tickets=  [
      new Ticket(1, 101, 1, 1, 'Problema de red', 'No se puede acceder a la red', null, new Date('2023-08-01'), null, 1, 2),
      new Ticket(2, 102, 2, 4, 'Error en la aplicación', 'La aplicación se bloquea al iniciar', 201, new Date('2023-08-02'), new Date('2023-08-10'), 2, null),
      new Ticket(3, 103, 1, 2, 'Solicitud de hardware', 'Necesito una nueva computadora', 202, new Date('2023-08-03'), null, 1, 3),
      new Ticket(4, 104, 3, 7, 'Problema de impresión', 'No se imprimen los documentos', null, new Date('2023-08-04'), null, 1, 2),
      new Ticket(5, 105, 2, 5, 'Error en la página web', 'El sitio web muestra un error al cargar', 203, new Date('2023-08-05'), new Date('2023-08-12'), 3, 1),
      new Ticket(6, 106, 1, 3, 'Solicitud de software', 'Necesito instalar un nuevo programa', 204, new Date('2023-08-06'), null, 1, 3),
      new Ticket(7, 107, 4, 8, 'Problema de correo electrónico', 'No recibo correos electrónicos', null, new Date('2023-08-07'), null, 1, 2),
      new Ticket(8, 108, 2, 6, 'Error en el formulario', 'El formulario de contacto no funciona', 205, new Date('2023-08-08'), new Date('2023-08-15'), 2, 1),
    ];
    return this.tickets;
  }
  //Obtiene un ticket según su ID
  getTicket(id_ticket: number): Ticket | null {
    if (this.tickets === null) {
      return null; // Manejo cuando tickets es null
    }
    const ticket = this.tickets.find(ticket => ticket.token === id_ticket);
    if (ticket !== undefined) {
      return ticket;
    }
    return null;
  }
  //Método que retorna las categorías seleccionadas
  getCategorias():Categoria[] | null{
    this.categorias=[new Categoria(1,"Solicitud"), new Categoria(2,"Quejas"), new Categoria(3,"Documentos"),new Categoria(4,"Está no tiene items :v")];
    return this.categorias;
  }
  //Método para agregar una categoría
  agregarCategoria(nombre:string):boolean{
    console.log("La nueva categoria es"+nombre);
    return true;
  }
  //Método para editar las categorias
  editarCategoria(nombre:string):boolean {
    console.log("Nombre de la categoría:"+nombre);
    return true;
  }
  //Método para eliminar una categoría de las solicitudes
  eliminarCategoria(id_categoria:number):boolean {
    console.log("El ID de la categoría a eliminar es:"+id_categoria);
    return true;
  }  
  //Método que retorna todos los items registrados
  getItems(): Item[] | null{
    this.items = [
      new Item(1, "Cambio de grupo", 1),
      new Item(2, "Problema de acceso", 1),
      new Item(3, "Revisión de contrato", 1),
      new Item(4, "Falla en el servicio", 2),
      new Item(5, "Retraso en la entrega", 2),
      new Item(6, "Facturación incorrecta", 2),
      new Item(7, "Envío de informe", 3),
      new Item(8, "Solicitud de certificado", 3),
      new Item(9, "Revisión de documento", 3)
    ];
    return this.items;
  }
  //Método para agregar un item
  agregarItem(nombre:string, id_categoria:number):boolean {
    console.log("Nombre del ítem:"+nombre);
    console.log("id_categoria:"+id_categoria);
    return true;
  }
  //Método para editar los ítems
  editarItem(nombre:string,id_categoria:number):boolean {
    console.log("Nombre del ítem:"+nombre);
    console.log("ID de la categoría:"+id_categoria);
    return true;
  }
  //Método para eliminar ítems de una categoria
  eliminarItem(id_item:number):boolean {
    console.log("El ID del ítem a eliminar es:"+id_item);
    return true;
  }  
  //Método que trae los items según el ID de la categoría
  getItemsPorCategoria(id_categoria: number): Item[] | null {
    if(id_categoria == 1){
      this.items = [
        new Item(1, "Cambio de grupo", 1),
        new Item(2, "Problema de acceso", 1),
        new Item(3, "Revisión de contrato", 1)
      ];
      return this.items;
    }
    else if(id_categoria==2){
      this.items = [
        new Item(4, "Falla en el servicio", 2),
        new Item(5, "Retraso en la entrega", 2),
        new Item(6, "Facturación incorrecta", 2)
      ];
      return this.items;
    }
    else if(id_categoria==3){
      this.items = [
        new Item(7, "Envío de informe", 3),
        new Item(8, "Solicitud de certificado", 3),
        new Item(9, "Revisión de documento", 3)
      ];
      return this.items;
    }
    else{
      return null;
    }
    
  }  
  //Método que trae el nombre del usuario para la información personal
  getNombre_usuario():string{
    //Buscar el nombre del usuario según el método
    let nombre_usuario="Iron Man";
    return nombre_usuario;
  }
  //Método que permite al usuario editar su información personal
  editar_InformacionPersonal(nombre:string,correo:string):boolean{
    let error=false;
    console.log("Nombre del usuario:",nombre);
    console.log("Correo del usuario:",correo);
    return error;
  }
  //Función usada para filtrar la lista de solicitudes
  /*filtrar(prioridad:string | null,estado:string | null):{

  }*/
  //Método que retorna unos tickets según los filtros aplicados
  filtrar(filtros: any):Ticket[] | null{
    let filtrosSeleccionados = filtros;
    if(filtrosSeleccionados.prioridad!="null" || filtrosSeleccionados.estado!="null"){
      console.log("El ID prioridad es:"+filtrosSeleccionados.prioridad);
      console.log("El ID estado es:"+filtrosSeleccionados.estado);
      console.log("El correo del usuario a buscar es:"+filtrosSeleccionados.correo);
      //Retornar los tickets este es un ejemplo
      let tickets=  [
        new Ticket(1, 101, 1, 1, 'Problema de red', 'No se puede acceder a la red', null, new Date('2023-08-01'), null, 1, 2),
        new Ticket(2, 102, 2, 3, 'Error en la aplicación', 'La aplicación se bloquea al iniciar', 201, new Date('2023-08-02'), new Date('2023-08-10'), 2, 1),
        new Ticket(3, 103, 1, 2, 'Solicitud de hardware', 'Necesito una nueva computadora', 202, new Date('2023-08-03'), null, 1, 3)];
      return tickets;
    }
    else{
      return null;
    }
    
  }
  //Método para buscar un responsable según una descripción
  buscar_responsable(correo: string): responsable | null {
    // Datos estáticos
    const usuarios: responsable[] = [
      new responsable(1, 'John Doe', 'nrubios@udistrital.edu.co'),
      new responsable(2, 'Jane Smith', 'jane@example.com'),
      new responsable(3, 'Alice Johnson', 'alice@example.com')
    ];
  
    // Buscar el usuario por correo
    const usuarioEncontrado = usuarios.find(usuario => usuario.correo === correo);
  
    return usuarioEncontrado || null;
  }
  //Métodos que cambian los ID por los nombre
  getNombre_ID(id:number):string{
    let nombre="Juanito";
    if(id==101){
      nombre="Laura";
    }
    else if(id==102){
      nombre="Jaime";
    }  
    else if(id==103){
      nombre="Yulixa";
    }  
    else if(id==104){
      nombre="Estefanya";
    }  
    else if(id==105){
      nombre="Clauida";
    }  
    else if(id==106){
      nombre="Davic";
    }  
    else if(id==107){
      nombre="Jeisson";
    }  
    else if(id==108){
      nombre="Daniela";
    } 
    else if(id==111){
      nombre="Sara Miller";
    } 
    return nombre;
  }
  getCategoria_ID(id:number):string{
    let categoria:string="";
    if(id==1){
      categoria="Solicitud";
    }
    else if(id==2){
      categoria="Quejas";
    }
    else if(id==3){
      categoria="Documentos";
    }  
    else if(id==4){
      categoria="Otros (Sin items)";
    }  
    return categoria;
  }
  getItem_ID(id:number | null):string{
    let item:string="N/A";
    if(id==1){
      item="Cambio de grupo";
    }
    else if(id==2){
      item="Problema de acceso";
    }
    else if(id==3){
      item="Revisión de contrato";
    }
    else if(id==4){
      item="Falla en el servicio";
    }
    else if(id==5){
      item="Retraso en la entrega";
    }
    else if(id==7){
      item="Retraso en la entrega";
    }
    else if(id==8){
      item="Facturación incorrecta";
    }
    return item;
  }
  getResponsable_ID(id:number | null):responsable | null{
    let responsableEncontrado: responsable | null = null; // Inicializa con valor nulo
// Se busca al responsable por ID y se retorna en el objeto Responsable
    if (id == 201) {
      responsableEncontrado = new responsable(201, "Wanumen", "wanumen@gmail.com");
    }else if(id==202){
      responsableEncontrado = new responsable(202, "Sonia", "sonia@gmail.com");
    }
    else if(id==203){
      responsableEncontrado = new responsable(203, "Peter", "peter@gmail.com");
    }
    else if(id==204){
      responsableEncontrado = new responsable(204, "Mariluz", "mariluz@gmail.com");
    }
    else if(id==205){
      responsableEncontrado = new responsable(205, "Mireya", "mireya@gmail.com");
    }
    return responsableEncontrado;
  }
  getEstado_ID(id: number): string {
    let estado: string = "";
    if (id == 1) {
        estado = "Pendiente";
    } else if (id == 2) {
        estado = "En proceso";
    } else if (id == 3) {
        estado = "Completada";
    }
    return estado;
  }
  getEstados(): Estado[] {
    const estados: Estado[] = [
      new Estado(1, 'Pendiente'),
      new Estado(2, 'En proceso'),
      new Estado(3, 'Completada')
    ];
    return estados;
  }

getPrioridad_ID(id: number | null): string | null {
    let prioridad: string = "Sin asignar";
    if (id == 1) {
        prioridad = "Baja";
    } else if (id == 2) {
        prioridad = "Media";
    } else if (id == 3) {
        prioridad = "Alta";
    }
    return prioridad;
}
getPrioridades():Prioridad[]{
  const prioridad: Prioridad[]=[new Prioridad(null,"Sin asignar"),
  new Prioridad(1,"Baja"),
  new Prioridad(2,"Media"),
  new Prioridad(3,"Alta")
];
  return prioridad;
}
getComentarios(token: number): Comentario[] | null {
  this.comentarios = null;

  if (token == 1) {
    let comentario1 = new Comentario(1, "Envíar un correo a tecsistematizaciondedatos@gmail.com para solucionar la problematica", new Date());
    let comentario2 = new Comentario(2, "Otro comentario para el token 1", new Date());
    this.comentarios = [comentario1, comentario2];
  }
  if (token == 10) {
    let comentario1 = new Comentario(1, "Envíar un correo a tecsistematizaciondedatos@gmail.com para solucionar la problematica", new Date());
    let comentario2 = new Comentario(2, "Otro comentario para el token 1", new Date());
    this.comentarios = [comentario1, comentario2];
  }

  if (token == 2) {
    let comentario3 = new Comentario(3, "Comentario para el token 2", new Date());
    let comentario4 = new Comentario(4, "Otro comentario para el token 2", new Date());
    let comentario5 = new Comentario(5, "Tercer comentario para el token 2", new Date());
    this.comentarios = [comentario3, comentario4, comentario5];
  }

  return this.comentarios;
}
//Método para agregar un comentario
agregar_comentario(token:number,comentario:string):boolean{
  console.log("El token del ticket al cual se le agrega un comentario es:",token);
  console.log("El comentario es:",comentario);
  let numeroRandom = Math.floor(Math.random() * (50 - 5 + 1)) + 5;
  let comentario_nuevo=new Comentario (numeroRandom,comentario,new Date());
  if(this.comentarios){
    this.comentarios.push(comentario_nuevo);
  }
  else{
    this.comentarios=[comentario_nuevo];
  }
  return false;
}
//Método para editar un comentario
editar_comentario(id_comentario:number,comentario:string):boolean{
  if (this.comentarios) {
    const comentarioEncontrado = this.comentarios.find(c => c.id_comentario === id_comentario);
    if (comentarioEncontrado) {
      comentarioEncontrado.comentario = comentario;
      comentarioEncontrado.fecha=new Date();
      return false;
    }
    return true;
    
  }
  else{
    return true;
  }
} 
eliminar_comentario(id_comentario: number): boolean {
  // Supongamos que this.comentarios es tu arreglo de comentarios existente
  if (this.comentarios) {
    const index = this.comentarios.findIndex(c => c.id_comentario === id_comentario);
    if (index !== -1) {
      this.comentarios.splice(index, 1);
      return true; // Comentario eliminado exitosamente
    }
  }
  return false; // Comentario no encontrado
}

//----------------------CRUD TICKETS------------------------
crear_ticket(id_categoria:number,id_item:number | null,asunto:string,descripcion:string):boolean{
  //1.El Token no se tiene, porque se esta creando hasta el momento el ticket
  //2.Id_usuario-Invocar el método de conseguir ID usuario según el correo
  //3. Id_categoria,id_item,asunto y descripcion si se tienen
  //4. ID de responsable inicia siendo null
  /*
  5.Ya se tiene el método de conseguir la fecha actual
  6.la fecha limite empiza siendo null
  7.El ID del estado empieza siendo "1" (pendiente)
  8.El ID de la prioridad inicia como null
  */
  //Variable estática
  console.log("ID de la categoría",id_categoria);
  console.log("ID del item",id_item);
  console.log("Asunto",asunto);
  console.log("Descripcion",descripcion);
  console.log("Fecha:",this.getFechaActual());
  return false;
}
//Retorna true si se pudo editar
editar_ticket(token:number,id_usuario:number,id_categoria:number,id_item:number | null,asunto:string,descripcion:string, id_responsable:number | null, fecha_solicitud: Date, id_estado:number, id_prioridad:number | null, comentarios: Comentario[] | null):boolean{
  console.log("token:", token);
  console.log("id_usuario:", id_usuario);
  console.log("id_categoria:", id_categoria);
  console.log("id_item:", id_item);
  console.log("asunto:", asunto);
  console.log("descripcion:", descripcion);
  console.log("id_responsable:", id_responsable);
  console.log("fecha_solicitud:", fecha_solicitud);
  console.log("id_estado:", id_estado);
  console.log("id_prioridad:", id_prioridad);
  console.log("comentarios:", comentarios);
  return true;
}
//Retorna true si se pudo eliminar el Ticket
eliminar_ticket(token: number): boolean {
  console.log("El token del Ticket a eliminar es:"+token);
  return true;
}

formatoDateparaInput(date: Date): string {
  const year = date.getUTCFullYear();
  const month = String(date.getUTCMonth() + 1).padStart(2, '0');
  const day = String(date.getUTCDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

formatoInputDateparaSQL(inputDate: string): string {
  const parts = inputDate.split('-');
  const year = parts[0];
  const month = String(Number(parts[1])).padStart(2, '0');
  const day = String(Number(parts[2])).padStart(2, '0');
  return `${year}-${month}-${day}T00:00:00Z`;
}
//-----------------------------CRUD RECLAMOS
  getQuejas(): queja[] | null{
    this.quejas= [
      new queja(1,"Queja de ejemplo 1", "Descripción de la queja 1", false),
      new queja(2,"Queja de ejemplo 2", "Descripción de la queja 2", true),
      new queja(3,"Queja de ejemplo 3", "Descripción de la queja 3", false),
      new queja(4,"Queja de ejemplo 4", "Descripción de la queja 4", true),
      new queja(5,"Queja de ejemplo 5", "Descripción de la queja 5", false)
    ];
    return this.quejas;
  }
  reclamar(asunto:string, descripcion:string):boolean{
    let id_quejaAleatorio = 10 + ( Math.random() * (20 - 10 + 1));
    let reclamo= new queja(id_quejaAleatorio,asunto,descripcion,false);
    this.quejas?.push(reclamo);
    return true;
  }
  getReclamo(id_reclamo:number): queja | null{
    if(this.quejas!=null){
      let quejaEncontrada = this.quejas.find(queja => queja.id_queja === id_reclamo);
      return quejaEncontrada || null;
    }
    else{
      return null;
    } 
  }
  cambiar_estadoReclamo(id_reclamo: number, estado: boolean): boolean {
    if (this.quejas != null) {
      const quejaEncontrada = this.quejas.find(q => q.id_queja === id_reclamo);
      if (quejaEncontrada) {
        quejaEncontrada.visto = estado;
        return true;
      }
      return false; // Si no se encontró la queja con el ID especificado
    }
    return false; // Si el arreglo de quejas es null
  }

  buscar_usuario(correo:string): usuario  | null{
    if(correo="ejemplo@udistrital.edu.co"){
      let usu= new usuario(11,"Pepito perez","ejemplo@udistrital.edu.co","12345",3);
      return usu;
    }
    return null;
  }
  
}
