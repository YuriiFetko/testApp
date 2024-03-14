import {NgModule} from '@angular/core';
import {RouterModule, Routes} from "@angular/router";

import {CertificateStoreComponent} from "./certificate-store.component";

const routes: Routes = [
  {
    path: '',
    component: CertificateStoreComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CertificateStoreRoutingModule {
}
