import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

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

  public getNoticiasGenerales(){
    return this.http.get<any>(this.urlApi + '/v1/tipo_usuario/1');
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
}
