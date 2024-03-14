import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {CertificateStoreComponent} from "./certificate-store.component";
import {CertificateStoreRoutingModule} from "./certificate-store-routing.module";
import {DragAndDropDirective} from "../../shared/directives/drag-and-drop.directive";
import {FormsModule} from "@angular/forms";
import { CertificatesListComponent } from './components/certificates-list/certificates-list.component';
import { CertificateDetailsComponent } from './components/certificate-details/certificate-details.component';
import { CertificateCreateComponent } from './components/certificate-create/certificate-create.component';



@NgModule({
  declarations: [CertificateStoreComponent, CertificatesListComponent, CertificateDetailsComponent, CertificateCreateComponent],
  imports: [
    CommonModule,
    FormsModule,
    CertificateStoreRoutingModule,
    DragAndDropDirective
  ]
})
export class CertificateStoreModule { }
