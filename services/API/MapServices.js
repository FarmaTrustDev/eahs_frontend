import request from '../request'
import { BASE_API } from '../Constant'

const baseApi = `${BASE_API}/map`

function fetchCountryByPostCode(data) {
  return request({
    url: `${baseApi}/get-location-by-postal-code/${data}`,
    data,
    method: 'GET',
  })
}

const MapServices = {
    fetchCountryByPostCode
}

export default MapServices