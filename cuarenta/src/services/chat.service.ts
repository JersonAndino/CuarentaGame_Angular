import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { Usuario } from '../models/usuario';
import { Observable } from 'rxjs';
import { Global } from './global';
import { Subject } from 'rxjs';
@Injectable()
export class ChatService{
    public url:string;
    constructor(
        private _http:HttpClient,
        //private toastr: ToastrService
    ){
        this.url=Global.url;
    }
    
crearChat(data:any):Observable<any>{
    let params=JSON.stringify(data);
    let headers=new HttpHeaders().set('Content-Type','application/json');
    // console.log(params);
    return this._http.post(this.url+'chat',params,{headers:headers});
}
obtenerChatsDeUsuario(user:string):Observable<any>{
    let headers=new HttpHeaders().set('Content-Type','application/json');
    return this._http.get(this.url+'chat/'+user,{headers:headers});
}
}