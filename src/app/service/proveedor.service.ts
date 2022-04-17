import { GenericHttpService } from './generic-http.service';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Proveedor } from '../model/proveedor';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProveedorService extends GenericHttpService<Proveedor>{

  private mensajeProveedor: Subject<string> = new Subject<string>();

  constructor(protected override http: HttpClient) { 
    super(http,`${environment.HOST}/proveedor`);
  }  

  consultarProveedorByNombre(nombre : String) {
    return this.http.get(`${this.url}/${nombre}`);
  }

  consultarPageable(page:number,size:number) {
    return this.http.get<any>(`${this.url}/pageable?page=${page}&size=${size}`);
  }

  getMensajeProveedor(){
    return this.mensajeProveedor.asObservable();
  }

  setMensajeProveedorCambio(mensaje:string){
    this.mensajeProveedor.next(mensaje);
  }

}
