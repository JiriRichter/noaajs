interface TidesAndCurrentsStationsResponse {
  stations: TidesAndCurrentsStation[]
}

type TidesAndCurrentsStation = { [index: string ]: string }

type QueryStringParameters = { [index: string ]: string }

type TidesAndCurrentsStationId = string