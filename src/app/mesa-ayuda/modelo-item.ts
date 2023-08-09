export class Item{
    id_item:number;
    nombre:string;
    id_categoria:number;
    constructor(id_item:number, nombre:string, id_categoria:number){
        this.id_item=id_item;
        this.nombre=nombre;
        this.id_categoria=id_categoria;
    }

}