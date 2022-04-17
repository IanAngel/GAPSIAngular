import { ProveedorDialogoComponent } from './proveedor-dialogo/proveedor-dialogo.component';
import { Proveedor } from './../../model/proveedor';
import { ProveedorService } from './../../service/proveedor.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-proveedor',
  templateUrl: './proveedor.component.html',
  styleUrls: ['./proveedor.component.css'],
})
export class ProveedorComponent implements OnInit {
  
  dataSource!: MatTableDataSource<Proveedor>;
  displayedColumns: string[] = ['idProveedor', 'nombre', 'razonSocial', 'direccion', 'urlImg', 'acciones'];
  cantidad! : number;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private proveedorService: ProveedorService,
              private snackBar: MatSnackBar,
              private dialog: MatDialog) { }

  ngOnInit(): void {

    /*
    this.proveedorService.listar().subscribe(data => {      
      this.dataSource= new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
    */

    this.proveedorService.consultarPageable(0,10).subscribe(data => {      
      this.cantidad=data.totalElements;
      this.dataSource= new MatTableDataSource(data.content);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });

    this.proveedorService.getMensajeProveedor().subscribe(data => {  
      console.log("getMensajeProveedor");
      console.log(data);
      this.proveedorService.consultarPageable(0,10).subscribe(data => {      
        console.log("consultarPageable");
        this.cantidad=data.totalElements;
        this.dataSource= new MatTableDataSource(data.content);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      });
      this.snackBar.open(data, 'AVISO', { duration: 2000 });      
    });    
  }

  mostrarMas(e: any){
    this.proveedorService.consultarPageable(e.pageIndex, e.pageSize).subscribe(data => {  
      console.log("EVENTO PAGINADOR");    
      console.log(data);    
      this.cantidad=data.totalElements;
      this.dataSource= new MatTableDataSource(data.content);      
    });
  }

  filtrar(e: any) {
    this.dataSource.filter = e.target.value.trim().toLowerCase();   
  }

  operacionDialogo(op:number , objeto?: Proveedor){
    switch (op) {
      case 3:
        //ELIMINAR
        console.log("ELIMINAR");
        console.log(objeto);
        this.dialog.open(ProveedorDialogoComponent, {
          width: '450px',
          data: {proveedor:objeto, operacion: "ELIMINAR"}          
        });        
        break;
      case 2:
        //MODIFICAR
        this.dialog.open(ProveedorDialogoComponent, {
          width: '450px',
          data: {proveedor:objeto, operacion: "MODIFICAR"}          
        });        
        break;
      case 1:
        //AGREGAR
          this.dialog.open(ProveedorDialogoComponent, {
            width: '450px',            
            data: {proveedor:null, operacion: "AGREGAR"}          
          });        
          break;
      default:
        break;
    }    
    
  }  
}
