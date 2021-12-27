import { Injectable } from '@angular/core';
import { BehaviorSubject, ReplaySubject } from 'rxjs';
import { distinctUntilChanged, shareReplay } from 'rxjs/operators';

@Injectable()
export class BuildingShare {
  // state buldings
  private projectsSubject = new BehaviorSubject<any>([{}]);
  public projects = this.projectsSubject
    .asObservable()
    .pipe(distinctUntilChanged());

  // state bulding
  private projectSubject = new BehaviorSubject<any>({});
  public project = this.projectSubject
    .asObservable()
    .pipe(distinctUntilChanged());

  private buildingsSubject = new BehaviorSubject<any>([{}]);
  public buildings = this.buildingsSubject
    .asObservable()
    .pipe(distinctUntilChanged());

  // state bulding
  private buildingSubject = new BehaviorSubject<any>({});
  public building = this.buildingSubject
    .asObservable()
    .pipe(distinctUntilChanged());

  // state floors
  private floorsSubject = new BehaviorSubject<any>([{}]);
  public floors = this.floorsSubject
    .asObservable()
    .pipe(distinctUntilChanged());

  // state floor
  private floorSubject = new BehaviorSubject<any>({});
  public floor = this.floorSubject.asObservable().pipe(distinctUntilChanged());

  // state rooms
  private roomsSubject = new BehaviorSubject<any>([{}]);
  public rooms = this.roomsSubject.asObservable().pipe(distinctUntilChanged());

  // state room
  private roomSubject = new BehaviorSubject<any>({});
  public room = this.roomSubject.asObservable().pipe(distinctUntilChanged());

  // state roomTypes
  private roomTypesSubject = new BehaviorSubject<any>([{}]);
  public roomTypes = this.roomTypesSubject
    .asObservable()
    .pipe(distinctUntilChanged());

  // state roomType
  private roomTypeSubject = new BehaviorSubject<any>({});
  public roomType = this.roomTypeSubject
    .asObservable()
    .pipe(distinctUntilChanged());

  // state beds
  private bedsSubject = new BehaviorSubject<any>([{}]);
  public beds = this.bedsSubject.asObservable().pipe(distinctUntilChanged());

  // state bed
  private bedSubject = new BehaviorSubject<any>({});
  public bed = this.bedSubject.asObservable().pipe(distinctUntilChanged());

  setProjects(data: any) {
    this.projectsSubject.next(data);
  }

  setProject(data: any) {
    this.projectSubject.next(data);
  }

  setBuildings(data: any) {
    this.buildingsSubject.next(data);
  }

  setBuilding(data: any) {
    this.buildingSubject.next(data);
  }

  setRoomTypes(data: any) {
    this.roomTypesSubject.next(data);
  }

  setRoomType(data: any) {
    this.roomTypeSubject.next(data);
  }

  setRooms(data: any) {
    this.roomsSubject.next(data);
  }

  setRoom(data: any) {
    this.roomSubject.next(data);
  }

  setFloors(data: any) {
    this.floorsSubject.next(data);
  }

  setFloor(data: any) {
    this.floorSubject.next(data);
  }

  setBeds(data: any) {
    this.bedsSubject.next(data);
  }

  setBed(data: any) {
    this.bedSubject.next(data);
  }
}
