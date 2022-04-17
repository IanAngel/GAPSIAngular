import { ProveedorService } from './../../../service/proveedor.service';
import { ProveedorDialog } from './../../../model/proveedor-dialog';
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Proveedor } from 'src/app/model/proveedor';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-proveedor-dialogo',
  templateUrl: './proveedor-dialogo.component.html',
  styleUrls: ['./proveedor-dialogo.component.css'],
})
export class ProveedorDialogoComponent implements OnInit {

  proveedor!:Proveedor;
  operacion!:string;
  formProveedor!: FormGroup;

  constructor(@Inject(MAT_DIALOG_DATA) private data:ProveedorDialog,
              private matDialogRef:MatDialogRef<ProveedorDialogoComponent>,
              private proveedorService: ProveedorService){     
    if(this.data.proveedor!=null){
      this.proveedor=this.data.proveedor;      
    }else{
      this.proveedor=new Proveedor();     
      this.proveedor.idProveedor=0;       
    }    
    this.operacion=this.data.operacion;
  }

  ngOnInit(): void {     
    this.formProveedor = new FormGroup({
      'idProveedor': new FormControl(this.proveedor.idProveedor),
      'nombre': new FormControl(this.proveedor.nombre),
      'razonSocial': new FormControl(this.proveedor.razonSocial),
      'direccion': new FormControl(this.proveedor.direccion),
      'urlImg': new FormControl(this.proveedor.urlImg)
    });  

    if(this.operacion==="ELIMINAR"){
      this.formProveedor.controls['idProveedor'].disable();
      this.formProveedor.controls['nombre'].disable();
      this.formProveedor.controls['razonSocial'].disable();
      this.formProveedor.controls['direccion'].disable();
      this.formProveedor.controls['urlImg'].disable();
    }

    if(this.operacion==="MODIFICAR"){
      this.formProveedor.controls['idProveedor'].disable();
      this.formProveedor.controls['nombre'].disable();      
    }
  }

  continuar(){    
    this.proveedor.idProveedor = this.formProveedor.value['idProveedor'];
    this.proveedor.nombre = this.formProveedor.value['nombre'];
    this.proveedor.razonSocial = this.formProveedor.value['razonSocial'];
    this.proveedor.urlImg = this.formProveedor.value['urlImg'];
    this.proveedor.direccion = this.formProveedor.value['direccion'];
    console.log("Continuar");
    console.log(this.proveedor);
  
    switch (this.operacion) {
      case "ELIMINAR": 
        this.proveedorService.eliminar(this.proveedor!.idProveedor!).subscribe(() => {          
            console.log("ELIMINAR");
            this.proveedorService.setMensajeProveedorCambio('REGISTRO ELIMINADO');          
        });       
        break;
      case "MODIFICAR":        
        this.proveedorService.modificar(this.proveedor!).subscribe(() => {          
          console.log("MODIFICAR");
          this.proveedorService.setMensajeProveedorCambio('REGISTRO MODIFICADO');          
        });       
        break;
      case "AGREGAR":        
        this.proveedorService.registrar(this.proveedor!).subscribe(() => {          
          console.log("AGREGAR");
          this.proveedorService.setMensajeProveedorCambio('REGISTRO DADO DE ALTA');          
        });       
        break;
      default:
        break;
    }
    this.cerrar();
  }

  cerrar(){
    this.matDialogRef.close();
  }
}
