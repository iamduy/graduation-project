import { Component, OnInit } from '@angular/core';
import { FlatTreeControl } from '@angular/cdk/tree';
import {
  MatTreeFlatDataSource,
  MatTreeFlattener,
} from '@angular/material/tree';
import { BuildingService } from 'src/app/core/services/specifics/building.service';
import { BuildingShare } from './building-share.service';
import { Routers } from 'src/app/utils';
import {
  IBuilding,
  IProject,
  IRoomType,
  LoadingService,
  ProjectService,
  RoomTypeService,
} from 'src/app/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-building',
  templateUrl: './building.component.html',
  styleUrls: ['./building.component.css'],
})
export class BuildingComponent implements OnInit {
  projects: IProject[] = [];
  project: IProject = {} as IProject;
  buildings: IBuilding[] = [];
  building: any = {};

  projectSelect = new FormControl();
  constructor(
    private projectServive: ProjectService,
    private loadingService: LoadingService
  ) {}

  changeBuilding(building: IBuilding) {
    this.building = building;
  }

  changeProject() {
    let project = this.projects.filter(
      (project) => this.projectSelect.value == project.id
    )[0];
    this.buildings = project?.buildings;
    this.building = null;
  }

  ngOnInit() {
    this.loadingService.setLoading(true);
    this.projectServive.getAll().subscribe((t) => {
      this.projects = t.data;
      if (t.data?.length > 0) {
        this.projectSelect.patchValue(t.data[0]?.id);
        this.buildings = t.data[0]?.buildings;
        this.loadingService.setLoading(false);
      } else {
        this.loadingService.setLoading(false);
        this.projectSelect.patchValue('');
      }
    });
  }
}
