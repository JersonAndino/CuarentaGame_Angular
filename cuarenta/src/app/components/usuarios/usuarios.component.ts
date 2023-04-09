import { Component, OnInit} from '@angular/core';
import { Usuario } from 'src/models/usuario';
import { UsuarioService } from 'src/services/usuario.service';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css'],
  providers:[UsuarioService]
})
export class UsuariosComponent implements OnInit{
  public usuarios:Usuario[];
  constructor(
    private usuarioService:UsuarioService,
  ){
    this.usuarios=[];
  }
  ngOnInit(): void {
    this.usuarioService.getUsuarios().subscribe(
      response=>{
        if(response.result){
          this.usuarios=response.result;
        }
      },error=>{console.log(error);}
    );
  }
}
