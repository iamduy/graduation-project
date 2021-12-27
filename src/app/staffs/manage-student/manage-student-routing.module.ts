import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Routers } from 'src/app/utils';
import { StudentComponent } from './list-student/student/student.component';
import { ManageStudentComponent } from './manage-student.component';
import { CreateNoticeComponent } from './notice-student/settings/create-notice/create-notice.component';
import { EditNoticeComponent } from './notice-student/settings/edit-notice/edit-notice.component';
import { NotificationComponent } from './notice-student/notification/notification.component';
import { StudentInteractComponent } from './student-interact/student-interact.component';
import { TypeAnnounceComponent } from './type-announce/type-announce.component'
import { PermissionGuard } from 'src/app/core';
const routes: Routes = [
  {
    path: '',
    component: ManageStudentComponent,

    children: [
      {
        path: 'danh-sach',
        component: StudentComponent,
        canActivate: [PermissionGuard],
        data: {
          permission: 'tenant-list',
          breadcrumb: [
            {
              label: Routers.MANAGE_STUDENT.LIST.NAME,
              url: '',
            },
          ],
        },
      },
      {
        path: 'tuong-tac',
        component: StudentInteractComponent,
        canActivate: [PermissionGuard],
        data: {
          permission: 'Interactive-list',
          breadcrumb: [
            {
              label: Routers.MANAGE_STUDENT.INTERACT.NAME,
              url: '',
            },
          ],
        },
      },
      {
        path: 'thong-bao',
        component: NotificationComponent,
        data: {
          permission: 'Notify-list',
          breadcrumb: [
            {
              label: Routers.MANAGE_STUDENT.NOTICE.NAME,
              url: '',
            },
          ],
        },
      },
      {
        path: 'cap-nhat-thong-bao',
        component: EditNoticeComponent,
        data: {
          permission: 'Notify-edit',
          breadcrumb: [
            {
              label: Routers.MANAGE_STUDENT.UPDATE.NAME,
              url: '',
            },
          ],
        },
      },
      {
        path: 'tao-moi-thong-bao',
        component: CreateNoticeComponent,
        data: {
          permission: 'Notify-add',
          breadcrumb: [
            {
              label: Routers.MANAGE_STUDENT.CREATE.NAME,
              url: ''
            }
          ]
        }
      },
      {
        path: 'loai-thong-bao',
        component: TypeAnnounceComponent,
        data: {
          breadcrumb: [
            {
              label: Routers.MANAGE_STUDENT.TYPE_ANNOUNCE.NAME,
              url: ''
            }
          ]
        }
      }

    ]
  }
]

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes)],
  providers: [RouterModule],
})
export class ManageStudentRoutingModule { }
