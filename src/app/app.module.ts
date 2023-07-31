import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NoticiasGeneralesComponent } from './noticias-generales/noticias-generales.component';
import { NoticiasUDComponent } from './noticias-ud/noticias-ud.component';
import { NoticiasInteresComponent } from './noticias-interes/noticias-interes.component';
import { MesaAyudaComponent } from './mesa-ayuda/mesa-ayuda.component';
import { LoginComponent } from './login/login.component';
import { RouterModule, Routes } from '@angular/router';
import { PaginaErrorComponent } from './pagina-error/pagina-error.component';
import { LoginService } from './login.service';
import { FormsModule } from '@angular/forms';
import { CookieService } from 'ngx-cookie-service';
import { LoginGuardian } from './login/login-guardian';
import { NoticiasComponent } from './noticias/noticias.component';
import { NoticiasService } from './noticias.service';
import { FiltroNoticiasComponent } from './filtro-noticias/filtro-noticias.component';
import { OpcionesNoticiaComponent } from './opciones-noticia/opciones-noticia.component';
import { SubirNoticiaComponent } from './subir-noticia/subir-noticia.component';
import { PDFNoticiaComponent } from './pdf-noticia/pdf-noticia.component';
import { PreguntasFrecuentesService } from './preguntas-frecuentes.service';
import { PreguntasComponent } from './preguntas/preguntas.component';


const appRoutes:Routes=[
  {path: '',component: NoticiasGeneralesComponent},
  {path:'Noticias_UD',component: NoticiasUDComponent,canActivate: [LoginGuardian]},
  {path:'Noticias_Interes',component: NoticiasInteresComponent,canActivate: [LoginGuardian]},
  {path:'Preguntas_Frecuentes',component: PreguntasComponent,canActivate: [LoginGuardian]},
  {path:'Mesa_Ayuda',component: MesaAyudaComponent, canActivate: [LoginGuardian]},
  {path:'login',component: LoginComponent},
  {path:'noticia',component: OpcionesNoticiaComponent},
  {path:'subir_noticia',component: SubirNoticiaComponent,canActivate: [LoginGuardian]},
  {path:'**',component: PaginaErrorComponent}
];

@NgModule({
  declarations: [
    AppComponent,
    NoticiasGeneralesComponent,
    NoticiasUDComponent,
    NoticiasInteresComponent,
    MesaAyudaComponent,
    LoginComponent,
    NoticiasComponent,
    FiltroNoticiasComponent,
    OpcionesNoticiaComponent,
    SubirNoticiaComponent,
    PDFNoticiaComponent,
    PreguntasComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule.forRoot(appRoutes),
    FormsModule
  ],
  providers: [LoginService,NoticiasService, CookieService,LoginGuardian,PreguntasFrecuentesService],
  bootstrap: [AppComponent]
})
export class AppModule { }
