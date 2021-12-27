import { Component, OnInit } from '@angular/core';
import * as dayjs from 'dayjs';
import { ToastrService } from 'ngx-toastr';
import { IProjectService, IStudent, StudentService } from 'src/app/core';
import { CalPrice } from 'src/app/utils';

@Component({
  selector: 'app-contract',
  templateUrl: './contract.html',
  styleUrls: ['./contract.css'],
})
export class ContractComponent implements OnInit {


  isLoading: boolean
  data: IContract
  errMess: any
  constructor(private studentService: StudentService, private toast: ToastrService) { }

  ngOnInit(): void {
    this.isLoading = true
    this.studentService.getContract().subscribe((t) => {
      this.isLoading = false
      this.data = {
        ...t?.data,
        price: CalPrice(t?.data?.price),
        deposit: CalPrice(t?.data?.deposit),
        start_day: dayjs(t?.data?.start_day).format('DD-MM-YYYY'),
        end_day: dayjs(t?.data?.end_day).format('DD-MM-YYYY'),
        userCreated_at: dayjs(t?.data?.user?.created_at).format('DD-MM-YYYY')
      }
    }, (err) => {
      this.isLoading = false
      this.errMess = err?.message
      this.toast.error('', err?.message, { timeOut: 4000 })
    })
  }
}


export interface IContract {
  id: number
  user: IStudent
  userCreated_at: string
  bed: any
  start_day: string
  end_day: string
  price: number
  deposit: number
  deposit_state: string
  note: string
  project_service: IProjectService[]
  room: any
}
