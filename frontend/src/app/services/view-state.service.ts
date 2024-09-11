import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ViewStateService {
  private isFullViewSubject = new BehaviorSubject<boolean>(true); 
  isFullView$ = this.isFullViewSubject.asObservable();

  setFullView(isFullView: boolean): void {
    this.isFullViewSubject.next(isFullView);
  }
}
