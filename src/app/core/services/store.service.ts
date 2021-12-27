import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StoreService {

  constructor() { }


  // CHECK OPEN SIDEBAR 
  status: boolean;
  setStatus(Status: boolean) {
    this.status = Status
  }
  getStatus() {
    return this.status
  }


}
