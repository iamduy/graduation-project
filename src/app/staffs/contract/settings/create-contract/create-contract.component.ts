import { Component, Inject, OnInit } from '@angular/core'
import { FormBuilder } from '@angular/forms';
import { MatDialog, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ContractService, IProjectService } from 'src/app/core';
import { ToastrService } from 'ngx-toastr';
import { IContract } from 'src/app/core/models/IContract';
import { UserInfo } from 'src/app/shared/UserInfo/user-info.component';
@Component({
  selector: 'app-create-contract',
  templateUrl: './create-contract.component.html',
  styleUrls: ['./create-contract.component.css']
})
export class CreateContractComponent implements OnInit {

  constructor(
    @Inject(MAT_DIALOG_DATA) public dataParentBed: { id: number, name: string },
    private dialog: MatDialog,
    private fb: FormBuilder,
    private contractService: ContractService,
    private toast: ToastrService,
    private matRef: MatDialogRef<CreateContractComponent>,
  ) { }
  TABLE_SERVICE = []
  _beds = []
  ContractInfo: IcontractInfo
  ProjectService = []
  userInfo: any
  submitted: boolean = false
  errors: any
  isLoading = false
  checkStatus: string
  group = {
    start_day: '',
    end_day: '',
    price: '',
    deposit: 0,
    deposit_state: 0,
    room_id: '',
    bed_id: '',
    user_id: '',
    project_service_id: [[]],
    note: ''
  }
  contractForm = this.fb.group(this.group)


  onSubmit() {
    this.submitted = true
    this.isLoading = true
    this.contractForm.setValue({
      ...this.contractForm.value,
      project_service_id: this.ProjectService ?? [],
      user_id: this.userInfo?.id ?? '',
      bed_id: this.dataParentBed.id ?? ''
    })
    this.contractService.posts('/contracts/store', this.contractForm.value).subscribe(() => {
      this.isLoading = false;
      this.dialog.closeAll()
      this.contractForm.reset()
      this.checkStatus = 'success'
      this.toast.success('', 'Tạo hợp đồng thành công', { timeOut: 4000 })
    }, (err) => {
      this.isLoading = false;
      this.toast.error('', 'Kiểm tra lại các trường đã nhập !', { timeOut: 4000 })
      this.errors = err.errors;
    })
  }

  onCheckBox(id, e) {
    const isChecked = e?.target?.checked
    const saveArray: any[] = []
    this.TABLE_SERVICE.map(v => {
      if (v.id === id) {
        v.select = isChecked ? true : false
      }
      return v;
    }).filter(item => {
      if (item.select === false) return;
      saveArray.push(item.id)
      this.ProjectService = [...new Set(saveArray)]
    })
  }

  getUserById() {
    let dialogRef = this.dialog.open(UserInfo, { height: '100vh', disableClose: true })
    dialogRef.afterClosed().subscribe(e => {
      if (e?.id == undefined) return
      this.userInfo = {
        id: e?.id,
        name: `${e?.last_name} ${e?.first_name}`
      }
    })
  }

  getInfoContract() {
    this.isLoading = true
    this.contractService.gets('/contracts/create', { id: this.dataParentBed.id }).subscribe(e => {
      if (!e) return
      this.ContractInfo = e?.data?.bed_data
      e?.data?.bed_data?.room.floor?.building?.project?.project_service?.forEach(ele => {
        if (ele?.permanent === 1)
          this.TABLE_SERVICE.push({ ...ele, select: false })
      })
      this.contractForm.setValue({
        ...this.group,
        price: e?.data?.bed_data?.room?.room_type?.price,
        deposit: e?.data?.bed_data?.room?.room_type?.price_deposit,
        room_id: e?.data?.bed_data?.room?.id
      })
      this.isLoading = false

    }, (error) => {
      this.isLoading = false
      this.toast.error('', error?.message, { timeOut: 4000 })
    })
  }

  ngOnInit() {
    this.getInfoContract()
  }
  ngOnDestroy() {
    this.matRef.close(this.checkStatus)
  }
}

export interface IcontractInfo {
  id: number;
  name: string;
  room: {
    id: number;
    name: string;
    floor: {
      id: number;
      name: string;
      building: {
        id: number;
        name: string;
        project: {
          id: number;
          name: string;
          cycle_collect: number;
          extension_time: number;
          project_service: IProjectService[]
        }
      }
    }
  }

  contract: IContract;
}