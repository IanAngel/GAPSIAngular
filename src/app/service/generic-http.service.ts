import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GenericHttpService<T> {

  constructor(protected http: HttpClient, @Inject("url") protected url: string ) { }

  listar() {
    return this.http.get<T[]>(this.url);
  }
  
  listarPorId(id: number) {
    return this.http.get<T>(`${this.url}/${id}`);
  }

  registrar(generic: T) {
    return this.http.post(this.url,generic);
  }

  modificar(generic: T) {
    return this.http.put(this.url,generic);
  }

  eliminar(id: number) {
    return this.http.delete(`${this.url}/${id}`);
  }

}
