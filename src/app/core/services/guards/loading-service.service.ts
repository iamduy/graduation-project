import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { distinctUntilChanged } from 'rxjs/operators';

@Injectable()
export class LoadingService {
  private loadingSubject = new BehaviorSubject<boolean>(false);
  public loading = this.loadingSubject
    .asObservable()
    .pipe(distinctUntilChanged());

  setLoading(status: boolean) {
    this.loadingSubject.next(status);
  }
}
