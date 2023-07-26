export class Noticia{
    id:number;
    titulo:string;
    fecha:string;
    descripcion:string;
    likes:number;
    apoyado:string;
    constructor(id:number, titulo:string, fecha:string, descripcion:string,likes:number, apoyado:string){
        this.id=id;
        this.titulo = titulo;
        this.fecha=fecha;
        this.descripcion= descripcion;  
        this.likes= likes;
        this.apoyado= apoyado;
    }
}