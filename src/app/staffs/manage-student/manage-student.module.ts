import { NgModule } from '@angular/core'
import { MatButtonModule } from '@angular/material/button'
import { MatCheckboxModule } from '@angular/material/checkbox'
import { MatDialogModule } from '@angular/material/dialog'
import { MatFormFieldModule } from '@angular/material/form-field'
import { MatIconModule } from '@angular/material/icon'
import { MatPaginatorModule } from '@angular/material/paginator'
import { MatRadioModule } from '@angular/material/radio'
import { MatSlideToggleModule } from '@angular/material/slide-toggle'
import { MatTableModule } from '@angular/material/table'
import { MatTabsModule } from '@angular/material/tabs'
import { MatTreeModule } from '@angular/material/tree'
import { SharedModule } from 'src/app/shared/shared.module'
import { EditStudentComponent } from './list-student/edit-student/edit-student.component'
import { StudentComponent } from './list-student/student/student.component'
import { ManageStudentRoutingModule } from './manage-student-routing.module'
import { ManageStudentComponent } from './manage-student.component'
import { NotificationComponent } from './notice-student/notification/notification.component'
import { CreateNoticeComponent } from './notice-student/settings/create-notice/create-notice.component'
import { EditNoticeComponent } from './notice-student/settings/edit-notice/edit-notice.component'
import { CreateInteractComponent } from './student-interact/settings/create-interact/create-interact.component'
import { EditInteractComponent } from './student-interact/settings/edit-interact/edit-interact.component'
import { StudentInteractComponent } from './student-interact/student-interact.component';
import { TypeAnnounceComponent } from './type-announce/type-announce.component';
import { UpdateAnnounceComponent } from './type-announce/update-announce/update-announce.component';
import { CreateAnnounceComponent } from './type-announce/create-announce/create-announce.component'



@NgModule({
  declarations: [
    ManageStudentComponent,
    EditInteractComponent,
    StudentInteractComponent,
    EditStudentComponent,
    StudentComponent,
    NotificationComponent,
    EditNoticeComponent,
    CreateNoticeComponent,
    CreateInteractComponent,
    TypeAnnounceComponent,
    UpdateAnnounceComponent,
    CreateAnnounceComponent,

  ],
  imports: [
    SharedModule,
    ManageStudentRoutingModule,
    MatDialogModule,
    MatPaginatorModule,
    MatTableModule,
    MatTabsModule,
    MatRadioModule,
    MatTreeModule,
    MatFormFieldModule,
    MatButtonModule,
    MatIconModule,
    MatCheckboxModule,
    MatSlideToggleModule
  ],
})
export class ManageStudentModule { }
