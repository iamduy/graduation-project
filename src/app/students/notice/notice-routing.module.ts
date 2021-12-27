import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { Routers } from 'src/app/utils'
import { NoticeComponent } from './notice.component'
const routes: Routes = [
    {
        path: '',
        component: NoticeComponent,
        data: {
            breadcrumb: [
                {
                    label: Routers.NOTICE_STUDENT.NAME,
                    url: Routers.NOTICE_STUDENT.URL
                }
            ]
        }
    }
]

@NgModule({
    declarations: [],
    imports: [RouterModule.forChild(routes)],
    providers: [RouterModule],
})
export class NoticeRoutingModule { }