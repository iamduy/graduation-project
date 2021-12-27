import { Component, OnInit } from '@angular/core'
import { MatDialog } from '@angular/material/dialog'
import { ToastrService } from 'ngx-toastr'
import { IProject, ProjectService } from 'src/app/core'
import { ProjectCreateComponent } from './project-create/project-create.component'
import { ProjectDetailComponent } from './project-detail/project-detail.component'
import { ProjectEditComponent } from './project-edit/project-edit.component'

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css'],
})
export class ProjectsComponent implements OnInit {
  isLoading: boolean
  projects: IProject[] = []
  displayedColumns: string[] = [
    'id',
    'option',
    'name',
    'hotline',
    'buildings',
    'cycle_collect',
    'extension_time',
    'action',
  ]

  constructor(
    public dialog: MatDialog,
    private projectService: ProjectService,
    private toast: ToastrService
  ) { }

  ngOnInit() {
    this.isLoading = true
    this.projectService.getAll().subscribe((t) => {
      this.isLoading = false
      this.projects = t.data
    }, (err) => {
      this.isLoading = false
      this.toast.error('', err?.message, { timeOut: 4000 })
    })
  }

  addProjectDialog(): void {
    const dialog = this.dialog.open(ProjectCreateComponent, {
      width: '800px',
      height: '600px',
      disableClose: false,
    })
    dialog.afterClosed().subscribe((projects: IProject[] = []) => {
      if (projects[0]?.id) {
        this.projects = projects
      }
    })
  }

  editProjectDialog(project: any): void {
    const dialog = this.dialog.open(ProjectEditComponent, {
      width: '800px',
      height: '600px',
      disableClose: false,
      data: { project: project },
    })
    dialog.afterClosed().subscribe((projects: IProject[] = []) => {
      if (projects[0]?.id) {
        this.projects = projects
      }
    })
  }

  removeProject(project: any) {
    if (window.confirm('Xác nhận xóa?')) {
      this.isLoading = true
      this.projectService.delete(project.id).subscribe(
        (t) => {
          this.projectService.getAll().subscribe(({ data }) => {
            this.projects = data
            this.isLoading = false
            this.toast.success('Xóa dự án thành công', 'Thông báo', {
              timeOut: 3000,
              closeButton: true,
            })
          })
        },
        (f) => {
          this.isLoading = false
          this.toast.error('Xóa dự án thất bại', 'Thông báo', {
            timeOut: 3000,
            closeButton: true,
          })
        }
      )
    }
  }

  projectDetail(project: any) {
    const dialog = this.dialog.open(ProjectDetailComponent, {
      width: '1000px',
      height: '600px',
      disableClose: false,
      data: { project: project },
    })
  }
}
