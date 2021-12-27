import { Component, Inject, OnInit } from '@angular/core'
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms'
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog'
import { ToastrService } from 'ngx-toastr'
import { ProjectServiceService } from 'src/app/core'

@Component({
  selector: 'app-project-service-add',
  templateUrl: './project-service-add.component.html',
  styleUrls: ['./project-service-add.component.css'],
})
export class ProjectServiceAddComponent implements OnInit {

  constructor(
    @Inject(MAT_DIALOG_DATA)
    public data: { project_id: number, project_name: string },
    private api: ProjectServiceService,
    private fb: FormBuilder,
    private toast: ToastrService,
    private matRef: MatDialogRef<ProjectServiceAddComponent>
  ) { }

  errors: any = []
  submitted: boolean = false
  isLoading: boolean
  units: IUnits
  public ProjectServiceForm: FormGroup


  ngOnInit() {
    this.ProjectServiceForm = this.fb.group({
      itemSlices: this.fb.array([this.itemInitSlices()])
    })
    this.getUnits()
  }


  get _FormArray() {
    return this.ProjectServiceForm.get('itemSlices') as FormArray
  }

  get FormControls() {
    return this.ProjectServiceForm.controls.itemSlices
  }

  addNewForm() {
    this._FormArray.push(this.itemInitSlices())
  }

  deleteSlice(index: number) {
    this._FormArray.removeAt(index)
  }

  itemInitSlices() {
    return this.fb.group({
      name: ['', Validators.required],
      unit_price: ['', Validators.required],
      unit: 'Đồng/Kw/h',
      project_id: this.data.project_id,
      permanent: 0,
    })
  }

  getUnits() {
    this.isLoading = true
    this.api.gets('/project-service/create', false).subscribe(e => {
      this.units = e?.data
      this.isLoading = false
    })
  }

  onSubmit() {
    this.submitted = true
    this.isLoading = true
    if (this.ProjectServiceForm.valid) {
      this.api.posts('/project-service/store', this.ProjectServiceForm.value?.itemSlices).subscribe((e) => {
        this.toast.success('', e?.message, { timeOut: 3000 })
        this.matRef.close(this.ProjectServiceForm.value?.itemSlices)
        this.isLoading = false
      }, () => {
        this.toast.warning('Chọn đúng đơn vị cho dịch vụ và đơn giá phải lớn hơn 1000.', 'Cảnh báo !', { timeOut: 4000 })
        this.isLoading = false
      })
    } else {
      this.isLoading = false
      this.toast.warning('Trường dữ liệu không được để trống.', 'Cảnh báo !', { timeOut: 3000 })
    }
  }


}
export interface IUnits {
  electric: {
    unit: string;
    name: string;
  },
  water: {
    unit: string;
    name: string;
  }
  other: {
    unit: string;
  }
}