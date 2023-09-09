export class Ticket{
    token:number;
    id_usuario:number;
    id_categoria:number;
    id_item:number | null;
    asunto:string;
    descripcion:string;
    id_responsable:number;
    fecha_solicitud:Date;
    fecha_limite:Date;
    id_estado:number;
    id_prioridad:number;
    constructor(token: number,id_usuario: number,id_categoria: number,id_item: number | null,asunto: string,descripcion: string,id_responsable: number,fecha_solicitud: Date,fecha_limite: Date,id_estado: number,id_prioridad: number) {
        this.token = token;
        this.id_usuario = id_usuario;
        this.id_categoria = id_categoria;
        this.id_item = id_item;
        this.asunto = asunto;
        this.descripcion = descripcion;
        this.id_responsable = id_responsable;
        this.fecha_solicitud = fecha_solicitud;
        this.fecha_limite = fecha_limite;
        this.id_estado = id_estado;
        this.id_prioridad = id_prioridad;
    }
}