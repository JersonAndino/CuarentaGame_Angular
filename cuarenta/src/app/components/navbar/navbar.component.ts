import { Component, OnInit } from '@angular/core';
import { UsuarioService } from 'src/services/usuario.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
  providers:[UsuarioService]
})
export class NavbarComponent implements OnInit {
  loggedIn:any;
  user:any;
  constructor(
    private usuarioService:UsuarioService,
  ){}
  ngOnInit(): void {
    this.usuarioService.loggedIn.subscribe(res=>{
      if(res==true) {
        this.loggedIn=true;
        this.usuarioService.user.subscribe(res=>{
          if(res!='') {this.user=res;}
        });
      }
      else { this.loggedIn=false;}
    });
  }
  doLogout(){
    this.usuarioService.logout().subscribe(
      response=>{
        window.location.reload();
      },error=>{console.log(<any>error);}
    );   
    // window.location.reload(); 
  }
}
