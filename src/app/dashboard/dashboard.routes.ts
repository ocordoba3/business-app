import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { DetailComponent } from "../entry/detail/detail.component";
import { EntryComponent } from "../entry/entry.component";
import { StadisticComponent } from "../entry/stadistic/stadistic.component";
import { DashboardComponent } from "./dashboard.component";


const routes: Routes = [
    { 
        path: '',
        component: DashboardComponent,
        children: [
            {path: '', component: StadisticComponent},
            {path: 'entry', component: EntryComponent},
            {path: 'detail', component: DetailComponent},
        ]
    },

    { path: '**', redirectTo: '/stadistic', pathMatch: 'full' },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})

export class DashboardRoutingModule { }