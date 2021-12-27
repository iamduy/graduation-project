import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Routers } from 'src/app/utils';
import { ProjectsComponent } from './projects.component';
const routes: Routes = [
    {
        path: '',
        component: ProjectsComponent,
        data: {
            breadcrumb: [
                {
                    label: "Quản lý dự án",
                    url: ''
                }
            ]
        }
    }
];

@NgModule({
    declarations: [],
    imports: [RouterModule.forChild(routes)],
    providers: [RouterModule],
})
export class ProjectsRoutingModule { }
