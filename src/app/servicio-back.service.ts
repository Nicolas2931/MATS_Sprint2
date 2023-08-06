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

  public Apoyo(id_usuario: string, id_noticia: number){
    const form = {
      "usuario": id_usuario,
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
  public getAllNoticiasInteres(): Observable<any> {
    return this.http.get<any>(this.urlApi + '/v1/noticias?orden=likes');
  }

  public getUsuario(usuario: string, contraseña: string){
    const form = {
      "email": usuario,
      "password": contraseña
    }

    return this.http.post<any>(this.urlApi + '/login', form);
  }

  public getNoticiasGenerales(usuario: string, token: string){
    if(usuario == 'administrador'){
      return this.http.get<any>(this.urlApi + '/v1/tipo_usuario/1');
    }

    return this.http.get<any>(this.urlApi + '/v1/tipo_usuario/1?usuario=' + token);
  }

  public getNoticiasUD(token: string): Observable<any>{

    const headers = new HttpHeaders({
      'Accept': 'application/json',
      'Authorization': `Bearer ${token}`
    });

    return this.http.get(this.urlApi + '/v1/users?noticias=true', { headers });
  }

  public getNoticiasInteres(token: string): Observable<any>{

    const headers = new HttpHeaders({
      'Accept': 'application/json',
      'Authorization': `Bearer ${token}`
    });

    return this.http.get(this.urlApi + '/v1/users?noticias=true&orden=likes', { headers });
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
    return this.http.put(this.urlApi + '/v1/noticias/' + id_noticia, envDatos);
  }
}
