export class Noticia{
    id:number;
    titulo:string;
    fecha:string;
    descripcion:string;
<<<<<<< HEAD
    likes:number;
    apoyado:string;
    constructor(id:number, titulo:string, fecha:string, descripcion:string,likes:number, apoyado:string){
=======
    archivo: string;
    likes:number;
    apoyado:boolean;
    constructor(id:number, titulo:string, fecha:string, descripcion:string, archivo:string, likes:number, apoyado:boolean){
>>>>>>> 1ad3f51743e0b61bafd513abca7a085611b038c0
        this.id=id;
        this.titulo = titulo;
        this.fecha=fecha;
        this.descripcion= descripcion;  
<<<<<<< HEAD
=======
        this.archivo = archivo;
>>>>>>> 1ad3f51743e0b61bafd513abca7a085611b038c0
        this.likes= likes;
        this.apoyado= apoyado;
    }
}