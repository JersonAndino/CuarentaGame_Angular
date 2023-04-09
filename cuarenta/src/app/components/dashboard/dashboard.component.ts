import { Component, OnInit } from '@angular/core';
import { UsuarioService } from 'src/services/usuario.service';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  providers:[UsuarioService]
})
export class DashboardComponent implements OnInit {
  loggedIn:any;
  user:any;
  constructor(
    private usuarioService:UsuarioService,
    private router:Router,
    private route:ActivatedRoute
  ){
    
  }
  ngOnInit(): void {
    // console.log(this.loggedIn);
    this.usuarioService.loggedIn.subscribe(res=>{
      if(res==true) {this.loggedIn=true;}
      // console.log(res);
      if(this.loggedIn!=true){
        this.router.navigate(['/login']);
      }
    });
  }
}
