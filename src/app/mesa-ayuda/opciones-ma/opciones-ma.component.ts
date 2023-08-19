import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-opciones-ma',
  templateUrl: './opciones-ma.component.html',
  styleUrls: ['./opciones-ma.component.scss']
})
export class OpcionesMAComponent implements OnInit {
  crear_ticket: boolean;
  crear_reclamo: boolean;
  lista_reclamos: boolean;
  ventana_administrar:boolean;
  ver_categorias:boolean;
  ver_items:boolean;
  constructor(private router: Router) {}

  ngOnInit(): void {
    this.crear_ticket = false;
    this.crear_reclamo = false;
    this.lista_reclamos=false;
    this.ventana_administrar=false;
    this.ver_categorias=false;
    this.ver_items=false;
  }

  crearTicket() {
    this.crear_ticket = true;
  }

  CierreVentanaCrear(): void {
    this.crear_ticket = false;
  }

  realizar_reclamo() {
    console.log("Entro :v");
    this.crear_reclamo = true;
  }

  CierreRealizarReclamo() {
    this.crear_reclamo = false;
    console.log("Se cierra el reclamo: " + this.crear_reclamo);
  }
  mostrar_listaReclamos(){
    this.lista_reclamos=true;
  }
  Cierrre_listaReclamos(){
    this.lista_reclamos=false;
  }

  URL_listaTickets() {
    this.router.navigate(['/Lista_Tickets']);
  }

  URL_listaSolicitudes() {
    this.router.navigate(['/Lista_Solicitudes']);
  }
  URL_solicitudesAsignadas(){
    this.router.navigate(['/Solicitudes_Asignadas']);
  }
  mostrar_AdmUsuarios(){
    this.ventana_administrar=true;
  }
  cerrar_AdmUsuarios(){
    this.ventana_administrar=false;
  }
  mostrar_AdmCategorias(){
    this.ver_categorias=true;
  }
  cerrar_AdmCategorias(){
    this.ver_categorias=false;
  }
  mostrar_AdmItems(){
    this.ver_items=true;
  }
  cerrar_AdmItems(){
    this.ver_items=false;
  }
}
