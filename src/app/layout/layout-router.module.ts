import {RouterModule, Routes} from "@angular/router";
import {LayoutComponent} from "./layout/layout.component";
import {NgModule} from "@angular/core";

export const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: '',
        loadChildren: () => import('../pages/certificate-store/certificate-store.module').then(m => m.CertificateStoreModule)
      }
    ]
  }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LayoutRoutingModule { }
