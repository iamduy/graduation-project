import { Component, OnInit } from '@angular/core'
import { single, singlebar, single2 } from './data'
import { ChartService } from 'src/app/core/services/specifics/chart.service'
import { DashboardService } from 'src/app/core/services/specifics/dashboard.service';
import { ChartbarService } from 'src/app/core/services/specifics/chartbar.service';
import { UserService } from 'src/app/core/services/user.service'
import * as dayjs from 'dayjs'
import { ToastrService } from 'ngx-toastr'

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css'],
})
export class ChartComponent implements OnInit {
  Router = this.userService.Router
  isLoading: boolean

  thisDay: any = dayjs().format('DD')
  thisMonth: any = dayjs().format('MM')
  thisYear: any = dayjs().format('YYYY')
  contractThisMonth: number = 0
  contractEnd: number = 0
  contractEndAfter10: number = 0

  dashboard: IDashBoard
  chart: Ichart
  chartbar : Ichartbar
  chartRoom: any
  view: any = [335, 200]
  // options
  gradient: boolean = true
  showLegend: boolean = true

  legendTitle: string = 'Ghi chú'
  showLabels: boolean = false
  legendPosition: any = 'below'
  isDoughnut: boolean = false
  colorScheme: any = {
    domain: ['#f8e71c', '#ff7d59'],
  }

  //chart bed
  chartbed: any
  view2: any = [335, 200]
  // options
  gradient2: boolean = true
  showLegend2: boolean = true
  legendTitle2: string = 'Ghi chú'
  showLabels2: boolean = false
  legendPosition2: any = 'below'
  isDoughnut2: boolean = false
  colorScheme2: any = {
    domain: ['#f8e71c', '#ff7d59'],
  }

  //chart bar
  multi: any
  viewbar: any = [700, 300]
  showXAxis = true
  showYAxis = true
  gradientbar = true
  showLegendbar = false
  showXAxisLabel = true
  showYAxisLabel = true
  barPadding = 20
  colorSchemebar: any = {
    domain: ['#34b276'],
  }
  constructor(
    private chartService: ChartService,
    private dashboardService: DashboardService,
    private chartbarService :ChartbarService,
    private userService: UserService,
    private toast: ToastrService
  ) {
    Object.assign(this, { singlebar })
    Object.assign(this, { single })
    Object.assign(this, { single2 })
  }

  ngOnInit() {
    this.getCountDashboard()
    this.getCountBedNotContract()
    this.getChartbar()
  }
  getCountDashboard() {
    this.isLoading = true
    this.dashboardService.getAll().subscribe((t) => {
      this.isLoading = false
      this.dashboard = t.data
    }, (err) => {
      this.isLoading = false
      this.toast.error('', err?.message, { timeOut: 4000 })
    })

  }
  getChartbar(){
    this.isLoading = true;
    this.chartbarService.getAll().subscribe((t)=>{
      this.isLoading = false
      this.chartbar = t.data;
    },(err)=>{
      this.isLoading = false
      this.toast.error('',err?.message, { timeOut: 4000 })
    })
  }
  getCountBedNotContract() {
    this.isLoading = true
    this.chartService.getAll().subscribe((t) => {
      this.isLoading = false
      this.chart = t.data
      this.chartRoom = [
        {
          "name": "Đã thuê",
          "value": t?.data?.count_room
        },
        {
          "name": "Trống",
          "value": t?.data?.count_room_not_contract
        }
      ]
      this.chartbed = [
        {
          "name": "Đã thuê",
          "value": t?.data?.count_bed_contract
        },
        {
          "name": "Trống",
          "value": t?.data.count_bed_not_contract
        }
      ]

      const listContract = t.data.list_bed_contract
      listContract.forEach(item => {
        // thống kê hđ tạo tháng này
        let StartMonth = dayjs(item.start_day).format('MM')
        if (StartMonth === this.thisMonth) {
          this.contractThisMonth++
        }
        // thống kê hđ hết hạn
        let EndYear = dayjs(item.end_day).format('YYYY')
        let EndMonth = dayjs(item.end_day).format('MM')
        let EndDay = dayjs(item.end_day).format('DD')
        if (EndYear < this.thisYear) {
          if (EndMonth < this.thisMonth) {
            if (EndDay < this.thisDay) {
              this.contractEnd++
            }
          }
        }
      })

    }, (err) => {
      this.isLoading = false
      this.toast.error('', err?.message, { timeOut: 4000 })
    })

  }
}

export interface IDashBoard {
  count_projects: number
  count_buildings: number
  count_floors: number
  count_beds: number
  count_students: number
  count_rooms: number
}
export interface Ichart {
  list_bed_contract: string[]
  count_bed_contract: number
  count_bed_not_contract: number
  count_room: number
  count_room_not_contract: number
  list_bed_not_contract: string[]
  list_room_contract: string[]
  list_room_not_contract: string[]

}
export interface Ichartbar{
  name:string;
  value:number;
}