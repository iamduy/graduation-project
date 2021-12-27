import * as dayjs from 'dayjs'
import { Component, Inject, OnInit } from '@angular/core'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { MAT_DIALOG_DATA } from '@angular/material/dialog'
import { ContractService, CustomValidationService, InvoiceService, IStudent } from 'src/app/core'
import { ToastrService } from 'ngx-toastr'
import { CalPrice } from 'src/app/utils'
@Component({
  selector: 'app-info-contract',
  templateUrl: './info-contract.component.html',
  styleUrls: ['./info-contract.component.css']
})

export class InfoContractModalComponent implements OnInit {

  constructor(
    @Inject(MAT_DIALOG_DATA) public idContract: number,
    private api: ContractService,
    private apiInvoice: InvoiceService,
    private fb: FormBuilder,
    private toast: ToastrService,
    private validate: CustomValidationService
  ) { }
  /** variable lịch sử thu phí **/
  TableInvoice: any
  TableService: any

  /** variable thông tin hợp đồng **/
  displayedColumns: string[] = ['id', 'name', 'unit_price', 'unit', 'permanent']
  tableServices: Services[]
  contractInfo: IInfo
  stat_day: string
  end_day: string
  isBoolean = {
    loading: false,
    enabled: false,
    submitted: false
  }
  FormUpdate: FormGroup
  get FormControls() {
    return this.FormUpdate.controls
  }
  ngOnInit() {
    this.getInfoContract()
    this.getInvoice()
    this.FormUpdate = this.fb.group({
      price: ['', Validators.compose([Validators.required, this.validate.regexNumber(false)])],
      deposit: ['', Validators.compose([Validators.required, this.validate.regexNumber(false)])]
    })
    this.FormUpdate.disable()
  }

  getInvoice() {
    this.apiInvoice.gets('/contract-history-invoice/index', { contract_id: this.idContract }).subscribe(e => {
      this.TableInvoice = e?.data.map(item => {
        if (item.status === 1) {
          this.TableService = item?.invoice_detail?.project_service_info?.map(value => {
            return {
              ...value,
              date_collect: dayjs(value?.date_collect).format('DD-MM-YYYY'),
              permanent: value?.permanent === 1 ? 'Thu theo hợp đồng' : 'Thu theo tháng',
              unit_price: CalPrice(value?.unit_price),
              total_money: CalPrice(value?.total_money)
            }
          })

        }
        return {
          ...item,
          nameStudent: [item?.invoice_detail?.student_info?.last_name, item?.invoice_detail?.student_info?.first_name].join(' '),
          date_time: dayjs(item?.created_at).format('DD-MM-YYYY'),
          date_collect: dayjs(item?.invoice_detail?.room_fee_info?.date_collect).format('DD-MM-YYYY'),
          total_money: CalPrice(item?.total_money)


        }
      })
    }, (error) => {
      this.toast.error('', error?.message, { timeOut: 4000 })
    })

  }

  onSubmit() {
    this.isBoolean.submitted = true
    if (this.FormUpdate.valid) {
      this.isBoolean.loading = true
      this.api.puts(`/contracts/update/${this.idContract}`, this.FormUpdate.value).subscribe((mes) => {
        this.toast.success('', mes?.message, { timeOut: 4000 })
        this.getInfoContract()
        this.FormUpdate.disable()
        this.isBoolean.loading = false
      }, (err) => {
        this.toast.error('', err?.message, { timeOut: 4000 })
        this.FormUpdate.disable()
        this.isBoolean.loading = false
      })
    }
  }

  getInfoContract() {
    this.isBoolean.loading = true
    this.api.getById(`edit/${this.idContract}`).subscribe(e => {
      this.contractInfo = e?.data
      this.setForm(e?.data)
      this.tableServices = e?.data?.project_service
      this.stat_day = dayjs(e?.data?.start_day).format('DD-MM-YYYY')
      this.end_day = dayjs(e?.data?.end_day).format('DD-MM-YYYY')
      this.isBoolean.loading = false
    })
  }

  setForm(value) {
    this.FormUpdate.setValue({
      price: value?.price ?? '',
      deposit: value?.deposit ?? ''
    })
  }

  Enabled() {
    this.FormUpdate.enable()
  }


}
export interface Services {
  id: number
  name: string
  unit_price: number
  unit: string
  permanent: number
}
export interface IInfo {
  id: number
  deposit: number
  deposit_state: number;
  end_day: string
  stat_day: string
  price: number
  note: string
  user: IStudent
}