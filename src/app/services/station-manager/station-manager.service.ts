import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, catchError, concatAll, map, tap, throwError } from 'rxjs';
import { IMapArea } from 'src/app/models/IMapArea.interface';
import { IRouteThread } from 'src/app/models/IRouteThread.interface';
import { IStationPoint } from 'src/app/models/IStationPoint.interface';
import { IStation } from 'src/app/models/IStation.interface';
import { IStationPointsResponce } from 'src/app/models/IStationPointsResponce.interface';

@Injectable({
  providedIn: 'root'
})
export class StationManagerService {
  loadedStations: IStationPoint[] = []
  onLoadAllPointsSubject: BehaviorSubject<IStationPoint[]> = new BehaviorSubject<IStationPoint[]>([])
  onLoadThreadPointsSubject: BehaviorSubject<IStationPoint[]> = new BehaviorSubject<IStationPoint[]>([])

  constructor(private httpClient: HttpClient) { }

  public getPoints(area: IMapArea) : Observable<IStationPoint[]>{
    console.log("[StationManagerService] getPoints()")
    let params = new HttpParams()
      .set("left", area.left.toString())
      .set("top", area.top.toString())
      .set("right", area.right.toString())
      .set("bottom", area.bottom.toString())

    this.loadedStations = []

    return this.getPointWithOffset(params, 0)
    .pipe(
      tap(() => {
        console.log("[StationManagerService] getPoints()")
      }),
      map((response: IStationPointsResponce) => {
        return this.loadedStations
      })
    )
  }

  private getPointWithOffset(params: HttpParams, offset: number)
    : Observable<IStationPointsResponce>
  {
    return this.httpClient.get<IStationPointsResponce>( "/api/stations", { params: params.append("offset", offset) } )
    .pipe(
      map((response: any) => {
        console.log("Response: ")
        console.log(response)
        this.loadedStations.push(...response.points)

        let offset = response.pagination.offset + response.pagination.limit
        if (offset < response.pagination.total) {
          return this.getPointWithOffset(params, offset)
        }
        return new Observable<IStationPointsResponce>((o) => {
          o.next(response)
          o.complete()
          this.onLoadAllPointsSubject.next(this.loadedStations)
        })
      }),
      concatAll()
    )
  }

  public getThread(threadCode: string) : Observable<IRouteThread> {
    return this.httpClient.get<IRouteThread>( `/api/threads/${threadCode}` )
    .pipe(
      tap((routeThread: IRouteThread) => {
        console.log("[StationManagerService] getThread()")
        let stopList: IStationPoint[] = []
        for (let stop of routeThread.stops) {
          stopList.push(stop.stationPoint)
        }

        this.loadedStations = stopList
        this.onLoadThreadPointsSubject.next(this.loadedStations)
      })
    )
  }

  public getStationDetails(stationId: string) : Observable<IStation> {
    return this.httpClient.get<IStation>( `/api/stations/${stationId}` )
    .pipe(
      tap((station: IStation) => {
        console.log("Receive station:")
        console.log(station)
      })
    )
  }
}
