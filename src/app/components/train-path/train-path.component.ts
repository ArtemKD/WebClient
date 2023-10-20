import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { IStationPoint } from 'src/app/models/IStationPoint.interface';
import { StationManagerService } from 'src/app/services/station-manager/station-manager.service';
import { StationPathService } from 'src/app/services/station-path/station-path.service';
import { StationLoaderService } from 'src/app/services/test-services/station-loader/station-loader.service';

@Component({
  selector: 'app-train-path',
  templateUrl: './train-path.component.html',
  styleUrls: ['./train-path.component.css']
})
export class TrainPathComponent implements OnInit {
  isVisible: boolean
  selectedStation: IStationPoint | undefined

  constructor(private statiopPath: StationPathService, public stationManager: StationManagerService)
  {
    this.isVisible = false
    this.statiopPath.isVisible.subscribe((value: boolean) => {
      this.isVisible = value
    })
  }

  public SwitchShowing() {
    this.statiopPath.isVisible.next(!this.isVisible)
  }

  ngOnInit() {
  }

  public click() {
    let threadCode = "758A_7_2"
    this.stationManager.getThread(threadCode).subscribe()
  }
}
