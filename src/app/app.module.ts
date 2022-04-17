import { ProveedorComponent } from './main/proveedor/proveedor.component';
import { FrameworkUiMaterialModule } from './framework-ui-material/framework-ui-material.module';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { ProveedorDialogoComponent } from './main/proveedor/proveedor-dialogo/proveedor-dialogo.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './main/login/login.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ToolbarComponent } from './main/toolbar/toolbar.component';

@NgModule({
  declarations: [
    AppComponent,
    ProveedorComponent,    
    ProveedorDialogoComponent, 
    LoginComponent, 
    ToolbarComponent 
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,    
    FrameworkUiMaterialModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    FlexLayoutModule
  ],
  providers: [{provide: LocationStrategy, useClass: HashLocationStrategy}],
  bootstrap: [AppComponent]
})
export class AppModule { }
