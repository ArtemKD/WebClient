import { Component, OnInit } from '@angular/core';
import { IMapArea } from 'src/app/models/IMapArea.interface';
import { IStationPoint } from 'src/app/models/IStationPoint.interface';
import { StationManagerService } from 'src/app/services/station-manager/station-manager.service';
import { StationLoaderService } from 'src/app/services/test-services/station-loader/station-loader.service';

declare const ymaps: any

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css'],
  providers: [ StationLoaderService ]
})
export class MapComponent implements OnInit {
  private map: any
  private objectManager: any

  private onBoundsChangeFunction: any

  private readonly MOSCOW_longitude = 37.609218
  private readonly MOSCOW_latitude = 55.753559

  constructor(private stationLoader: StationLoaderService, private stationManager:StationManagerService) {

  }

  ngOnInit() {
    ymaps.ready().then(() => this.initMap())
  }

  private initMap(): void {
    console.log("Init map")
    this.map = new ymaps.Map('map', {
      center: [ this.MOSCOW_latitude, this.MOSCOW_longitude],
      controls: [],
      zoom: 12
    })

    this.objectManager = new ymaps.ObjectManager({
      clusterize: true
    })

    this.map.geoObjects.add(this.objectManager)

    // set callbacks
    this.onBoundsChangeFunction = this.onBoundsChange.bind(this)

    this.map.events.add('boundschange', this.onBoundsChangeFunction)
    this.objectManager.objects.events.add('click', this.onStationPointClicked.bind(this))
    this.stationManager.onLoadAllPointsSubject.subscribe(this.onPointsLoaded.bind(this))
    this.stationManager.onLoadThreadPointsSubject.subscribe(this.onThreadPointsLoaded.bind(this))

    // loading points in start area
    var bounds = this.map.getBounds()
    this.stationManager.getPoints(this.boundsToMapArea(bounds)).subscribe()
  }

  // test func
  public getThreadPoints() {
    console.log("Delete callback")
    this.map.events.remove('boundschange', this.onBoundsChangeFunction)
  }

  // *** map callbacks ***
  private onThreadPointsLoaded(stationPoints: IStationPoint[]) {
    console.log("Delete callback")
    this.map.events.remove('boundschange', this.onBoundsChangeFunction)
    console.log("Load thread station points")
    this.addPointsOnMap(stationPoints)

    let coordinates = stationPoints.map((point: IStationPoint) => {
      return [ point.latitude, point.longitude ]
    })

    console.log("PointList: ")
    console.log(coordinates)

    let myPolyline = new ymaps.Polyline(
      coordinates, // Массив с координатами точек
      {},
      {
          strokeColor: "#fcba03", // Цвет линии
          strokeWidth: 4 // Ширина линии
      }
    );
    
    this.map.geoObjects.add(myPolyline)
    myPolyline.editor.startEditing()
  }

  private onPointsLoaded(stationPoints: IStationPoint[]) {
    console.log("Load station points in area")
    this.addPointsOnMap(stationPoints)
  }

  private onBoundsChange(e: any): void {
    console.log("[OnBoundsChange]")
    var bounds = e.get('newBounds')
    this.stationManager.getPoints(this.boundsToMapArea(bounds)).subscribe()
  }

  private onStationPointClicked(e: any) {
    var objectId = e.get('objectId')
    this.stationManager.getStationDetails(objectId).subscribe()
  }

  private addPointsOnMap(stationPoints: IStationPoint[]) {
    let jsonView = {
      "type": "FeatureCollection",
      "features": stationPoints.map(function (item: IStationPoint) {
        return {
          type: "Feature",
          id: item.id,
          geometry: {
            type: "Point",
            coordinates: [item.latitude, item.longitude]
          },
          properties: {
            hintContent: item.title
          },
          options: {
            preset: "islands#blueCircleDotIconWithCaption"
          }
        }
      })
    }

    this.objectManager.removeAll()
    this.objectManager.add(jsonView)
  }

  // helper convert bound to MapArea
  private boundsToMapArea(bounds: any): IMapArea {
    return {
      left: bounds[0][1],
      top: bounds[0][0],
      right: bounds[1][1],
      bottom: bounds[1][0]
    }
  }
}
