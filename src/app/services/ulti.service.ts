import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UltiService {
  private flagCompletedSubject = new BehaviorSubject<boolean>(false);
  public flagCompleted$ = this.flagCompletedSubject.asObservable();

  constructor() {}

  setFlagCompleted(value: boolean): void {
    this.flagCompletedSubject.next(value);
  }

  getFlagCompleted(): boolean {
    return this.flagCompletedSubject.value;
  }
} 