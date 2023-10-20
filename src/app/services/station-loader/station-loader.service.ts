import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { BehaviorSubject, Observable, concatAll, map, tap } from 'rxjs';
import { IStationPoint } from 'src/app/models/IStationPoint.interface';
import { IMapArea } from 'src/app/models/IMapArea.interface';
import { IStationPointsResponce } from 'src/app/models/IStationPointsResponce.interface';

@Injectable({
  providedIn: 'root'
})
export class StationLoaderService {
  serviceUrl = '/api/available-stations/points'
  loadedStations: IStationPoint[] = []
  stationPoints: BehaviorSubject<IStationPoint[]> = new BehaviorSubject<IStationPoint[]>([])

  constructor(private httpClient: HttpClient) {
    console.log("[StationLoaderService] Main version")
  }

  public loadStationPoints(area: IMapArea)
    : Observable<IStationPoint[]>
  {
    const params = new HttpParams()
      .set("left", area.left.toString())
      .set("top", area.top.toString())
      .set("right", area.right.toString())
      .set("bottom", area.bottom.toString())

    this.loadedStations = []
    
    return this.loadStationPointsWithOffset(params, 0)
    .pipe(
      map((responce: IStationPointsResponce) => {
        return this.loadedStations
      })
    )
  }

  private loadStationPointsWithOffset(params: HttpParams, offset: number)
    : Observable<IStationPointsResponce>
  {
    return this.httpClient.get<IStationPointsResponce>(this.serviceUrl, { params: params.append("offset", offset) })
    .pipe(
      tap((responce: IStationPointsResponce) => console.log(responce)),
      map((responce: IStationPointsResponce) => {
        console.log("offset: " + responce.pagination.offset)
        this.loadedStations.push(...responce.points)

        let lastIndex = responce.pagination.offset + responce.pagination.limit
        if (lastIndex < responce.pagination.total) {
          return this.loadStationPointsWithOffset(params, lastIndex)
        }
        return new Observable<IStationPointsResponce>((o) => {
          o.next(responce)
          o.complete()
          this.stationPoints.next(this.loadedStations)
        })
      }),
      concatAll()
    )
  }
}
