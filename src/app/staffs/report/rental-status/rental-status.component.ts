import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { API } from 'src/app/core';
@Component({
  selector: 'app-rental-status',
  templateUrl: './rental-status.component.html',
  styleUrls: ['./rental-status.component.css'],
})
export class RentalStatusComponent implements OnInit {
  projects: any = [];
  projectsList: any = [];
  isLoading: boolean;

  paginate: FormGroup;
  lastPage: number;
  totalItems: number;
  constructor(
    private api: API,
    private toast: ToastrService,
    private fb: FormBuilder
  ) {
    this.paginate = this.fb.group({ page: '', project_id: '' });
  }

  formatData(projects: any) {
    let projects1 = projects;
    let totalRoom = 0;
    let totalBed = 0;

    let roomsObject: any = {
      total_rooms: 0,
      room_has_contract: 0,
      room_doesnt_contract: 0,
    };
    let bedsObject: any = {
      total_beds: 0,
      bed_has_contract: 0,
      bed_doesnt_contract: 0,
    };
    projects.forEach((project: any, indexProject: number) => {
      if (project?.buildings.length > 0) {
        project?.buildings.forEach((building: any, indexBuilding: number) => {
          if (building?.floors.length > 0) {
            building?.floors.forEach((floor: any) => {
              roomsObject.total_rooms =
                roomsObject.total_rooms + floor.total_rooms;
              roomsObject.room_has_contract =
                roomsObject.room_has_contract + floor.room_has_contract;
              roomsObject.room_doesnt_contract =
                roomsObject.room_doesnt_contract + floor.room_doesnt_contract;
              if (floor?.rooms?.length > 0) {
                floor?.rooms.forEach((room: any) => {
                  bedsObject.total_beds =
                    bedsObject.total_beds + room.total_beds;
                  bedsObject.bed_has_contract =
                    bedsObject.bed_has_contract + room.bed_has_contract;
                  bedsObject.bed_doesnt_contract =
                    bedsObject.bed_doesnt_contract + room.bed_doesnt_contract;
                });
              }
            });
          }
          projects1[indexProject].buildings[indexBuilding].room_object =
            roomsObject;

          projects1[indexProject].buildings[indexBuilding].bed_object =
            bedsObject;

          totalRoom = totalRoom + roomsObject.total_rooms;
          totalBed = totalBed + bedsObject.total_beds;

          roomsObject = {
            total_rooms: 0,
            room_has_contract: 0,
            room_doesnt_contract: 0,
          };
          bedsObject = {
            total_beds: 0,
            bed_has_contract: 0,
            bed_doesnt_contract: 0,
          };
        });
      }
    });
    return projects1;
  }

  getData(value: any = {}) {
    if (value) {
      for (let key in value) {
        if (!value[key]) {
          delete value[key];
        }
      }
    }
    this.isLoading = true;
    this.api.gets('/reports/rental-status', value).subscribe(
      (ele) => {
        this.isLoading = false;
        const { current_page, total, data, last_page } = ele?.data?.projects;
        this.totalItems = total;
        this.lastPage = last_page;
        this.paginate.patchValue({ page: current_page });
        if (this.projectsList?.length == 0) {
          this.projectsList = data;
        }
        this.projects = this.formatData(data);
      },
      (err) => {
        this.isLoading = false;
        this.toast.error('', err?.message, { timeOut: 4000 });
      }
    );
  }

  ngOnInit() {
    this.getData();
  }

  get fs() {
    return this.paginate.controls;
  }

  changeProject() {
    let searchData = this.paginate.value;
    delete searchData.page;
    this.getData(searchData);
  }
  changePage(currentPage: number) {
    if (this.paginate.value.page !== currentPage) {
      this.paginate.patchValue({ page: currentPage });
      this.getData(this.paginate.value);
    }
  }
}
