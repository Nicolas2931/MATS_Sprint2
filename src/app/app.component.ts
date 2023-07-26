import { Component} from '@angular/core';
import { LoginService } from './login.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent{
  //Menú hamburgesa
  showMenu: boolean = false;
  constructor(private loginService: LoginService){}
  //Mostrar menú contraido
  toggleMenu() {
    this.showMenu = !this.showMenu;
  }
  //Mensaje de loguearse usado para mostrar Login si va a iniciar sesion o Logout si ya inicio sen
  estalogueado(){
    return this.loginService.estaLogueado();
  }
  //Método para cerrar sesión
  logout(){
    this.loginService.logout();
  }
}

