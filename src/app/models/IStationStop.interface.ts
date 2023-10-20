import { IStationPoint } from "./IStationPoint.interface"

export interface IStationStop {
    arrival: Date | undefined
    departure: Date | undefined
    duration: number
    stopTime: number | undefined
    stationPoint: IStationPoint
}