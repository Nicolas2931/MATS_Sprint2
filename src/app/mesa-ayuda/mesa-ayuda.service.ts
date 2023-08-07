import { Injectable } from '@angular/core';
import { LoginService } from '../login.service';
import { Ticket } from './modelo-ticket';

@Injectable({
  providedIn: 'root'
})
export class MesaAyudaService {
  tickets:Ticket[] | null;
  constructor(private loginservice:LoginService) {
    this.tickets=null;
  }
  //Función que trae todos los tickets del usuario
  getTickets():Ticket[]|null{
    let usuario=this.loginservice.getToken();
    this. tickets=  [
      new Ticket(1, 101, 1, 1, 'Problema de red', 'No se puede acceder a la red', null, new Date('2023-08-01'), null, 1, 2),
      new Ticket(2, 102, 2, 3, 'Error en la aplicación', 'La aplicación se bloquea al iniciar', 201, new Date('2023-08-02'), new Date('2023-08-10'), 2, 1),
      new Ticket(3, 103, 1, 2, 'Solicitud de hardware', 'Necesito una nueva computadora', 202, new Date('2023-08-03'), null, 1, 3),
      new Ticket(4, 104, 3, 5, 'Problema de impresión', 'No se imprimen los documentos', null, new Date('2023-08-04'), null, 1, 2),
      new Ticket(5, 105, 2, 4, 'Error en la página web', 'El sitio web muestra un error al cargar', 203, new Date('2023-08-05'), new Date('2023-08-12'), 2, 1),
      new Ticket(6, 106, 1, 1, 'Solicitud de software', 'Necesito instalar un nuevo programa', 204, new Date('2023-08-06'), null, 1, 3),
      new Ticket(7, 107, 4, 8, 'Problema de correo electrónico', 'No recibo correos electrónicos', null, new Date('2023-08-07'), null, 1, 2),
      new Ticket(8, 108, 2, 2, 'Error en el formulario', 'El formulario de contacto no funciona', 205, new Date('2023-08-08'), new Date('2023-08-15'), 2, 1),
    ];
    return this.tickets;
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
  filtrar(estado:number, prioridad:number):Ticket[] | null{
    return null;
  }
  //Métodos que cambian los ID por los nombre
  getNombre_ID(id:number):string{
    let nombre="";
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
      categoria="Certificados";
    }
    else if(id==2){
      categoria="Aprobación proyecto de grado";
    }
    else if(id==3){
      categoria="Queja";
    }  
    else if(id==4){
      categoria="Otros";
    }  
    return categoria;
  }
  getItem_ID(id:number):string{
    let item:string="";
    if(id==1){
      item="Cancelación de materias";
    }
    else if(id==2){
      item="ABC";
    }
    else if(id==3){
      item="DEF";
    }
    else if(id==4){
      item="GHI";
    }
    else if(id==5){
      item="JKL";
    }
    else if(id==8){
      item="MNQ";
    }
    return item;
  }
  getResponsable_ID(id:number | null):string | null{
    let responsable:string | null = null;
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
    let prioridad: string = "";
    if (id == 1) {
        prioridad = "Baja";
    } else if (id == 2) {
        prioridad = "Media";
    } else if (id == 3) {
        prioridad = "Alta";
    }
    return prioridad;
}

  
}
