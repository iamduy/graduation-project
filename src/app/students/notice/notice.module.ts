import { NgModule } from '@angular/core'
import { MatDialogModule } from '@angular/material/dialog'
import { SharedModule } from 'src/app/shared/shared.module'
import { DetailNotice } from './DetailNotice/detail-notice'
import { NoticeRoutingModule } from './notice-routing.module'
import { NoticeComponent } from './notice.component'
@NgModule({
    declarations: [NoticeComponent, DetailNotice],
    imports: [
        NoticeRoutingModule,
        MatDialogModule,
        SharedModule
    ],
})
export class NotifModule { }