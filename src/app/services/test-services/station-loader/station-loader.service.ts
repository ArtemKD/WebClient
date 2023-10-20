import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { loadedStations } from 'src/app/test-data/loaded-stations.data';
import { IMapArea } from 'src/app/models/IMapArea.interface';
import { IStationPoint } from 'src/app/models/IStationPoint.interface';
import { IStation } from 'src/app/models/IStation.interface';
import { stationDetailsData } from 'src/app/test-data/loaded-station-details.data';

@Injectable()
export class StationLoaderService {
  loadedStations: IStationPoint[] = []
  stationDetail: IStation | undefined

  constructor() {
    console.log("[StationLoaderService] Test version")
    this.loadedStations = loadedStations
  }

  public loadStationPoints(area: IMapArea)
    : Observable<IStationPoint[]>
  {
    return new Observable((sub) => {
      sub.next(this.loadedStations)
    })
  }

  public loadStationPointDetails(stationId: string)
    : Observable<IStation | undefined>
  {
    this.stationDetail = stationDetailsData.find(station => (station.id == stationId))

    return new Observable((sub) => {
      sub.next(this.stationDetail)
    })  
  }
}
