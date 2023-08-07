import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { LoginService } from './login.service';
import { PreguntasFrecuentesComponent } from './preguntas-frecuentes/preguntas-frecuentes.component';
import { CookieService } from 'ngx-cookie-service';
import { PreguntasFrecuentesService } from './preguntas-frecuentes.service';
import { LoginComponent } from './login/login.component';
import { LoginGuardian } from './login/login-guardian';
import { NoticiasComponent } from './noticias/noticias.component';
import { FiltroNoticiasComponent } from './filtro-noticias/filtro-noticias.component';
import { NoticiasGeneralesComponent } from './noticias-generales/noticias-generales.component';
import { PaginaErrorComponent } from './pagina-error/pagina-error.component';
import { NoticiasUdComponent } from './noticias-ud/noticias-ud.component';
import { NoticiasInteresComponent } from './noticias-interes/noticias-interes.component';
import { MesaAyudaComponent } from './mesa-ayuda/mesa-ayuda.component';
import { OpcionesNoticiaComponent } from './opciones-noticia/opciones-noticia.component';
import { PDFNoticiaComponent } from './pdf-noticia/pdf-noticia.component';
import { SubirNoticiaComponent } from './subir-noticia/subir-noticia.component';
import { HttpClientModule } from '@angular/common/http';
import { NoticiasService } from './noticias.service';
import { ListaCategoriasComponent } from './lista-categorias/lista-categorias.component';
import { ListaSolicitudesComponent } from './mesa-ayuda/lista-solicitudes/lista-solicitudes.component';
import { CRUDTicketsComponent } from './mesa-ayuda/crud-tickets/crud-tickets.component';
import { InformacionUsuarioComponent } from './mesa-ayuda/informacion-usuario/informacion-usuario.component';
import { FiltrosTicketsComponent } from './mesa-ayuda/filtros-tickets/filtros-tickets.component';
import { MesaAyudaService } from './mesa-ayuda/mesa-ayuda.service';

const appRoutes:Routes=[
  {path: '',component: NoticiasGeneralesComponent},
  {path:'Noticias_UD',component: NoticiasUdComponent,canActivate: [LoginGuardian]},
  {path:'Noticias_Interes',component: NoticiasInteresComponent,canActivate: [LoginGuardian]},
  {path:'Preguntas_Frecuentes',component: PreguntasFrecuentesComponent,canActivate: [LoginGuardian]},
  {path:'Mesa_Ayuda',component: MesaAyudaComponent, canActivate: [LoginGuardian]},
  {path:'login',component: LoginComponent},
  {path:'noticia/:id',component: OpcionesNoticiaComponent,canActivate: [LoginGuardian]},
  {path:'subir_noticia',component: SubirNoticiaComponent,canActivate: [LoginGuardian]},
  {path:'**',component: PaginaErrorComponent}
];
@NgModule({
  declarations: [
    AppComponent,
    PreguntasFrecuentesComponent,
    LoginComponent,
    NoticiasComponent,
    FiltroNoticiasComponent,
    NoticiasGeneralesComponent,
    PaginaErrorComponent,
    NoticiasUdComponent,
    NoticiasInteresComponent,
    MesaAyudaComponent,
    OpcionesNoticiaComponent,
    PDFNoticiaComponent,
    SubirNoticiaComponent,
    ListaCategoriasComponent,
    ListaSolicitudesComponent,
    CRUDTicketsComponent,
    InformacionUsuarioComponent,
    FiltrosTicketsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule.forRoot(appRoutes),
    FormsModule,
    HttpClientModule
  ],
  providers: [LoginService,CookieService,PreguntasFrecuentesService,LoginGuardian,NoticiasService,MesaAyudaService],
  bootstrap: [AppComponent]
})
export class AppModule { }
