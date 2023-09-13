import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Noticia } from './noticia.model';

@Injectable({
  providedIn: 'root'
})
export class ServicioBackService {

  private urlApi = 'http://127.0.0.1:8000/api';

  constructor(private http: HttpClient) { }

  public Apoyo(email: string, id_noticia: number){
    const form = {
      "usuario": email,
      "noticia": id_noticia
    }    
    console.log(true);

    return this.http.post<any>(this.urlApi + '/v1/apoyo?accion=agregar', form);
  }

  public DesApoyo(id_usuario: string, id_noticia: number){
    const form = {
      "usuario": id_usuario,
      "noticia": id_noticia
    }    
    //console.log(true);

    return this.http.post<any>(this.urlApi + '/v1/apoyo?accion=eliminar', form);
  }

  public getAllNoticiasUD(): Observable<any> {
    return this.http.get<any>(this.urlApi + '/v1/noticias');
  }
  public buscarAllNoticiasUD(cantidad: number, busqueda: string): Observable<any> {
    return this.http.get<any>(this.urlApi + '/v1/noticias' + '?buscar=' + busqueda + '&cantidad=' + cantidad);
  }
  public getAllNoticiasInteres(): Observable<any> {
    return this.http.get<any>(this.urlApi + '/v1/noticias?orden=likes');
  }
  public buscarAllNoticiasInteres(cantidad: number, busqueda: string): Observable<any> {
    return this.http.get<any>(this.urlApi + '/v1/noticias?orden=likes' + '&buscar==' + busqueda + '&cantidad=' + cantidad);
  }

  public getUsuario(usuario: string, contraseña: string){
    const form = {
      "email": usuario,
      "password": contraseña
    }
    return this.http.post<any>(this.urlApi + '/login', form);
  }

  public getDatosUsuario(correo: string, token: string){
    const headers = new HttpHeaders({
      'Accept': 'application/json',
      'Authorization': `Bearer ${token}`
    });

    return this.http.get<any>(this.urlApi + '/v1/users/'+ correo, { headers });
  }

  public getNoticiasGenerales(usuario: string, token: string, cantidad: number, busqueda: string){
    busqueda = busqueda ? busqueda : "";
    if(usuario == 'administrador' || usuario == '' ){
      return this.http.get<any>(this.urlApi + '/v1/tipo_usuario/1' + '?cantidad=' + cantidad + '&buscar=' + busqueda);
    }

    return this.http.get<any>(this.urlApi + '/v1/tipo_usuario/1?usuario=' 
              + token + '&cantidad=' + cantidad + '&buscar=' + busqueda);
  }

  public getNoticiasUD(token: string, cantidad: number, busqueda: string): Observable<any>{

    const headers = new HttpHeaders({
      'Accept': 'application/json',
      'Authorization': `Bearer ${token}`
    });

    busqueda = busqueda ? busqueda : "";

    return this.http.get(
      this.urlApi + '/v1/users?noticias=true' + '&cantidad=' + cantidad + '&buscar=' + busqueda, 
      { headers }
    );
  }

  public getNoticiasInteres(token: string, cantidad: number, busqueda: string): Observable<any>{

    const headers = new HttpHeaders({
      'Accept': 'application/json',
      'Authorization': `Bearer ${token}`
    });

    busqueda = busqueda ? busqueda : "";

    return this.http.get(
      this.urlApi + '/v1/users?noticias=true&orden=likes' + '&cantidad=' + cantidad + '&buscar=' + busqueda, 
      { headers }
    );
  }

  public setPDF(archivo: File, id_noticia: number){
    const form = new FormData();
    form.append('archivo', archivo);

    return this.http.post<any>(this.urlApi + '/v1/archivo/' + id_noticia, form).subscribe(
      response => {
        alert('archivo subido con exito '/* , response */);
      }, error => {
        alert('error al subir el archivo '/* , error */);
      }
    );
  }

  public setNoticia(datos: {noticia: Noticia, noticia_tipo: number[]}, id_noticia: number){
    console.log('primeros datos', datos);
    const envDatos = {
      "titulo": datos.noticia.titulo,
      "fecha": datos.noticia.fecha,
      "descripcion": datos.noticia.descripcion,
      "noticiaTipo": datos.noticia_tipo
    }
    return this.http.put<any>(this.urlApi + '/v1/noticias/' + id_noticia, envDatos);
  }

  public createNoticia(form: any){
    return this.http.post<any>(this.urlApi + '/v1/noticias/', form);
  }

  public deleteNoticia(id: number){
    return this.http.delete<any>(this.urlApi + '/v1/noticias/' + id);
  }

  public getCategorias(): Observable<any>{
    return this.http.get<any>(this.urlApi + '/v1/categorias');
  }

  public getCategoriasTarjeta(tarjeta: number){
    return this.http.get<any>(this.urlApi + '/v1/categorias' + '?tarjeta=' + tarjeta);
  }

  public createCategoria(nombre: string){
    const form = new FormData();
    form.append("nombre", nombre);
    return this.http.post<any>(this.urlApi + '/v1/categorias', form);
  }

  public editCategoria(id: number, nombre: string){
    const form = {
      "nombre": nombre
    }

    return this.http.put<any>(this.urlApi + '/v1/categorias/' + id, form);
  }

  public deleteCategoria(id: number){
    return this.http.delete<any>(this.urlApi + '/v1/categorias/' + id);
  }

  public getPreguntas(tipo_usuario: string, categoria: number[], busqueda: string): Observable<any>{
    const parametros = categoria.join(",");
    
    
    if(tipo_usuario != "" && categoria.length != 0){
      console.log(this.urlApi + '/v1/tarjetas' + '?tipoUsuario=' + tipo_usuario + '&categorias=' + parametros + '&buscar=' + busqueda);
      return this.http.get<any>(this.urlApi + '/v1/tarjetas' + '?tipoUsuario=' + tipo_usuario + '&categorias=' + parametros + '&buscar=' + busqueda);
    }
    else if(tipo_usuario != ""){
      return this.http.get<any>(this.urlApi + '/v1/tarjetas' + '?tipoUsuario=' + tipo_usuario + '&buscar=' + busqueda);
    }
    else if(categoria.length != 0){
      return this.http.get<any>(this.urlApi + '/v1/tarjetas' + '?categorias=' + parametros + '&buscar=' + busqueda);
    }
    return this.http.get<any>(this.urlApi + '/v1/tarjetas' + '&buscar=' + busqueda);
  }

  public buscarTiposUsuario_Tarjeta(id_tarjeta: number){
    return this.http.get<any>(this.urlApi + '/v1/tarjetas/' + id_tarjeta);
  }

  public editarTarjeta(id_tarjeta:number,titulo:string,descripcion:string,id_usuario:number[], categorias:number[]){
    const form = {
      "titulo": titulo,
      "descripcion": descripcion,
      "usuarios": id_usuario,
      "categorias": categorias
    }

    return this.http.put<any>('http://localhost:8000/api/v1/tarjetas/' + id_tarjeta, form);
  }

  public deleteTarjeta(id_tarjeta:number){
    return this.http.delete(this.urlApi + '/v1/tarjetas/' + id_tarjeta);
  }

  public getTicketsUsuario(email: string){
    
    return this.http.get<any>(this.urlApi + '/v1/tickets' + '?user=' + email);
  }

  public getCategoriaTK(id: number){
    return this.http.get<any>(this.urlApi + '/v1/categoriasTK/' + id);
  }

  public getItem(id: number | null){

    return this.http.get<any>(this.urlApi + '/v1/items/' + id);
  }

  public getResponsableTicket(email: string){
    
    return this.http.get<any>(this.urlApi + '/v1/tickets' + "?responsable=" + email);
  }
}

