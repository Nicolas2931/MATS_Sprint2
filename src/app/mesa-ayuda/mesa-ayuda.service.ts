import { Injectable } from '@angular/core';
import { LoginService } from '../login.service';
import { Ticket } from './modelo-ticket';
import { Categoria } from './modelo-categoriaMA';
import { Item } from './modelo-item';

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
  constructor(private loginservice:LoginService) {
    this.tickets=null;
    this.categorias=null;
    this.items=null;
  }
  //Método que retorna la fecha actual del sistemas
  getFechaActual():Date{
    return new Date();
  }
  //Función que trae todos los tickets del usuario
  getTickets():Ticket[]|null{
    let usuario=this.loginservice.getToken();
    this. tickets=  [
      new Ticket(1, 101, 1, 1, 'Problema de red', 'No se puede acceder a la red', null, new Date('2023-08-01'), null, 1, 2),
      new Ticket(2, 102, 2, 4, 'Error en la aplicación', 'La aplicación se bloquea al iniciar', 201, new Date('2023-08-02'), new Date('2023-08-10'), 2, 1),
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
  //Método que retorna todos los items registrados
  getItems(){
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
      categoria="Otros";
    }  
    return categoria;
  }
  getItem_ID(id:number):string{
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
    else if(id==8){
      item="Facturación incorrecta";
    }
    return item;
  }
  getResponsable_ID(id:number | null):string | null{
    let responsable:string | null = "Sin asignar";
    if(id==201){
      responsable="Wanumen";
    }else if(id==202){
      responsable="Sonia";
    }
    else if(id==203){
      responsable="Peter";
    }
    else if(id==204){
      responsable="Mariluz";
    }
    else if(id==205){
      responsable="Mireya";
    }
    return responsable;
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

getPrioridad_ID(id: number | null): string | null {
    if (id === null) {
        return null;
    }
    let prioridad: string = "Sin asingar";
    if (id == 1) {
        prioridad = "Baja";
    } else if (id == 2) {
        prioridad = "Media";
    } else if (id == 3) {
        prioridad = "Alta";
    }
    return prioridad;
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
formatDateparaInput(date: Date): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

formatInputDateparaSQL(inputDate: string): string {
  const parts = inputDate.split('-');
  const year = parts[0];
  const month = String(Number(parts[1])).padStart(2, '0');
  const day = String(Number(parts[2])).padStart(2, '0');
  return `${year}-${month}-${day} 00:00:00`;
}
  
}
