export class Comentario{
    id_comentario:number;
    comentario:string;
    fecha:Date;
    constructor(id_comentario:number, comentario:string,fecha:Date){
        this.id_comentario = id_comentario;
        this.comentario = comentario;
        this.fecha =fecha;
    }
    
}   