import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DetailComponent } from '../entry/detail/detail.component';
import { EntryComponent } from '../entry/entry.component';
import { StadisticComponent } from '../entry/stadistic/stadistic.component';
import { FooterComponent } from '../shared/footer/footer.component';
import { NavbarComponent } from '../shared/navbar/navbar.component';
import { SidebarComponent } from '../shared/sidebar/sidebar.component';
import { DashboardComponent } from './dashboard.component';
import { DashboardRoutingModule } from './dashboard.routes';
import { ReactiveFormsModule } from '@angular/forms';
import { EntryOrderPipe } from '../pipes/entry-order.pipe';
import { ChartsModule } from 'ng2-charts';



@NgModule({
  declarations: [
    DashboardComponent,
    EntryComponent,
    StadisticComponent,
    DetailComponent,
    FooterComponent,
    NavbarComponent,
    SidebarComponent,
    EntryOrderPipe
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    ReactiveFormsModule,
    ChartsModule
  ]
})
export class DashboardModule { }
