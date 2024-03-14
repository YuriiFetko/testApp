import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from "@angular/router";

import {LayoutRoutingModule} from "./layout-router.module";

import {LayoutComponent} from "./layout/layout.component";

@NgModule({
  declarations: [LayoutComponent],
  imports: [
    LayoutRoutingModule,
    CommonModule,
    RouterModule
  ]
})
export class LayoutModule {
}
