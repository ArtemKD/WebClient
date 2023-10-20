import { IResponcePagination } from "./IResponcePagination.interface"
import { IStationPoint } from "./IStationPoint.interface"

export interface IStationPointsResponce {
    pagination: IResponcePagination
    points: IStationPoint[]
}