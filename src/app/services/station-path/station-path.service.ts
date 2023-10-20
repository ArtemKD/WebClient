import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StationPathService {
  public isVisible: Subject<boolean> = new Subject<boolean>()
}
