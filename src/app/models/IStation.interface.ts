export interface IStation {
    id: string
    title: string
    direction: string
    stationType: string
    transportType: string
    longitude: number
    latitude: number
    esrCode: string | null
    yandexCode: string
}