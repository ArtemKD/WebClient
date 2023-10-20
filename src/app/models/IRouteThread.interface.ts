import { IStationStop } from "./IStationStop.interface"

export interface IRouteThread {
    uid: string
    title: string
    number: string
    stops: IStationStop[]
}